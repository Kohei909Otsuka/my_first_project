// https://bulma.io/documentation/components/modal/#javascript-implementation-example
document.addEventListener('DOMContentLoaded', () => {
    function setCurrentTime() {
      let el = document.querySelector('#current-time');
      const now = new Date();
      el.textContent = String(now);
    }

    setInterval(setCurrentTime, 1000)
});