import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';

function IndivSpot() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spot = useSelector(state => state.spots[+id])
    // console.log(spot)

    useEffect(() => {
        dispatch(getOneSpotThunk(+id))
    }, [dispatch, id])

    if(!spot || !spot.SpotImages ) return null;

    return (
        <div>
            <h2>{spot.name}</h2>
            <h3>★{spot.avgRating} ∘ {spot.numReviews} review ∘ ✪ Superhost  </h3>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <div className="spotImageDiv">
                <img src={spot.SpotImages[0]?.url} alt={spot.name}></img>
                import other images..
            </div>
            <h3>Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
            <hr></hr>
            <h3>{spot.Owner.firstName} {spot.Owner.lastName} is a Superhost</h3>
            <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
            <h3>Great location</h3>
            <p>100% of recent guests gave the location a 5-star rating.</p>
            <h3>Free cancellation before Nov 21.</h3>
            <hr></hr>
        </div>
    )
}

export default IndivSpot;
