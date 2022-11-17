import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentSpotsThunk } from "../../store/spots";
import EditSpotModal from "../EditSpot";
import "./currSpots.css"

function CurrSpotsPage(){
    const dispatch = useDispatch();
    // const sessionUserId = useSelector(state => state.session.user.id);
    const spotsObject = Object.values(useSelector(state => state.spots));
    // const userSpots = spotsObject.filter(spot => spot.ownerId === +sessionUserId);
    // console.log(userSpots)

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
    }, [dispatch]);

    return (
        <div className="wholeCurrBox">
            <h1>YOUR SPOTS AVAILABLE</h1>
            {spotsObject.map(spot => (
                <div className='currIndivBox'>
                <NavLink to={`/spots/${spot.id}`} className="currBoxLink">
                    <img className="currImg" src={`${spot.previewImage}`} alt={spot.name}></img>
                    <h3>{spot.name}</h3>
                    <h3>★{spot.avgRating}</h3>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} night</p>
                </NavLink>
                <div className="currSpotButtons">
                <EditSpotModal/>
                <button>Delete Spot</button>
                </div>
                </div>
            ))}

        </div>
    )
}

export default CurrSpotsPage;
