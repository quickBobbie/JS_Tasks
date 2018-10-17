const svg = Snap(window.innerWidth, window.innerHeight);

const BODY = document.querySelector('body');

const COORDS = {
	x : svg.node.clientWidth / 2,
	y : svg.node.clientHeight / 2,
	r : 150
}

const STYLE = [
	{
		fill : '#fff',
		stroke : '#bababa',
		strokeWidth : 5
	},
	{
		fill : '#fff'
	},
	{
		stroke : '#bababa',
		strokeWidth : 2
	}
];

let g = svg.g();

let mainCircle = svg
	.circle(COORDS.x, COORDS.y, COORDS.r)
	.attr(STYLE[0]);

g.add(mainCircle);

for (let i = 0; i <= 11; i++) {
	let path = svg
		.path(`
			M ${ COORDS.x }, ${ COORDS.y } 
			L ${ COORDS.x }, ${ COORDS.y + COORDS.r }
		`)
		.attr(STYLE[2])
		.transform(`r ${ 30 * i }, ${ COORDS.x }, ${ COORDS.y }`);

	g.add(path);
}

let secondCircle = svg
	.circle(COORDS.x, COORDS.y, COORDS.r - 10)
	.attr(STYLE[1]);

g.add(secondCircle);

for (let i = 0; i <= 3; i++) {
	let path = svg
		.path(`
			M ${ COORDS.x }, ${ COORDS.y } 
			L ${ COORDS.x }, ${ COORDS.y + COORDS.r }
		`)
		.attr(STYLE[0])
		.transform(`r ${ 90 * i }, ${ COORDS.x }, ${ COORDS.y }`);

	g.add(path);
}

let thirdCircle = svg
	.circle(COORDS.x, COORDS.y, COORDS.r - 20)
	.attr(STYLE[1]);

g.add(thirdCircle);

let hourLine = 
	svg
		.path(`
			M ${ COORDS.x }, ${ COORDS.y } 
			L ${ COORDS.x }, ${ COORDS.y - COORDS.r + 45 }
		`)
		.attr({
			stroke : '#bababa',
			strokeWidth : 7
		});

let minuteLine = 
	svg
		.path(`
			M ${ COORDS.x }, ${ COORDS.y } 
			L ${ COORDS.x }, ${ COORDS.y - COORDS.r + 20 }
		`)
		.attr({
			stroke : '#bababa',
			strokeWidth : 7
		});

let secondLine = 
	svg
		.path(`
			M ${ COORDS.x }, ${ COORDS.y } 
			L ${ COORDS.x }, ${ COORDS.y - COORDS.r + 20 }
		`)
		.attr({
			stroke : '#F06292',
			strokeWidth : 2
		});

g.add(hourLine, minuteLine, secondLine);

g.drag();

function Clock() {
	const DATE = new Date();

	let hh = DATE.getHours();
	let mm = DATE.getMinutes();
	let ss = DATE.getSeconds();
	let ms = DATE.getMilliseconds();

	let angleHour = (hh % 12) * 30 + mm / 2 + ss / 120 + ms / 120000;
	let angleMinute = mm * 6 + ss / 10 + ms / 10000;
	let angleSecond = ss * 6 + ms / (500 / 3);

	hourLine.transform(`r ${ angleHour }, ${ COORDS.x }, ${ COORDS.y }`);
	minuteLine.transform(`r ${ angleMinute }, ${ COORDS.x }, ${ COORDS.y }`);
	secondLine.transform(`r ${ angleSecond }, ${ COORDS.x }, ${ COORDS.y }`);

	if (hh.toString().length < 2) hh = `0${ hh }`;
	if (mm.toString().length < 2) mm = `0${ mm }`;
	if (ss.toString().length < 2) ss = `0${ ss }`;

	const COLOR_CONTENT = `#${ hh }${ mm }${ ss }`;

	BODY.style.background = COLOR_CONTENT;
}

Clock();

setInterval(Clock, 1);