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

// ==================== ЛР4: ПРОСТАЯ ВАЛИДАЦИЯ ====================

// Проверка даты (простая)
function isValidDateYMD(s) {
    // Простая проверка: 4 цифры - 2 цифры - 2 цифры
    if (s.length !== 10) return false;
    if (s[4] !== '-' || s[7] !== '-') return false;
    for (let i = 0; i < s.length; i++) {
        if (i === 4 || i === 7) continue;
        if (s[i] < '0' || s[i] > '9') return false;
    }
    return true;
}

// Проверка запрещённых символов
function isValidTitle(s) {
    // Запрещаем < > { } ;
    if (s.indexOf('<') !== -1) return false;
    if (s.indexOf('>') !== -1) return false;
    if (s.indexOf('{') !== -1) return false;
    if (s.indexOf('}') !== -1) return false;
    if (s.indexOf(';') !== -1) return false;
    return true;
}

// Проверка что поле не пустое
function validateRequired(value, fieldName) {
    if (value === "" || value.trim() === "") {
        return "Поле " + fieldName + " обязательно";
    }
    return null;
}

// Проверка числа
function validateNumberRange(n, min, max, fieldName) {
    if (isNaN(n)) {
        return "Поле " + fieldName + " должно быть числом";
    }
    if (n < min || n > max) {
        return "Поле " + fieldName + " должно быть от " + min + " до " + max;
    }
    return null;
}

// Убираем лишние пробелы
function normalizeSpaces(s) {
    let result = s.trim();
    let newResult = "";
    let lastWasSpace = false;
    for (let i = 0; i < result.length; i++) {
        if (result[i] === " " || result[i] === "\t" || result[i] === "\n") {
            if (!lastWasSpace) {
                newResult = newResult + " ";
                lastWasSpace = true;
            }
        } else {
            newResult = newResult + result[i];
            lastWasSpace = false;
        }
    }
    return newResult;
}

// Сбор ошибок
function validateForm(title, value, date) {
    let errors = [];
    
    let titleErr = validateRequired(title, "ФИО");
    if (titleErr) {
        errors.push(titleErr);
    } else if (!isValidTitle(title)) {
        errors.push("ФИО содержит запрещённые символы");
    }
    
    let valNum = Number(value);
    let valErr = validateNumberRange(valNum, 0, 1000000, "Сумма");
    if (valErr) errors.push(valErr);
    
    let dateErr = validateRequired(date, "Дата");
    if (dateErr) {
        errors.push(dateErr);
    } else if (!isValidDateYMD(date)) {
        errors.push("Дата должна быть в формате ГГГГ-ММ-ДД");
    }
    
    return errors;
}

// Новый ID
function getNewId(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > max) max = arr[i].id;
    }
    return max + 1;
}