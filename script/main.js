'use strict';

// Переменные 
const calcStart = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
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

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.targetMonth();
        this.getAddIncome();
        this.getAddExpenses();
        this.getBudget();
        this.isNumber();       
        this.showResult();

        // Замена 
        // isNumber(salaryAmount.value);
        if (!this.isNumber(salaryAmount.value) && salaryAmount.value.trim() !== '') {
            salaryAmount.setAttribute('required', true);
            alert('Введите сумму в поле "Месячный доход"!');
            salaryAmount.value = '';
        } else if (calcStart.textContent === 'Рассчитать') {
            this.blockInputs();
            calcStart.textContent = 'Сбросить';
        } else {
            calcStart.textContent = 'Рассчитать';
            this.reset();
        }
        
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
        
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }

        incomePlus.style.display = '';
        expensesPlus.style.display = '';

        this.blockInputs(false);

        dataInput.forEach((item) => {
            item.value = '';
        });

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
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }

    }

    addIncomeBlock() {

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');
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

        if (!this.budget) {
            this.budget = 0;
        }

        this.budgetMonth = this.budget + this.incomeMounts - this.expensesMonth;
        // budgetDay высчитываем исходя из значения месячного накопления
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    }

    // getTargetMonth 
    getTargetMonth() {

        return Math.ceil(targetAmonth.value / this.budgetMonth);

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
        this.deposit = confirm('Есть ли у вас депозит в банке');
        if (this.deposit) {

            do {
                this.percentDeposit = prompt('Какой годовой процент?', '12');
            } while (!this.isNumber(this.percentDeposit));

            do {
                this.moneyDeposit = prompt('Какая сумма заложена?', '15000');
            } while (!this.isNumber(this.moneyDeposit));

        }
    }

    // Накопления депозита
    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    // Изминения при нажатии на инпут
    blockStart() {
        calcStart.disabled = !salaryAmount.value.trim();
    }
    eventListener() {

        // Привязать контекст вызова функции start к appData 
        this.blockStart();
        calcStart.addEventListener('click', this.calcStart.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('input', this.blockStart);
        // Число под input type range
        periodSelect.addEventListener('input', () => {
            document.querySelector('.period-amount').textContent = periodSelect.value;
            incomePeriodValue.value = this.calcSaveMoney();
        });
    }
}

const appData = new AppData();
appData.eventListener();  
