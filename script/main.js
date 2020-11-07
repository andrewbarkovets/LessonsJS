'use strict';

// Переменные 
const calcStart = document.getElementById('start'),
    calcCancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    depositBank = document.querySelector('.deposit-bank'), 
    depositAmount = document.querySelector('.deposit-amount'), 
    depositPercent = document.querySelector('.deposit-percent'), 
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    dataInputText = document.querySelectorAll('.data input[type=text]'),
    dataInput = document.querySelectorAll('input[type=text]'),
    targetAmonth = document.querySelector('.target-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

// Объект appData с переменными и методами
class AppData {
    constructor() {

        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMounts = 0;

    }
    calcStart() {

        // Замена 
        if(!this.isNumber(salaryAmount.value)) {
            alert('Введите сумму в поле "Месячный доход"!');
                return;
        }

        calcCancel.style.display = 'block';
        calcStart.style.display = 'none';

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.targetMonth();
        this.getAddIncome();
        this.getAddExpenses();
        this.getInfoDeposit();
        this.getBudget();
        this.blockInputs();
        this.isNumber();       
        this.showResult();
        
    }

    // Метод проверки на число!
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    // Блокировать все input[type=text]
    blockInputs(disabled = true) {

        document.querySelectorAll('.data input[type=text]').forEach((items) => {
            items.disabled = disabled;
        });
    }

    // Reset
    reset() {
        
        // Функция удаление clon - инпутов
        for (let i = incomeItems.length - 1; i > 0 ; i--) {
            incomeItems[i].remove(incomeItems[i]);
            incomePlus.style.display = 'block';
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[i].remove(expensesItems[i]);
            expensesPlus.style.display = 'block';
        }

        calcCancel.style.display = 'none';
        calcStart.style.display = 'block';

        this.blockInputs(false);

        dataInput.forEach((item) => {
            item.value = '';
        });

        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMounts = 0;

        depositCheck.checked = false;
        this.depositHandler();
        this.changePercent();
        this.getBudget();
        periodSelect.value = periodAmount.textContent = 1;
        this.blockStart();
    }

    // Вывод результатов вычисления
    showResult() {
        
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSaveMoney();

    }

    // Метод добавления инпута
    addExpensesBlock() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');

        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';

        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }

    }

    addIncomeBlock() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');

        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';

        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }

    }

    // Получение  расходов
    getExpenses() {
        
        expensesItems.forEach((item) => {

            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
                expensesItems.value = '';
            }

        });
    }

    // Получение  доходов
    getIncome() {
     
        incomeItems.forEach((item) => {

            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;

            }
            for (let key in this.income) {
                this.incomeMounts += +this.income[key];
            }

        });
    }

    // Ввывод расходов
    getAddExpenses() {
     
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    // Возможные доходы
    getAddIncome() {
      
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    // Метод возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth() {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;

    }

    // Метод возвращает Накопления за месяц (Доходы минус расходы)
    getBudget() {

        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

        if (!this.budget) {
            this.budget = 0;
        }
        this.budgetMonth = this.budget + this.incomeMounts - this.expensesMonth + monthDeposit;
        // budgetDay высчитываем исходя из значения месячного накопления
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    }

    // метод getStatusIncome
    getStatusIncome() {

        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        } else {
            return ('Введите данные!');
        }

    }

    // getTargetMonth 
    getTargetMonth() {
        return Math.ceil(targetAmonth.value / this.budgetMonth);
    }

    // метод подсчета за какое время будет достигнута цель
    targetMonth() {

        if (this.getTargetMonth() > 0) {
            return console.log((`Цель будет достигнута за: ${this.getTargetMonth()} месяца(ев)`));
        } else if (this.getTargetMonth() < 0) {
            return console.log(('Цель не будет достигнута!'));
        }

    }

    // метод работы с депозитом
    getInfoDeposit() {

        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }

    }
    changePercent() {
        const valueSelect = this.value;

        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            this.depositPercent = depositPercent.value; 
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    // Накопления депозита
    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    // Работа с депозитом!
    depositHandler() {
        if(depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block'; 
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }

    }

    // Изминения при нажатии на инпут
    blockStart() {
        calcStart.disabled = !salaryAmount.value.trim();
    }
    
    // Ввод от 0 до 100
    enterZeroHundred(e) {

        let app = {
            vars: {
              input: document.querySelector('.deposit-percent'),
              min: 0,
              max: 100
            },
            
            keyup: () => {
                if ( app.vars.input.value.length >= 1 && app.vars.input.value.length <= 2 ) {
                    setTimeout (() =>{
                    if ( app.vars.input.value.length !== 0 ) {
                        if ( app.vars.input.value < app.vars.min ) {
                        app.vars.input.value = app.vars.min;
                        }
                    }
                    }, 500);
                }
              
                if ( app.vars.input.value.length >= 3 ) {
                    if( app.vars.input.value > app.vars.max ) {
                    app.vars.input.value = app.vars.max;
                    }
                }
            },
            
            init: () => {
                app.vars.input.onkeyup = app.keyup;
            }
        };
        app.init();

        // Разрешаем: backspace, delete, tab и escape
        if ( e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 9 || e.keyCode === 27 ||
            // Разрешаем: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Разрешаем: home, end, влево, вправо
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            
            // Ничего не делаем
            return;
        } else {
            // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
            if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 100 )) {
                e.preventDefault();
            }
        }
        
    }

    // addEventListener
    eventListener() {

        // Привязать контекст вызова функции start к appData 
        this.blockStart();
        calcStart.addEventListener('click', this.calcStart.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('input', this.blockStart);
        calcCancel.addEventListener('click', this.reset.bind(this));
        // Число под input type range
        periodSelect.addEventListener('input', () => {
            document.querySelector('.period-amount').textContent = periodSelect.value;
            incomePeriodValue.value = this.calcSaveMoney();
        });

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
        depositPercent.addEventListener('keydown', this.enterZeroHundred.bind(this));
        depositAmount.addEventListener('keydown', this.enterZeroHundred.bind(this));
    }
}

const appData = new AppData();
appData.eventListener();  
