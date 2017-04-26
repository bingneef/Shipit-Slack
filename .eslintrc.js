module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  rules: {
    'semi': [2, "never"],
    'no-multi-spaces': 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0
  }
}
