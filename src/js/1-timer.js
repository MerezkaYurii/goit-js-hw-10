// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/error.svg';

const btn = document.querySelector('.js-btn');
let userSelectedDate;

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      btn.disabled = true;
      iziToast.error({
        messageColor: '#fff',
        iconUrl: icon,
        message: 'Please choose a date in the future',
      });
    } else {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
      checkingDate();
    }
  },
};

const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, options); // flatpickr
const clockValue = document.querySelectorAll('.value');
btn.addEventListener('click', checkingDate);

function checkingDate() {
  myInput.disabled = true;

  const endTime = userSelectedDate.getTime();
  const timeInterval = setInterval(() => {
    const deltaTime = endTime - Date.now();
    const time = convertMs(deltaTime);
    onTick(time);
    btn.disabled = true;
    myInput.disabled = true;

    if (deltaTime <= 1000) {
      clearInterval(timeInterval);
      btn.disabled = true;
      myInput.disabled = false;
      return;
    }
  }, 1000);
}

function onTick({ days, hours, minutes, seconds }) {
  clockValue[0].textContent = days;
  clockValue[1].textContent = hours;
  clockValue[2].textContent = minutes;
  clockValue[3].textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
