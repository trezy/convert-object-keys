const createObjectReducer = (transformer, deepTransform) => {
  return (accumulator, [key, value]) => {
    const transformedKey = transformer(key)
    let clonedValue = value

    if (deepTransform) {
      if (typeof value === 'object') {
        clonedValue = convertObjectKeys(value, transformer, deepTransform, true)
      }
    }

    accumulator[transformedKey] = clonedValue

    return accumulator
  }
}

const typeCheckForFirstRecursion = (input, transformer) => {
  if ((typeof input !== 'object') || (input === null)) {
    throw new TypeError(`Expected either an object or an array, received ${typeof input}`)
  }

  if (typeof transformer !== 'function') {
    throw new TypeError(`Transformer must be a function, received ${typeof transformer}`)
  }
}

const convertObjectKeys = (input, transformer, deepTransform = true, hasRecursed = false) => {
  if (!input) {
    throw new Error(`Input is required and must be either an object or an array, received ${input}`)
  }

  if (!hasRecursed) {
    typeCheckForFirstRecursion(input, transformer)
  }

  if ((!hasRecursed || deepTransform) && Array.isArray(input)) {
    return input.map(item => convertObjectKeys(item, transformer, deepTransform, true))
  }

  return Object.entries(input).reduce(createObjectReducer(transformer, deepTransform), {})
}





export default convertObjectKeys
