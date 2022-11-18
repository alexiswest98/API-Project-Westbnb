import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneSpotThunk } from "../../store/spots";
import { getCurrentSpotsThunk } from "../../store/spots";
import "./deleteSpot.css";

function DeleteASpotForm({spot}){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserName = useSelector((state) => state.session.user.username);
    const [verif, setVerif] = useState("");
    // const [validationError, setValidationError] = useState("");
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(getCurrentSpotsThunk())
    }, [dispatch]);

    const deleteFunc = async (e) => {
        e.preventDefault();
        // if (validationError.length) return alert(`Cannot Delete Spot`);
        const deleteSent = await dispatch(deleteOneSpotThunk(spot));

        if(deleteSent){
            history.push('/spots/current')
        }
    }

    return (
            <button onClick={deleteFunc}> Delete Spot
            </button>
    )
}


export default DeleteASpotForm;
