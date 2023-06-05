import React from 'react'
import { Modal, ModalContent } from 'semantic-ui-react'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite';

function ModalContainer() {
    const {modalStore}=useStore();
  return (
    <Modal onClose={modalStore.closeModal} open={modalStore.modal.open}>
        <ModalContent>
            {modalStore.modal.body}
        </ModalContent>
    </Modal>
  )
}

export default observer(ModalContainer)