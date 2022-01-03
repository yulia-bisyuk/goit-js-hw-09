const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {

    intervalId = setInterval(() => refs.body.style.backgroundColor = getRandomHexColor(), 1000);
    refs.startBtn.setAttribute('disabled', true);
    refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {

    clearInterval(intervalId);
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
    
}
