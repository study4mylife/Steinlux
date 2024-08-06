const paths = document.querySelectorAll('svg path');
const countyText = document.getElementById('countyText');

// 為每個 path 綁定事件
paths.forEach(path => {
    path.addEventListener('mouseover', () => {
        countyText.textContent = `縣市: ${path.getAttribute('data-name')}`;
    });

    path.addEventListener('mouseout', () => {
        countyText.textContent = '縣市';
    });
});

 // 取得 path 元素的中心位置
function getPathCenter(path) {
    const bbox = path.getBBox();
    return {
        x: bbox.x + bbox.width / 2,
        y: bbox.y + bbox.height / 2
    };
}

// 將文字放置在 path 元素的中心
function placeText(pathId, textId) {
    const path = document.getElementById(pathId);
    const text = document.getElementById(textId);
    const taipei = document.getElementById('text1')
    const Hsinchu = document.getElementById('text5')
    const newTaipei = document.getElementById('text6')
    const keelung = document.getElementById('text7')
    const taoyuan = document.getElementById('text8')
    const yunlin = document.getElementById('text12')
    const Chiayi = document.getElementById('text13')
    const pingtung = document.getElementById('text14')
    const yilan = document.getElementById('text15')
    const hualien = document.getElementById('text16')
    const taitung = document.getElementById('text17')
    const penghu= document.getElementById('text18')
    const chiayi = document.getElementById('text22')
    const center = getPathCenter(path);
    text.setAttribute("fill","#111");
    text.setAttribute('font-size', '40');
    text.setAttribute('font-weight', '600');
    text.setAttribute('stroke', 'none')
    text.setAttribute('x', center.x/1.1);
    text.setAttribute('y', center.y*1.03);
    taipei.setAttribute('x', center.x+250);
    taipei.setAttribute('y', center.y-1090);
    Hsinchu.setAttribute('x', center.x+80);
    Hsinchu.setAttribute('y', center.y-950);
    newTaipei.setAttribute('y', center.y-830);
    keelung.setAttribute('x', center.x+700);
    keelung.setAttribute('y', center.y-1080);
    taoyuan.setAttribute('y', center.y-900);
    yunlin.setAttribute('y', center.y-140);
    chiayi.setAttribute('x', center.x+20);
    chiayi.setAttribute('y', center.y+10);
    pingtung.setAttribute('y', center.y+550);
    yilan.setAttribute('x', center.x+510);
    yilan.setAttribute('y', center.y-630);
    hualien.setAttribute('x', center.x+400);
    taitung.setAttribute('x', center.x+230);
    taitung.setAttribute('y', center.y+300);
    penghu.setAttribute('x', center.x-600);
    penghu.setAttribute('y', center.y-220);
    Chiayi.setAttribute('x', center.x-340);
    Chiayi.setAttribute('y', center.y-230);
}

// 放置文字
placeText('taipei', 'text1');
placeText('kaohsiung', 'text2');
placeText('taichung', 'text3');
placeText('tainan', 'text4');
placeText('Hsinchu', 'text5');
placeText('newTaipei', 'text6');
placeText('keelung', 'text7');
placeText('taoyuan', 'text8');
placeText('miaoli', 'text9');
placeText('changhua', 'text10');
placeText('nantou', 'text11');
placeText('yunlin', 'text12');
placeText('Chiayi', 'text13');
placeText('pingtung', 'text14');
placeText('yilan', 'text15');
placeText('hualien', 'text16');
placeText('taitung', 'text17');
placeText('penghu', 'text18');
placeText('kinmen', 'text19');
placeText('matsu', 'text20');
placeText('hsinchu', 'text21');
placeText('chiayi', 'text22');

