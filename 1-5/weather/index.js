// https://bulma.io/documentation/components/modal/#javascript-implementation-example
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal(el) {
      el.classList.add('is-active');
    }
  
    function closeModal(el) {
      el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach((modal) => {
        closeModal(modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach((trigger) => {
      const modal = trigger.dataset.target;
      const target = document.getElementById(modal);
      console.log(target);
  
      trigger.addEventListener('click', () => {
        openModal(target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {
      const target = close.closest('.modal');
  
      close.addEventListener('click', () => {
        closeModal(target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  
    function setCurrentTime() {
      let el = document.querySelector('#current-time');
      const now = new Date();
      el.textContent = String(now);
    }
  
    setInterval(setCurrentTime, 1000)
  
    function handlePositionGet(position) {
      console.log("got position from browser", position);
      const apiKey = "02962fff6721e3686f59f387775b0855" // 大塚がhttps://home.openweathermap.org　で発行したものAPI KEY、誰でも無料で作れる
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // https://openweathermap.org/current#parameter
      // のAPIを叩いて、天気情報を取得
      fetch(`https://api.openweathermap.org/data/2.5/weather?lang=ja&units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(res => res.json())
        .then(json => {
           console.log("wheater data arrived: ", json)
           let weatherElement = document.querySelector('#current-weather');
           weatherElement.textContent = json.weather[0].description;
           let tempElement = document.querySelector('#current-temperature');
           tempElement.textContent = json.main.temp + "C";
        })
    }
    navigator.geolocation.getCurrentPosition(handlePositionGet)
  });