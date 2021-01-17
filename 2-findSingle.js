/**
 * Suppose we have an array of numbers, where all numbers are repeated twice
 * except one. Code a function that takes as input an array and return the single number or an error
 * if not found.
 * example findSingle([4,8,8,5,1,4,5]) > 1
 */

const test = [
  // with single
  [4,8,8,5,1,4,5],
  // without single
  [4,8,8,5,4,5],
]

/**
 *
 * @param {Number[]} numbers
 */
function findSingleV1(numbers) {
  const checked = [];
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    // Prevent double check
    if (!checked.includes(number)) {
      checked.push(number)
      // If number is not duplicated, return it
      if (!numbers.slice(i + 1).includes(number)) {
        return number;
      }
    }
  }
  // If no unique number was detected, throw an error
  throw new Error('Single number not found')
}

function findSingle(numbers) {
  // Sort to group the pairs
  numbers.sort()
  // Iterate by two to test if we have a pair
  for(let i = 0; i < numbers.length; i += 2) {
    if(numbers[i] !== numbers[i + 1]) {
      return numbers[i]
    }
  }
  // If no unique number was detected, throw an error
  throw new Error('Single number not found')
}

test.forEach((numbers) => {
  try {
    console.log(`Test: ${JSON.stringify(numbers)}`)
    console.log(findSingle(numbers));
  } catch (error) {
    console.error(error.message)
  }
})
