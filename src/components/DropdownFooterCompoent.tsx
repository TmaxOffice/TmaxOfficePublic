import React from 'react';
import classNames from 'classnames';
import 'style/widgets/DropdownFooter.scss';

export interface DropdownFooterType {
  type: string;
  buttons: React.ReactNode | React.ReactNodeArray;
}
interface DropdownFooterProps {
  footer: DropdownFooterType;
}

function DropdownFooter({ footer }: DropdownFooterProps): JSX.Element {
  return (
    <div
      className={classNames({
        'w-dropdown-footer': true,
        [`type-w-dropdown-footer--${footer.type}`]: footer.type,
      })}
    >
      {footer.buttons}
    </div>
  );
}

export default React.memo(DropdownFooter);
