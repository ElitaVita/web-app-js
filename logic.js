// logic.js - функции для обработки данных

function filterByStatus(items, status) {
    return items.filter(item => item.status === status);
}

function findById(items, id) {
    return items.find(item => item.id === id) || null;
}

function sortByValueDesc(items) {
    const copy = items.slice();
    copy.sort((a, b) => b.value - a.value);
    return copy;
}

function buildStats(items) {
    return items.reduce((acc, item) => {
        acc.totalCount += 1;
        acc.sumValue += item.value;
        if (item.value > acc.maxValue) acc.maxValue = item.value;
        if (item.status === "new") acc.newCount += 1;
        return acc;
    }, { totalCount: 0, sumValue: 0, maxValue: 0, newCount: 0 });
}

console.log("logic.js загружен, все функции готовы");