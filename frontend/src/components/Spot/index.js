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

    return (
        <div>
             It's working!!!
        </div>
    )
}

export default IndivSpot;
