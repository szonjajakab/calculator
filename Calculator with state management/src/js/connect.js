    //példányosítás - a Calculator class új példányát eltároljuk egy konstansban
    const calculator = new Calculator();
    //a querySelectorokkal kiválasztott egyes DOM elemeket is konstansokban tároljuk
    const inputField = document.querySelector("#display");
    const allNumbers = document.querySelectorAll(".num");
    const decDot = document.querySelector("#dot");
    const plusMinus = document.querySelector("#plusminus");
    const percentButton = document.querySelector("#percent");
    const divButton = document.querySelector("#divi");
    const multButton = document.querySelector("#mul");
    const subButton = document.querySelector("#min");
    const addButton = document.querySelector("#plus");
    const equalsButton = document.querySelector("#eql");
    const resetButton = document.querySelector("#reset");
    const delButton = document.querySelector("#del");
    const sqrButton = document.querySelector("#square");
    const sqrtButton = document.querySelector("#sqrt");
    const memInButton = document.querySelector("#MPlus");
    const memOutButton = document.querySelector("#M");
    const memClearButton = document.querySelector("#MC");

    calculator.displayedText = inputField.value

    function updateUI() {
            let number = parseFloat(calculator.displayedText);
            let length = calculator.displayedText.length;
            //az inputField (DOM element) value attribútuma = a friss példány calculator displayedText változójának értéke
            if (length > 11) {
                inputField.value = number.toExponential(5).toString();
            } else {
                inputField.value = calculator.displayedText;
            }

    //Is addButton active?
    const plusIsActive = calculator.isActive('+');
    addButton.className = plusIsActive ? 'active' : '';
    //Is subButton active?
    const subIsActive = calculator.isActive('-');
    subButton.className = subIsActive ? 'active' : '';
    //Is multButton active?
    const multIsActive = calculator.isActive('*');
    multButton.className = multIsActive ? 'active' : '';
    //Is divButton active?
    const divIsActive = calculator.isActive('/');
    divButton.className = divIsActive ? divButton.className = 'active' : '';

    };


    //Az egyes gombok kattintásának lekezelése:
    /*let numbers be displayed*/
    allNumbers.forEach(currentNum => {
        currentNum.addEventListener('click', function (event) {
            calculator.handleNumberKey(event.target.textContent);
            updateUI();
        });
    });

    /*let decimal dot be displayed*/
    decDot.addEventListener('click', function (event) {
        calculator.handleDotKey();
        updateUI();
    });

    /*handling add button*/
    addButton.addEventListener('click', (event) => {
        calculator.handleAddKey();
        updateUI();
    });

    /*handling subtract button*/
    subButton.addEventListener('click', (event) => {
        calculator.handleSubtractKey();
        updateUI();
    });

    /*handling multiply button*/
    multButton.addEventListener('click', (event) => {
        calculator.handleMultiplyKey();
        updateUI();
    });

    /*handling divide button*/
    divButton.addEventListener('click', (event) => {
        calculator.handleDivideKey();
        updateUI();
    });

    /*handling equals button*/
    equalsButton.addEventListener('click', (event) => {
        calculator.handleEqualsKey();
        updateUI();
    });

    /*handling percent button*/
    percentButton.addEventListener('click', (event) => {
        calculator.handlePercentKey();
        updateUI();
    });

    /*handling plus-minus button*/
    plusMinus.addEventListener('click', (event) => {
        calculator.handlePlusMinusKey();
        updateUI();
    });

    /*handling sqr button*/
    sqrButton.addEventListener('click', (event) => {
        calculator.handleSqrKey();
        updateUI();
    });

    /*handling sqrt button*/
    sqrtButton.addEventListener('click', (event) => {
        calculator.handleSqrtKey();
        updateUI();
    });

    /*handling reset button*/
    resetButton.addEventListener('click', (event) => {
        calculator.handleClearKey();
        updateUI();
    })

    /*handling delete button*/
    delButton.addEventListener('click', (event) => {
        calculator.handleDeleteKey();
        updateUI();
    })

    /*handling memory input button*/
    memInButton.addEventListener('click', (event) => {
        calculator.handleMemoryInKey();
        updateUI();
    })

    /*handling memory output button*/
    memOutButton.addEventListener('click', (event) => {
        calculator.handleMemoryOutKey();
        updateUI();
    })

    /*handling clearing memory button*/
    memClearButton.addEventListener('click', (event) => {
        calculator.handleMemoryClearKey();
        updateUI();
    })
