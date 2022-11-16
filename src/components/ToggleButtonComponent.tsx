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
  return (
    <div>
    </div>
  );
};

export default ToggleButtonComponent;
