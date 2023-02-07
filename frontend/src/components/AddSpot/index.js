import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addOneSpotThunk } from "../../store/spots";
import { addImagetoSpotThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import AddSpotImage from "../addSpotImage/addSpotImage";
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
  const [url, setUrl] = useState("")
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    const errors = [];
    if (!address.length || address.length < 4) errors.push("Valid Street address is required");
    if (!city.length) errors.push("Valid City is required");
    if (!state.length) errors.push("Valid State is required");
    if (!country.length) errors.push("Valid Country is required");
    if (!name) errors.push("Name is required")
    if (name.length > 50) errors.push("Name must be less than 50 characters");
    if (!description.length) errors.push("Description is required");
    if (!price.length) errors.push("Price per day is required");
    if (price.length > 10) errors.push("Price is too much")
    if (price <= 0) errors.push("Price needs to higher than $0")
    if (isNaN(price) || price < 0) errors.push("Please enter a valid number");
    if (!url.length) errors.push("Please enter photo url");
    setValidationErrors(errors);

    if(path !== "/my-results/:search") {
      const inputSearch = document.getElementById("right")
      inputSearch.value = '';
    }

  }, [address, city, state, country, name, description, price, url]);

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

    const newImage = {
      url,
      preview: true
    }

    //input data in state
    const createSpot = await dispatch(addOneSpotThunk(newSpot));
    // console.log(createSpot)

    if (createSpot) {
      await dispatch(addImagetoSpotThunk(createSpot, newImage))
    }
    history.push(`/spots/${createSpot.id}`)
    // const addImage = await dispatch(addImagetoSpotThunk(spot, newImage));
    // console.log(createSpot)

    //after submitting the form

  };

  return (
    <div>
      {/* to see errors printed at bottom */}
      {validationErrors.length > 0 && (
        <div className="addSpotBox2">
          <h4 className="validation-errors-title">Required Fields</h4>
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={onSubmit} className="addSpotBox">
        <h3 className="lets-get-started">Let's get you started...</h3>
        <h2>Please provide the your listing information </h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input className="input-for-add"
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input className="input-for-add"
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input className="input-for-add"
            id="state"
            name="state"
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
          <select className="input-coun-spot"
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
          <input className="input-for-add"
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input className="input-for-add"
            id="description"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input className="input-for-add"
            id="price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div>
          <label htmlFor="url">Image Url: </label>
          <input className="input-for-add"
            id="url"
            type="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
        </div>
        <button class="custom-btn btn-6" id="add-spot-butt">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
}

export default AddSpotComponent;
