const refs = {
  submitBtn: document.querySelector('button'),
  amountField: document.querySelector('[name=amount]'),
  stepField: document.querySelector('[name=step]'),
  firstDelayField: document.querySelector('[name=delay]'),
}

refs.submitBtn.addEventListener('click', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const amount = refs.amountField.value;
  const step = refs.stepField.value;
  const firstDelay = refs.firstDelayField.value;
  
  for (let i = 1; i <= amount; i+= step) {
    let position = i;
    let delay = firstDelay + step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
      .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });;
  }
}

function createPromise(position, delay) {
 
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(console.log(`✅ Fulfilled promise ${position} in ${delay}ms`))
      } else {
        reject(console.log(`❌ Rejected promise ${position} in ${delay}ms`))
      }
    }, delay);
    
    
  });
}

// createPromise(2, 1500)
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });
