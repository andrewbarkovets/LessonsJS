const mission = 100000,
      period = 12;

const money = prompt('Ваш месячный доход?');
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке');

console.log(typeof money, typeof income, typeof deposit);

console.log(addExpenses.length);

console.log("Период равен" + " " + period + " " + "месяцев");
console.log("Цель заработать" + " " + mission + " " + "долларов");

console.log(addExpenses.toLowerCase().split(', '));

const constantFlow1 = prompt('Введите обязательную статью расходов?', 'Продукты');
const spentManey1 = prompt('Во сколько это обойдется?');
const constantFlow2 = prompt('Введите обязательную статью расходов?', 'Продукты');
const spentManey2 = prompt('Во сколько это обойдется?');

const budgetMonth = Number(money) - (Number(spentManey1) + Number(spentManey2));

console.log('Бюджет на месяц', budgetMonth);

console.log('Цель будет достигнута за:', Math.ceil(mission / budgetMonth), 'месяцев');

const budgetDay = Math.floor(budgetMonth / 30);

console.log(budgetDay);

if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
}   else if (budgetDay === 1200) {
    console.log('У вас чуть выше среднего уровня дохода');
}   else if (budgetDay < 1200 && budgetDay > 600) {
    console.log('У вас средний уровень дохода');
}   else if (budgetDay === 600) {
    console.log('У вас чуть ниже среднего уровня дохода');
}   else if (budgetDay < 600 && budgetDay > 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}   else if (budgetDay < 0) {
    console.log('Что то пошло не так');
}   
