import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotThunk } from "../../store/spots";
import "./allSpots.css"

function MainPage() {
    const dispatch = useDispatch();

    const spotsObject = Object.values(useSelector(state => state.spots));

    useEffect(() => {
        dispatch(getAllSpotThunk())
    }, [dispatch])

    return (
        <div className="wholeSpotBox">
            {spotsObject.map(spot => (
                <div className='indivBox'>
                <NavLink to={`/spots/${spot.id}`} className="boxLink">
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

export default MainPage;