let currentStep = 1;
    const totalSteps = 4;

    function setupButtonGroup(groupId) {
        const group = document.getElementById(groupId);
        group.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') {
                group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    setupButtonGroup('buildModeGroup');
    setupButtonGroup('installationTypeGroup');
    setupButtonGroup('areaUnitGroup');

    const svgContainer = document.getElementById('svgContainer');
    const regions = svgContainer.querySelectorAll('path');
    regions.forEach(region => {
        region.addEventListener('click', function() {
            svgContainer.querySelector('.selected')?.classList.remove('selected');
            this.classList.add('selected');
            const regionName = this.getAttribute('name');
            document.getElementById('selected-region').textContent = `選擇的地區: ${regionName}`;
        });
    });

    function showStep(step) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.querySelector(`.step-dot:nth-child(${currentStep})`).classList.remove('active');
        
        currentStep = step;
        
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.querySelector(`.step-dot:nth-child(${currentStep})`).classList.add('active');
        
        updateNavigationButtons();
    }

    function nextStep() {
        if (currentStep < totalSteps) {
            showStep(currentStep + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }

    function updateNavigationButtons() {
        document.getElementById('prev-button').style.display = currentStep > 1 ? 'inline-block' : 'none';
        document.getElementById('next-button').style.display = currentStep < totalSteps ? 'inline-block' : 'none';
        document.getElementById('calculate').style.display = currentStep === totalSteps ? 'inline-block' : 'none';
    }

updateNavigationButtons();

function getPriceBonusRegions() {
    return ['澎湖縣', '金門縣', '連江縣','台北市','基隆市','桃園市','新北市','新竹市','新竹縣','苗栗縣','宜蘭縣','花蓮縣','台東縣'
    ]; // 這些地區將獲得15%的價格加成
}

const moduleRecyclePrice = 0.0656; // 模組回收費
const highEffectPrice1to10 = 0.3423 //高效能模組
const highEffectPrice10to20 = 0.3346
const highEffectPrice20to50 = 0.2622
const highEffectPrice50to100 = 0.2511
const highEffectPrice100to500 = 0.2350
const highEffectPrice500toInfinite = 0.2311
const engineeringPrice50to100 = 0.0668//設備工程費
const engineeringPrice100toinfinite = 0.0964
function getCapacityMultiplier(capacity) {
    const priceRanges = [
        { max: 10, multiplier: (5.7055 + highEffectPrice1to10) },
        { max: 20, multiplier: (5.5760 + highEffectPrice10to20) },
        { max: 50, multiplier: (4.36945 + engineeringPrice50to100 +  highEffectPrice20to50) },
        { max: 100, multiplier: (4.1848 + engineeringPrice50to100 + highEffectPrice50to100) },
        { max: 500, multiplier: (3.9165 + engineeringPrice100toinfinite + highEffectPrice100to500) },
        { max: Infinity, multiplier: (3.8510 + engineeringPrice100toinfinite + highEffectPrice500toInfinite) }
    ];

    for (let range of priceRanges) {
        if (capacity < range.max) {
            return range.multiplier + moduleRecyclePrice;
        }
    }
    return priceRanges[priceRanges.length - 1].multiplier; // 默認返回最後一個乘數
}

function getAdjustedWholesalePrice(region, capacity) {
    const capacityMultiplier = getCapacityMultiplier(capacity);
    const adjustedPrice =  capacityMultiplier;
    const bonusRegions = getPriceBonusRegions();
    if (bonusRegions.includes(region)) {
        return adjustedPrice * 1.15; // 15% 加成
    }
    return adjustedPrice;
}

function calculate() {
    const buildMode = document.querySelector('#buildModeGroup .active')?.dataset.value;
    const installationType = document.querySelector('#installationTypeGroup .active')?.dataset.value;
    const region = svgContainer.querySelector('.selected')?.getAttribute('name') || '未選擇';
    const area = parseFloat(document.getElementById('area').value);
    const areaUnit = document.querySelector('#areaUnitGroup .active')?.dataset.value;
    
    if (!buildMode || !installationType || region === '未選擇' || isNaN(area) || !areaUnit) {
        alert('請填寫所有必要資訊');
        return;
    }

    document.getElementById(`step${currentStep}`).style.display = 'none';
    document.getElementById('prev-button').style.display = 'none';
    document.getElementById('calculate').style.display = 'none';

    let areaInPing = convertToPing(area, areaUnit);

    const capacityPerPing = {
        'agriculture': 1/2.73,
        'roofFrame': 1/2.12,
        'roofGround': 1/3.78,
        'roofFlat': 1/1.82
    };

    const capacity = areaInPing * capacityPerPing[installationType];

    const sunHours = getSunHours(region);
    const annualOutput = capacity * sunHours * 365;

    document.getElementById('baseArea').textContent = areaInPing.toFixed(2);
    document.getElementById('installType').textContent = getInstallationTypeName(installationType);
    document.getElementById('capacity').textContent = capacity.toFixed(2);
    document.getElementById('city').textContent = region;
    document.getElementById('sunHours').textContent = sunHours;
    document.getElementById('annualOutput').textContent = annualOutput.toFixed(2);

    if (buildMode === 'selfUse') {
        const avgPrice = parseFloat(document.getElementById('avgPrice').value);
        const annualSavings = annualOutput * avgPrice;
        const tRecCount = Math.floor(annualOutput / 1000);
        const greenCertificateIncome = tRecCount * 3000;

        document.getElementById('avgElectricityPrice').textContent = avgPrice.toFixed(2);
        document.getElementById('annualSavings').textContent = annualSavings.toFixed(2);
        document.getElementById('tRecCount').textContent = tRecCount;
        document.getElementById('greenCertificateIncome').textContent = greenCertificateIncome.toFixed(2);

        document.getElementById('selfUseResults').style.display = 'block';
        document.getElementById('sellElectricityResults').style.display = 'none';
        document.getElementById('rentRoofResults').style.display = 'none';

    } else if (buildMode === 'sellElectricity') {
        const adjustedWholesalePrice = getAdjustedWholesalePrice(region, capacity);
        const annualIncome = annualOutput * adjustedWholesalePrice;

        document.getElementById('wholesalePrice').textContent = adjustedWholesalePrice.toFixed(4);
        document.getElementById('annualIncome').textContent = annualIncome.toFixed(2);

        document.getElementById('selfUseResults').style.display = 'none';
        document.getElementById('sellElectricityResults').style.display = 'block';
        document.getElementById('rentRoofResults').style.display = 'none';

    } else if (buildMode === 'rentRoof') {
        const adjustedWholesalePrice = getAdjustedWholesalePrice(region, capacity);
        const annualIncome = annualOutput * adjustedWholesalePrice;
        const rentalIncome = annualIncome * 0.12;

        document.getElementById('rentalIncome').textContent = rentalIncome.toFixed(2);

        document.getElementById('selfUseResults').style.display = 'none';
        document.getElementById('sellElectricityResults').style.display = 'none';
        document.getElementById('rentRoofResults').style.display = 'block';
    }

    document.getElementById('results').style.display = 'flex';
    document.querySelector('.navigation').style.display = 'none'
}

function convertToPing(value, unit) {
    switch(unit) {
        case 'm2': return value / 3.3058;
        case 'ping': return value;
        case 'hectare': return value * 302.5;
        case 'mu': return value * 60.5;
        case 'jia': return value * 2934;
        default: return value;
    }
}

function getSunHours(region) {
    const sunHoursData = {
        '台北市': 3.05, '新北市': 3.09, '桃園市': 3.28, '新竹市': 3.54, '新竹縣': 3.49,
        '苗栗縣': 3.48, '台中市': 3.83, '彰化縣': 3.97, '南投縣': 3.74, '雲林縣': 3.99,
        '嘉義市': 3.86, '嘉義縣': 4.03, '台南市': 4.12, '高雄市': 4.10, '屏東縣': 3.72,
        '宜蘭縣': 3.19, '花蓮縣': 3.25, '台東縣': 3.44, '基隆市': 2.88, '澎湖縣': 3.56,
        '金門縣': 3.60, '連江縣': 3.34
    };
    return sunHoursData[region] || 3.5;
}

function getInstallationTypeName(type) {
    const names = {
        'agriculture': '農營結合屋頂型',
        'roofFrame': '屋頂棚架型',
        'roofGround': '屋頂落地型',
        'roofFlat': '屋頂平鋪型'
    };
    return names[type] || type;
}