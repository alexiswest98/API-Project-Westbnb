import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import {deleteReviewThunk} from "../../store/reviews";

function DeleteReviewForm({setShowModal, review}){
    const { id } = useParams();
    const spot = useSelector(state => state.spots[+id])
    const dispatch = useDispatch();
    const history = useHistory();
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const deleteFunc = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        await dispatch(deleteReviewThunk(review.id)).then(() => setShowModal(false))

        dispatch(getAllReviewsThunk(+id))

    }

    return (
        <div>
            <h2>Are you sure you want to delete this review?</h2>
            <button onClick={deleteFunc}>Delete Review</button>
        </div>
    )
}

export default DeleteReviewForm;
