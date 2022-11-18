import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddSpotImage from './addSpotImage';


function AddSpotImageModal({spot}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add an Image to Spot</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSpotImage spot={spot} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddSpotImageModal;
