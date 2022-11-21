import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteASpotForm from './deleteSpot';

function DeleteSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button class="custom-btn btn-6"
      onClick={() => setShowModal(true)}>Delete Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteASpotForm spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSpotModal;
