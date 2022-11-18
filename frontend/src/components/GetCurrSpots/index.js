import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useHistory } from "react-router-dom";
import { getCurrentSpotsThunk } from "../../store/spots";
import EditSpotModal from "../EditSpot";
import DeleteSpotModal from "../DeleteSpot";
import AddSpotImageModal from "../addSpotImage";
import "./currSpots.css"

function CurrSpotsPage() {
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id);
    const spotsObject = Object.values(useSelector(state => state.spots));
    const currSpotsArray = spotsObject.filter(spot => spot.ownerId === sessionUserId);


    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
    }, [dispatch]);

    return (
        <div className="wholeCurrBox">
            <h1>YOUR SPOTS AVAILABLE</h1>
            {/* {currSpotsArray.length && currSpotsArray.map(spot => (
                <div className='currIndivBox'>
                <NavLink to={`/spots/${spot.id}`} className="currBoxLink">
                    <img className="currImg" src={`${spot.previewImage}`} alt={spot.name}></img>
                    <h3>{spot.name}</h3>
                    <h3>★{spot.avgRating}</h3>
                    <p>{spot.city}, {spot.state}</p>
                    <p>${spot.price} night</p>
                </NavLink>
                <div className="currSpotButtons">
                <EditSpotModal spotId={spot.id}/>
                <button>Delete Spot</button>
                <button>Add an Image</button>
                </div>
                </div>
            ))} */}

            {currSpotsArray.length ? (currSpotsArray.map(spot => (
                <div className='currIndivBox'>
                    <NavLink to={`/spots/${spot.id}`} className="currBoxLink">
                        <img className="currImg" src={`${spot.previewImage}`} ></img>
                        <h3>{spot.name}</h3>
                        <h3>★{spot.avgRating}</h3>
                        <p>{spot.city}, {spot.state}, {spot.country}</p>
                        <p>${spot.price} night</p>
                    </NavLink>
                    <div className="currSpotButtons">
                        <EditSpotModal spot={spot} />
                        <DeleteSpotModal spot={spot}/>
                        <AddSpotImageModal spot={spot}/>
                    </div>
                </div>
            ))) :
                (<>
                    <h2>You don't have any spots</h2>
                    <h3>Considering becoming a host?</h3>
                    <Link to="/become-a-host">
                        <button>Click here!</button>
                    </Link>

                </>
                )}
        </div>
    )
}

export default CurrSpotsPage;
