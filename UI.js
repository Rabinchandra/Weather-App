class UI {
    showWeatherDetails(weatherObj, state) {
        let icon = weatherObj.weather[0].icon.replace('n', 'd');
        let description = weatherObj.weather[0].description;
        // To make description Sentence Case
        description = description.charAt(0).toUpperCase() + description.slice(1);
        let kelvinTemp = weatherObj.main.temp;
        let CTemp =  (kelvinTemp - 273.15).toFixed(2);
        let FTemp = ((CTemp * (9/5)) + 32).toFixed(2);
        let humidity = weatherObj.main.humidity;
        let pressure = weatherObj.main.pressure
        let K_feels_like = weatherObj.main.feels_like;
        let C_feels_like = (K_feels_like - 273.15).toFixed(2);
        let F_feels_like = ((C_feels_like * (9/5)) + 32).toFixed(2);
        let wind_speed = weatherObj.wind.speed;
        let lon = weatherObj.coord.lon;
        let lat = weatherObj.coord.lat;
        // Location
        let city = weatherObj.name;
        let country = weatherObj.sys.country;
        let location = `${city}`;
        if(state !== '') {
            location = `${city}, ${state}, ${country}`;
        }
        // Add to HTML
        document.getElementById('container-box').innerHTML = `
        <div class="name main">${location}</div>
        <div class="icon main">
            <img src="weather_icons/${icon}.png" alt="img not found">
        </div>
        <div class="description main">${description}</div>
        <div class="temp main">${FTemp} F (${CTemp}°C)</div>
        <div class="other-details">
            <ul>
                <li>Relative Humidity: ${humidity}</li>
                <li>Pressure: ${pressure} mb</li>
                <li>Feels Like: ${F_feels_like}F (${C_feels_like}°C)</li>
                <li>Wind Speed: ${wind_speed} Km/Hr</li>
                <li>Longitude: ${lon}</li>
                <li>Latitude: ${lat}</li>
            </ul>
        </div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#inputModal" id="change-loc-btn">
        Change Location
      </button>
        `;
    }

    alertError(err) {
        let errBox = document.getElementById('err-box');
        errBox.style.display = 'block';
        errBox.style.background = 'red';
        if(err === 'error:400') {
            errBox.innerHTML = 'Error: Invalid location!';
        } else {
            errBox.innerHTML = 'Error: Something went wrong!';
        }
        // Error box display off after 3 seconds
        setTimeout(function() {
            errBox.style.display = 'none';
        }, 3000);
    }

    alertSuccess() {
        let errBox = document.getElementById('err-box');
        errBox.style.display = 'block';
        errBox.style.background = '#4caf50';
        errBox.innerHTML = 'Succesfully changed location!';
        // Error box display off after 3 seconds
        setTimeout(function() {
            errBox.style.display = 'none';
        }, 3000);
    }
}