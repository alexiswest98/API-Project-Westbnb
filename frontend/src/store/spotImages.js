import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const DELETE_SPOT_IMAGE = 'spotImages/deleteSpotImage'

/* ----- ACTIONS ------ */
const deleteSpotImageAction = (spotImageId) => {
    return {
        type: DELETE_SPOT_IMAGE,
        spotImageId
    }
};

/* ------ THUNKS ------ */

export const deleteSpotImageThunk = (spotImageId) => async dispatch => {
    const deletedSpotImage = await csrfFetch(`/api/spot-images/${spotImageId}`, {
        method: 'DELETE'
    });

    if (deletedSpotImage.ok) {
        const response = await deletedSpotImage.json();
        dispatch(deleteSpotImageAction(spotImageId));
    }
};

/*-------IINITIAL STATE-------*/
const initialState = {};

/* ------ REDUCER ------ */
