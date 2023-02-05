import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getAllReviewsThunk } from "../../store/reviews";
import DeleteReviewModal from "../deleteReview";
import "./getSpotReview.css";

function GetReviewsBox() {
    const dispatch = useDispatch();
    // const sessionUserId = useSelector(state => state.session.user.id);
    const { id } = useParams();
    const spot = useSelector(state => state.spots[+id])
    const reviews = useSelector((state) => state.reviews);
    const user = useSelector(state => state.session.user)
    const reviewList = Object.values(reviews)
    // console.log("reviews", reviewList)

    function getStars(number) {
        if(number.toString().length > 3) return number;
        if(number.toString().length === 3) return number + '0';
        if(number.toString().length === 1) return number + '.00';
    }

    useEffect(() => {
        const newDispatch = dispatch(getAllReviewsThunk(+id))
    }, [dispatch, id])

    // console.log(reviewList)
    // if(!review || !review.User) return null;

    return reviewList && (
        <div className='wholeReviewBox'>
            {reviewList.length ? (reviewList.map(review => (
                <div className="currReviewDiv" key={`${review.id}`}>
                    <h3>{review.User?.firstName} {review.User?.lastName}</h3>
                    <h3>★{getStars(review?.stars)}</h3>
                    <h4>{review?.review}</h4>
                    <p>{review.createdAt.slice(0, 10)}</p>
                    {/* <p>{review.createdAt}</p> */}
                    {review.ReviewImages?.length > 0 && (
                    <div className="reviewImageBox">
                        <img className="reviewImage" src={review.ReviewImages[0]?.url} alt="reviewImage"></img>
                    </div>
                    )}
                { user && review && review?.userId === user?.id && (
                    <DeleteReviewModal review={review}/>)
                }
                </div>
            ))) :
                (<div>
                <h3>Awkward...</h3>
                <h2>This spot doesn't have reviews yet!</h2>
                </div>)}
        </div>

    )
};


export default GetReviewsBox;
