const strBaseURL = "https://api.open-meteo.com/v1/forecast?latitude=36.1682&longitude=-85.5016&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&temperature_unit=fahrenheit&timezone=America%2FChicago";

fetch(strBaseURL)             //Fetches data in json format from the api link then plugs it in to the corresponding id's we made in index.html
    .then(result => {
        if(result.ok) {
            return result.json();
        } else {
            throw new Error(result.status);
        }
    })
    .then(data =>{
        document.querySelector("#txtTemperature").textContent = data.current.temperature_2m;
        document.querySelector("#txtHumidity").textContent = data.current.relative_humidity_2m;
        console.log(data);

        let intCode = data.current.weather_code;
        let strCondition = "";
        let strIcon = "";

        if(intCode === 0) {
            strCondition = "Sunny"
            strIcon = "bi bi-cloud-fill"
        } else if(intCode >=1 && intCode <= 3) {
            strCondition = "Cloudy"
            strIcon = "bi bi-cloud-fill"
        } else if(intCode === 45 || intCode === 48) {
            strCondition = "Foggy"
            strIcon = "bi bi-cloud-fog-fill"
        } else if(intCode >= 51 && intCode <= 67) {
            strCondition = "Rainy"
            strIcon = "bi bi-cloud-rain-fill"
        } else if(intCode >= 71 && intCode <= 77) {
            strCondition = "Snow"
            strIcon = "bi bi-cloud-snow"
        } else if(intCode >= 80 && intCode <= 82) {
            strCondition = "Rain Showers"
            strIcon = "bi bi-cloud-rain-fill"
        } else if(intCode >= 85 && intCode <= 86) {
            strCondition = "Snow Showers"
            strIcon = "bi bi-cloud-snow-fill"
        } else if (intCode >=95) {
            strCondition = "Thunderstorm"
        } else {
            strCondition = "Rare"
            strIcon = "bi bi-emoji-surprise-fill"
        }

        document.querySelector("#txtCondition").textContent = strCondition;
        document.querySelector("#txtWeather").className = strIcon + " fs - 1";
        document.querySelector("#txtApparentTemperature").textContent = data.current.apparent_temperature;
    })