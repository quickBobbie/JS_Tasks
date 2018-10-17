const TIME = document.querySelector('.time');
const COLOR = document.querySelector('.color');
const BODY = document.querySelector('body');

function getTime() {
	const DATE = new Date();

	let hh = `${DATE.getHours()}`;
	let mm = `${DATE.getMinutes()}`;
	let ss = `${DATE.getSeconds()}`;

	if (hh.length < 2) hh = `0${hh}`;
	if (mm.length < 2) mm = `0${mm}`;
	if (ss.length < 2) ss = `0${ss}`;

	const TIME_CONTENT = `${hh}:${mm}:${ss}`;
	const COLOR_CONTENT = `#${hh}${mm}${ss}`;

	TIME.innerHTML = TIME_CONTENT;
	COLOR.innerHTML = COLOR_CONTENT;

	BODY.style.background = COLOR_CONTENT;
}

getTime();

setInterval(getTime, 1000);