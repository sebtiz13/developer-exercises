/**
 * Code a function to parse an number string without use the internal functions (parseInt(var) or Number(var))
 * Example: parseInt("-142") > -142
 */

const test = ['1', '13', '42', '-142']


// Addition an string to "undefined" output an number
function hackParse(number) {
  return +number
}

// True response
function parseInt(value) {
  let number = 0
  let negate = false
  // if is negative number
  if (value.indexOf('-') === 0) {
    negate = true
    value = value.substring(1)
  }

  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    // charCode of numbers are contained between 48 and 57
    if (charCode >= 48 && charCode <= 57) {
      number = number * 10 + (charCode - 48)
    } else {
      // If charCode are not a number return NaN
      return NaN
    }
  }

  // Negative parsed number
  if (negate) {
    return number * -1
  }
  return number
}

test.forEach((number) => {
  console.log(`parse: "${number}"`)
  console.log(parseInt(number))
})
