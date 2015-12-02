'use strict';

function CalculatorService() {

	// --------------------------------------------
	//  -------------- Variables -------------

	var mFirstNum = 0,
		mSecondNum = 0;

	var isFirstNum = true;

	var mOperation = '';

	var digits = {
		'zero': 0,
		'one': 1,
		'two': 2,
		'three': 3,
		'four': 4,
		'five': 5,
		'six': 6,
		'seven': 7,
		'eight': 8,
		'nine': 9
	};

	var operations = {
		"+": 1,
		"-": 1,
		"/": 1,
		"*": 1
	};

	// --------------------------------------------
	//  -------------- Local functions -------------

	// Returns true if it is a valid operation
	var isOperation = function(oper) {
		if (operations[oper] == 1) {
			return true;
		};
		return false;
	};

	var isOperationEntered = function() {
		return mOperation != '';
	};

	// Adds the digit to the right of the number and returns the result
	var addDigitNumber = function(number, digit) {
		number *= 10;
		return number + digit;
	};

	// Returns the evaluation of the operation on the two numbers
	var doOperation = function(oper, num1, num2) {
		if (oper == "+") {
			return doAdd(num1, num2);
		};
		if (oper == "-") {
			return doSub(num1, num2);
		};
		if (oper == "/") {
			return doDiv(num1, num2);
		};
		if (oper == "*") {
			return doMul(num1, num2);
		};
		return num1;
	};

	var doAdd = function(num1, num2) {
		return num1 + num2;
	};

	var doSub = function(num1, num2) {
		return num1 - num2;
	};

	var doDiv = function(num1, num2) {
		if (num2 > 0) {
			return num1 / num2;
		}
		return 0;
	};

	var doMul = function(num1, num2) {
		return num1 * num2;
	};

	// --------------------------------------------
	//  -------------- Public methods -------------

    this.getDisplay = function () {
    	if (isFirstNum) {
    		return mFirstNum.toString();
    	}
    	else {
    		return mSecondNum.toString();
    	}
    };

    // Enter a new digit, digit is a string e.g. 'one'
    this.enterDigit = function (digit) {
    	var number = digits[digit];
    	if (number != null) {
    		if (!isOperationEntered()) {
    			mFirstNum = addDigitNumber(mFirstNum, number);
    		}
    		else {
    			mSecondNum = addDigitNumber(mSecondNum, number);
    			isFirstNum = false;
    		}
    	};
    };

    // Operation is one character, e.g. '+'
    this.enterOperation = function (operation) {
    	if (isOperation(operation)) {
    		if (isOperationEntered()) {
    			this.enterEquals();
    		};
    		mOperation = operation;
    	};
    };

    // Evaluate the operation and put the resault in mFirstNum
    this.enterEquals = function () {
    	mFirstNum = doOperation(mOperation, mFirstNum, mSecondNum);
    	mOperation = '';
    	mSecondNum = 0;
    	isFirstNum = true;
    };

    // Clear Variables
    this.enterClear = function () {
    	mOperation = '';
    	mSecondNum = 0;
    	mFirstNum = 0;
    	isFirstNum = true;
    };
}