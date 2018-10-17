const radius = 200;

const svg = Snap(radius * 2, radius * 2);

const BODY = document.querySelector('body');

function polarToCortasian(cx, cy, r, angle) {
	angle = (angle - 90) * Math.PI / 180;

	return {
		x : cx + r * Math.cos(angle),
		y : cy + r * Math.sin(angle)
	};
}

function describeArc(x, y, r, startAngle, endAngle, continueLine) {
	let start = polarToCortasian(x, y, r, startAngle);
	let end = polarToCortasian(x, y, r, endAngle);
	let large = Math.abs(endAngle - startAngle) >= 180;

	return `
		${continueLine?"L":"M"}${start.x},${start.y}
		A${r},${r},0
		${large?1:0}
		${endAngle > startAngle?1:0},${end.x},${end.y}
	`;
}

function describeSector(x, y, r1, r2, startAngle, endAngle) {
	return `
		${describeArc(x, y, r1, startAngle, endAngle)}
		${describeArc(x, y, r2, endAngle, startAngle, true)}Z
	`;
}

function tiktak() {
	const DATE = new Date();

	let hh = DATE.getHours();
	let mm = DATE.getMinutes();
	let ss = DATE.getSeconds();
	let ms = DATE.getMilliseconds();

	let angleHours = (hh % 12) * 30 + mm / 2 + ss / 120 + ms / 120000;
	let angleMinutes = mm * 6 + ss / 10 + ms / 10000;
	let angleSeconds = ss * 6 + ms / (500 / 3);

	svg.clear();

	let secondArc = svg
		.path(describeSector(radius, radius, 50, radius, 0, angleSeconds))
		.attr({ fill : '#AD1457' })

	let minuteArc = svg
		.path(describeSector(radius, radius, 50, radius * 90 / 100, 0, angleMinutes))
		.attr({ fill : '#00695C' })

	let hourArc = svg
		.path(describeSector(radius, radius, 50, radius * 60 / 100, 0, angleHours))
		.attr({ fill : '#283593' })

	if (hh.toString().length < 2) hh = `0${ hh }`;
	if (mm.toString().length < 2) mm = `0${ mm }`;
	if (ss.toString().length < 2) ss = `0${ ss }`;

	const COLOR_CONTENT = `#${ hh }${ mm }${ ss }`;

	BODY.style.background = COLOR_CONTENT;
}

tiktak();

setInterval(tiktak, 1);