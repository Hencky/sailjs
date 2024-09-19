import { useState, useRef, useCallback } from 'react';
import { Modal as AModal } from 'antd';
import { isPromise } from 'radash';
import type { ModalProps as AModalProps } from 'antd/lib/modal';

type ExcludeModalType = 'title' | 'width' | 'children' | 'onOk' | 'onCancel' | 'confirmLoading';

export interface ModalProps extends Pick<AModalProps, ExcludeModalType> {
  modalProps?: Omit<AModalProps, ExcludeModalType>;
  onOpen?: () => void;
}

export interface ModalInstance {
  open: (props: ModalProps) => void;
  close: () => void;
  isOpen: boolean;
}

export const useModal = (): [React.ReactNode, ModalInstance] => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const propsRef = useRef<ModalProps>();
  const promiseRef = useRef<{ resolve: (r: any) => void; reject: (r: any) => void }>();

  const onClose = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    propsRef.current!.onCancel?.(e!);
    setVisible(false);
    const { reject } = promiseRef.current!;
    reject('');
  }, []);

  const { modalProps, title, children, width, onOk } = propsRef.current || {};

  // ==== 确定按钮回调，返回promise按钮自动进入loading =====
  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setConfirmLoading(true);
      const { resolve, reject } = promiseRef.current!;
      const cb = onOk?.(e);
      if (isPromise(cb)) {
        return (cb as unknown as Promise<any>)
          .then((data) => {
            setConfirmLoading(false);
            resolve(data);
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            // ===== 弹框中表单校验错误，不抛出错误，以防loading动画错误停止 =====
            if (!e.errorFields) {
              reject(e);
            }
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      } else {
        setConfirmLoading(false);
        return resolve(cb);
      }
    },
    [onOk]
  );

  return [
    <AModal
      {...modalProps}
      onCancel={onClose}
      open={visible}
      confirmLoading={confirmLoading}
      title={title}
      width={width}
      onOk={handleOk}
    >
      {children}
    </AModal>,
    {
      open: (props) => {
        return new Promise((resolve, reject) => {
          promiseRef.current = { resolve, reject };
          propsRef.current = props;
          const { onOpen } = props!;
          onOpen?.();
          setVisible(true);
        });
      },
      close: onClose,
      isOpen: visible,
    },
  ];
};
