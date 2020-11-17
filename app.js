window.addEventListener('load', () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector('.temp-description');
  let temperatureDegree = document.querySelector('.temp-degree');
  let locationTimeZone = document.querySelector('.location-timezone');
  let iconImage = document.querySelector('.icon');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=32e44804b7dda93dda6c753f88364822`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const {temp} = data.main;
          const {description, icon} = data.weather[0];
          console.log(icon);
          // set DOM Elements from The API
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimeZone.textContent = data.name;
          iconImage.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          let celsius = (temp - 32) * (5 / 9);
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }
});
