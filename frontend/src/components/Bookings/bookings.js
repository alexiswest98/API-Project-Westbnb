import React, { useEffect } from "react";
import { useState } from "react";
// import { useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import "./bookings.css";

export default function BookingsForm({ spot, isOwner }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [checkOutMin, setCheckOutMin] = useState('');
    const [guests, setGuests] = useState('');

    function getStars(number) {
        if (number.toString().length > 3) return number;
        if (number.toString().length === 3) return number + '0';
        if (number.toString().length === 1) return number + '.00';
    }

    function nextDay(checkIn) {
        const checkInDate = new Date(checkIn);
        const nextDay = new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000);
        return nextDay.toISOString().split("T")[0];
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            checkIn,
            checkOut
        };

        console.log(payload)

        // const newBooking = await dispatch(createBooking(payload, thisSpot, user));
        // const spots = await dispatch(getSpots());
        // console.log(spots.Spots[id]);
        // if (newReview) history.push(`/spots/${id}`);
    };

    // useEffect(() => {
    //     dispatch(getCurrentSpotsThunk());
    // }, [dispatch])

    return ( !isOwner &&
        <div className="bookings-outer-container">
            <div className="bookings-div">
                <div className="top-booking-details">
                    <div className="price-per-night-book">
                        <h3 className="spot-price-booking">${spot.price} </h3>
                        <span className="night-margin">night</span>
                    </div>
                    <div className="rating-star-book">
                        <h4>★ {getStars(spot.avgStarRating)} · </h4>
                        <span className="night-margin">{spot.numReviews} {spot.numReviews === 1 ? ("review") : ("reviews")}</span>
                    </div>
                </div>
                <div className="reserve-booking-container">
                    <form className='reservation-form' onSubmit={handleSubmit}>
                        <div className="outer-border-booking-form">
                            <div className='check-in-check-out'>
                                <div className='check-in-dropdown'>
                                    <span className="check-in-margin">CHECK-IN</span>
                                    <input
                                        className='date'
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => {
                                            setCheckIn(e.target.value)
                                            setCheckOutMin(nextDay(e.target.value))
                                        }}
                                        required
                                        min={new Date().toISOString().split("T")[0]}
                                    />
                                </div>
                                <div className='check-out-dropdown'>
                                    <span className="check-in-margin">CHECKOUT</span>
                                    <input
                                        className='date'
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        min={checkOutMin}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="guests-container">
                                <span className="guests-margin">GUESTS</span>
                                <input
                                    className="guests-dropdown"
                                    type="number"
                                    min='1'
                                    max='6'
                                    placeholder="Guests"
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button className='reserve' type="submit">Reserve</button>
                    </form>
                </div>
                <div className="reservation-deets-container">
                    <p className='charged'>You won't be charged yet</p>
                    <div className='costs'>
                        <a className='plain-link-gray'>${spot.price}</a>
                        <span className="prices-num-booking">${spot.price}</span>
                    </div>
                    <div className='costs'>
                        <a className='plain-link-gray'>Cleaning fee</a>
                        <span className="prices-num-booking">${spot.price * 0.2}</span>
                    </div>
                    <div className='costs'>
                        <a className='plain-link-gray'>Service fee</a>
                        <span className="prices-num-booking">${spot.price * 0.3}</span>
                    </div>
                    <span className='line2'></span>
                </div>
                <div className="total-container">
                    <h4>Total Before Taxes</h4>
                    <h4>${(spot.price * 0.3) + (spot.price * 0.2) + spot.price}</h4>
                </div>
            </div>
        </div>
    )

}
