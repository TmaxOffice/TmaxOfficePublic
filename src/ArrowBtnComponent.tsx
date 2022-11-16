import React from 'react';
import classNames from 'classnames';
import { ICustomWidgetProps } from 'model/ribbon/widget/common/WidgetInfos';
import ArrowBtnCustomAttType from 'model/ribbon/widget/widgetAtt/ArrowBtnCustomAttType';
import WidgetEvents from 'model/ribbon/widget/common/WidgetEvents';
import ImgResComponent from 'components/resource/ImgResComponent';
import 'style/widgets/button/ArrowBtn.scss';

function ArrowBtnComponent({
  attr,
  eventhandler,
}: ICustomWidgetProps<ArrowBtnCustomAttType, WidgetEvents>): JSX.Element {
  return (
            <button
      className={classNames({
        'pk-office-w-arrow': true,
        [`pk-office-w-arrow--${attr?.type}`]: attr?.type,
        [`pk-office-w-arrow--disabled`]: attr?.disabled,
        [`${attr?.className}`]: attr?.className,
      })}
      type="button"
      onClick={eventhandler?.onClick}
      onMouseEnter={eventhandler?.onMouseEnter}
      onMouseLeave={eventhandler?.onMouseLeave}
    >
      <ImgResComponent id="SPLIT_ARROW_DOWN_NORMAL" w={`${attr?.size}px`} h={`${attr?.size}px`} />
    </button>
  );
}

export default ArrowBtnComponent;
