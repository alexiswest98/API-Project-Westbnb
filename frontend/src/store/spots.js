import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_ONE_SPOT = 'spot/getOneSpot';
const ADD_A_SPOT = "spots/addSpot";
const EDIT_A_SPOT = "spots/editSpot";
const GET_CURR_SPOTS = "spots/getMySpots"
const DELETE_A_SPOT = 'spot/deleteSpot';
const ADD_SPOT_IMAGE = 'spot/addImage';

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
        type: EDIT_A_SPOT,
        spot
    }
};

const editSpotAction = (spot) => {
    return {
        type: ADD_A_SPOT,
        spot
    }
};

const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_A_SPOT,
        spotId
    }
};

const addSpotImageAction = (image) => {
    return {
        type: ADD_SPOT_IMAGE,
        image
    }
};


/* ------ THUNKS ------ */
export const getAllSpotThunk = () => async dispatch => {
    const spots = await fetch(`/api/spots`);

    if (spots.ok) {
        const response = await spots.json();
        dispatch(getSpotsAction(response.Spots));
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
        dispatch(addSpotAction(response));
        return response;
    }
};

export const editOneSpotThunk = (spot) => async dispatch => {
    console.log(spot)
    const editSpot = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (editSpot.ok) {
        const response = await editSpot.json();
        dispatch(editSpotAction(response));
        return response;
    }
};

export const deleteOneSpotThunk = (spot) => async dispatch => {
    const deleteSpot = await csrfFetch(`api/spots/${spot.id}`, {
        method: 'DELETE'
    });

    if (deleteSpot.ok) {
        const response = await deleteSpot.json();
        dispatch(deleteSpotAction(response));
        return response;
    }
};

export const getCurrentSpotsThunk = () => async dispatch => {
    const currSpots = await csrfFetch(`/api/spots/current`);

    if (currSpots.ok) {
        const response = await currSpots.json();
        dispatch(getCurrentSpotsAction(response.Spots));
        return response;
    }

};

export const addImagetoSpotThunk = (spot) => async dispatch => {
    const { url, id } = spot
    const image = await csrfFetch(`api/spots/${id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            preview: true
        })
    });

    if (image.ok) {
        const response = await image.json();
        dispatch(addSpotImageAction(spot))
        return response;
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
                newState[spot.id] = spot
            });
            return newState;
        case DELETE_A_SPOT:
            newState = { ...state }
            delete newState[action.spot.id];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
