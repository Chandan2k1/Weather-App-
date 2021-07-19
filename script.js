const WApi = {
    key: "598bf4861ccb47ed0f2a038d13426d8c",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}
const searchbox = document.getElementById('input-box');

searchbox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13 ){
        console.log(searchbox.value);
        getReport(searchbox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
    
});
function getReport(city){
    fetch(` ${WApi.baseurl}?q=${city}&appid=${WApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showReport);
}
function showReport(weather){
    console.log(weather);
    
    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    
   let temperature=document.getElementById('temp');
   temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

   let minmax=document.getElementById('min-max');
   minmax.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (Min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (Max)`

   let weathertype=document.getElementById('type');
   weathertype.innerHTML= `${weather.weather[0].main}`;
   
   let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    
    if(weathertype.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('clear.jpg')";
        
    } else if(weathertype.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('cloudy.jpg')";
        
    } else if(weathertype.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('haze.jpg')";
        
    }     else if(weathertype.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('rain.jpg')";
        
    } else if(weathertype.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('snow.jpg')";
    
    } else if(weathertype.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('thunder.jpg')";
        
    } 
}


function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}
