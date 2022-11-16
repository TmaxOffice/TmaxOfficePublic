import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import DialogTitle, { DialogTitleType } from 'components/dialog/dialogmenu/DialogTitleComponent';
import DialogContents, {
  DialogContentsType,
} from 'components/dialog/dialogmenu/DialogContentsComponent';
import DialogFooter, { DialogFooterType } from 'components/dialog/dialogmenu/DialogFooterComponent';
import useDialog from 'hooks/dialog/useDialog';
import useStore from 'hooks/util/useStore';
import useShortcut from 'hooks/shortcut/useShortcut';

interface DialogProps {
  className: string;
  title: DialogTitleType;
  contents: DialogContentsType;
  footer: DialogFooterType;
  isBackDrop?: boolean;
  isDraggable?: boolean;
  closeFocusTargetElement?: HTMLElement;
  onCloseIconClick?: () => void;
}

const DialogComponent = ({
  className,
  title,
  contents,
  footer,
  isBackDrop = true,
  isDraggable,
  closeFocusTargetElement,
  onCloseIconClick,
}: DialogProps): JSX.Element => {
  const { dialogRef, dragPointerRef, focusDialog, handleDragStart } = useDialog({
    isBackDrop,
    isDraggable,
    closeFocusTargetElement,
  });

  
  return (
    <>
    
    </>
  );
};

export default observer(DialogComponent);


