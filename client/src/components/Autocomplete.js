import React, { useEffect, useState, useRef } from 'react';
import YourFood from '../pages/YourFood';
import Navbar from './Navbar';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Autocomplete = ({ places }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [click, setClick] = useState(false);
  const [input, setInput] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (inputValue.length == 1) {
      setClick(false)
    }

    const filteredSuggestions = places.filter((place) =>
      place.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (selectedPlace) => {
    setValue(selectedPlace.name);
    setSuggestions([]);
  };

  const handleClick = () => {
    setClick(true);
  }
  const handleClick2 = () => {
    setClick(true);
    setValue('youCurrentlocation');
  }

  const { text } = useTypewriter({
    words: ['food', 'shyam', 'swaroop'],
    loop: {},
  });

  if (value != '' && click) {
    return (
      <YourFood />
    );
  }
  else {
    return (
      <div>
        <Navbar />
        <div>
          <div className="autoComplete-div auto-div">
            <div className="container mx-auto main div1">
              <h1 className="text-3xl font-bold mb-4">
                Where are you ???
                <span style={{ fontWeight: 'bold', color: 'green' }}>
                  {text}
                </span>
                <span>
                  <Cursor />

                </span>
              </h1>
              <div className="searchDiv flex flex-wrap mb-4">
                <input
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="Enter a place"
                  className="searchInput border border-gray-300 rounded py-2 px-4 mb-2 mr-2 focus:outline-none focus:border-blue-500"
                />
                <div className="flex">
                  <button className="searchButton flex-grow bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded truncate focus:outline-none w-1/2" onClick={handleClick}>
                    FIND FOOD
                  </button>
                  <button className="currentLocation flex-grow bg-blue-400 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded truncate focus:outline-none ml-2 w-1/2" onClick={handleClick2}>
                    CurrentLocation
                  </button>
                </div>

              </div>
              <ul className="searchList">
                {suggestions.map((place) => (
                  <li
                    key={place.id}
                    onClick={() => handleSelect(place)}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {place.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="div2"></div>
          </div>
        </div>

      </div>

    );
  }

};

export default Autocomplete;
