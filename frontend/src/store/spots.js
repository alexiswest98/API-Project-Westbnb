import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_ALL_SPOTS = 'spots/getAllSpots';
const GET_ONE_SPOT = 'spot/getOneSpot';
const ADD_A_SPOT = "spots/addSpot";
const DELETE_A_SPOT = 'spot/deleteSpot';
// const RESET_STATE = 'spot/clearState' do i need this?

/* ----- ACTIONS ------ */
const getSpots = (spots) => {
    type: GET_ALL_SPOTS,
    spots
};

const getASpot = (spotId) => {
    type: GET_ONE_SPOT,
    spotId
};


const addSpot = (spot) => {
    type: ADD_A_SPOT,
    spot
};

const deleteSpot = (spotId) => {
    type: DELETE_A_SPOT,
    spotId
};

/* ------ THUNKS ------ */
export const getAllSpot = () => async dispatch => {
    const spots = await csrfFetch(`api/spots`);

    if(spots.ok){
        const response = await spots.json();
        dispatch(getSpots(response));
    }
};

export const getOneSpot = (spotId) => async dispatch => {
    const spot = await csrfFetch(`api/spots/${spotId}`);

    if(spot.ok){
        const response = await spot.json();
        await dispatch(getASpot(response));
    }
};

export const addOneSpot = (spot) => async dispatch => {
    const newSpot = await csrfFetch(`api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if(newSpot.ok){
        const response = await newSpot.json();
        dispatch(addSpot(response));
        return response;
    }
};

export const editOneSpot = (spot) => async dispatch => {
    const editSpot = await csrfFetch(`api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if(editSpot.ok){
        const response = await editSpot.json();
        dispatch(addOneSpot(response));
        return response;
    }
};

export const deleteOneSpot = (spot) => async dispatch => {
    const deleteSpot = await csrfFetch(`apit/spots/${spot.id}`, {
        method: 'DELETE'
    });

    if(deleteSpot.ok){
        getAllSpot();
    }
};

export const addImagetoSpot = (spot) => async dispatch => {
    const {url, spotId} = spot
    const image = await csrfFetch(`api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url,
            preview: true
        })
    });

    if(image.ok){
        getOneSpot(spotId)
        //may need dispatch before calling it 
    }
};


/* ------ REDUCER ------ */
