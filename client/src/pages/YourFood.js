import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
const URL = 'http://127.0.0.1:5000/submit';
const URL1 = 'http://127.0.0.1:5000/click';
const URL2 = 'http://127.0.0.1:5000/foodDescription';
const URL3 = 'http://127.0.0.1:5000/maps';
const URL4 = 'http://127.0.0.1:5000/restaurants';
function YourFood() {
  const [vornv, setVorNv] = useState('');
  const [cuisine, setCusine] = useState('');
  const [rating, setRating] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [isSelectListVisible, setIsSelectListVisible] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectFood, setSelectFood] = useState([]);
  const [food_description, setFood_description] = useState([]);
  const [maps, setMaps] = useState([]);

  const handleVorNvChange = (e) => {
    setVorNv(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCusine(e.target.value);
  };
  const handleSelectChange = (event) => {
    setClicked(true);
    setSelectedOption(event.target.value);

    const data = { selectedOption }
    axios.post(URL2, data)
      .then(response => {
        setFood_description(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = { vornv, cuisine, rating };
    axios.post(URL, formData)
      .then(response => {
        setOptions(response.data);
        setIsFormVisible(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const sendDataToFlask = () => {
    const data = { selectedOption };
    axios.post(URL1, data)
      .then(response => {
        console.log(response.data);
        setSelectFood(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleMaps = () => {
    setIsSelectListVisible(false);
    const data = { selectedOption }
    axios.post(URL3, data)
      .then(response => {
        setMaps(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleParaGraphClick = (e) => {
    const data = { 'restaurant': e.target.textContent }
    axios.post(URL4, data)
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <div className='backGround'>
      <div>
        <Navbar />
      </div>
      <div className='container main'>

        {
          isFormVisible && (

            <div className='form-container'>

              <form className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4">VEG OR NON-VEG?</h3>
                <div className="flex flex-col mb-6">
                  <label className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="option"
                      value="veg"
                      checked={vornv === 'veg'}
                      onChange={handleVorNvChange}
                      required
                      className="mr-2"
                    />
                    <span className="text-lg">Veg</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="option"
                      value="non-veg"
                      checked={vornv === 'non-veg'}
                      onChange={handleVorNvChange}
                      required
                      className="mr-2"
                    />
                    <span className="text-lg">Non-veg</span>
                  </label>
                </div>

                <h3 className="text-xl font-semibold mb-4">SELECT A CUISINE YOU PREFER?</h3>
                <label className="block mb-6">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={cuisine}
                    onChange={handleCuisineChange}
                    required
                  >
                    <option value="">Select a cuisine</option>
                    <option value="Healthy Food">Healthy Food</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Indian">Indian</option>
                    <option value="French">French</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Italian">Italian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Beverage">Beverage</option>
                  </select>
                </label>

                <h3 className="text-xl font-semibold mb-4">CHOOSE YOUR DESIRED RATING?</h3>
                <label className="block mb-6">
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={rating}
                    onChange={handleRatingChange}
                    required
                  >
                    <option value="">Select a rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>

          )
        }

        {(!isFormVisible && isSelectListVisible) && (

          <div className="container mx-auto page2">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="block w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Select an option</option>
              {Object.values(options).map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {clicked && (
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h2 className="text-xl font-semibold">Ingredients in the food:</h2>
                {Object.values(food_description).map((desc, index) => (
                  <p key={index} className="text-gray-700">{desc}</p>
                ))}
              </div>
            )}
            {clicked && (
              <div className="flex justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2"
                  onClick={handleMaps}
                >
                  Show Restaurants
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                  onClick={sendDataToFlask}
                >
                  Similar Food Items
                </button>
              </div>
            )}
            <ol className="pl-6 list-decimal list-inside">
              {Object.values(selectFood).map((option, index) => (
                <li
                  key={index}
                  className="text-gray-800 bg-gray-100 rounded-lg my-2 p-2 transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 hover:shadow-md"
                >
                  {option}
                </li>
              ))}
            </ol>
          </div>


        )}

        {(!isSelectListVisible) && (
          <div className="container mx-auto main maps">
            <h1 className="text-3xl font-bold mb-4">Select a restaurant to go</h1>
            {Object.values(maps).map((desc, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4 hover:bg-gray-200 transition-colors duration-300">
                <p className="text-blue-500 cursor-pointer" onClick={handleParaGraphClick}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

        )}
      </div>
    </div>
  );
}

export default YourFood;
