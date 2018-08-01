///////////////////main function triggred by clicking on seach button//////////////
function getWeather() {
    var searchInput = document.querySelector('.searchw').value;
    showError(false);
    showWeather(false);
    showLoading(true);


    
    ///////////because of cross origin problems and practicing puposes i'm using a cors proxy, this method shouldn't be used for a commercial project or real website/////////
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchInput}`)
        .then(result => {
            
            return result.json();


        })
        .then(data => {


            var cityWoeid = data[0].woeid;


            if (typeof cityWoeid !== undefined && cityWoeid !== '' && cityWoeid !== 'undefined') {
                
                showWeather(true, cityWoeid);
                
            } else if (typeof cityWoeid === undefined || cityWoeid === 'undefined') {
                
                showError(true, 'City not found');
                
            } else {
                
                showError(true, 'operation failed try again');
                console.log(cityWoeid);
                
            }

        })
        .catch(err => {
            showLoading(false);
            console.log(err);

            if (String(err).includes('undefined')) {
                showError(true, 'City not found');
            } else {
                showError(true, 'operation failed try again');
                console.log(String(err));

            }
        });





    
    
    
    
    
    
    
    
/////////////////////////////////////////////////////////////   
}

function showLoading(show) {
    var loadingicon = document.querySelector('.loading');
    if (show) {
        loadingicon.style.display = 'block';
    } else {
        loadingicon.style.display = 'none';
    }
}

///////////////////////////////////////////////////////////////////////////////////

function showWeather(show, woeid) {

    var wContainer = document.querySelector('.weather-container');

    if (show) {


        fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`)
            .then(result => {
                
                return result.json();


            })
            .then(data => {


                var weatherArr = data.consolidated_weather[0];

                var cityFullName = data.title + ', ' + data.parent.title;

                var stateAndTemp = weatherArr.weather_state_name + ',  ' + Math.round(parseFloat(weatherArr.the_temp)) + '°C';

                var indicatorUrl = `https://www.metaweather.com//static/img/weather/${weatherArr.weather_state_abbr}.svg`;


                document.querySelector('.w-city').textContent = cityFullName;
                document.querySelector('.w-state').textContent = stateAndTemp;
                document.querySelector('.w-indicator').src = indicatorUrl;
                showLoading(false);
                wContainer.style.display = 'block';









            })
            .catch(err => {
                console.log(err);


                showError(true, 'operation failed try again');
                console.log(String(err));


            });



    } else {
        wContainer.style.display = 'none';
    }

}









/////////////////////////////////////////////////////////////////////

function showError(show, errortext) {
    var errorbox = document.querySelector('.errorr');
    errorbox.innerHTML = '';

    if (show) {
        errorbox.style.display = 'block';
        errorbox.insertAdjacentHTML('beforeend', `<i class="fas fa-exclamation"></i><span> </span>${errortext}`);
    } else {
        errorbox.style.display = 'none';
    }
}
