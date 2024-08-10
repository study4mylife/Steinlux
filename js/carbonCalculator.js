var categories = ['飲食習慣', '能源', '水資源', '旅行', '交通', '垃圾'];
var selectedCategories = [];
var currentCategoryIndex = 0;
var selectedSubCategories = {};
var answers = {};

var questions = {
    '飲食習慣': {
        '葷食': [
            '每週飲料消費（元）？',
            '每週酒精飲料消費（元）？',
            '每週宵夜消費（元）？',
            '每週三餐花費（元）？'
        ],
        '素食': [
            '每週飲料消費（元）？',
            '每週宵夜消費（元）？',
            '每週三餐花費（元）？'
        ]
    },
    '能源': {
        '電力': [
            '年電費（元）？',
            '年用電度數？'
        ],
        '天然氣': [
            '年天然氣費用（元）？',
            '年天然氣使用度數？'
        ],
        '瓦斯': [
            '年瓦斯桶使用總公斤數？'
        ]
    },
    '水資源': {
        '自來水': [
            '年水費（元）？',
            '年用水度數？'
        ]
    },
    '旅行': {
        '機車': ['每年旅行中騎機車里程（公里）？'],
        '電動機車': ['每年旅行中騎電動機車里程（公里）？'],
        '汽車': ['每年旅行中開汽車里程（公里）？'],
        '電動汽車': ['每年旅行中開電動汽車里程（公里）？'],
        '火車': ['每年旅行中搭乘火車里程（公里）？'],
        '捷運': ['每年旅行中搭乘捷運里程（公里）？'],
        '高鐵': ['每年旅行中搭乘高鐵里程（公里）？'],
        '船': ['每年搭乘船的小時數？'],
        '飛機': ['每年搭乘飛機的小時數？']
    },
    '交通': {
        '機車': [
            '每月機車用油量（公升）？',
            '每年騎機車里程（公里）？'
        ],
        '電動機車': ['每年騎電動機車里程（公里）？'],
        '汽車': [
            '每月汽車用油量（公升）？',
            '每年開車里程（公里）？'
        ],
        '電動汽車': ['每年開電動汽車里程（公里）？'],
        '火車': ['每年搭乘火車里程（公里）？'],
        '捷運': ['每年搭乘捷運里程（公里）？'],
        '高鐵': ['每年搭乘高鐵里程（公里）？']
    },
    '垃圾': {
        '一般垃圾': [
            '每次丟垃圾的垃圾袋容量（公升）？',
            '垃圾袋平均填滿程度（%）？',
            '每週倒垃圾次數？'
        ]
    }
};

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'categorySelection') {
        displayCategories();
    }
}

function displayCategories() {
    var categoriesHtml = '';
    categories.forEach(category => {
        var isSelected = selectedCategories.includes(category);
        categoriesHtml += `<div class="category-box ${isSelected ? 'selected' : ''}" onclick="toggleCategory('${category}')">${category}</div>`;
    });
    document.getElementById('categories').innerHTML = categoriesHtml;
}

function toggleCategory(category) {
    var index = selectedCategories.indexOf(category);
    if (index > -1) {
        selectedCategories.splice(index, 1);
    } else {
        selectedCategories.push(category);
    }
    displayCategories();
}

function startQuestionnaire() {
    if (selectedCategories.length === 0) {
        alert('請至少選擇一個類別。');
        return;
    }
    currentCategoryIndex = 0;
    showSubCategorySelection();
}

function showSubCategorySelection() {
    var category = selectedCategories[currentCategoryIndex];
    document.getElementById('currentCategory').textContent = category;
    
    var subCategories = Object.keys(questions[category]);
    var subCategoriesHtml = '';

    if (category === '水資源' || category === '垃圾') {
        showQuestions();
        return;
    }

    subCategories.forEach(subCategory => {
        var isSelected = selectedSubCategories[category] && selectedSubCategories[category].includes(subCategory);
        subCategoriesHtml += `<div class="subcategory-box ${isSelected ? 'selected' : ''}" onclick="toggleSubCategory('${category}', '${subCategory}')">${subCategory}</div>`;
    });

    document.getElementById('subCategories').innerHTML = subCategoriesHtml;
    showSection('subCategorySelection');
}

function toggleSubCategory(category, subCategory) {
    if (!selectedSubCategories[category]) {
        selectedSubCategories[category] = [];
    }

    var index = selectedSubCategories[category].indexOf(subCategory);
    if (index > -1) {
        selectedSubCategories[category].splice(index, 1);
    } else {
        if (category === '飲食習慣') {
            selectedSubCategories[category] = [subCategory];
        } else {
            selectedSubCategories[category].push(subCategory);
        }
    }

    var subCategories = document.querySelectorAll('.subcategory-box');
    subCategories.forEach(box => {
        if (box.textContent === subCategory) {
            box.classList.toggle('selected');
        } else if (category === '飲食習慣') {
            box.classList.remove('selected');
        }
    });
}

function showQuestions() {
    var category = selectedCategories[currentCategoryIndex];
    var subCategories = selectedSubCategories[category] || Object.keys(questions[category]);

    if (subCategories.length === 0) {
        alert('請選擇至少一個子類別。');
        return;
    }

    var questionsHtml = '';
    subCategories.forEach(subCategory => {
        questionsHtml += `
            <div class="subcategory-questions">
                <h3>${subCategory}</h3>
                ${questions[category][subCategory].map((question, index) => {
                    var answer = answers[category] && answers[category][subCategory] && answers[category][subCategory][index] ? answers[category][subCategory][index] : '';
                    return `
                        <div class="question">
                            <p>${question}</p>
                            <input type="text" id="${category}-${subCategory}-${index}" value="${answer}">
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    });

    document.getElementById('currentSubCategory').textContent = category;
    document.getElementById('questions').innerHTML = questionsHtml;
    showSection('questionnaire');
}

function saveAnswers() {
    var category = selectedCategories[currentCategoryIndex];
    var subCategories = selectedSubCategories[category] || Object.keys(questions[category]);

    subCategories.forEach(subCategory => {
        if (!answers[category]) answers[category] = {};
        answers[category][subCategory] = [];

        questions[category][subCategory].forEach((_, index) => {
            var input = document.getElementById(`${category}-${subCategory}-${index}`);
            answers[category][subCategory][index] = input.value;
        });
    });
}

function previousStep() {
    var category = selectedCategories[currentCategoryIndex];
    if (category === '水資源' || category === '垃圾') {
        showSection('categorySelection');
    } else {
        showSubCategorySelection();
    }
}

function nextCategory() {
    saveAnswers();
    if (currentCategoryIndex < selectedCategories.length - 1) {
        currentCategoryIndex++;
        showSubCategorySelection();
    } else {
        showResults();
    }
}

function showResults() {
    // Placeholder for carbon footprint calculation
    var carbonFootprint = 10; // This should be replaced with actual calculation
    document.getElementById('carbonFootprint').textContent = carbonFootprint.toFixed(2);
    showSection('resultPage');
}

// Initialize the page
displayCategories();