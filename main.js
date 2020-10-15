'use strict';

const mission = 100000,
    income = 'freelance',
    period = 12;

const money = +prompt('Ваш месячный доход?', '2500');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период', 'машина, квартплата, школа');
const deposit = confirm('Есть ли у вас депозит в банке');

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

const constantFlow1 = prompt('Введите обязательную статью расходов?', 'Продукты');
const spentMoney1 = +prompt('Во сколько это обойдется?', '600');
const constantFlow2 = prompt('Введите обязательную статью расходов?', 'Прочее');
const spentMoney2 = +prompt('Во сколько это обойдется?', '500');

// 1) Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = (spentMoney1 = 0, spentMoney2 = 0) => {
    return spentMoney1 + spentMoney2;
};

console.log(getExpensesMonth(spentMoney1, spentMoney2));


// 2) Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money) => {
    if (!money) { 
        money = 0; 
    }

    getExpensesMonth(spentMoney1, spentMoney2);

    return money - getExpensesMonth(spentMoney1, spentMoney2);
};
console.log(`Бюджет на месяц ${getAccumulatedMonth(money)}`);

// 3) результат вызова функции getAccumulatedMonth 
const accumulatedMonth = getAccumulatedMonth(money);

// 4) getTargetMonth -  Подсчитывает за какой период будет достигнута цель
const getTargetMonth = (mission, accumulatedMonth) => {

    return Math.ceil(mission / accumulatedMonth);

};
console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяца(ев)`);

// 6) budgetDay высчитываем исходя из значения месячного накопления
const budgetDay = Math.floor(accumulatedMonth / 30);

console.log(budgetDay);

// 7) - вызов функции getStatusIncome
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
  
