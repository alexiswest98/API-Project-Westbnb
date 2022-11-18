import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteOneSpotThunk } from "../../store/spots";
import { getAllSpotThunk } from "../../store/spots";
import "./deleteSpot.css";

function DeleteASpotForm({ spot, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [verif, setVerif] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const sampleVerif = `I ${sessionUser.firstName} ${sessionUser.lastName} wish to delete this spot.`;

    useEffect(() => {
        const errors = [];
        if (verif !== sampleVerif) errors.push("Inputs must match to delete");
        setErrors(errors);
    }, [dispatch, verif]);

    const deleteFunc = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (errors.length) return alert(`Cannot Delete Spot`);

        const deleteSent = await dispatch(deleteOneSpotThunk(spot.id)).then(() => setShowModal(false))

        dispatch(getAllSpotThunk())
        history.push('/')


    }

    return (
        <form onSubmit={deleteFunc} className="wholeDeleteModal">
            <div className="deleteInput">
                {setHasSubmitted && errors.length > 0 && <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <h2>Please copy and paste to delete</h2>
                <label htmlFor="verif">{`I ${sessionUser.firstName} ${sessionUser.lastName} wish to delete this spot.`}</label>
                <input
                    id="verif"
                    type="text"
                    onChange={(e) => setVerif(e.target.value)}
                    value={verif}
                />
                <button className="deleteButton">
                    <span>:(</span>
                    <span>Delete</span>
                </button>
            </div>
        </form>
    )
}


export default DeleteASpotForm;
