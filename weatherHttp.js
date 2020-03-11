class Weather {
    constructor() {
        this.api_key = '5bd7441be4075fe946d5ed22b7846f03';
    }

    async get(location) {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${this.api_key}&q=${location}`)
        if(response.status == 200) {
            const weatherDetails = await response.json();
            return weatherDetails;
        } else if(response.status == 400 || response.status == 404){
            return Promise.reject('error:400');
        } else {
            return Promise.reject('error:other');
        }
    }
}