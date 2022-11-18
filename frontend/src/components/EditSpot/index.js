import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from './editSpotForm';

function EditSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <EditSpotForm spot={spot} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
