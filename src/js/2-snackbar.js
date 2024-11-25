
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import iconResolve from '../img/ok.svg';
import iconReject from '../img/error.svg';

const form = document.querySelector('.form');
form.addEventListener('submit', handelSubmit);

iziToast.settings({
  position: 'topRight',
});

function handelSubmit(event) {
  event.preventDefault();
  const promiseState = event.target.elements.state.value;
    const delay = event.target.delay.value;
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay} ms`);
      } else {
        reject(`Rejected promise in ${delay} ms`);
      }
    }, delay);
  });

result
.then(result => {
  iziToast.success({
    // title: 'OK',
    message: `${result}`,
    titleColor: '#fff',
    messageColor: '#fff',
    imageWidth: 24,
    iconColor: '#fff',
    iconUrl: iconResolve,
  });
})
.catch(error => {
  iziToast.error({
    // title: 'Error',
    message: `${error}`,
    iconUrl: iconReject,
    iconColor: '#fff',
    imageWidth: 24,
    messageColor: '#fff',
    titleColor: '#fff',
  });
})
.finally(() => form.reset());

}