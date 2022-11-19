import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReviewForm from './deleteReviewForm';


function DeleteReviewModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteReviewModal;
