// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[type="number"][name="delay"]');
const rejBtn = document.querySelector('input[type="radio"][name="state"][value="rejected"]');
const fullBtn = document.querySelector('input[type="radio"][name="state"][value="fulfilled"]');
const createBtn = document.querySelector('button[type="submit"]');

createBtn.disabled = true;

rejBtn.addEventListener('change', switcher);
fullBtn.addEventListener('change', switcher);

function switcher() {
    if (rejBtn.checked || fullBtn.checked) {
        createBtn.disabled = false;
    }
}

createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const delay = Number(delayInput.value);
  const state = fullBtn.checked ? 'fulfilled' : 'rejected';
    createPromise(delay, state).then((delay) => {
        iziToast.success({
    title: 'OK',
    message: `✅ Fulfilled promise in ${delay}ms`,
});
    })
        .catch((delay) => {
            iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
});
        })
    form.reset();
})
function createPromise(delay, state) {
   const promise = new Promise((res, rej) => {
     setTimeout(() => {
       if (state === "fulfilled") {
         res(delay);
       } else {
         rej(delay);
       }
     }, delay);
   });
   return promise;
 }