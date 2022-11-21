import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddReview from './addReview';


function AddReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button class="custom-btn btn-6"
      onClick={() => setShowModal(true)}>Add a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddReview setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddReviewModal;
