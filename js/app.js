'use strict'

function calculatePercent(period) {
    const minPercet = 2.0;
    const percentFrom6Month=2.2;
    const percentFrom9Month=2.3;
    const percentFrom12Month=2.6;
    const percentFrom18Month=2.7;

    const minTerm=3;
    const maxTerm=18;
    const termPeriod=3;

    if (period < minTerm)
        return 0;
    if (period < minTerm+termPeriod)
        return minPercet;
    if (period < minTerm + 2*termPeriod)
        return percentFrom6Month;
    if (period < minTerm + 3*termPeriod)
        return percentFrom9Month;
    if (period < maxTerm)
        return percentFrom12Month;
    if (period == maxTerm)
        return percentFrom18Month;
}


function calculateInterest(amount,period) {
    const min = 15000;
    const max=50000000;
    const minProfit = 0;
    const percent=calculatePercent(period);

    const dayInYear=365;
    const dayInMonth=30;

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

    //вытаскиваем значения, введенные пользователем
    const amountInputEl=document.getElementById('amount-input');
    const amount= Number( amountInputEl.value);
    if (Number.isNaN(amount)) {
        //TODO: показать ошибку
        return;
    }
    if (!Number.isFinite(amount)) {
        //TODO: показать ошибку
        return;
    }
    const periodInputEl=document.getElementById('period-input');
    const period= Number( periodInputEl.value);
    if (Number.isNaN(period)) {
        //TODO: показать ошибку
        return;
    }
    if (!Number.isFinite(period)) {
        //TODO: показать ошибку
        return;
    }
    const percent=calculatePercent(period);
    //Вызываем функцию и считаем доход
    const result =calculateInterest(amount, period);
    //находим элементы и добавляем к ним получившиеся значения
    const totalEl = document.getElementById('total');
    totalEl.textContent = `${Number(result.total).toFixed(0)}`;
    const profitEl = document.getElementById('profit');
    profitEl.textContent = `${Number(result.profit).toFixed(0)}`;
    const percentEl = document.getElementById('percent');
    percentEl.textContent = `${percent}`;
}

const formEl = document.getElementById('deposit-form');
formEl.addEventListener('submit',handleSubmit);

