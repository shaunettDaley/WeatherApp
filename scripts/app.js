const form = document.querySelector('form');
const cardWrapper = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {
   
    //const citydet = data.cityDet;
    //const weather = data.weather;

    //using destructing to get properites from the object
    const {cityDet,weather} = data;
//console.log(weather);
    details.innerHTML = 
    `<h5 class="my-3">${cityDet.EnglishName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
            <span>${weather[0].Temperature.Imperial.Value}</span>
            <span>&deg;C</span>
    </div>`;

    //show icon
    let iconSrc = `img/icons/${weather[0].WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    //showing the time 
    /*
    let timeSrc = null;
    if(weather[0].isDayTime){
        timeSrc = "img/day.svg";
    }else{
        timeSrc = "img/night.svg";
    }*/

    //ternary operator
    let timeSrc = weather[0].IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src',timeSrc);

    if(cardWrapper.classList.contains('d-none')){
        cardWrapper.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
console.log(city);
const cityDet = await getCity(city);
const weather = await getWeather(cityDet.Key);
return { cityDet, weather};


};



form.addEventListener('submit', e =>{
    e.preventDefault();
    const city = form.city.value.trim();
    form.reset();

    //update UI
    updateCity(city).then(data => {
       updateUI(data);
    }).catch(err => {
        console.log(err);
    })

    //store info in local storage
    localStorage.setItem('city',city);
});


//run this function each time the browser refresh or start
if(localStorage.getItem('city')){
    const localInfo = updateCity(localStorage.getItem('city'))
.then(data => {
    updateUI(data);
}).catch(err => {
    console.log(err);
})

}
