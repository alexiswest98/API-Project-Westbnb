import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './editSpotForm';

function EditSpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
