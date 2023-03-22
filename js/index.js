//-------- Today's card --------
let today= document.getElementById('today-day'),
    todayNum= document.getElementById('today-number'),
    city= document.getElementById('location'),
    todayDegree= document.getElementById('today-degree'),
    todayDesc=document.getElementById('today-desc'),
    humidty = document.getElementById("humidty"),
    todayIcon = document.getElementById("today-icon"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search")
//-------- Next days card --------

 let nextDay = document.getElementsByClassName("next-day"),
     nextDayIcon = document.getElementsByClassName("nextday-icon"),
     maxDegree = document.getElementsByClassName("max-degree"),
     minDegree = document.getElementsByClassName("min-degree"),
     nextDayDescription = document.getElementsByClassName("nextDay-description"),


 response,
 weather,

monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];



async function getWeather(currentCity="cairo")
{
    response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
    weather= await response.json()
    displayTodayWeather()
    displayNextDayWeather()
}
getWeather();

function displayTodayWeather()
{
    var date= new Date()
   today.innerHTML= days[date.getDay()]
   todayNum.innerHTML= `${date.getDate()} ${ monthName[date.getMonth()]}`
   city.innerHTML=  weather.location.name;
   todayDegree.innerHTML= weather.current.temp_c;
   todayIcon.setAttribute("src",`https:${weather.current.condition.icon}`)
   todayDesc.innerHTML = weather.current.condition.text;
   humidty.innerHTML = weather.current.humidity;
   wind.innerHTML = weather.current.wind_kph;
   compass.innerHTML =weather.current.wind_dir;
}

function displayNextDayWeather()
{
    for( let i=0 ; i < nextDay.length ; i++){
        nextDay[i].innerHTML= days[new Date(weather.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${weather.current.condition.icon}`);
        maxDegree[i].innerHTML = weather.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML =weather.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML =weather.forecast.forecastday[i+1].day.condition.text;

    }
}

    searchBar.addEventListener("keyup", function(){
        currentCity=searchBar.value;
        getWeather(currentCity)
    })




