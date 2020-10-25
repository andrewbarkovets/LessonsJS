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
    periodAmount =document.querySelector('.period-amount'),
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

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getTargetMonth();
        appData.targetMonth();
        appData.getAddIncome();
        appData.getPeriodAmount();
        appData.getAddExpenses();   
        appData.getBudget();
        appData.showResult();
    },

    // Вывод результатов вычисления
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSaveMoney();
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

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];

        }
        
        return appData.expensesMonth;
    },

    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function() {

        if (!appData.budget) {
            appData.budget = 0;
        }
        // isNumber(salaryAmount.value);
        if(salaryAmount.value === '') {
            salaryAmount.setAttribute('required', true);
         return alert('Введите данные в поле "Месячный доход"!');
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

        if (appData.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        }   else if (appData.budgetDay <= 1200 && appData.budgetDay >= 600) {
            return ('У вас средний уровень дохода');
        }   else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        }   else if (appData.budgetDay < 0) {
            return ('Что то пошло не так');
        }   else {
            return ('Введите данные!');
        }
    },
    targetMonth: function() {
    
        if (appData.getTargetMonth() > 0) {
            return console.log((`Цель будет достигнута за: ${appData.getTargetMonth()} месяца(ев)`));
        } else if (appData.getTargetMonth() < 0) {
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

calcStart.addEventListener('click', appData.calcStart);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriodAmount);
salaryAmount.addEventListener('input', appData.blockStart);

for ( let key in appData) {
    console.log("Наша программа включает в себя данные: ");
    console.log(key, appData[key]);
}