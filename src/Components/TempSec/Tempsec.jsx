import React, { useEffect, useState } from 'react';
import "./Tempsec.css";
export default function Tempsec() {
const [city,setCity] = useState(null);
const [search ,setSearch] = useState("Mumbai");

  const apiid = process.env.REACT_APP_WEATHER_API_KEY;
  

    useEffect( ()=>{
      const fetchApi = async ()=>{
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiid}`;
          try {
            const response = await fetch(url);
            
            if (!response.ok) {
                alert("something went wrong...Please try again")
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
            
            const resJson = await response.json();
            setCity(resJson.main);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
      };
      fetchApi();
    },[search])
  return (
    <>
      <div className="TempsecMain">
        <div className="Tempsecinput">
          <label htmlFor="html">Enter City Name: </label>
          <input
            type="search"
            className="inputfield"
            name="city"
            value={search}
            id="city"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          ></input>
        </div>
        {!city ? (
          <p className='Nodata'>No Data Found</p>
        ) : (
          <>
            <div className="Tempsecbody">
              <h2 className="location">
                <i className="fa-solid fa-street-view icon"></i>
                {search}
              </h2>
              <h1 className="temp">{city.temp}°Cel</h1>
              <h3 className="tempmin_max">
                Min: {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h3>
            </div>
          </>
        )}

        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </>
  );
}
