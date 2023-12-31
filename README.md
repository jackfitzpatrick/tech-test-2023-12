# English Numeral to Number

## Objective

The objective of this technical challenge is to create a function which can convert an english numeral to a number.

Your function should accept a single argument which is a string, and return a number.

It should be able to convert any string to a number from 0 to 1 million.

If the string passed cannot be converted to a number then NaN should be returned.

Below are some examples.

- "This is not a number" should return `NaN`
- "Three" and "three" should return `3`
- "Twenty-four" and "twenty four" should return `24`
- "Eight hundred and twelve" should return `812`
- "Seven hundred and forty nine thousand, five hundred and eighty one" should return `749581`

## Instructions

A skeleton function exists inside `numeralToNumber.ts`, along with a unit test for the file in `numeralToNumber.test.ts`

To complete this challenge you will need to update the function in `numeralToNumber.ts` to satisfy the requirements outlined in the objective above.

You can spend as little or as much time as you like on this task, there is no official limit, but as a rough guide it should take you no more than a few hours.

## To run tests
- run `npm i`
- run `npm run test`
