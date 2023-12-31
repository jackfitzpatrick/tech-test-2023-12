export const numeralToNumber = (numeral: string): number => {	
	try {
		const parsedNumber = numeralParser(numeral);
		return parsedNumber;
	} catch (error) {
		/*
			in a production system would log here to a monitoring system
			probably some sort of threshold based alerts
			*/
		console.log(`function="${numeralToNumber.name}", error="${error}"`);
		return NaN;
	}
};

//lower cases input and removes non alphabetic characters and conjunctive 'and's
const sanitizeInput: (input: string) => string = (input: string) => {
	input = input.toLowerCase();
	//removes non alphabetic characters
	input = input.replace(/[^a-z]/gi, " ");
	//removes joining and
	input = input.replace(/\band\b/gi, "");

	return input;
};

//takes in string, sanitizes it, attempts to create a number out of numerals, 
const numeralParser: (input: string) => number = (input: string) => {
	input = sanitizeInput(input);
	//split words and remove all whitespace
	const words = input.split(/\s+/);

	let result: number = 0;
	let count: number = 0;

	for (const word of words) {
		let matchingNumeral: numeralToNumber | undefined = undefined;
		
		matchingNumeral = baseNumerals.find((numeral) => {
			return numeral.word === word;
		});
		
		if (matchingNumeral !== undefined) {
			count = count + matchingNumeral.number;
		} else {
			matchingNumeral = higherNumerals.find((higherNumeral) => {
				return higherNumeral.word === word;
			});

			if (matchingNumeral !== undefined) {
				count = count * matchingNumeral.number;

				/*
				if a thousand comes up and this loops again the multiplication will be wrong
				we reset the count here to avoid that.
				i.e. two hundred and twenty two thousand, two hundred and twenty two
				222000 would get multiplied by 100 
				*/
				if (matchingNumeral.word === "thousand") {
					result = result + count;
					count = 0;
				}
			}
		}
	}

	result = result + count;

	if (result === 0 && words.length > 1) {
		throw new Error(`function="${numeralParser.name}", error="unable to parse, possibly invalid input", input="${input}"`);
	}

	return result;
};

const baseNumerals: numeralToNumber[] = [
	{word: "zero", number: 0},
	{word: "one", number: 1},
	{word: "two", number: 2},
	{word: "three", number: 3},
	{word: "four", number: 4},
	{word: "five", number: 5},
	{word: "six", number: 6},
	{word: "seven", number: 7},
	{word: "eight", number: 8},
	{word: "nine", number: 9},
	{word: "ten", number: 10},
	{word: "eleven", number: 11},
	{word: "twelve", number: 12},
	{word: "thirteen", number: 13},
	{word: "fourteen", number: 14},
	{word: "fifteen", number: 15},
	{word: "sixteen", number: 16},
	{word: "seventeen", number: 17},
	{word: "eighteen", number: 18},
	{word: "nineteen", number: 19},
	{word: "twenty", number: 20}, 
	{word: "thirty", number: 30}, 
	{word: "forty", number: 40}, 
	{word: "fifty", number: 50},
	{word: "sixty", number: 60}, 
	{word: "seventy", number: 70},
	{word: "eighty", number: 80},
	{word: "ninety", number: 90},
];

const higherNumerals: numeralToNumber[] = [
	{word: "hundred", number: 100},
	{word: "thousand", number: 1000},
	{word: "million", number: 1000000}
];

type numeralToNumber = {
	word: string;
	number: number;
}
