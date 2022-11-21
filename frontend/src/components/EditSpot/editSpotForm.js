import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editOneSpotThunk } from "../../store/spots";
import "./editSpot.css";

function EditSpotForm({ spot, setShowModal }) {
    //tap into the specific spot 
    //set all these defaults to the spots info instead of null
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot.address || "");
    const [city, setCity] = useState(spot.city || "");
    const [state, setState] = useState(spot.state || "");
    const [country, setCountry] = useState(spot.country || "");
    const [name, setName] = useState(spot.name || "");
    const [description, setDescription] = useState(spot.description || "");
    const [price, setPrice] = useState(spot.price || "");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // useEffect(() => {
    // }, [address, city, state, country, name, description, price])

    useEffect(() => {
        const errors = [];
        if(!name) errors.push("Name is required");
        if (!address.length) errors.push("Street address is required");
        if (!city.length) errors.push("City is required");
        if (!state.length) errors.push("State is required");
        if (!country.length) errors.push("Country is required");
        if (name.length > 50) errors.push("Name must be less than 50 characters");
        if (!description.length) errors.push("Description is required");
        if (!price) errors.push("Price per day is required");
        if (isNaN(price) || price <= 0) errors.push("Please enter a valid number");
        setValidationErrors(errors);
    }, [address, city, state, country, name, description, price]);


    const onSubmit = async (e) => {
        // Prevent the default form behavior so the page doesn't reload.
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Cannot Submit`);

        // Create a new object.
        const updatedSpot = {
            id: spot.id,
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            previewImage: spot?.previewImage,
            lat: spot?.lat,
            lng: spot?.lng
        };
        
        //input data in state
        const newSpot = await dispatch(editOneSpotThunk(updatedSpot)).then(() => setShowModal(false))
        // console.log("After changes:", newSpot);

    };

    return (
        <div className="whole-edit-box">
            <form onSubmit={onSubmit} className="editSpotModal" >
                <h2 className="edit-form-title">Please fill out the fields you would like to update ...</h2>
                <h4 className="edit-form-inst">You may leave out the fields you wish to keep the same.</h4>
                <div>
                    <label htmlFor="name">Updated Name:</label>
                    <input className="input-edit-form"
                        id="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>
                <div>
                    <label htmlFor="city">Updated City:</label>
                    <input className="input-edit-form"
                        id="city"
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="state">Updated State:</label>
                    <input className="input-edit-form"
                        id="state"
                        name="state"
                        type="text"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                    />
                    <select className="input-edit-form-co"
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
                        id="address" className="input-edit-form"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}

                    />
                </div>
                <div>
                    <label htmlFor="description">Updated Description:</label>
                    <input className="input-edit-form"
                        id="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div>
                    <label htmlFor="price">Updated Price:</label>
                    <input className="input-edit-form"
                        id="price"
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                    />
                </div>
                <button class="custom-btn btn-6">
                    <span>Submit</span>
                </button>
            </form>
                {setHasSubmitted && validationErrors.length > 0 && (
                <div className="edit-spot-errors">
                    Please fix these inputs:
                    <ul>
                        <ul>
                            {validationErrors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}
                        </ul>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EditSpotForm;
