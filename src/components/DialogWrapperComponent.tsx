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
    
  return <></>;
};

export default observer(DialogWrapperComponent);
