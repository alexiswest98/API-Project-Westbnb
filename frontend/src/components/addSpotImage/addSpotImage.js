import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addImagetoSpotThunk } from "../../store/spots";
import { getOneSpotThunk } from "../../store/spots";
import "./addSpotImage.css";

function AddSpotImage({ spot, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState(true);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!url) errors.push("Url is required");
        setErrors(errors);
    }, [dispatch, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        if (errors.length) return alert(`Cannot Add Image to Spot`);

        const newImage = {
            url,
            preview
        }

        const addImage = await dispatch(addImagetoSpotThunk(spot, newImage)).then(() => setShowModal(false))

        dispatch(getOneSpotThunk(spot.id))
        history.push(`/spots/${spot.id}`)

    }

    return (
        <div className="wholeDeleteModal">
            <form onSubmit={handleSubmit} className="deleteInput">
                {setHasSubmitted && errors.length > 0 && (
                    <div> 
                        <h4 className="validation-errors-title">Required Fields</h4>
                        <ul>
                            {errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <h1 className="add-img-spot">Let's Add a Photo</h1>
                <div>
                    <label htmlFor="url">Url: </label>
                    <input
                        id="url"
                        type="url"
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                    />
                </div>
                <button type="submit" class="custom-btn btn-6">
                    <span>Submit</span>
                </button>
            </form>
        </div>
    )
}

// {
//     "url": "image url",
//     "preview": true
//   }

export default AddSpotImage;
