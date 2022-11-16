import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addOneSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import "./addSpot.css";

function AddSpotComponent() {
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
  const spot = useSelector(state => state.spots[state.spots.length - 1])

  useEffect(() => {
    const errors = [];
    if (!address.length) errors.push("Street address is required");
    if (!city.length) errors.push("City is required");
    if (!state.length) errors.push("State is required");
    if (!country.length) errors.push("Country is required");
    if (name.length > 50) errors.push("Name must be less than 50 characters");
    if (!description.length) errors.push("Description is required");
    if (!price.length) errors.push("Price per day is required");
    if (typeof price !== 'number') errors.push("Please enter a valid number");
    setValidationErrors(errors);
  }, [address, city, state, country, name, description, price]);

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the contact us information.
    const newSpot = {
      address,
      city,
      state,
      country,
      name,
      description,
      price
    };

    //input data in state
    const createSpot = await dispatch(addOneSpotThunk(newSpot));
    // console.log(createSpot)

    //after submitting the form
    history.push(`/spots/${createSpot.id}`)

  };

  return (
    <div >
      <form onSubmit={onSubmit} className="addSpotBox">
        <h2>Let's get you started...</h2>
        <h2>Please provide the your listing information </h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
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
            value={country}
          >
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
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <button className="sub-button">
          <span>:)</span>
          <span>Submit</span>
        </button>
      </form>
      {/* to see errors printed at bottom */}
      {hasSubmitted && validationErrors.length > 0 && (
        <div className="addSpotBox">
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

export default AddSpotComponent;
