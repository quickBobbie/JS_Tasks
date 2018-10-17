const FIRST_ARRAY = [1, 2, 3, 4, 5];
const ITERATIONS = 125;

function shiftRight(arr, iter) {
	let realIterations = iter % arr.length;

	if (realIterations <= 0) return false;

	for (let i = 0; i < realIterations; i++) {
		let secondArray = [];

		for (let j = 0; j < arr.length; j++) {
			if (j == arr.length - 1) 
				secondArray[0] = arr[j]
			else 
				secondArray[j + 1] = arr[j];
		}

		arr = secondArray;
	}

	return arr;
}

let result = shiftRight(FIRST_ARRAY, ITERATIONS);

alert(result)