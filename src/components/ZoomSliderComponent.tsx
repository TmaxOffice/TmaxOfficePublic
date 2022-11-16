import WidgetEvents from 'model/ribbon/widget/common/WidgetEvents';
import { ICustomWidgetProps } from 'model/ribbon/widget/common/WidgetInfos';
import SliderCustomAttType from 'model/ribbon/widget/widgetAtt/SliderCustomAttType';
import React, { RefObject } from 'react';
import 'style/widgets/ZoomSlider.scss';

interface ZoomSliderCustomAttType extends SliderCustomAttType {
  zoomValue: number;
  sliderRef: RefObject<HTMLDivElement>;
}
interface ZoomSliderCustomEventType extends WidgetEvents {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomRatioClick: () => void;
}

const ZoomSliderComponent = ({
  attr,
  eventhandler,
}: ICustomWidgetProps<ZoomSliderCustomAttType, ZoomSliderCustomEventType>): JSX.Element => {
  return (
    <div className="pk-office-w-zoomslider">
      <span
        style={{
          cursor: 'default',
        }}
        onClick={eventhandler?.onZoomOut}
        aria-hidden="true"
      >
        -
      </span>
      <span
        style={{
          cursor: 'default',
        }}
        onClick={eventhandler?.onZoomIn}
        aria-hidden="true"
      >
        +
      </span>
      <div
        className="pk-office-w-zoomslider-label"
        onClick={eventhandler?.onZoomRatioClick}
        aria-hidden="true"
      >
        {`${attr?.zoomValue?.toString()}%`}
      </div>
    </div>
  );
};

export default ZoomSliderComponent;
