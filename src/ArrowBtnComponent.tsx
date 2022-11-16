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
    <button></button>
  );
}

export default ArrowBtnComponent;
