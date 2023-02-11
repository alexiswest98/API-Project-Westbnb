import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserBookingsThunk } from "../../store/bookings";
import { deleteBookingThunk } from "../../store/bookings";
import "./myBookings.css"

export default function MyBookings() {
    const dispatch = useDispatch();
    const path = window.location.pathname;
    const user = Object.values(useSelector(state => state.session.user))
    const bookingRes = Object.values(useSelector(state => state.bookings))
    const myBookings = bookingRes.filter(booking => booking.userId === user.id)
    // console.log(myBookings)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
        if(path !== "/my-results/:search") {
            const inputSearch = document.getElementById("right")
            inputSearch.value = '';
          }
    }, [dispatch])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function diffInDays(date1, date2) {
        const dateEnd = new Date(date1);
        const dateStart = new Date(date2);
        const diff = Math.abs(dateEnd - dateStart);
        return diff / (24 * 60 * 60 * 1000);
    }

    return (
        <div className="whole-outer-my-bookings">
            <h1 className="my-trips-title">My Trips</h1>
            <div className="whole-res-container">
                {bookingRes.map(res => (
                    <div className="whole-outer-indiv-booking">
                        <NavLink to={`/spots/${res.spotId}`} className="indiv-my-res-container">
                            <img src={`${res.Spot?.previewImage}`} alt="home reservation" className="res-prev-img"></img>
                            <div className="res-text">
                                <h1>{res.Spot?.city}, {res.Spot?.state}</h1>
                                <h3>{formatDate(res.startDate)} - {formatDate(res.endDate)}</h3>
                                <h3>{diffInDays(res.endDate, res.startDate)} days total</h3>
                            </div>
                        </NavLink>
                        <div className="delete-booking-container">
                            <button className="delete-button" onClick={() => {dispatch(deleteBookingThunk(res.id))}}>Delete Booking</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
