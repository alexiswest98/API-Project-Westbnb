import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentSpotsThunk } from "../../store/spots";
import "./currSpots.css"

function CurrSpotsPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spotsObject = Object.values(useSelector(state => state.spots));

    useEffect(() => {
        dispatch(editOne())
    }, [dispatch]);

    return (
        <div>
            {spotsObject.map(spot => (
                <div >
                <NavLink to={`/spots/${spot.id}`} >
                    <img className="imgDiv" src={`${spot.previewImage}`} alt={spot.name}></img>
                    <h3>{spot.name}</h3>
                    <h3>★{spot.avgRating}</h3>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} night</p>
                </NavLink>
                </div>
            ))}

        </div>
    )
}

export default CurrSpotsPage;
