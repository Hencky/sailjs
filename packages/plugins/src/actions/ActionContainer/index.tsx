import React, { useCallback, useState, useEffect } from 'react';
import { Tooltip, Popconfirm } from 'antd';
import { ModalConfirm, type ModalConfirmProps } from '../ModalConfirm';
import { isString, isPromise, isObject } from 'radash';
import type { TooltipProps } from 'antd/es/tooltip';
import type { PopconfirmProps } from 'antd/es/popconfirm';

export interface ActionContainerProps {
  /** Tooltip的title，推荐string类型 */
  tooltip?: string | TooltipProps;
  /** PopConfirm的title，推荐string类型 */
  confirm?: string | PopconfirmProps;
  /** Modal弹框确认 */
  modalConfirm?: string | ModalConfirmProps;
  /** 是否禁用 */
  disabled?: (() => boolean) | boolean;
  /** 是否渲染 */
  render?: (() => boolean) | boolean;
  /** 点击事件 */
  onClick: (...args: any[]) => any;
  /** 渲染容器 */
  container?: (() => React.ReactElement) | React.ReactElement;
  children: React.ReactElement;

  /** 内部组件使用，status变化时的回调 */
  onStatusChange?: (status: { loading: boolean; tooltipOpen: boolean; popconfirmOpen: boolean }) => void;
}

export const ActionContainer: React.FC<ActionContainerProps> = (props) => {
  const {
    disabled: propDisabled,
    tooltip,
    confirm,
    modalConfirm,
    onClick,
    children,
    render = true,
    container,
    onStatusChange,
  } = props;

  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [popconfirmOpen, setPopconfirmOpen] = useState(false);

  const disabled = typeof propDisabled === 'function' ? propDisabled() : propDisabled;

  useEffect(() => {
    onStatusChange?.({
      loading,
      tooltipOpen,
      popconfirmOpen,
    });
  }, [loading, tooltipOpen, popconfirmOpen]);

  const onClickInternal = (...args: any[]) => {
    if (loading) return;

    setLoading(true);
    const result = onClick(...args);

    if (isPromise(result)) {
      (result as unknown as Promise<any>)
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const renderTriggerElement = () => {
    if (disabled) {
      return React.cloneElement(children, { disabled, loading });
    }
    if (confirm || modalConfirm) {
      return React.cloneElement(children, { loading });
    }
    return React.cloneElement(children, { onClick: onClickInternal, loading });
  };

  const onToolVisibleChange = useCallback(
    (visible) => {
      setTooltipOpen(popconfirmOpen ? false : visible);
    },
    [popconfirmOpen]
  );

  const onPopconfirmVisibleChange = useCallback(
    (visible) => {
      if (loading) return;
      setTooltipOpen(false);
      setPopconfirmOpen(visible);
    },
    [loading]
  );

  if (typeof render === 'function' && !render()) return null;
  if (!render) return null;

  const renderTooltipElement = (element: React.ReactElement) => {
    return React.createElement(
      Tooltip,
      {
        title: tooltip,
        ...(isObject(tooltip) ? tooltip : {}),
        open: tooltipOpen,
        onOpenChange: onToolVisibleChange,
      },
      element
    );
  };

  const renderPopconfirmElement = (element: React.ReactElement) => {
    if (disabled || !confirm) return element;

    return React.createElement(
      Popconfirm,
      {
        title: confirm,
        ...(isObject(confirm) ? confirm : {}),
        onConfirm: onClickInternal,
        open: popconfirmOpen,
        onOpenChange: onPopconfirmVisibleChange,
      },
      element
    );
  };

  const renderModalConfirmElement = (element: React.ReactElement) => {
    if (disabled || !modalConfirm) return element;

    return React.createElement(
      ModalConfirm,
      {
        ...(isString(modalConfirm) ? { content: modalConfirm } : modalConfirm),
        onOk: onClickInternal,
      },
      element
    );
  };

  const renderContainerElement = (element: React.ReactElement) => {
    if (!container) return element;

    if (React.isValidElement(container)) {
      return React.cloneElement(container, {}, element);
    }

    if (typeof container === 'function') {
      const containerEle = container();
      return React.cloneElement(containerEle, {}, element);
    }

    return element;
  };

  let ele = renderTriggerElement();
  ele = renderTooltipElement(ele);
  ele = renderPopconfirmElement(ele);
  ele = renderModalConfirmElement(ele);
  ele = renderContainerElement(ele);

  return ele;
};
