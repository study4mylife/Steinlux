var categories = ['飲食習慣', '能源', '水資源', '旅行', '交通', '垃圾'];
var selectedCategories = [];
var currentCategoryIndex = 0;
var currentSubCategoryIndex = 0;
var selectedSubCategories = {};
var answers = {};

var questions = {
    '飲食習慣': {
        '葷食': [
            '每週飲料消費？',
            '每週酒精類消費？',
            '每週宵夜消費？',
            '每週三餐花費？'
        ],
        '素食': [
            '每週飲料消費？',
            '每週宵夜消費？',
            '每週三餐花費？'
        ]
    },
    '能源': {
        '電力': [
            '年電費？',
            '年用電度數？'
        ],
        '天然氣': [
            '年天然氣費用？',
            '年天然氣使用度數？'
        ],
        '瓦斯': [
            '年瓦斯桶使用總公斤數？'
        ]
    },
    '水資源': {
        '水資源': [
            '年水費？',
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

const coefficients = {
    '飲食習慣': {
        '葷食': {
            '飲料': 0.032,
            '酒精飲料': 0.013,
            '宵夜': 0.32,
            '三餐花費': 0.378
        },
        '素食': {
            '飲料': 0.032,
            '宵夜': 0.23,
            '三餐花費': 0.271
        }
    },
    '能源': {
        '電力': {
            '費用': 0.111,
            '度數': 0.494
        },
        '天然氣': {
            '費用': 0.209,
            '度數': 2.36
        },
        '瓦斯': {
            '總公斤數': 3.8
        }
    },
    '水資源': {
        '水資源': {
            '費用': 0.0236,
            '度數': 0.233
        }
    },
    '旅行': {
        '機車': {'公里數': 0.0951},
        '電動機車': {'公里數': 0.0252},
        '汽車': {'公里數': 0.115},
        '電動汽車': {'公里數': 0.178},
        '火車': {'公里數': 0.054},
        '捷運': {'公里數': 0.0247},
        '高鐵': {'公里數': 0.034},
        '船': {'時數': 7}, // Converting to kgCO2e from tCO2e
        '飛機': {'時數': 146} // Converting to kgCO2e from tCO2e
    },
    '交通': {
        '機車': {
            '汽油公升數': 151, // Converting to kgCO2e from tCO2e
            '公里數': 0.0951
        },
        '電動機車': {'公里數': 0.0252},
        '汽車': {
            '汽油公升數': 2.92,
            '公里數': 0.115
        },
        '電動汽車': {'公里數': 0.178},
        '火車': {'公里數': 0.054},
        '捷運': {'公里數': 0.0247},
        '高鐵': {'公里數': 0.034}
    },
    '垃圾': {
        '一般垃圾': {'垃圾袋容量': 0.095}
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
    categories.forEach((category, index) => {
        var isSelected = selectedCategories.includes(category);
        categoriesHtml += `<div class="category-box ${isSelected ? 'selected' : ''}" onclick="toggleCategory('${category}')">
                             <div class="wrapper">
                                <img src='../src/service${index+1}.png'>
                             </div>
                            ${category}
                            </div>`;
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
        subCategoriesHtml += `<div class="subcategory-box ${isSelected ? 'selected' : ''}" onclick="toggleSubCategory('${category}', '${subCategory}')"><p>${subCategory}</p><div class= "wrapper"><img src="../src/carbonCalculator/${subCategory}.png"></div></div>`;
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
    var navigationDotsHtml = '';

    subCategories.forEach((subCategory, index) => {
        questionsHtml += `
            <div class="subcategory-questions" id="subcategory-${index}" style="display: ${index === currentSubCategoryIndex ? 'block' : 'none'}">
                <h3>${subCategory}</h3><div class= "wrapper"><img src="../src/carbonCalculator/${subCategory}.png"></div>
                ${questions[category][subCategory].map((question, qIndex) => {
                    var answer = answers[category] && answers[category][subCategory] && answers[category][subCategory][qIndex] ? answers[category][subCategory][qIndex] : '';
                    return `
                        <div class="question">
                            <p>${question}</p>
                            <input type="text" id="${category}-${subCategory}-${qIndex}" value="${answer}">
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        navigationDotsHtml += `<span class="nav-dot ${index === currentSubCategoryIndex ? 'active' : ''}" onclick="jumpToSubCategory(${index})"></span>`;
    });

    document.getElementById('currentSubCategory').textContent = category + ' - ' + subCategories[currentSubCategoryIndex];
    document.getElementById('questions').innerHTML = questionsHtml;
    document.getElementById('navigationDots').innerHTML = navigationDotsHtml;
    showSection('questionnaire');
}

function jumpToSubCategory(index) {
    saveAnswers();
    currentSubCategoryIndex = index;
    showQuestions();
}

function saveAnswers() {
    var category = selectedCategories[currentCategoryIndex];
    var subCategories = selectedSubCategories[category] || Object.keys(questions[category]);

    subCategories.forEach(subCategory => {
        if (!answers[category]) answers[category] = {};
        if (!answers[category][subCategory]) answers[category][subCategory] = [];

        questions[category][subCategory].forEach((_, index) => {
            var input = document.getElementById(`${category}-${subCategory}-${index}`);
            if (input) {
                answers[category][subCategory][index] = input.value;
            }
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
        currentSubCategoryIndex = 0;
        showSubCategorySelection();
    } else {
        showResults();
    }
}

function nextSubCategory(totalFootprint) {
    saveAnswers();
    console.log(totalFootprint)

    var category = selectedCategories[currentCategoryIndex];
    var subCategories = selectedSubCategories[category] || Object.keys(questions[category]);

    if (currentSubCategoryIndex < subCategories.length - 1) {
        currentSubCategoryIndex++;
        showQuestions();
    } else {
        nextCategory();
    }
}

function previousSubCategory() {
    if (currentSubCategoryIndex > 0) {
        currentSubCategoryIndex--;
        showQuestions();
    } else {
        previousStep();
    }
}

function calculateCarbonFootprint() {
    let totalFootprint = 0;
    console.log('開始計算碳足跡');

    for (let category in answers) {
        console.log(`處理類別: ${category}`);
        for (let subCategory in answers[category]) {
            console.log(`  處理子類別: ${subCategory}`);
            const categoryCoefficients = coefficients[category][subCategory];
            const categoryAnswers = answers[category][subCategory];

            categoryAnswers.forEach((answer, index) => {
                const question = questions[category][subCategory][index];
                const value = parseFloat(answer);
                console.log(`    問題: ${question}, 答案: ${answer}, 解析後的值: ${value}`);

                if (!isNaN(value)) {
                    let coefficient;
                    let calculatedValue;

                    if (category === '飲食習慣') {
                        if (question.includes('飲料')) {
                            coefficient = categoryCoefficients['飲料'];
                        } else if (question.includes('酒精類')){
                            coefficient = categoryCoefficients['酒精飲料'];
                        } else if (question.includes('宵夜')){
                        coefficient = categoryCoefficients['宵夜'];
                        }else if (question.includes('三餐花費')){
                            coefficient = categoryCoefficients['三餐花費'];
                        }
                        calculatedValue = value * coefficient * 52;
                    } else if (category === '能源' || category === '水資源') {
                        if (question.includes('費')) {
                            coefficient = categoryCoefficients['費用'];
                        } else if (question.includes('度')){
                            coefficient = categoryCoefficients['度數'];
                        } else if (question.includes('公斤')){
                        coefficient = categoryCoefficients['總公斤數'];
                        }
                        calculatedValue = value * coefficient;
                    } else if (category === '旅行' || category === '交通') {
                        if (question.includes('公升')) {
                            coefficient = categoryCoefficients['汽油公升數'];
                            calculatedValue = value * coefficient * 12;
                        } else if (question.includes('里程')) {
                            coefficient = categoryCoefficients['公里數'];
                            calculatedValue = value * coefficient;
                        } else if (question.includes('小時')) {
                            coefficient = categoryCoefficients['時數'];
                            calculatedValue = value * coefficient;
                        }
                    } else if (category === '垃圾') {
                        if (index === 0) {
                            const capacity = value;
                            const fillRate = parseFloat(categoryAnswers[1]) / 100;
                            const frequency = parseFloat(categoryAnswers[2]);
                            coefficient = categoryCoefficients['垃圾袋容量'];
                            calculatedValue = capacity * fillRate * frequency * 52 * coefficient;
                        }
                    }

                    console.log(`      係數: ${coefficient}, 計算值: ${calculatedValue}`);
                    if (!isNaN(calculatedValue)) {
                        totalFootprint += calculatedValue;
                        console.log(`      當前總碳足跡: ${totalFootprint}`);
                    } else {
                        console.log(`      警告: 計算值為 NaN`);
                    }
                } else {
                    console.log(`      警告: 輸入值無效`);
                }
            });
        }
    }

    console.log(`最終碳足跡: ${totalFootprint}`);
    return totalFootprint;
}

function clearAnswers() {
    answers = {};
    selectedCategories = [];
    selectedSubCategories = {};
    currentCategoryIndex = 0;
    currentSubCategoryIndex = 0;
}

function showResults() {
    var carbonFootprint = calculateCarbonFootprint();
    document.getElementById('carbonFootprint').textContent = carbonFootprint.toFixed(2);
    showSection('resultPage');
    
    // 清理答案和重置相關變數
    clearAnswers();
    
    // 清理輸入框
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.value = '';
    });
    
    // 重新顯示類別選擇
    displayCategories();
}