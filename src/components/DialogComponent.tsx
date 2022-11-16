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

  const { documentStore } = useStore();
  const shortcutContainer = documentStore.getShortcutContainer();
  const dialogShortcutMap = shortcutContainer.getDialogShortcutMap();
  const dialogShortcutHandlerMap = shortcutContainer.getDialogShortcutHandlerMap();
  const { shortcutHandler } = useShortcut(dialogShortcutMap, dialogShortcutHandlerMap);

  return (
    <>
      {isBackDrop && (
        <div className="pk-office-a-dialog-backdrop" aria-hidden onClick={focusDialog} />
      )}
      <div
        className={classNames({
          'pk-office-w-dialog': true,
          [`${className}`]: !!className,
        })}
        tabIndex={-1}
        ref={dialogRef}
        role="dialog"
        aria-hidden
        onKeyDown={e => {
          e.stopPropagation();
          shortcutHandler(e);
        }}
        onKeyUp={() => shortcutContainer.clearKeyList()}
      >
        <DialogTitle
          title={title}
          innerRef={dragPointerRef}
          onCloseIconClick={onCloseIconClick}
          onDragStart={handleDragStart}
        />
        <DialogContents contents={contents} />
        <DialogFooter footer={footer} />
      </div>
    </>
  );
};

export default observer(DialogComponent);

DialogComponent.defaultProps = {
  isBackDrop: true,
  isDraggable: true,
  closeFocusTargetElement: undefined,
  onCloseIconClick: undefined,
};
