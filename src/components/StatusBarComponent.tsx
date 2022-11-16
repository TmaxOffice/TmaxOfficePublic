import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import useStatusBar from 'hooks/statusbar/useStatusBar';
import CommandEnum from 'model/command/CommandEnum';
import StatusBarToggleBtnComponent from 'components/widgets/button/StatusBarToggleBtnComponent';

import 'style/StatusBar.scss';
import useZoomSlider from 'hooks/control/useZoomSlider';
import ZoomSliderComponent from 'components/statusbar/ZoomSliderComponent';
import IconComponent from 'components/widgets/IconComponent';
import useResizeStatusBar from 'hooks/statusbar/useResizeStatusBar';
import LabelComponent from 'components/widgets/LabelComponent';

export interface StatusBarProps {
  leftControls?: ControlType[];
  rightControls?: ControlType[];
  zoomValue: number;
  minZoomValue: number;
  maxZoomValue: number;
  handleZoomRatioClick: () => void;
  handleZoomSlider: (value: number) => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}

export type ControlType = {
  img?: string;
  text?: string;
  commandId?: CommandEnum;
  isSelected?: boolean;
  onClick?: (commandId: CommandEnum) => void;
};

const StatusBarComponent: React.FC<StatusBarProps> = ({
  leftControls,
  rightControls,
  zoomValue,
  minZoomValue,
  maxZoomValue,
  handleZoomRatioClick,
  handleZoomSlider,
  handleZoomIn,
  handleZoomOut,
}: StatusBarProps) => {
  const { statusImg, statusStr, messageStr, timeLabel } = useStatusBar();
  const { percentage, handleMouseDown, sliderRef } = useZoomSlider({
    initialValue: zoomValue,
    minValue: minZoomValue,
    maxValue: maxZoomValue,
    onChange: handleZoomSlider,
  });
  const { statusBarRef, leftControlsRef, statusAreaRef, rightControlsRef, minimumLevel } =
    useResizeStatusBar();

  return (
    <div
      className={classNames({
        'pk-office-a-statusbar': true,
        [`pk-office-a-statusbar--minimum${minimumLevel}`]: minimumLevel,
      })}
      tabIndex={-1}
      ref={statusBarRef}
    >
      <div
        className={classNames({
          'pk-office-a-statusbar-leftcontrolarea': true,
        })}
      >
        <div className="pk-office-a-statusbar-leftcontrols" ref={leftControlsRef}>
          {leftControls?.map((leftControl: ControlType) => {
            return (
              <div className="pk-office-a-statusbar-leftcontrol" key={leftControl.text}>
                {leftControl.text}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pk-office-a-statusbar-statusarea" ref={statusAreaRef}>
        <div className="pk-office-a-statusbar-statusarea-status">
          <IconComponent
            attr={{
              className: 'pk-office-a-statusbar-statusarea-icon',
              img: statusImg,
              width: '13px',
              height: '13px',
            }}
          />
          <LabelComponent attr={{ label: statusStr }} />
        </div>
        <div className="pk-office-a-statusbar-statusarea-message">
          <div className="pk-office-a-statusbar-seperator" />
          <LabelComponent attr={{ label: messageStr }} />
          {timeLabel && (
            <>
              <div className="pk-office-a-statusbar-seperator" />
              <span className="pk-office-a-statusbar-statusarea-time">{timeLabel}</span>
            </>
          )}
        </div>
      </div>
      <div className="pk-office-a-statusbar-rightcontrolarea">
        <div className="pk-office-a-statusbar-rightcontrols" ref={rightControlsRef}>
          {rightControls?.map((rightControl: ControlType) => {
            return (
              <StatusBarToggleBtnComponent
                key={`statusbar_togglebtn_${rightControl.commandId}`}
                attr={{
                  img: rightControl.img,
                  label: rightControl.text,
                  selected: rightControl.isSelected,
                }}
                eventhandler={{
                  onClick: () => {
                    if (rightControl.onClick && rightControl.commandId) {
                      rightControl.onClick(rightControl.commandId);
                    }
                  },
                }}
              />
            );
          })}
          <ZoomSliderComponent
            attr={{
              zoomValue,
              percentage,
              sliderRef,
            }}
            eventhandler={{
              onZoomRatioClick: handleZoomRatioClick,
              onZoomIn: handleZoomIn,
              onZoomOut: handleZoomOut,
              onMouseDown: handleMouseDown,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(StatusBarComponent);

StatusBarComponent.defaultProps = {
  leftControls: undefined,
  rightControls: undefined,
};
