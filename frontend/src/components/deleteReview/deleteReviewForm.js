import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllReviewsThunk } from "../../store/reviews";
import {deleteReviewThunk} from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import "./deleteReview.css";
import "../addReview/addReview.css"

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

        dispatch(getAllReviewsThunk(+id));
        dispatch(getOneSpotThunk(+id))
        // history.push(`/spots/${id}`);
    }

    return (
        <div className="delete-conf-modal">
            <div className="conf-delete-box">
            <h1 className="conf-delete-title">Are you sure you want to delete this review?</h1>
            <button class="delete-button"
            onClick={deleteFunc}>Confirm</button>
            </div>
        </div>
    )
}

export default DeleteReviewForm;
