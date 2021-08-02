'use strict';

function calculatePercent(period) {
    const minPercent = 2.0;
    const percentFrom6Month = 2.2;
    const percentFrom9Month = 2.3;
    const percentFrom12Month = 2.6;
    const percentFrom18Month = 2.7;

    const minTerm = 3;
    const maxTerm = 18;
    const termPeriod = 3;

    if (period < minTerm) {
        return 0;
    }
    if (period < minTerm + termPeriod) {
        return minPercent;
    }
    if (period < minTerm + 2*termPeriod) {
        return percentFrom6Month;
    }
    if (period < minTerm + 3*termPeriod) {
        return percentFrom9Month;
    }
    if (period < maxTerm) {
        return percentFrom12Month;
    }
    if (period === maxTerm) {
        return percentFrom18Month;
    }
}


function calculateInterest(amount,period) {
    const min = 15000;
    const max=50000000;
    const minProfit = 0;
    const percent=calculatePercent(period);

    const dayInYear=365;
    const monthInYear=12;
    const dayInMonth=dayInYear/monthInYear;

    const total= amount*(1+percent*dayInMonth/dayInYear/100)**period;
    const maxTotal= max*(1+percent*dayInMonth/dayInYear/100)**period;

    const maxProfit= maxTotal-max;
    const profit = total-amount;

    return {
        total: amount < min ? minProfit : amount > max ? maxTotal : total,
        profit: amount < min ? minProfit : amount > max ? maxProfit : profit
    };
}
function handleSubmit(evt) {
    evt.preventDefault(); //отменяем поведение по умолчанию

    const totalEl = document.getElementById('total');
    const profitEl = document.getElementById('profit');
    const amountErrorEl=document.getElementById('amount-error');
    const periodErrorEl=document.getElementById('period-error');
    const percentEl = document.getElementById('percent');
    // обнуляем расчетные значения
    amountErrorEl.textContent='';
    periodErrorEl.textContent='';
    totalEl.textContent = '';
    profitEl.textContent = '';
    percentEl.textContent = '';

    //вытаскиваем значения, введенные пользователем
    const amountInputEl=document.getElementById('amount-input');
    const amount= Number( amountInputEl.value);
    const min = 15000;
    const max=50000000;

    if (Number.isNaN(amount)) {
        amountErrorEl.textContent='Неверное значение. Введите число, например: 15000';
        return;
    }
    if (amount > max) {
        amountErrorEl.textContent='Неверное значение. Максимальная сумма: 50000000 ₽';
        return;
    }
    if (amount < min) {
        amountErrorEl.textContent='Неверное значение. Минимальная сумма: 15000 ₽';
        return;
    }

    const periodInputEl=document.getElementById('period-input');
    const period= Number(periodInputEl.value);
    const maxPeriod=18;
    const minPeriod=3;

    if (Number.isNaN(period)) {
        periodErrorEl.textContent='Неверное значение. Введите число месяцев, например: 3';
        return;
    }
    if (period > maxPeriod) {
        periodErrorEl.textContent='Неверное значение. Максимальный период: 18 месяцев';
        return;
    }
    if (period < minPeriod) {
        periodErrorEl.textContent='Неверное значение. Минимальный период: 3 месяца';
        return;
    }
    const percent=calculatePercent(period);
    //Вызываем функцию и считаем доход
    const result =calculateInterest(amount, period);
    //находим элементы и добавляем к ним получившиеся значения
    totalEl.textContent = `${Number(result.total).toFixed(0)}`;
    profitEl.textContent = `${Number(result.profit).toFixed(0)}`;
    percentEl.textContent = `${percent}`;
}

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit',handleSubmit);

