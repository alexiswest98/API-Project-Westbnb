import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAllSpotThunk } from "../../store/spots";
// import { logout } from "../../store/session";
import "../AllSpots/allSpots.css"
import './results.css'

function ResultPage() {
    const dispatch = useDispatch();
    const {search} = useParams();
    const searchQuery = search;

    const spotsUnfiltered = Object.values(useSelector(state => state.spots));
    const spotsObject = spotsUnfiltered.filter(spot => spot.city.toLowerCase() === searchQuery.toLowerCase() || spot.city.toLowerCase().startsWith(searchQuery.toLowerCase()))

    useEffect(() => {
        dispatch(getAllSpotThunk())
    }, [dispatch])


    // function getStars(number) {
    //     if (number.toString().length > 3) return number;
    //     if (number.toString().length === 3) return number + '0';
    //     if (number.toString().length === 1) return number + '.00';
    // }

    if(spotsObject.length === 0) return (<div className="no-results-div"><h1 className="no-results-title">No results available for that location at the moment.</h1></div>);

    return (
        <div className="wholeSpotBox">
            {spotsObject.map(spot => (
                <div className='indivBox'>
                    <NavLink to={`/spots/${spot.id}`} className="boxLink">
                        <img className="imgDiv" src={`${spot.previewImage}`} alt={spot.name}></img>
                        <div className="main-Details">
                            <div className="order-for-title">
                                <h4 className="main-spot-name">{spot.city}, {spot.state}</h4>
                                <h3 className="star-rating">★ {spot.avgRating}</h3>
                            </div>
                            <div>
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

export default ResultPage;
