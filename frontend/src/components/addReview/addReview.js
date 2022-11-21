import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addReviewThunk } from "../../store/reviews";
import { getOneSpotThunk } from "../../store/spots";
import "./addReview.css";

function AddReview({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(1);
    const { id } = useParams();

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!review) errors.push("Review is required.");
        if(review.length > 255) errors.push("Review must be under 255 characters.")
        if(!stars) errors.push("Stars are required")
        setErrors(errors);
    }, [dispatch, review, stars, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (errors.length) return alert(`Cannot Add Review`);

        const newReview = {
            review,
            stars
        }
        
        await dispatch(addReviewThunk(id, newReview)) 
        setShowModal(false)

        dispatch(getOneSpotThunk(id))
        history.push(`/spots/${id}`)

    };

    return (
        <div className="addReviewModal">
            {errors.length > 0 && (
                <div className="validation-errors">
                    <h4 className="validation-errors-title">Required Fields</h4>
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit} className="add-review-form">
                <h2 className="lets-add-title">Let's add a review...</h2>
                <div>
                    <label htmlFor="review">Review: </label>
                    <input
                        id="review"
                        type="text"
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                        className="enter-review-text"
                    />
                </div>
                <div>
                    <label htmlFor="stars">Stars: </label>
                    <select
                        name="stars"
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                        className="star-input"
                    >
                        <option value="" disabled></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button type="submit" class="custom-btn btn-6">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
};

export default AddReview;
