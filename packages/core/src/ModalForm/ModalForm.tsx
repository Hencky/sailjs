import { useRef } from 'react';
import { useModal } from './Modal';
import { Form, useForm } from '../Form';
import type { PluginsType } from '@sailjs/shared';
import type { ModalProps as AModalProps } from 'antd';
import type { ReactNode, MouseEvent, ReactElement } from 'react';
import type { FormProps, FormOptionProps, FormStore } from '../Form';
import type { ModalProps } from './Modal';

export type ExcludeModalType = 'onOk' | 'onCancel' | 'modalProps' | 'children' | 'confirmLoading';

export interface ModalFormContext<Values = any, P = PluginsType> {
  form: FormStore<Values, P>;
  open: boolean;
  values: Record<string, any>;
}

export interface ModalFormProps<Values = any, P = PluginsType> extends Omit<ModalProps, ExcludeModalType> {
  /** 点击确定回调 */
  onOk?: (e: MouseEvent<HTMLElement>, ctx: ModalFormContext<Values, P>) => void;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onCancel?: (e: MouseEvent<HTMLElement>, ctx: ModalFormContext<Values, P>) => void;
  /** 表单属性 */
  formProps?: Omit<FormProps<Values, P>, 'form' | 'initialValues'>;
  /** Modal的其他属性 */
  modalProps?: Omit<AModalProps, Exclude<ExcludeModalType, 'confirmLoading'> | 'onOk' | 'onCancel'> & {
    footerRender?: (ctx: ModalFormContext<Values, P>) => ReactNode;
  };

  children?: ReactElement;

  /** 表单初始值 */
  initialValues?: FormProps<Values, P>['initialValues'];
  /** 远程表单值 */
  remoteValues?: FormProps<Values, P>['remoteValues'];
}

export interface ModalFormProps<Values = any, P = PluginsType> {
  form?: FormStore<Values, P>;
  open?: boolean;
}

export interface ModalFormInstance<Values = any, P = PluginsType> {
  open: (props: ModalFormProps<Values, P>) => void;
  close: (e?: MouseEvent<HTMLElement, MouseEvent>) => void;
  isOpen: boolean;
}

export const useModalForm = <P extends PluginsType = any>(
  props?: FormOptionProps<P>
): [ReactElement, ModalFormInstance] => {
  const [modal, { open, close, isOpen }] = useModal();

  const [form] = useForm(props);

  const propsRef = useRef<ModalFormProps>();

  const getModalFormContext = () => {
    return {
      form,
      open: isOpen,
      values: form.getFieldsValue(),
    };
  };

  const { formProps, remoteValues } = propsRef.current || {};

  return [
    <Form remoteValues={remoteValues} {...formProps} form={form}>
      {modal}
    </Form>,
    {
      open: (params: ModalFormProps) => {
        propsRef.current = params;

        const { initialValues, onOk, onCancel, modalProps, formProps, ...restParams } = params;

        const { footerRender, footer, ...restModalProps } = modalProps || {};

        if (initialValues) {
          form.setFieldsValue(initialValues);
        }

        // ===== footer支持ctx =====
        const renderFooter = () => {
          return footerRender ? footerRender(getModalFormContext()) : footer;
        };

        return open({
          ...restParams,
          ...restModalProps,
          footer: renderFooter(),
          onCancel: (e) => {
            form.resetFields();
            return onCancel?.(e, getModalFormContext());
          },
          onOk: async (e) => {
            // ===== 增加表单校验逻辑 =====
            await form.validateFields();
            return onOk?.(e, getModalFormContext());
          },
        });
      },
      close,
      isOpen,
    },
  ];
};
