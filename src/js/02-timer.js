import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    startBtn: document.querySelector('button'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minutesCounter: document.querySelector('[data-minutes]'),
    secondsCounter: document.querySelector('[data-seconds]'),
    timer: document.querySelector('.timer'),
    countersContent: document.querySelectorAll('.value'),
}

refs.countersContent.forEach(counter => {
    counter.style.fontSize = '36px';
    counter.style.color = 'darkblue';
})

refs.timer.style.display = 'flex';
refs.timer.style.justifyContent = 'space-around';
refs.timer.style.width = '500px';
refs.timer.style.marginTop = '20px';
refs.timer.style.paddingBottom = '5px';
refs.timer.style.paddingTop = '5px';
refs.timer.style.border = '1px solid gray';
refs.timer.style.borderRadius = '3px';

refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        const date = new Date();
        if (selectedDates[0] <= date) {
            Notiflix.Notify.warning('Please choose a date in the future');
        } 
        else {
            refs.startBtn.removeAttribute('disabled');
            Notiflix.Notify.success('You can start the countdown!');
        }
  },
};

let calendar = flatpickr('input[type="text"]', options);

function onStartClick() {
    refs.startBtn.setAttribute('disabled', true);
    
    const intervalId = setInterval(() => {
        const startTime = Date.parse(calendar.selectedDates[0]);
        const stopTime = Date.now();
        const deltaTime = (startTime - stopTime);

        const convertedTime = convertMs(deltaTime);
        updateCounterFace(convertedTime);
        refs.timer.style.border = '2px solid green';

        if (deltaTime < 1000) {
            clearInterval(intervalId);
            refs.timer.style.border = '1px solid gray';
    }
    }, 1000);
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function updateCounterFace({ days, hours, minutes, seconds }) {
    refs.daysCounter.textContent = addLeadingZero(days);
    refs.hoursCounter.textContent = addLeadingZero(hours);
    refs.minutesCounter.textContent = addLeadingZero(minutes);
    refs.secondsCounter.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


