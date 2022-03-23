import axios from "axios";
import React, { useState, useEffect } from "react";
import moduleCss from "./WeatherHome.module.css";
function WeatherHome() {
  const [location, setLocation] = useState("");
  const [dataWeather, setDataWeather] = useState({});
  const [dataShowMy, setDataShowMy] = useState(false);
  const [dataShow, setDataShow] = useState(true);
  const [dataMyWeather, setdataMyWeather] = useState({});
  const [errorMessage, setErrorMessage] =useState({message:false,color:`white`});
  const API_ID = `${process.env.REACT_APP_OPEN_WEATHER_APP_ID}`
  console.log(API_ID);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_ID}`;
  const findWeather = (event) => {
    setErrorMessage({message:false, color:`white`})
    
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        // console.log(response.data);
        setDataWeather(response.data);
        setDataShowMy(true);
        setDataShow(false)
        setLocation("");
    

      })
      .catch((error)=>{
        setErrorMessage({message:true,color:`red`})
        setLocation("Not found. Try Another!!!");
      })
    }
  };

  const myWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=${API_ID}`;
    axios.get(url).then((response) => {
      // console.log(response.data);
      setdataMyWeather(response.data);
    });
  };
  useEffect(() => {
    myWeather();
  }, []);

  const KToC = (a) => {
    return a - 273.15;
  };
  // console.log(KToC(300));

  console.log(dataMyWeather);
  const myWeather_icon = dataMyWeather.weather && dataMyWeather.weather[0].icon;
  const yourWeather_icon = dataWeather.weather && dataWeather.weather[0].icon;

  // sorting out sunrise and sunset from unix UTC time to local time.
  // const sunrise = dataMyWeather.sys && dataMyWeather.sys.sunrise;
  // // console.log(sunrise)
  // const dateObj = new Date(sunrise*1000)
  // const sunrise_readable = dateObj.toLocaleString("en-US", {hour: "numeric",minute: "numeric"});
  // console.log(sunrise_readable);

  const UnixUTCToLocal =(UTCtime)=>{
    let dateObj = new Date(UTCtime*1000);
    return dateObj.toLocaleString("en-US", {hour: "numeric",minute: "numeric"});
  }
  //sorting out time from time zone
  // console.log(myWeather_icon);
  // var d = new Date((new Date().getTime())-25200*1000)
  // d.toISOString()
  // ""2020-12-26T13:50:09.012Z""
  // const timezone = dataMyWeather && dataMyWeather.timezone;
  // console.log(timezone);
  // const time = new Date((new Date().getTime())-timezone*1000)
  const timeZoneToLocalTime =(timezone)=>{
let time = new Date((new Date().getTime())-timezone*1000)
return time.toLocaleString("en-US", {weekday: "short", day: "numeric",month: "short"})
  }
  // console.log(time.toLocaleString("en-US", {weekday: "short", day: "numeric",month: "short"}));

  const my_icon_path = `http://openweathermap.org/img/wn/${myWeather_icon}@2x.png`;
  const your_icon_path = `http://openweathermap.org/img/wn/${yourWeather_icon}@2x.png`;

  return (
    <div> 
        <h2>Get update with your location!!!</h2>
        {
          errorMessage.message ? <input style={{ color: errorMessage.color }}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="Enter Location"
          type="text"
          onKeyPress={(e) => findWeather(e)}
        /> :
        <input style={{ color: errorMessage.color }}
        value={location}
        onChange={(e) => { 
          setLocation(e.target.value);
        }}
        placeholder="Enter Location"
        type="text"
        onKeyPress={(e) => findWeather(e)}
      />
        }


        { dataShow &&    <div className={moduleCss.weatherWrapper}>
        <div className={moduleCss.weatherCard}>
          <div className={moduleCss.currentTemp}>
            <span className={moduleCss.temp}> {dataMyWeather.main ? KToC(dataMyWeather.main.temp).toFixed() : null}°C</span>
          <span className={moduleCss.max}>Max</span><span className={moduleCss.minMaxValue}>{dataMyWeather.main ? KToC(dataMyWeather.main.temp_max).toFixed() : null}°C</span> <span className={moduleCss.min}>Min</span><span className={moduleCss.minMaxValue}>{dataMyWeather.main ? KToC(dataMyWeather.main.temp_min).toFixed() : null}°C</span> 
            <span className={moduleCss.date}>{dataMyWeather ? timeZoneToLocalTime(dataMyWeather.timezone) : null}</span>
            <span className={moduleCss.location}>{dataMyWeather.name}, {dataMyWeather.sys && dataMyWeather.sys.country}</span>
          </div>
          <div className={moduleCss.currentWeather}>
            <span className={moduleCss.conditions}>{dataMyWeather.weather ? <img src={`${my_icon_path}`} alt="Weather Icon" /> : null} </span>
            <span className={moduleCss.description}>Light Rain</span>
            <div className={moduleCss.info}>
              <span className={moduleCss.rain}>{dataMyWeather.sys ? UnixUTCToLocal(dataMyWeather.sys.sunrise) :null}</span>
              <span className={moduleCss.wind}>{dataMyWeather.sys ? UnixUTCToLocal(dataMyWeather.sys.sunset) :null}</span>
            </div>
          </div>
        </div>
      </div>}

      { dataShowMy &&    <div className={moduleCss.weatherWrapper}>
        <div className={moduleCss.weatherCard}>
          <div className={moduleCss.currentTemp}>
            <span className={moduleCss.temp}> {dataWeather.main ? KToC(dataWeather.main.temp).toFixed() : null}°C</span>
          <span className={moduleCss.max}>Max</span><span className={moduleCss.minMaxValue}>{dataWeather.main ? KToC(dataWeather.main.temp_max).toFixed() : null}°C</span> <span className={moduleCss.min}>Min</span><span className={moduleCss.minMaxValue}>{dataWeather.main ? KToC(dataWeather.main.temp_min).toFixed() : null}°C</span> 
            <span className={moduleCss.date}>{dataWeather ? timeZoneToLocalTime(dataWeather.timezone) : null}</span>
            <span className={moduleCss.location}>{dataWeather.name}, {dataWeather.sys && dataWeather.sys.country}</span>
          </div>
          <div className={moduleCss.currentWeather}>
            <span className={moduleCss.conditions}>{dataWeather.weather ? <img src={`${my_icon_path}`} alt="Weather Icon" /> : null} </span>
            <span className={moduleCss.description}>Light Rain</span>
            <div className={moduleCss.info}>
              <span className={moduleCss.rain}>{dataWeather.sys ? UnixUTCToLocal(dataWeather.sys.sunrise) :null}</span>
              <span className={moduleCss.wind}>{dataWeather.sys ? UnixUTCToLocal(dataWeather.sys.sunset) :null}</span>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}


export default WeatherHome;
