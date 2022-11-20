import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllSpotThunk } from "../../store/spots";
import heart from './heart.png';
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
                    <div>
                    <img className="imgDiv" src={`${spot.previewImage}`} alt={spot.name}></img>
                    {/* <img src={heart}></img> */}
                    </div>
                    <div className="main-Details">
                    <div className="order-for-title">
                    <h4 className="main-spot-name">{spot.city}, {spot.state}</h4>
                    <h3>★{spot.avgRating}</h3>
                    </div>
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
