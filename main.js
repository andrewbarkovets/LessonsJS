'use strict';

let isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const mission = 100000,
    income = 'freelance',
    period = 12;

let money,
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период', 'машина, квартплата, школа'),
    deposit = confirm('Есть ли у вас депозит в банке');

let start = () => {
   
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));

};

start();

// вызовы функции showTypeOf
let showTypeOf = (data) => {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} долларов`);

console.log(addExpenses.toLowerCase().split(', '));

let constantFlow = [];

// Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () => {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        
        constantFlow[i] = prompt('Введите обязательную статью расходов?');

        do {
            sum = prompt('Во сколько это обойдется?');
        } while (!isNumber(sum));
    }
    console.log(constantFlow);
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log(expensesAmount);

// Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money) => {
    if (!money) { 
        money = 0; 
    }

    return money - expensesAmount;
};
console.log(`Бюджет на месяц ${getAccumulatedMonth(money)}`);

// результат вызова функции getAccumulatedMonth 
const accumulatedMonth = getAccumulatedMonth(money);

// getTargetMonth -  Подсчитывает за какой период будет достигнута цель
let getTargetMonth = () => {
    return Math.ceil(mission / accumulatedMonth);
};
getTargetMonth();

let quantityMonth = getTargetMonth();

const targetMonth = () => {
    
    if (quantityMonth > 0) {
        return (`Цель будет достигнута за: ${quantityMonth} месяца(ев)`);
    } else if (quantityMonth < 0) {
        return ('Цель не будет достигнута!');
    }

};
console.log(targetMonth());

// budgetDay высчитываем исходя из значения месячного накопления
const budgetDay = Math.floor(accumulatedMonth / 30);

console.log(budgetDay);

// вызов функции getStatusIncome
const getStatusIncome = () => {
    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    }   else if (budgetDay <= 1200 && budgetDay >= 600) {
        return ('У вас средний уровень дохода');
    }   else if (budgetDay < 600 && budgetDay >= 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }   else if (budgetDay < 0) {
        return ('Что то пошло не так');
    }   else {
        return ('Введите данные!');
    }
};
console.log(getStatusIncome());
  
