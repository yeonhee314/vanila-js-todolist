import { WEATHER_API_KEY } from './util.js';

function onGeoSuccess(position){
    let latitude = position.coords.latitude;    // 위도
    let longitude = position.coords.longitude;  // 경도
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        // console.log(data.name, data.weather[0].main);
        const weather_container = document.querySelector('#weather');
        const name = data.name;
        const weather = data.weather[0].main;
        weather_container.innerHTML = `${name} is ${weather} !`;
    }); 

}
// 사용자의 현재 위치를 요청한다.
navigator.geolocation.getCurrentPosition(onGeoSuccess);


