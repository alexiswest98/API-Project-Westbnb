import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteReviewForm from './deleteReviewForm';
import "./deleteReview.css";
import "../addReview/addReview.css"


function DeleteReviewModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button class="delete-button"
      onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteReviewModal;
