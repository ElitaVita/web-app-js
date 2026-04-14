console.log("Система регистрации посетителей загружена");
console.log("Предметная область: Регистрация посетителей");
console.log("Лабораторная работа №1 — базовая структура проекта");
// 1.3 Переменные и константы
const appConfig = {
    appTitle: "Система регистрации посетителей",
    defaultStatus: "new",
    minValueForFilter: 800
};
let actionCount = 0;
actionCount++;
actionCount++;
actionCount++;
appConfig.minValueForFilter = 900;
console.log("actionCount:", actionCount);
console.log("appConfig:", appConfig);

// 1.4 Типы данных (6 объектов)
let visitors = [
    { id: 1, title: "Иван Петров", value: 1200, status: "new", createdAt: "2026-04-01" },
    { id: 2, title: "Мария Сидорова", value: 500, status: "done", createdAt: "2026-04-02" },
    { id: 3, title: "Алексей Иванов", value: 2000, status: "new", createdAt: "2026-04-03" },
    { id: 4, title: "Ольга Смирнова", value: 700, status: "new", createdAt: "2026-04-04" },
    { id: 5, title: "Дмитрий Козлов", value: 300, status: "done", createdAt: "2026-04-05" },
    { id: 6, title: "Елена Новикова", value: 1500, status: "new", createdAt: "2026-04-06" }
];
console.log("visitors:", visitors);

// 1.5 Приведение типов
let inputMinValue = "800";
let minValue = Number(inputMinValue);
if (Number.isNaN(minValue)) {
    console.log("Ошибка");
} else {
    console.log("minValue:", minValue);
}

// 1.6 Операторы
let userAge = 19;
let isBlocked = false;
let hasAccess = userAge >= 18 && userAge < 65 && !isBlocked;
console.log("hasAccess:", hasAccess);

// 1.7 Условия (switch + if)
let item = visitors[0];
switch (item.status) {
    case "new": console.log("Новая запись"); break;
    case "done": console.log("Завершено"); break;
    default: console.log("Неизвестный статус");
}
if (item.value >= 1000) {
    console.log("Высокое значение");
} else if (item.value >= 700) {
    console.log("Среднее значение");
} else {
    console.log("Низкое значение");
}

// 1.8 Циклы (подсчёт NEW)
let newCount = 0;
for (let i = 0; i < visitors.length; i++) {
    if (visitors[i].status === "new") {
        newCount++;
    }
}
console.log("Количество NEW:", newCount);

// 3. Кнопки
let output = document.getElementById("output");

document.getElementById("btnAll").onclick = function() {
    let text = "";
    for (let i = 0; i < visitors.length; i++) {
        text = text + visitors[i].id + ". " + visitors[i].title + " - " + visitors[i].status + "\n";
    }
    output.textContent = text;
};

document.getElementById("btnNew").onclick = function() {
    let text = "";
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].status === "new") {
            text = text + visitors[i].id + ". " + visitors[i].title + "\n";
        }
    }
    output.textContent = text;
};

document.getElementById("btnStats").onclick = function() {
    let sum = 0;
    let max = 0;
    let countNew = 0;
    for (let i = 0; i < visitors.length; i++) {
        sum = sum + visitors[i].value;
        if (visitors[i].value > max) max = visitors[i].value;
        if (visitors[i].status === "new") countNew++;
    }
    let text = "Всего: " + visitors.length + "\n";
    text = text + "Сумма: " + sum + "\n";
    text = text + "Максимум: " + max + "\n";
    text = text + "NEW: " + countNew + "\n";
    text = text + "Фильтр (>=" + minValue + "):\n";
    for (let i = 0; i < visitors.length; i++) {
        if (visitors[i].value >= minValue) {
            text = text + "  - " + visitors[i].title + "\n";
        }
    }
    output.textContent = text;
};

console.log("Лабораторная работа №2 загружена");