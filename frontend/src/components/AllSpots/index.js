import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpot } from "../../store/spots";
import "./allSpots.css"

function MainPage() {
    const dispatch = useDispatch();

    const spotsObject = Object.values(useSelector(state => state.spots));

    useEffect(() => {
        dispatch(getAllSpot())
    }, [dispatch])

    return (
        <div className="wholeSpotBox">
            {spotsObject.map(spot => (
                <div className='indivBox'>
                <NavLink to={`/spots/${spot.id}`}>
                    <div>
                    <img className="imgDiv" src={`${spot.previewImage}`} alt={spot.name}></img>
                    </div>
                    <div>
                    <h3>{spot.name}</h3>
                    <h3>★{spot.avgRating}.00</h3>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} night</p>
                    </div>
                </NavLink>
                </div>
            ))}

        </div>
    )
}

export default MainPage;
