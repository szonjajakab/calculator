const operators = [
	{
		operator: '+',
		function: 'handleAddKey',
		keyName: 'add'
	},
	{
		operator: '-',
		function: 'handleSubtractKey',
		keyName: 'subtract'
	},
	{
		operator: '*',
		function: 'handleMultiplyKey',
		keyName: 'multiply'
	},
	{
		operator: '/',
		function: 'handleDivideKey',
		keyName: 'divide'
	},
];

const enterOperand = (calc, operand) => {
	if(typeof operand === 'number'){
		operand = operand.toString();
	}
	for(let i=0; i<operand.length; i++){
		if (operand[i] === '.') {
			calc.handleDotKey();
		}
		else {
			calc.handleNumberKey(operand[i]);
		}
	}
};

const checkActiveOperator = (calc, active) => {
	expect(calc.isActive(active)).toBe(true, `${active} key should active`);
	operators.filter((op) => op.operator !== active).forEach((op) => {
		expect(calc.isActive(op.operator)).toBe(false, `${op.operator} key is active, only ${active} key should active`);
	});
};
const testOperation = (description, operator, firstOperand, secondOperand, result) => {
	let calc;
	const actOperator = operators.filter((op) => op.operator === operator)[0];
	describe(description, () => {
		beforeEach(()=>{
			calc = new Calculator();
			enterOperand(calc, firstOperand);
		});
		it(`should NOT change displayedText, after ${actOperator.operator} key pressed`, () => {
			calc[actOperator.function]();
			expect(calc.displayedText).toBe(typeof firstOperand === 'number' ? firstOperand.toString() : firstOperand);
		});
		it(`should highlight ${actOperator.keyName} key after ${actOperator.operator} key pressed`, () => {
			calc[actOperator.function]();
			checkActiveOperator(calc, operator);
		});
		it(`should highlight ${actOperator.keyName} key after ${actOperator.operator} key pressed after another operator`, () => {
			const otherOps = operators.filter((op) => op.operator !== operator);
			const rand = Math.floor(Math.random()*otherOps.length);
			const otherOp = otherOps[rand];

			calc[otherOp.function]();
			calc[actOperator.function]();
			checkActiveOperator(calc, operator);

		});
		describe('When the first number pressed after + key', () => {
			beforeEach(() => {
				calc[actOperator.function]();
			});
			describe('+ key should NOT highlighted', () => {
				forEach([
					'0',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9'
				]).it('for number "{0}"', (number) => {
					calc.handleNumberKey(number);
					expect(calc.isActive('+')).toBe(false, '+ key is active');
					expect(calc.isActive('-')).toBe(false, '- key is active');
					expect(calc.isActive('*')).toBe(false, '* key is active');
					expect(calc.isActive('/')).toBe(false, '/ key is active');
				});
			});
			describe('should be displayed on the screen', () => {
				forEach([
					'0',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9'
				]).it('for number "{0}"', (number) => {
					calc.handleNumberKey(number);
					expect(calc.displayedText).toBe(number);
				});
			});
		});
		it('should display the result, after = key pressed', () => {
			calc[actOperator.function]();
			// enter second operand
			enterOperand(calc, secondOperand);
			// press equal key
			calc.handleEqualsKey();
			expect(calc.displayedText).toBe(typeof result === 'number' ? result.toString() : result );
		});
	});
};
