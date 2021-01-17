/**
 * Using only the function "oneOrTwo()" below (and therefore no other existing function to obtain random),
 * code a function "dice()" who return a number between 1 and 6 (a classic dice) with exactly the
 * same probability for each number
 */

/**
 * Return randomly 1 or 2
 * @return {1|2}
 */
function oneOrTwo() {
  return Math.floor(Math.random() * 2) + 1
}

// Bad
function diceV1(){
  // Not equitable
  // obtain 0 = 50%, 1 = 25% and 2 = 25%
  const randomIndex = (oneOrTwo() + oneOrTwo()) % 3
  // divide the 6 faces in 2 ranges of 3 number to select with result of random3
  if (oneOrTwo() === 2) {
    return [4, 5, 6][randomIndex]
  }
  return [1, 2, 3][randomIndex]
}

// Closer
function diceV2() {
  const random = Math.ceil((oneOrTwo() * oneOrTwo() * oneOrTwo() * oneOrTwo() * oneOrTwo()) / 4)

  let number = oneOrTwo()
  if (number === 1 && oneOrTwo() === 2) {
    // Obtain 50% for 2 an 25% for 1 and 3
    number += 2
  }
  // 50% of 2 split with 4
  if (number === 2 && oneOrTwo() === 2) {
    // obtain 25% between 1 and 4
    number += 2
  }

  // probability 65%
  if (random === 1 || random === 4) {
    // 16,4%
    if (number <= 2 && oneOrTwo() === 2) {
      number += 4
    }
    // 16,4%
    if (number <= 4 && number > 2 && oneOrTwo() === 2) {
      number += 2
    }
  }
  return number;
}

// Contain lost (6% of result = 0)
function diceV3() {
  let random = oneOrTwo() * oneOrTwo() * oneOrTwo() * oneOrTwo() * oneOrTwo()

  let number = 0 // 6.27% lost
  if (random === 4) { // 31.25%
    number += oneOrTwo()
  } else if(random === 8) { // 31.25%
    number += oneOrTwo() + 2
  } else if (random === 2 || random === 16) { // 31.25%
    number += oneOrTwo() + 4
  }
  return number
}

/**
 * Generate a number between 0 and 2 fairly
 * @return {0|1|2}
 */
function random3() {
  let number = 0
  // Multiply random
  // use 12 because is most reliable to obtain equitable repartition
  for (let i = 0; i <= 12; i++) {
    number += oneOrTwo()
  }
  // Use module to get repartition between 0 an 3
  return number % 3
}

/**
 * Best solution
 */
function dice() {
  const randomIndex = random3()
  // divide the 6 faces in 2 ranges of 3 number to select with result of random3
  if (oneOrTwo() === 2) {
    return [4, 5, 6][randomIndex]
  }
  return [1, 2, 3][randomIndex]
}

// More efficient
function dice2(faces = 6) {
  let number = 0
  // Use double of faces to obtain perfect repartition
  for (let i = 1; i <= faces * 2; ++i) {
    number += oneOrTwo() * i // multiply by iterator to enlarge range of repartition
  }
  // Modulo 6 to limit result in range 0 - 5 and + 1 to shift range to 1 - 6
  return number % faces + 1
}

function dice3() {
  let number = ''
  for (let i = 0; i < 3; i++) {
    number += (oneOrTwo() % 2)
  }
  if (number === '000' || number === '111') {
    return dice3()
  }
  return parseInt(number, 2)
}

const results = [
  0, // 1
  0, // 2
  0, // 3
  0, // 4
  0, // 5
  0, // 6
]

// Check 1 millions times to smooth results
const total = 1000000
for (let i = 1; i <= total; i++) {
  const result = dice3() - 1
  if (typeof results[result] === 'undefined') {
    results[result] = 0
  }
  ++results[result]
}

console.log('Probability for 1 Million try')
console.log(results.map((result, i) => `${i + 1}: ${((result / total) * 100).toFixed(2)}`))
