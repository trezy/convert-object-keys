module.exports = {
  env: { browser: true },
  extends: '@fuelrats/eslint-config',
  rules: {
    'arrow-body-style': ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['off'],
    'no-use-before-define': ['off'],
    'import/prefer-default-export': ['off'],
  },
}
