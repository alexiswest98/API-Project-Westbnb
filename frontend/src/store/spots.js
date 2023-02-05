import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_ONE_SPOT = 'spot/getOneSpot';
const ADD_A_SPOT = "spots/addSpot";
const EDIT_A_SPOT = "spots/editSpot";
const GET_CURR_SPOTS = "spots/getMySpots"
const DELETE_A_SPOT = 'spot/deleteSpot';

    //related to Images
const ADD_SPOT_IMAGE = 'spot/addImage';
const DELETE_SPOT_IMAGE = 'spotImages/deleteSpotImage'

/* ----- ACTIONS ------ */
const getSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
};


const getSpotAction = (spot) => {
    return {
        type: GET_ONE_SPOT,
        spot
    }
};

const getCurrentSpotsAction = (spots) => {
    return {
        type: GET_CURR_SPOTS,
        spots
    }
};


const addSpotAction = (spot) => {
    return {
        type: ADD_A_SPOT,
        spot
    }
};

const editSpotAction = (spot) => {
    return {
        type: EDIT_A_SPOT,
        spot
    }
};

const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_A_SPOT,
        spotId
    }
};

const addSpotImageAction = (img) => {
    return {
        type: ADD_SPOT_IMAGE,
        img
    }
};

const deleteSpotImageAction = (spotImageId) => {
    return {
        type: DELETE_SPOT_IMAGE,
        spotImageId
    }
};


/* ------ THUNKS ------ */
export const getAllSpotThunk = () => async dispatch => {
    const spots = await fetch(`/api/spots`);

    if (spots.ok) {
        const response = await spots.json();
        await dispatch(getSpotsAction(response.Spots));
    }
};

export const getOneSpotThunk = (spotId) => async dispatch => {
    const spot = await fetch(`/api/spots/${spotId}`);

    if (spot.ok) {
        const response = await spot.json();
        await dispatch(getSpotAction(response));
        return response;
    }
};

export const addOneSpotThunk = (spot) => async dispatch => {
    const newSpot = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (newSpot.ok) {
        const response = await newSpot.json();
        await dispatch(addSpotAction(response));
        return response;
    }
};

export const editOneSpotThunk = (spot) => async dispatch => {
    const editSpot = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (editSpot.ok) {
        const response = await editSpot.json();
        await dispatch(editSpotAction(response));
        return response;
    }
};

export const deleteOneSpotThunk = (spotId) => async dispatch => {
    // console.log("delete one spot thunk running", spotId)
    const deleteSpot = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    // console.log("after fetch this is the deleted spot", deleteSpot)

    if (deleteSpot.ok) {
        // console.log("in the if block")
        const response = await deleteSpot.json();
        // console.log("this is the response", response)
        await dispatch(deleteSpotAction(spotId));
    }
};

export const getCurrentSpotsThunk = () => async dispatch => {
    const currSpots = await csrfFetch(`/api/spots/current`);

    if (currSpots.ok) {
        const response = await currSpots.json();
        await dispatch(getCurrentSpotsAction(response.Spots));
        return response;
    }

};

export const addImagetoSpotThunk = (spot, img) => async dispatch => {
    const image = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(img)
    });

    if (image.ok) {
        const response = await image.json();
        dispatch(addSpotImageAction(img))
        return response;
    }
};

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
const spotsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_ALL_SPOTS:
            newState = { ...state }
            action.spots.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;
        case GET_ONE_SPOT:
            newState = { ...state }
            newState[action.spot.id] = { ...newState[action.spot.id], ...action.spot }
            return newState;
        case ADD_A_SPOT:
            newState = { ...state }
            newState[action.spot.id] = action.spot
            return newState;
        case EDIT_A_SPOT:
            newState={...state}
            newState[action.spot.id] = { ...newState[action.spot.id], ...action.spot };
            return newState;
        case GET_CURR_SPOTS:
            newState = { ...state }
            action.spots.forEach(spot => {
                newState[spot.id] = { ...newState[spot.id], ...spot };
            });
            return newState;
        case DELETE_A_SPOT:
            // console.log('Delete a spot case running', action)
            // console.log('this is action.spotId', action.spotId)
            newState = { ...state }
            delete newState[action.spotId];
            return newState;
        // case ADD_SPOT_IMAGE:
        //     newState = {...state}
        //     newState[action.spot.id].SpotImages.push(action.img)
        //     return newState;
        default:
            return state;
    }
}

export default spotsReducer;
