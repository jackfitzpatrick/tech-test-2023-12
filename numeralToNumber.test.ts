import { numeralToNumber } from "./numeralToNumber";

describe("numeralToNumber.ts", () => {
	test("typeof result should be a number", () => {
		const result = numeralToNumber("");

		expect(typeof result).toBe("number");
	});

	test("non numeral string returns NaN", () => {
		const result = numeralToNumber("Not a number");

		expect(result).toBe(NaN);
	});

	const cases = [
		["zero", 0],
		["two", 2],
		["TWO", 2],
		["twenty-two", 22],
		["twenty two", 22],
		["two hundred", 200],
		["two hundred and twenty", 220],
		["two hundred and twenty two", 222],
		["two thousand", 2000],
		["two thousand, two hundred and twenty two", 2222],
		["twenty thousand and two hundred and twenty two", 20222],
		["two hundred and twenty two thousand, two hundred and twenty two", 222222],
		["one million", 1000000],
		["Three", 3],
		["three", 3],
		["twenty four", 24],
		["Twenty-four", 24],
		["Eight hundred and twelve", 812],
		["Seven hundred and forty nine thousand, five hundred and eighty one", 749581],
	];

	test.each(cases)("string %p returns number %p", (input, expected) => {
		const result = numeralToNumber(input as string);

		expect(result).toStrictEqual(expected as number);
	});
});
