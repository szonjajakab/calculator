describe('Calculator class', () => {

	let calc;

	beforeEach(() => {
		calc = new Calculator();
	});

	it('should be constructed properly', () => {
		expect(calc).not.toBeNull();
	});

	describe('US01 initial state', () => {
		it('dispayedText should contain "0" initially', () => {
			expect(calc.displayedText).toBe('0');
		});

	});

	describe('US02 See the updated number on the display each time I press a number key', () => {
		it('should add all the entered numbers to the displayedText', () => {
			calc.handleNumberKey('1');
			calc.handleNumberKey('2');
			calc.handleNumberKey('3');
			calc.handleNumberKey('4');
			calc.handleNumberKey('5');
			calc.handleNumberKey('6');
			calc.handleNumberKey('7');
			calc.handleNumberKey('8');
			calc.handleNumberKey('9');
			calc.handleNumberKey('0');
			expect(calc.displayedText).toBe('1234567890');
		});

		it('should ignore initial zeros', () => {
			calc.handleNumberKey('0');
			calc.handleNumberKey('0');
			calc.handleNumberKey('0');
			calc.handleNumberKey('4');
			calc.handleNumberKey('5');
			expect(calc.displayedText).toBe('45');
		});

	});
	describe('US03 Type decimal numbers', () => {


		it('should accept decimal numbers', () => {
			calc.handleNumberKey('1');
			calc.handleDotKey();
			calc.handleNumberKey('0');
			calc.handleNumberKey('9');
			calc.handleNumberKey('3');
			expect(calc.displayedText).toBe('1.093');
		});

		it('should ignore the decimal separator if it is already entered', () => {
			calc.handleNumberKey('0');
			calc.handleDotKey();
			calc.handleDotKey();
			calc.handleNumberKey('0');
			calc.handleNumberKey('9');
			calc.handleDotKey();
			calc.handleNumberKey('3');
			expect(calc.displayedText).toBe('0.093');
		});

		it('should accept, if the very first key is the decimal separator', () => {
			calc.handleDotKey();
			calc.handleNumberKey('0');
			calc.handleNumberKey('9');
			expect(calc.displayedText).toBe('0.09');
		});
	});
	testOperation('US04 Add two number', '+', 362.32, 123.23, 485.55);
	testOperation('US05 Substract two number', '-', 16, '27.', 16 - 27);
	testOperation('US06 Multiply two number', '*', '12', '5', 12 * 5);
	testOperation('US07 Divide two number', '/', '123.34', '.43', 123.34 / 0.43);
	describe('US09 Enter percentage easy', () => {
		it('should show the hundredth of the entered number', () => {
			enterOperand(calc, 27.5);
			calc.handlePercentKey();
			expect(calc.displayedText).toBe('0.275');
		});
	});
	describe('US10 Change sign', () => {
		it('should change the sign of the entered number', () => {
			const num = 5872394.324;
			enterOperand(calc, num);
			calc.handlePlusMinusKey();
			expect(calc.displayedText).toBe(`-${num}`);
		});
		it('should change the sign of the displayed number', () => {
			const fo = 0.23;
			const so = 1231.34;
			enterOperand(calc, fo);
			calc.handleSubtractKey();
			enterOperand(calc, so);
			calc.handleEqualsKey();
			calc.handlePlusMinusKey();
			expect(calc.displayedText).toBe(`${(fo - so) * -1}`);
		});
		it('should NOT change 0', () => {
			calc.handlePlusMinusKey();
			expect(calc.displayedText).toBe('0');
		});
	});
});