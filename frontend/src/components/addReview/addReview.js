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
        if (!review) errors.push("Review is required");
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
                <div> Required Fields
                    <ul>
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h2>Let's add a review...</h2>
                <div>
                    <label htmlFor="review">Review:</label>
                    <input
                        id="review"
                        type="text"
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    />
                </div>
                <div>
                    <label htmlFor="stars">Stars:</label>
                    <select
                        name="stars"
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                    >
                        <option value="" disabled></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <button type="submit">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
};

export default AddReview;
