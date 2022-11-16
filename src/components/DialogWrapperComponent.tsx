import React from 'react';
import { observer } from 'mobx-react-lite';
import useStore from 'hooks/util/useStore';

import 'style/dialog/Dialog.scss';
import { DialogId, DialogInfo } from 'store/ui/dialog/DialogTypes';

const DialogWrapperComponent = (): JSX.Element => {
  const { documentStore } = useStore();
  const dialogContainer = documentStore.getUIContainer().getDialogContainer();
  const dialogComponentMap = dialogContainer.getDialogComponentMap();
  const showingDialogInfoList = dialogContainer.getShowingDialogInfoList();

  const setSelectedDialog = (dialogInfo: DialogInfo) => {
    dialogContainer.setSelectedDialog(dialogInfo);
  };

  const renderDialog = () => {
    return showingDialogInfoList.map(dialogInfo => {
      const { dialogId } = dialogInfo;
      const TargetDialogComponent = dialogComponentMap[dialogId as DialogId];
      if (TargetDialogComponent === undefined) {
        console.error(`Dialog Component for ${dialogId} is undefined`);

        return <></>;
      }

      return (
        // dialog common element
        <div
          className="pk-office-a-dialog-container"
          role="dialog"
          aria-hidden="true"
          onMouseDown={() => setSelectedDialog(dialogInfo)}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TargetDialogComponent {...dialogInfo} key={dialogId} />
        </div>
      );
    });
  };

  return <>{renderDialog()}</>;
};

export default observer(DialogWrapperComponent);
