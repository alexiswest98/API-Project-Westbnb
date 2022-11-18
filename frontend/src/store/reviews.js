import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_ALL_REVIEWS = 'reviews/getAllreviews';
const ADD_IMAGE_REVIEW = 'reviews/getAllreviews';
const ADD_A_REVIEW = "review/addSpot";
const DELETE_A_REVIEW = 'spot/deleteSpot';

/* ----- ACTIONS ------ */

const getReviewsAction = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
};

const addReviewAction = (review) => {
    return {
        type: ADD_A_REVIEW,
        review
    }
};

const deleteReviewAction = (review) => {
    return {
        type: DELETE_A_REVIEW,
        review
    }
};

const addImageReviewAction = (reviewImage) => {
    return {
        type: ADD_IMAGE_REVIEW,
        reviewImage
    }
};

/* ------ THUNKS ------ */
export const getAllReviewsThunk = (spotId) => async dispatch => {
    const reviews = await fetch(`/api/spots/${spotId}/reviews`);

    if(reviews.ok){
        const response = await reviews.json();
        await dispatch(getReviewsAction(response))
    }
};

export const addReviewThunk = (spot) => async dispatch => {
    const newReview = await csrfFetch(`/api/spots/${spot.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if(newReview.ok) {
        const response = await newReview.json();
        await dispatch(addReviewAction(response));
        return response;
    }
};

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const deleteReview = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if(deleteReview.ok){
        const response = await deleteReview.json();
        await dispatch(deleteReviewAction(response))
        return response;
    }
};

export const addImageReviewThunk = (reviewId) => async dispatch => {
    const reviewImage = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url
        })
    });

    if(reviewImage.ok){
        const response = await reviewImage.json();
        await dispatch(addImageReviewAction(response));
        return response;
    }

};


/*-------IINITIAL STATE-------*/
const initialState = {};

/* ------ REDUCER ------ */

const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type){
        case GET_ALL_REVIEWS:
    }
}
