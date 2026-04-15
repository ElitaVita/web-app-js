// script.js - работа с DOM и событиями

const listEl = document.getElementById("list");
const messageEl = document.getElementById("message");

// ========== ЗАДАЧА F2 (блок 2.1.6) ==========
const demoListEl = document.getElementById("demoList");

for (let i = 1; i <= 3; i++) {
    const p = document.createElement("p");
    p.textContent = "Параграф " + i + " — создан через createElement";
    p.style.cssText = "background: #f0f0f0; padding: 5px; margin: 5px 0;";
    demoListEl.appendChild(p);
}
console.log("F2. В demoList добавлены 3 параграфа");

// ========== ФУНКЦИЯ ОТРИСОВКИ СПИСКА ==========
function renderList(itemsToRender) {
    listEl.textContent = "";
    
    for (const item of itemsToRender) {
        const card = document.createElement("div");
        card.className = "card";
        card.style.cssText = "border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin: 10px 0; background: white;";
        
        const h3 = document.createElement("h3");
        h3.textContent = item.title;
        h3.style.margin = "0 0 8px 0";
        
        const info = document.createElement("p");
        info.textContent = `id=${item.id} | value=${item.value} | status=${item.status} | createdAt=${item.createdAt}`;
        info.style.margin = "0 0 8px 0";
        info.style.color = "#555";
        
        const btnRemove = document.createElement("button");
        btnRemove.textContent = "Удалить";
        btnRemove.style.cssText = "background: #ff4444; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer;";
        btnRemove.dataset.action = "remove";
        btnRemove.dataset.id = String(item.id);
        
        btnRemove.onclick = function() {
            const index = items.findIndex(i => i.id === item.id);
            if (index !== -1) {
                items.splice(index, 1);
                renderList(items);
                messageEl.textContent = "Запись удалена";
            }
        };
        
        card.appendChild(h3);
        card.appendChild(info);
        card.appendChild(btnRemove);
        
        listEl.appendChild(card);
    }
}

// ========== КНОПКИ ==========
const btnAll = document.getElementById("btnAll");
const btnNew = document.getElementById("btnNew");
const btnSort = document.getElementById("btnSort");
const btnStats = document.getElementById("btnStats");

if (btnAll) {
    btnAll.onclick = function() {
        renderList(items);
        messageEl.textContent = "Показаны все записи";
    };
}

if (btnNew) {
    btnNew.onclick = function() {
        const newItems = filterByStatus(items, "new");
        renderList(newItems);
        messageEl.textContent = "Показаны только NEW записи";
    };
}

if (btnSort) {
    btnSort.onclick = function() {
        const sortedItems = sortByValueDesc(items);
        renderList(sortedItems);
        messageEl.textContent = "Отсортировано по value (по убыванию)";
    };
}

if (btnStats) {
    btnStats.onclick = function() {
        const stats = buildStats(items);
        messageEl.textContent = 
            "Статистика:\n" +
            "Всего записей: " + stats.totalCount + "\n" +
            "Сумма value: " + stats.sumValue + "\n" +
            "Максимум value: " + stats.maxValue + "\n" +
            "Количество status='new': " + stats.newCount;
    };
}

// ========== ЗАДАЧИ ДЛЯ ЗАКРЕПЛЕНИЯ (2.1.1 – 2.1.4) ==========

// A1. Функция calcTotal
function calcTotal(a, b) {
    const sum = a + b;
    console.log("A1. calcTotal(" + a + ", " + b + ") =", sum);
    return sum;
}
calcTotal(10, 5);

// A2. Функция formatRecord
function formatRecord(id, title, status) {
    const result = "#" + id + " " + title + " [" + status + "]";
    console.log("A2. formatRecord:", result);
    return result;
}
formatRecord(3, "Тестовая запись", "new");

// B1. Сумма массива через цикл for
const values = [1200, 500, 800, 1500];
let sumValues = 0;
for (let i = 0; i < values.length; i++) {
    sumValues = sumValues + values[i];
}
console.log("B1. Сумма массива values =", sumValues);

// B2. Фильтр через filter
const filteredValues = values.filter(function(val) {
    return val >= 800;
});
console.log("B2. Отфильтрованные значения (>=800):", filteredValues);

// C1. Объект record и изменение статуса
const record = {
    id: 1,
    title: "Тестовая запись",
    value: 1000,
    status: "new",
    createdAt: "2026-04-15"
};
console.log("C1. До изменения:", record);
record.status = "done";
console.log("C1. После изменения:", record);

// C2. Функция isNew
function isNew(record) {
    return record.status === "new";
}
console.log("C2. isNew для статуса new:", isNew({ status: "new" }));
console.log("C2. isNew для статуса done:", isNew({ status: "done" }));

// D1. Массив testItems и поиск по id
const testItems = [
    { id: 1, title: "Запись 1", value: 100, status: "new", createdAt: "2026-04-01" },
    { id: 2, title: "Запись 2", value: 200, status: "done", createdAt: "2026-04-02" },
    { id: 3, title: "Запись 3", value: 300, status: "new", createdAt: "2026-04-03" },
    { id: 4, title: "Запись 4", value: 400, status: "done", createdAt: "2026-04-04" }
];
const found = testItems.find(function(item) {
    return item.id === 3;
});
console.log("D1. Поиск по id=3:", found);

// D2. Статистика через reduce
const statsTest = testItems.reduce(function(acc, item) {
    acc.totalCount = acc.totalCount + 1;
    acc.sumValue = acc.sumValue + item.value;
    return acc;
}, { totalCount: 0, sumValue: 0 });
console.log("D2. Статистика testItems:", statsTest);

// ========== ЗАПУСК ==========
renderList(items);
console.log("script.js загружен, страница готова");