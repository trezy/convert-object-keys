import { expect } from 'chai'





import convertObjectKeys from '../src/convertObjectKeys'





describe('convertObjectKeys', function () {
  describe('with an object for input', function () {
    const input = {
      FOO: 'foo',
      BAR: {
        BAZ: 'baz',
      },
      BLEP: [
        { BEEP: 'beep' },
        { BOOP: 'boop' },
      ],
    }
    const transformer = key => key.toLowerCase()

    it('should convert keys', () => {
      const convertedInput = convertObjectKeys(input, transformer)

      expect(convertedInput).to.have.property('foo', 'foo')
      expect(convertedInput).to.not.have.property('FOO')
    })

    describe('without `deepTransform` set', function () {
      const convertedInput = convertObjectKeys(input, transformer)

      it('should convert shallow object keys', function () {
        expect(convertedInput).to.have.deep.property('bar')
        expect(convertedInput).to.not.have.property('BAR')
      })

      it('should convert deep object keys', function () {
        expect(convertedInput.bar).to.have.property('baz', 'baz')
        expect(convertedInput.bar).to.not.have.property('BAZ')
      })

      it('should convert the keys of objects that are nested inside arrays', function () {
        expect(convertedInput.blep).to.deep.include({ beep: 'beep' })
        expect(convertedInput.blep).to.not.deep.include({ BEEP: 'beep' })
      })
    })

    describe('with `deepTransform` enabled', function () {
      const convertedInput = convertObjectKeys(input, transformer, true)

      it('should convert shallow object keys', function () {
        expect(convertedInput).to.have.deep.property('bar')
        expect(convertedInput).to.not.have.property('BAR')
      })

      it('should convert deep object keys', function () {
        expect(convertedInput.bar).to.have.property('baz', 'baz')
        expect(convertedInput.bar).to.not.have.property('BAZ')
      })

      it('should convert the keys of objects that are nested inside arrays', function () {
        expect(convertedInput.blep).to.deep.include({ beep: 'beep' })
        expect(convertedInput.blep).to.not.deep.include({ BEEP: 'beep' })
      })
    })

    describe('with `deepTransform` disabled', function () {
      const convertedInput = convertObjectKeys(input, transformer, false)

      it('should convert shallow object keys', function () {
        expect(convertedInput).to.have.deep.property('bar')
        expect(convertedInput).to.not.have.property('BAR')
      })

      it('should NOT convert deep object keys', function () {
        expect(convertedInput.bar).to.have.property('BAZ', 'baz')
        expect(convertedInput.bar).to.not.have.property('baz')
      })

      it('should NOT convert the keys of objects that are nested inside arrays', function () {
        expect(convertedInput.blep).to.deep.include({ BEEP: 'beep' })
        expect(convertedInput.blep).to.not.deep.include({ beep: 'beep' })
      })
    })
  })

  describe('with an array for input', function () {
    const input = [{
      FOO: {
        BAR: 'bar',
        BAZ: [
          { BEEP: 'beep' },
          { BOOP: 'boop' },
        ],
      },
    }]
    const transformer = key => key.toLowerCase()

    it('should convert keys', () => {
      const convertedInput = convertObjectKeys(input, transformer)

      expect(convertedInput[0]).to.have.property('foo')
      expect(convertedInput[0]).to.not.have.property('FOO')
    })

    describe('without `deepTransform` set', function () {
      const convertedInput = convertObjectKeys(input, transformer)

      it('should convert shallow object keys', () => {
        expect(convertedInput[0]).to.have.property('foo')
        expect(convertedInput[0]).to.not.have.property('FOO')
      })

      it('should convert deep object keys', () => {
        expect(convertedInput[0].foo).to.have.property('bar', 'bar')
        expect(convertedInput[0].foo).to.not.have.property('BAR')
      })

      it('should convert the keys of objects that are nested inside arrays', () => {
        expect(convertedInput[0].foo.baz).to.deep.include({ beep: 'beep' })
        expect(convertedInput[0].foo.baz).to.not.deep.include({ BEEP: 'beep' })
      })
    })

    describe('with `deepTransform` enabled', function () {
      const convertedInput = convertObjectKeys(input, transformer, true)

      it('should convert shallow object keys', () => {
        expect(convertedInput[0]).to.have.property('foo')
        expect(convertedInput[0]).to.not.have.property('FOO')
      })

      it('should convert deep object keys', () => {
        expect(convertedInput[0].foo).to.have.property('bar', 'bar')
        expect(convertedInput[0].foo).to.not.have.property('BAR')
      })

      it('should convert the keys of objects that are nested inside arrays', () => {
        expect(convertedInput[0].foo.baz).to.deep.include({ beep: 'beep' })
        expect(convertedInput[0].foo.baz).to.not.deep.include({ BEEP: 'beep' })
      })
    })

    describe('with `deepTransform` disabled', function () {
      const convertedInput = convertObjectKeys(input, transformer, false)

      it('should convert shallow object keys', () => {
        expect(convertedInput[0]).to.have.property('foo')
        expect(convertedInput[0]).to.not.have.property('FOO')
      })

      it('should NOT convert deep object keys', () => {
        expect(convertedInput[0].foo).to.have.property('BAR', 'bar')
        expect(convertedInput[0].foo).to.not.have.property('bar')
      })

      it('should NOT convert the keys of objects that are nested inside arrays', () => {
        expect(convertedInput[0].foo.BAZ).to.deep.include({ BEEP: 'beep' })
        expect(convertedInput[0].foo.BAZ).to.not.deep.include({ beep: 'beep' })
      })
    })
  })

  describe('with a function for input', function () {
    const input = () => {}
    const transformer = key => key.toLowerCase()

    it('should throw an error', () => {
      expect(() => convertObjectKeys(input, transformer)).to.throw('Expected either an object or an array, received function')
    })
  })

  describe('with a string for input', function () {
    const input = 'What\'s up?'
    const transformer = key => key.toLowerCase()

    it('should throw an error', () => {
      expect(() => convertObjectKeys(input, transformer)).to.throw('Expected either an object or an array, received string')
    })
  })

  describe('with a null for input', function () {
    const input = null
    const transformer = key => key.toLowerCase()

    it('should throw an error', () => {
      expect(() => convertObjectKeys(input, transformer)).to.throw('Input is required and must be either an object or an array, received null')
    })
  })

  describe('with undefined for input', function () {
    const input = undefined
    const transformer = key => key.toLowerCase()

    it('should throw an error', () => {
      expect(() => convertObjectKeys(input, transformer)).to.throw('Input is required and must be either an object or an array, received undefined')
    })
  })

  describe('with an invalid transformer', function () {
    it('should throw an error', () => {
      expect(() => convertObjectKeys({}, 'invalid transformer')).to.throw('Transformer must be a function, received string')
    })
  })
})
