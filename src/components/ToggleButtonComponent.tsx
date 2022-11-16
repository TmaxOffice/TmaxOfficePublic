import React from 'react';
import classNames from 'classnames';
import { ICustomWidgetProps } from 'model/ribbon/widget/common/WidgetInfos';
import ToggleCustomAttType from 'model/ribbon/widget/widgetAtt/ToggleCustomAttType';
import WidgetEvents from 'model/ribbon/widget/common/WidgetEvents';
import LabelComponent from '../LabelComponent';
import IconComponent from '../IconComponent';
import 'style/widgets/button/ToggleButton.scss';

/**
 * TOC Common Ribbon Control > Toggle: TO2
 */
const ToggleButtonComponent = ({
  attr,
  eventhandler,
}: ICustomWidgetProps<ToggleCustomAttType, WidgetEvents>): JSX.Element => {
  const iconSize: string = attr?.size !== 'large' ? '16px' : '30px';
  return (
    <div
      className={classNames({
        'pk-office-w-toggle': true,
        [`pk-office-w-toggle--${attr?.size}`]: attr?.size,
        'pk-office-w-toggle--selected': attr?.isSelected,
        'pk-office-w-toggle--disabled': attr?.disabled,
        [`${attr?.className}`]: attr?.className,
      })}
      onClick={eventhandler?.onClick}
      onMouseEnter={eventhandler?.onMouseEnter}
      onMouseLeave={eventhandler?.onMouseLeave}
      aria-hidden="true"
    >
      <div
        className={classNames({
          'pk-office-w-toggle-icon': true,
          [`pk-office-w-toggle-icon--${attr?.size}`]: attr?.size,
        })}
      >
      </div>
    </div>
  );
};

export default ToggleButtonComponent;
