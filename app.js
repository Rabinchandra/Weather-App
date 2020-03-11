let saveBtn = document.getElementById('save-btn');
let weather = new Weather();
let ui = new UI();

saveBtn.addEventListener('click', displayWeather);

document.addEventListener('DOMContentloaded', displayWeather('domload', ''));

function displayWeather(city, state) {
    // isCalledByDOM indicates if the display weather is 
    // being called by DOM
    let isCalledByDOM = false;

    // if saveBtn calls it, not DOMLoaded
    if(city !== 'domload') {
        city = document.getElementById('place').value;
        state = document.getElementById('state').value;
    } 
    // if it is DOM loaded
    else {
        // isCalledByDOM is set to true since it is called by DOM
        isCalledByDOM = true;
        let location = JSON.parse(localStorage.getItem('location'));
        // if location is not available in localStorage
        if(location == null) {
            console.log('No location is set!');
            return;
        } 
        // if location is available in localStorage
        else {
            city = location.city;
            state = location.state;
        }
    }
    // Fetching and showing Weather Information
    weather.get(city)
        .then(wObj => {
            ui.showWeatherDetails(wObj, state);
            // Saving city and state to localStorage
            localStorage.setItem('location', JSON.stringify({
                city: city,
                state: state
            }));
            // if condition is done to make sure that
            // the success alert box is not displayed 
            // when the DOM is loaded
            if(!isCalledByDOM) {
                ui.alertSuccess();
            }
        })
        .catch(err => {
            ui.alertError(err);
        });
    
}