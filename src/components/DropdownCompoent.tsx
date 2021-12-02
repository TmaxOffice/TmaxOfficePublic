import React, { ReactNode, ReactNodeArray } from 'react';
import classNames from 'classnames';
import 'style/widgets/Dropdown.scss';

interface c {
  className: string;
  children: ReactNode | ReactNodeArray;
  position: { top: number; left: number };
}

const DropdownComponent = React.forwardRef<HTMLDivElement, c>((props: c, ref) => {
  const { className, children, position } = props;
  return (
    <div
      className={classNames({ 'w-dropdown': true, [`${className}`]: !!className })}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
      }}
      aria-hidden="true"
      ref={ref}
    >
      {children}
    </div>
  );
});

export default DropdownComponent;
