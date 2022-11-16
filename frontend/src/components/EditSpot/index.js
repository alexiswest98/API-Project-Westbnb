import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneSpotThunk } from "../../store/spots";
import "./editSpot.css";

function EditSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // const spotsObject = Object.values(useSelector(state => state.spots));

    useEffect(() => {
        const errors = [];
        if (name.length > 50) errors.push("Name must be less than 50 characters");
        if (typeof price !== 'number') errors.push("Please enter a valid number");
        setValidationErrors(errors);
    }, [name, price]);

    const onSubmit = async (e) => {
        // Prevent the default form behavior so the page doesn't reload.
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Update Spot`);

        // Create a new object for the contact us information.
        const updatedSpot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        };

        //input data in state
        const updateSpot = await dispatch(addOneSpotThunk(updatedSpot));
        // console.log(createSpot)

        //after submitting the form
        history.push(`/spots/${updateSpot.id}`)

    };

    return (
        <div >
            <form onSubmit={onSubmit} >
                <h2>Please fill out the fields you would like to update ...</h2>
                <h4>You may leave out the fields you wish to keep the same.</h4>
                <div>
                    <label htmlFor="name">Updated Name:</label>
                    <input
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="city">Updated City:</label>
                    <input
                        id="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="state">Updated State:</label>
                    <input
                        id="state"
                        name="state"
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
                    <select
                        name="country"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country} >
                        <option value="" disabled>
                            Select a Country...
                        </option>
                        <option>USA</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Spain</option>
                        <option>Italy</option>
                        <option>Thailand</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="address">Updated Address:</label>
                    <input
                        id="address"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                    />
                </div>
                <div>
                    <label htmlFor="description">Updated Description:</label>
                    <input
                        id="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div>
                    <label htmlFor="price">Updated Price:</label>
                    <input
                        id="price"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <button className="sub-button">
                    <span>Submit the Updates</span>
                </button>
            </form>
            {/* to see errors printed at bottom */}
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    Please fix these inputs:
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EditSpotForm;
