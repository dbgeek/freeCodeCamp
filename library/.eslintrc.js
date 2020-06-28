module.exports = {
	"env": {
		'es6': true,
		'node': true,
		'commonjs': true,
	},
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'indent': [
			'error',
			'4'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'prefer-const': [
			'error',
			{
				'destructuring': 'any',
				'ignoreReadBeforeAssign': false
			}
		]
	}
};