import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getOneSpot } from '../../store/spots';

function IndivSpot() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const spotDetail = useSelector(state => state.spots.allSpots[id])

    useEffect(() => {
        dispatch(getOneSpot(+id))
    }, [dispatch, id])

    return (
        <div>
             It's working!!!
        </div>
    )
}

export default IndivSpot;
