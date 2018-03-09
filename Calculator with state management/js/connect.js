const calculator = new Calculator();
const inputField = document.querySelector('input');
const addButton = document.querySelector('#add');
const subButton = document.querySelector('#sub')
const multButton = document.querySelector('#mult')
const divButton = document.querySelector('#div')
const allNumbers = document.querySelectorAll(".num");
const decDot = document.querySelector("#decimal");
const clearButton = document.querySelector("#reset");
const equButton = document.querySelector("#equ");
const negButton = document.querySelector("#negat");
function updateUI() {
    inputField.value = calculator.displayedText;
    //Összeadás aktív?
    const plusIsActive = calculator.isActive('+');
    addButton.className = plusIsActive ? addButton.className = 'operator button active' : '';
    //Kivonás aktív?
    const subIsActive = calculator.isActive('-');
    subButton.className = subIsActive ? subButton.className = 'operator button active' : '';
    //Szorzás aktív?
    const multIsActive = calculator.isActive('*');
    multButton.className = multIsActive ? multButton.className = 'operator button active' : '';
    //Osztás aktív?
    const divIsActive = calculator.isActive('/');
    divButton.className = divIsActive ? divButton.className = 'operator button active' : '';
}

/*a számok jelenjenek meg a kijelzőn*/
    allNumbers.forEach(currentNum => {
    currentNum.addEventListener('click', function (event) {
        calculator.handleNumberKey(event.target.textContent);
        updateUI();
    });
});

/*a tizedespont jelenjen meg a kijelzőn*/
    decDot.addEventListener('click', function (event) {
    calculator.handleDotKey();
    updateUI();
});

//Összedadás
addButton.addEventListener('click', (event) => {
    calculator.handleAddKey();
    updateUI();
});

//Kivonás
subButton.addEventListener('click', (event) => {
    calculator.handleSubtractKey();
    updateUI();
});

//Osztás
divButton.addEventListener('click', (event) => {
    calculator. handleDivideKey();
    updateUI();
});

//Szorzás
multButton.addEventListener('click', (event) => {
    calculator.handleMultiplyKey();
    updateUI();
});
//Törlés
clearButton.addEventListener('click', (event) => {
    calculator.handleClearKey();
    updateUI();
});

//Egyenlő
equButton.addEventListener('click', (event) => {
    calculator.handleEqualsKey();
    updateUI();
});

//Előjel váltás
negatButton.addEventListener('click', (event) => {
    calculator.handlePlusMinusKey();
    updateUI();
});

