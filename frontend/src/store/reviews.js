import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_ALL_REVIEWS = 'reviews/getAllreviews';
// const ADD_IMAGE_REVIEW = 'reviews/getAllreviews';
const ADD_A_REVIEW = "review/addSpot";
const DELETE_A_REVIEW = 'spot/deleteSpot';

/* ----- ACTIONS ------ */

const getReviewsAction = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
};

const addReviewAction = (spotId, review) => {
    return {
        type: ADD_A_REVIEW,
        spotId, review
    }
};

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_A_REVIEW,
        reviewId
    }
};

// const addImageReviewAction = (reviewImage) => {
//     return {
//         type: ADD_IMAGE_REVIEW,
//         reviewImage
//     }
// };

/* ------ THUNKS ------ */
export const getAllReviewsThunk = (spotId) => async dispatch => {
    const reviews = await fetch(`/api/spots/${spotId}/reviews`);

    if (reviews.ok) {
        const response = await reviews.json();
        dispatch(getReviewsAction(response.Reviews))
        return response;
    }
};

export const addReviewThunk = (spotId, review) => async dispatch => {
    const newReview = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    if (newReview.ok) {
        const response = await newReview.json();
        await dispatch(addReviewAction(spotId, response));
        return response;
    }
};

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const deleteReview = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (deleteReview.ok) {
        const response = await deleteReview.json();
        await dispatch(deleteReviewAction(reviewId));
    }
};

// export const addImageReviewThunk = (reviewId) => async dispatch => {
//     const reviewImage = await csrfFetch(`/api/reviews/${reviewId}/images`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             url
//         })
//     });

//     if (reviewImage.ok) {
//         const response = await reviewImage.json();
//         await dispatch(addImageReviewAction(response));
//         return response;
//     }

// };


/*-------IINITIAL STATE-------*/
const initialState = {};

/* ------ REDUCER ------ */

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_REVIEWS:
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        case ADD_A_REVIEW:
            newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_A_REVIEW:
            newState = { ...state };
            delete newState[action.id];
            return newState;
        // case ADD_IMAGE_REVIEW:
        //     newState={...state}
        default:
            return state;
    }

}

export default reviewsReducer;
