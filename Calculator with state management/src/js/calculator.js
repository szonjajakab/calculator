//Definition of +,-,*,/ operators
const ADD_OPERATOR = {
	name: "add",
	sign: "+",
	calculate: (num1, num2) => num1 + num2
}
const SUBTRACT_OPERATOR = {
	name: "sub",
	sign: "-",
	calculate: (num1, num2) => num1-num2
}
const MULTIPLY_OPERATOR = {
	name: "mult",
	sign: "*",
	calculate: (num1, num2) => num1*num2
}
const DIVIDE_OPERATOR = {
	name: "div",
	sign: "/",
	calculate: (num1, num2) => num1 / num2
}

const DO_NOTHING = () => {}


//State objects (State machine)

//INITIAL STATE
// *** Only "0" is Displayed ***
const INITIAL_STATE = {
	name: "Initial_State",
	handleNumberKey: (calculator, number) => {
			calculator.displayedText = number;
			calculator.state = FIRST_NUMBER_STATE;
	},
	handleDotKey: (calculator) => {
		calculator.displayedText = "0.";
		calculator.state = FIRST_NUMBER_DECIMAL_STATE;
	},
	handleOperator: (calculator, operator) => {
		calculator.operator = operator;
		calculator.num1 = parseFloat(calculator.displayedText);
		calculator.state = SECOND_NUMBER_START_STATE;
	},
	handleEqualsKey: DO_NOTHING,
	handleDeleteKey: DO_NOTHING
};

//FIRST NUMBER STATE
// *** Input of First Operand (NO DOT in it!) ***
const FIRST_NUMBER_STATE = {
	name: "First_Number_State",
	handleNumberKey: (calculator, number) => {
		if (calculator.displayedText === '0') {
			calculator.displayedText = number;
		} else {
			calculator.displayedText += number;
		}
	},
	handleDotKey: (calculator) => {
		calculator.displayedText += ".";
		calculator.state = FIRST_NUMBER_DECIMAL_STATE;
	},
	handleOperator: INITIAL_STATE.handleOperator,
	handleEqualsKey: DO_NOTHING,
	handleDeleteKey: (calculator) => {
		if (calculator.displayedText.length > 1) {
			calculator.displayedText = calculator.displayedText.slice(0,-1).toString();
		} else {
			calculator.displayedText = "0";
			calculator.state = INITIAL_STATE;
		}
	}
};

//FIRST NUMBER DECIMAL STATE
// *** Input of First Operand (with DOT in it!) ***
const FIRST_NUMBER_DECIMAL_STATE = {
	name: "First_Number_Decimal_State",
	handleNumberKey: FIRST_NUMBER_STATE.handleNumberKey,
	handleDotKey: DO_NOTHING,
	handleOperator: FIRST_NUMBER_STATE.handleOperator,
	handleEqualsKey: DO_NOTHING,
	handleDeleteKey: (calculator) => {
		if (calculator.displayedText.length > 1) {
			calculator.displayedText = calculator.displayedText.slice(0,-1).toString();
				if (calculator.displayedText.includes('.') == false) {
					calculator.state = FIRST_NUMBER_STATE
				}
		} else {
			calculator.displayedText = "0";
			calculator.state = INITIAL_STATE;
		}
	}
};

//SECOND NUMBER START STATE
// *** Starting Input of Secon Operand ***
const SECOND_NUMBER_START_STATE = {
	name: "Second_Number_Start",
	handleNumberKey: (calculator, number) => {
			calculator.displayedText = number;
			calculator.state = SECOND_NUMBER_STATE;
	},
	handleDotKey: (calculator) => {
		calculator.displayedText = "0.";
		calculator.state = SECOND_NUMBER_DECIMAL_STATE;
	},
	handleOperator:(calculator, operator) => {
		calculator.operator = operator;
	},
	handleEqualsKey: (calculator) => {
		calculator.num1 = parseFloat(calculator.displayedText);
		calculator.num2 = calculator.num1;
		calculator.calculateAndDisplayResult();
	},
	handleDeleteKey: () => {
		calculator.state = INITIAL_STATE;
	}
};

//SECOND NUMBER STATE
// *** Input of Second Operand (NO DOT in it!) ***
const SECOND_NUMBER_STATE = {
	name: "Second_Number_State",
	handleNumberKey: (calculator, number) => {
		if (calculator.displayedText === '0') {
			calculator.displayedText = number;
		} else {
			calculator.displayedText += number;
		}
	},
	handleDotKey: (calculator) => {
		calculator.displayedText += ".";
		calculator.state = SECOND_NUMBER_DECIMAL_STATE;
	},
	handleOperator:(calculator, operator) => {
		calculator.num2 = parseFloat(calculator.displayedText)
		calculator.calculateAndDisplayResult();
		calculator.operator = operator;
		calculator.state = RESULT_DISPLAYED;
		calculator.num1 = parseFloat(calculator.displayedText);
		calculator.num2 = 0;
		calculator.operator = operator;
		calculator.state = SECOND_NUMBER_START_STATE;
	},
	handleEqualsKey: (calculator) => {
		calculator.num2 = parseFloat(calculator.displayedText);
		calculator.calculateAndDisplayResult();
		calculator.state = RESULT_DISPLAYED;
	},
	handleDeleteKey: (calculator) => {
		if (calculator.displayedText.length > 1) {
			calculator.displayedText = calculator.displayedText.slice(0,-1).toString();
		} else {
			calculator.displayedText = "0";
			calculator.state = SECOND_NUMBER_START_STATE;
		}
	}
};

