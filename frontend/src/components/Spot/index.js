import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';
import "./indivSpot.css";
import none from './no-image.jpg';
import GetReviewsBox from '../getReviews/getSpotReviews';
import AddReviewModal from '../addReview';
import { getAllReviewsThunk } from '../../store/reviews';
import BookingsForm from '../Bookings/bookings';

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
        dispatch(getAllReviewsThunk(+id))
    }, [dispatch, id])

    function getStars(number) {
        if(number.toString().length > 3) return number;
        if(number.toString().length === 3) return number + '0';
        if(number.toString().length === 1) return number + '.00';
    }

    if (!spot || !spot.SpotImages) return null;

    return (
        <div className="mostOuterIndiv">
            <div className='wholeIndivBox'>
                <div className='indiv-information'>
                    <h1 className='indivSpot-name'>{spot.name}</h1>
                    <div className='indiv-spot-sub-info'>
                        <h3 className='adding-margin'>★ {getStars(spot.avgStarRating)} · {spot.numReviews} {spot.numReviews === 1 ? ("review") : ("reviews")} </h3>
                        <span className='adding-margin'>· ✪ Superhost ·</span>
                        <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                    </div>
                </div>
                <div className="spotImageDiv">
                    <div className='main-image-div'>
                        <img className="mainImage" src={spot.SpotImages[0]?.url || none} alt={spot.name}></img>
                    </div>
                    <div className="subImageBox">
                        <img className="subImage" src={spot.SpotImages[1]?.url || none} alt={spot.name}></img>
                        <img className="subImage" id='subImage-top-right' src={spot.SpotImages[2]?.url || none} alt={spot.name}></img>
                        <img className="subImage" src={spot.SpotImages[3]?.url || none} alt={spot.name}></img>
                        <img className="subImage" id='subImage-bottom-right' src={spot.SpotImages[4]?.url || none} alt={spot.name}></img>
                    </div>
                </div>
                <div className='indiv-spot-details-div'>
                    <div className='just-need-width'>
                        <div className='indiv-spot-left'>
                            <h3 className='entire-home'>Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                            <p className='spot-description-indiv'>{spot.description}</p>
                        </div>
                        <div className='boiler-plate-details'>
                            <div className='boiler-plate-height' id='boiler-top-border'>
                                <div className='lil-icon'>
                                    <i className="fa-solid fa-door-open"></i>
                                </div>
                                <div className='boiler-deets'>
                                    <h4 className='boiler-title'>Self Check-in</h4>
                                    <p className='boiler-sub'>Check yourself in with the keypad.</p>
                                </div>
                            </div>
                            <div className='boiler-plate-height'>
                                <div className='lil-icon'>
                                    <i class="fa-solid fa-medal"></i>
                                </div>
                                <div className='boiler-deets'>
                                    <h4 className='boiler-title'>{spot.Owner.firstName} {spot.Owner.lastName} is a Superhost</h4>
                                    <p className='boiler-sub'>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                                </div>
                            </div>
                            <div className='boiler-plate-height' id="boiler-bottom-border">
                                <div className='lil-icon'>
                                    <i class="fa-solid fa-location-dot"></i>
                                </div>
                                <div className='boiler-deets'>
                                    <h4 className='boiler-title'>Great location</h4>
                                    <p className='boiler-sub'>100% of recent guests gave the location a 5-star rating.</p>
                                </div>
                            </div>
                        </div>
                        <div className='aircover'>
                            <img className='aircover-img' src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt="aircover logo"></img>
                            <p className='boiler-sub'>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                        </div>
                    </div>
                    <BookingsForm spot={spot} isOwner={isOwner}></BookingsForm>
                </div>
                <div className="reviewBox">
                    <div className="reviewsLeftBox">
                        <div className='review-title-flex'>
                        <h2>Reviews</h2>
                        <p>★ {getStars(spot.avgStarRating)} · {spot.numReviews} {spot.numReviews === 1 ? ("review") : ("reviews")}</p>
                        </div>
                        <GetReviewsBox className="currReviewBox" />
                    </div>
                    <div className="reviewsRightBox">
                        <h2 className='would-you-review'>Would you like to review this Spot?</h2>
                        {user && !reviewExists && !isOwner ? (
                            <AddReviewModal />) :
                            (<h4>Sorry you can't add a review at this moment.</h4>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndivSpot;
