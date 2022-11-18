import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteASpotForm from './deleteSpot';

function DeleteSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteASpotForm spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default DeleteSpotModal;
