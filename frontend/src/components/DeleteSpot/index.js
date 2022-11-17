import { useState, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneSpotThunk } from "../../store/spots";
import "./deleteSpot.css";

function DeleteASpotForm(){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUsername = useSelector(state => state.session.username);
    const [verif, setVerif] = useState("");
    const [validationError, setValidationError] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (verif.toString() !== `I ${sessionUsername} want to delete this spot`) setValidationError("Please copy the sentence exactly to delete.");
    }, [verif]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validationError) return alert(`Cannot Delete Spot`);
        setHasSubmitted(true);

        // await dispatch(deleteOneSpotThunk(?spot))
        //history.push('/spots/current')
        //return alert("Successfully deleted");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Please type the following exactly to delete the spot...</h2>
                <div>
                    <label htmlFor="verification">I (your username) want to delete this spot</label>
                    <input
                        id="verification"
                        type="text"
                        onChange={(e) => setVerif(e.target.value)}
                        value={verif}
                    />
                </div>
                <button>Delete Permanetly</button>
            </form>
            {hasSubmitted && validationError  && (
                <div>
                    <h2>{validationError}</h2>
                </div>
            )}
        </div>
    )
}


export default DeleteASpotForm;
