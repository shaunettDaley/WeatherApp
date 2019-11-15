const key = "zIFNxdWjH8AP61zf0AuoPTC7mZy5IwT2";

//get weather information
const getWeather = async (keycode) =>{
    const weatherBase = "https://dataservice.accuweather.com/currentconditions/v1/"
    const query2 = `${keycode}?apikey=${key}`;
    const response1 = await fetch(weatherBase + query2);
    const data2 = await response1.json();
  console.log(data2);
   return data2;
}

//get city information
const getCity = async (city) => {
    const base = "https://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(data);
    return data[0];

}

/*
getCity('manchester').then(data => {
  return getWeather(data.Key);
}).then(data => {
      console.log(data);
  }).catch(err => console.log(err));
*/

//getWeather('329260');
