import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const amount = Number(refs.form.amount.value);
  const step = Number(refs.form.step.value);
  let firstDelay = Number(refs.form.delay.value);

  for (let i = 1; i <= amount; i++) {
    let position = i;
    let delay = firstDelay += step;
    if (i === 1) {
      delay = firstDelay -= step;
    };
    
    setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
    }, delay)
    
  }
}

function createPromise(position, delay) {
 
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
      if (shouldResolve) {
        resolve
          ({ position, delay })
      } else {
        reject
          ({ position, delay })
      }
  });
}
