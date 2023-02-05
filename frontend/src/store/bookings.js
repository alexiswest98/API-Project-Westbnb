import { csrfFetch } from "./csrf";

/* ----- TYPES ------ */
const GET_SPOT_BOOKINGS = 'bookings/getSpotBookings';
const GET_USER_BOOKINGS = 'bookings/getUserBookings';
const ADD_BOOKING = 'bookings/addBooking'
const DELETE_BOOKING = 'bookings/deleteBooking'

/* ----- ACTIONS ------ */
export const getSpotBookingsAction = (bookings) => {
    return {
        type: GET_SPOT_BOOKINGS,
        bookings
    };
};

export const getUserBookingsAction = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}

export const addSpotBookingAction = (booking) => {
    return {
        type: ADD_BOOKING,
        booking
    }
}

export const deleteSpotBookingAction = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}

/* ------ THUNKS ------ */
export const getSpotBookingsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(getSpotBookingsAction(bookings));
        return bookings;
    };
};

export const getUserBookingsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const bookings = await response.json();
        dispatch(getUserBookingsAction(bookings));
        return bookings;
    }
}

export const addBookingThunk = (booking, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    if(response.ok) {
        const newBooking = await response.json();
        dispatch(addSpotBookingAction(newBooking))
        return newBooking;
    }
}

export const deleteBookingThunk = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if(response.ok) {
        const deleteBooking = await response.json();
        dispatch(deleteSpotBookingAction(bookingId))
    }
}


/*-------IINITIAL STATE-------*/
const initialState = {};

/* ------ REDUCER ------ */
const bookingsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_SPOT_BOOKINGS:
            action.bookings.Bookings.forEach(booking => {
                newState[booking.id] = booking
            });
            return newState;
        case GET_USER_BOOKINGS:
            action.bookings.Bookings.forEach(booking => {
                newState[booking.id] = booking
            })
            return newState;
        case ADD_BOOKING:
            newState[action.booking.id] = action.booking
            return newState;
        case DELETE_BOOKING:
            delete newState[action.bookingId]
            return newState;
        default:
            return state;
    };
};

export default bookingsReducer;
