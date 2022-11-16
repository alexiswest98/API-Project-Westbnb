import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentSpotsThunk } from "../../store/spots";

function GetCurrentSpotForm() {
    const dispatch = useDispatch();

    const spotsObject = Object.values(useSelector(state => state.spots));

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
    }, [dispatch])

    return (

    )
}

export default GetCurrentSpotForm;
