'use strict';

// Функция проверки на число!
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Месячный доход
let money,  
    start = function() {
   
    do {
        money = prompt('Ваш месячный доход?', '50000');
    } while (!isNumber(money));

};

start();

// Объект appData с переменными и методами
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 12,
    constantFlow: [],
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период', 'машина, квартплата, школа');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке');
        
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            let sum = 0;

        for (let i = 0; i < 2; i++) {
            
            appData.constantFlow[i] = prompt('Введите обязательную статью расходов?');

            do {
                sum += +prompt('Во сколько это обойдется?');
            } while (!isNumber(sum));
        }
        console.log('Расходы за месяц:' + sum);
        return +sum;
        
        },     
   

    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function() {

        for (let key in appData.sum) {
            appData.expensesMonth += appData.sum[key];
        }
        console.log(appData.expensesMonth);
        return appData.expensesMonth;
        
    },

    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getAccumulattedMonth: function() {

        if (!appData.budget) {
            appData.budget = 0;
        }

        appData.budgetMonth = appData.budget - appData.sum;
        // budgetDay высчитываем исходя из значения месячного накопления
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },

    // getTargetMonth -  Подсчитывает за какой период будет достигнута цель
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
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

};
appData.asking();
appData.getExpensesMonth();




console.log(`Период равен ${appData.period} месяцев`);
console.log(`Цель заработать ${appData.mission} долларов`);
console.log(`Бюджет на месяц ${appData.budgetMonth}`);

const targetMonth = function() {
    
    if (targetMonth > 0) {
        return (`Цель будет достигнута за: ${targetMonth} месяца(ев)`);
    } else if (targetMonth < 0) {
        return ('Цель не будет достигнута!');
    }

};

console.log(targetMonth());
console.log(appData.getStatusIncome());
  
