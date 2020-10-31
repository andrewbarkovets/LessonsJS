'use strict';

// Переменные ДЗ№9
let calcStart = document.getElementById('start'),
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
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    dataInputText = document.querySelectorAll('.data input[type=text]'),
    targetAmonth = document.querySelector('.target-amount');

// Функция проверки на число!
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Функция первой заглавной буквы!
const upperCase = function(u) {
    return u.map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(', ');
};

// Объект appData с переменными и методами
const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMounts: 0,
     
    // Месячный доход
    calcStart: function() {

        appData.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.targetMonth();
        this.getAddIncome();
        this.getPeriodAmount();
        this.getAddExpenses();   
        this.getBudget();
        this.showResult();

        // Замена 
        if (calcStart.textContent === 'Рассчитать') {
            this.blockInputs();
            calcStart.textContent = 'Сбросить';
        } else {
            calcStart.textContent = 'Рассчитать';
            this.reset();
        }
    },


    // Блокировать все input[type=text]
    blockInputs: function(disabled = true) {
        
        dataInputText.forEach(function(item) {
            item.disabled = disabled;
        });
    },

    // Reset
    reset: function() {
       
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }

        incomePlus.style.display = '';
        expensesPlus.style.display = '';

        this.blockInputs(false);

        dataInputText.forEach(function(item) {
            item.value = '';
        });

        this.getBudget();
        periodSelect.value = periodAmount.textContent = 1;
        this.blockStart();
    },

    // Вывод результатов вычисления
    showResult: function() {
        
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSaveMoney();
    },

    // Функция добавления инпута
    addExpensesBlock: function() {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }

    },
    addIncomeBlock: function() {
        
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    
    },

    // Получение  расходов
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
                expensesItems.value = '';
            }
            
        });
    },

    // Получение  доходов
    getIncome: function() {
 
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value; 

            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
                
            }
            for (let key in appData.income) {
                appData.incomeMounts += +appData.income[key];
            }
            
        });        
    },

    // Ввывод расходов
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    // Возможные доходы
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },   
   
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function() {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];

        }
        
        return this.expensesMonth;
    },

    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function() {

        if (!appData.budget) {
            appData.budget = 0;
        }
        // isNumber(salaryAmount.value);
        if(!isNumber(salaryAmount.value) && salaryAmount.value.trim() !== '') {
            salaryAmount.setAttribute('required', true);
            alert('Введите сумму в поле "Месячный доход"!');
            salaryAmount.value = '';
        }

        appData.budgetMonth = appData.budget + appData.incomeMounts - appData.expensesMonth;
        // budgetDay высчитываем исходя из значения месячного накопления
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },

    // getTargetMonth -  Подсчитывает за какой период будет достигнута цель
    getTargetMonth: function() {

        return Math.ceil(targetAmonth.value / appData.budgetMonth);
        
    },
    
    // вызов функции getStatusIncome
    getStatusIncome: function() {

        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        }   else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        }   else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (this.budgetDay < 0) {
            return ('Что то пошло не так');
        }   else {
            return ('Введите данные!');
        }
    },
    targetMonth: function() {
    
        if (this.getTargetMonth() > 0) {
            return console.log((`Цель будет достигнута за: ${this.getTargetMonth()} месяца(ев)`));
        } else if (this.getTargetMonth() < 0) {
            return console.log(('Цель не будет достигнута!'));
        }
    
    },

    // Функция работы с депозитом
    getInfoDeposit: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке');
        if(appData.deposit) {

            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '12');
            } while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', '15000');
            } while (!isNumber(appData.moneyDeposit));

        }
    },

    // Накопления депозита
    calcSaveMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    },

    // Число под input type range
    getPeriodAmount: function() {
        document.querySelector('.period-amount').textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcSaveMoney();
    },

    // Изминения при нажатии на инпут
    blockStart: function() {
        calcStart.disabled = !salaryAmount.value.trim();
    },
    
};

//1) Привязать контекст вызова функции start к appData 
const foo = appData.calcStart.bind(appData);

appData.blockStart();
calcStart.addEventListener('click', foo);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodAmount);
salaryAmount.addEventListener('input', appData.blockStart);

// for ( let key in appData) {
//     console.log("Наша программа включает в себя данные: ");
//     console.log(key, appData[key]);
// }