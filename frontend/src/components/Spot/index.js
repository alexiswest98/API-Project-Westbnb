import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';
import "./indivSpot.css";
import none from './no-image.jpg';
import GetReviewsBox from '../getReviews/getSpotReviews';
import AddReviewModal from '../addReview';

function IndivSpot() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots[+id])
    const user = useSelector(state => state.session.user)
    // const userId = useSelector(state => state.session.user.id)
    const reviews = Object.values(useSelector(state => state.reviews))
    // console.log(spot)
    let reviewExists = reviews.find(review => review.userId === user?.id);

    let isOwner = spot?.ownerId === user?.id;

    useEffect(() => {
        dispatch(getOneSpotThunk(+id))
    }, [dispatch, id])

    if (!spot || !spot.SpotImages) return null;

    return (
        <div className="mostOuterIndiv">
            <div className='wholeIndivBox'>
                <h2>{spot.name}</h2>
                <h3>★{spot.avgRating} ∘ {spot.numReviews} {spot.numReviews <= 1 ? ("review") : ("reviews")} ∘ ✪ Superhost  </h3>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div className="spotImageDiv">
                    <img className="mainImage" src={spot.SpotImages[0]?.url || none} alt={spot.name}></img>
                    <div className="subImageBox">
                        <img className="subImage" src={spot.SpotImages[1]?.url || none} alt={spot.name}></img>
                        <img className="subImage" src={spot.SpotImages[2]?.url || none} alt={spot.name}></img>
                        <img className="subImage" src={spot.SpotImages[3]?.url || none} alt={spot.name}></img>
                        <img className="subImage" src={spot.SpotImages[4]?.url || none} alt={spot.name}></img>
                    </div>
                </div>
                <h3>Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                <h3>{spot.Owner.firstName} {spot.Owner.lastName} is a Superhost</h3>
                <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                <h3>Great location</h3>
                <p>100% of recent guests gave the location a 5-star rating.</p>
                <h3>Free cancellation before Nov 21.</h3>
                <div className="reviewBox">
                    <div className="reviewsLeftBox">
                        <h2>Reviews</h2>
                        <GetReviewsBox className="currReviewBox"/>
                    </div>
                    <div className="reviewsRightBox">
                    <h2>Would you like to review this Spot?</h2>
                    {user && !reviewExists && !isOwner ? (
                        <AddReviewModal/>) :
                        (<h4>Sorry you can't add a review at this moment.</h4>)
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndivSpot;