//SECOND NUMBER DECIMAL STATE
// *** Input of Second Operand (with DOT in it!) ***
const SECOND_NUMBER_DECIMAL_STATE = {
	name: "Second_Number_Decimal_State",
	handleNumberKey: SECOND_NUMBER_STATE.handleNumberKey,
	handleDotKey: DO_NOTHING,
	handleOperator: SECOND_NUMBER_STATE.handleOperatorKey,
	handleEqualsKey: SECOND_NUMBER_STATE.handleEqualsKey,
	calculateAndDisplayResult: SECOND_NUMBER_STATE.calculateAndDisplayResult,
	handleDeleteKey: (calculator) => {
		if (calculator.displayedText.length > 1) {
			calculator.displayedText = calculator.displayedText.slice(0,-1).toString();
				if (calculator.displayedText.includes('.') == false) {
					calculator.state = SECOND_NUMBER_STATE
				}
		} else {
			calculator.displayedText = "0";
			calculator.state = SECOND_NUMBER_START_STATE;
		}
	}
};

//RESULT DISPLAY STATE
// *** Display Result ***
const RESULT_DISPLAYED = {
	name: "End_Result",
	handleNumberKey: (calculator, number) => {
		calculator.displayedText = number;
		calculator.state = FIRST_NUMBER_STATE;
	},
	handleDotKey: INITIAL_STATE.handleDotKey,
	handleOperator: (calculator, operator) => {
		calculator.num1 = parseFloat(calculator.displayedText);
		calculator.num2 = 0;
		calculator.operator = operator;
		calculator.state = SECOND_NUMBER_START_STATE;
	},
	handleEqualsKey: (calculator) =>{
        calculator.calculateAndDisplayResult();
		calculator.state = RESULT_DISPLAYED;
	},
	handleDeleteKey: (calculator) => {
		calculator.handleClearKey();
	}
};


class Calculator {

	constructor() {
		this.displayedText = '0';
		this.num1 = 0;
		this.num2 = 0;
		this.operator = null;
		this.state = INITIAL_STATE;
	}

//Handling number inputs
	handleNumberKey(number) {
		this.state.handleNumberKey(this, number);
	}
	handleDotKey(){
		this.state.handleDotKey(this);
	}

//Handling complex operations
	handleAddKey() {
		this.state.handleOperator(this, ADD_OPERATOR);
	}
	handleSubtractKey() {
		this.state.handleOperator(this, SUBTRACT_OPERATOR);
	}
	handleMultiplyKey() {
		this.state.handleOperator(this, MULTIPLY_OPERATOR);
	}
	handleDivideKey() {
		this.state.handleOperator(this, DIVIDE_OPERATOR);
	}
	handleEqualsKey() {
		this.state.handleEqualsKey(this);
	}

//Handling simple operations
	handlePercentKey() {
		this.displayedText = (parseFloat(this.displayedText) / 100).toString();
		if (this.displayedText == 'NaN') {
			this.displayedText = 'error'
		}
		this.state = INITIAL_STATE;
	}
	handlePlusMinusKey() {
		this.displayedText = (parseFloat(this.displayedText) * -1).toString();
		if (this.displayedText == 'NaN') {
			this.displayedText = 'error'
		}
		/*így is lehetne:
		if(this.displayedText.charAt(0) === '-'){
			this.displayedText = this.displayedText.substr(1);
		}
		else{
			this.displayedText = '-' + this.displayedText;
		}
		*/
	}
	handleSqrKey(result) {
		this.displayedText = (parseFloat(this.displayedText) * parseFloat(this.displayedText)).toString();
		if (this.displayedText == 'NaN') {
			this.displayedText = 'error'
		}
		this.state = INITIAL_STATE;
	}
	handleSqrtKey() {
		this.displayedText = (Math.sqrt(parseFloat(this.displayedText))).toString();
		if (this.displayedText == 'NaN') {
			this.displayedText = 'error'
		}
		this.state = INITIAL_STATE;
	}

//Handling memory
	handleMemoryInKey() {
		let data = localStorage.getItem('memory')
		if(data != null){
			data = parseFloat(data);
			data +=  parseFloat(this.displayedText);
			localStorage.setItem('memory', data);
		}
		else
		 localStorage.setItem('memory', parseFloat(this.displayedText))
	}
	handleMemoryOutKey() {
		 let data = localStorage.getItem('memory')
		 if(data != null)
		this.displayedText =data;
	}
	handleMemoryClearKey() {
		localStorage.removeItem('memory')
	}

//Handling reset and deleting by digits
	handleDeleteKey() {
		this.state.handleDeleteKey(this);
	}
	handleClearKey() {
		calculator.displayedText = "0";
		calculator.num1 = 0;
		calculator.num2 = 0;
		calculator.operator = null;
		calculator.state = INITIAL_STATE;
	}

//Handling calculation of complex operations
	calculateAndDisplayResult() {
		this.displayedText = this.operator.calculate(this.num1, this.num2).toString();
		if (this.displayedText == 'Infinity' || this.displayedText == 'NaN' || this.displayedText == 'error') {
			this.displayedText = 'error'
		}
	}
	/*
	 * Check if an operator button is highlighted
	 * @param {string} button: Sign of the highlighted button
	 */
	isActive(button) {
		if(this.state === SECOND_NUMBER_START_STATE && this.operator.sign === button){
			return true;
		}
		return false;
	}
}
