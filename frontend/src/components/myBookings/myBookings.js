import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserBookingsThunk } from "../../store/bookings";
import "./myBookings.css"

export default function MyBookings() {
    const dispatch = useDispatch();
    const bookingRes = Object.values(useSelector(state => state.bookings))

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])

    if(!bookingRes) return null;

    return (
        <div className="whole-outer-my-bookings">
            <h1 className="my-trips-title">My Trips</h1>
            <div>
                {bookingRes.map(res => (
                    <div>
                        <img src={res.Spot.previewImage} alt="home reservation"></img>
                        <h2>{res.Spot.city}, {res.Spot.state}</h2>
                    </div>
                ))}

            </div>
        </div>
    )
}
