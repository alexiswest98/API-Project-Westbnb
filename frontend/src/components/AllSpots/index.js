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
                    <div className="main-Details">
                    <div className="order-for-title">
                    <h4 className="main-spot-name">{spot.city}, {spot.state}</h4>
                    <h3 className="star-rating">★{spot.avgRating}</h3>
                    </div>
                    <div>
                    {/* <p>Added 4 weeks ago</p> */}
                    <p className="bottom-main-name">{spot.name}</p>
                    <p className="bottom-main-price">${spot.price} night</p>
                    </div>
                    </div>
                </NavLink>
                </div>
            ))}

        </div>
    )
}

export default MainPage;
