const paths = document.querySelectorAll('svg path');

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

function updateElectricGroup(buildMode) {
    const electricGroup = document.getElementById('electricGroup');
    if (buildMode === 'selfUse') {
        electricGroup.style.display = 'flex';
        document.getElementById('h2Input').innerText = '輸入電費'
    } else {
        electricGroup.style.display = 'none';
        document.getElementById('h2Input').innerText = '輸入面積'
    }
}

function setupButtonGroup(groupId) {
    const group = document.getElementById(groupId);
    group.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            group.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            if (groupId === 'buildModeGroup') {
                const buildMode = e.target.dataset.value;
                updateElectricGroup(buildMode);
                document.getElementById('step4Container').style.justifyContent = 'center'
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const initialBuildMode = document.querySelector('#buildModeGroup .active')?.dataset.value;
    updateElectricGroup(initialBuildMode);
});

setupButtonGroup('buildModeGroup');
setupButtonGroup('installationTypeGroup');

const svgContainer = document.getElementById('svgContainer');
const regions = svgContainer.querySelectorAll('path');
regions.forEach(region => {
    region.addEventListener('click', function() {
        svgContainer.querySelector('.selected')?.classList.remove('selected');
        this.classList.add('selected');
        const regionName = this.getAttribute('name');
        document.getElementById('selected-region').textContent = `${regionName}!`;
        document.getElementById('selected-region-solar').innerHTML = `<text>平均日照時數為:${getSunHours(regionName)}小時<p class = 'example'>（僅供參考）</p></text>`;
        document.getElementById('selected-region-2').textContent = `${regionName}!`;
        document.getElementById('selected-region-solar-2').innerHTML = `<text>平均日照時數為:${getSunHours(regionName)}小時<p class = 'example'>（僅供參考）</p></text>`
    });
});

function showStep(step) {
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    currentStep = step;
    
    document.getElementById(`step${currentStep}`).classList.add('active');
    
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

function updateAvgPrice() {
    const winterPrice = parseFloat(document.getElementById('winter').value) || 0;
    const summerPrice = parseFloat(document.getElementById('summer').value) || 0;
    const avgPrice = (winterPrice + summerPrice) / 2;
    document.getElementById('avgPrice').textContent = `平均購電成本為${avgPrice.toFixed(2)}元/度！`;
}

// 為冬季和夏季電價輸入添加事件監聽器
document.getElementById('winter').addEventListener('input', updateAvgPrice);
document.getElementById('summer').addEventListener('input', updateAvgPrice);

function calculate() {
    const winterPrice = parseFloat(document.getElementById('winter').value);
    const summerPrice = parseFloat(document.getElementById('summer').value);
    const infoType = document.getElementById('infoType');
    const buildMode = document.querySelector('#buildModeGroup .active')?.dataset.value;
    const installationType = document.querySelector('#installationTypeGroup .active')?.dataset.value;
    const region = svgContainer.querySelector('.selected')?.getAttribute('name') || '未選擇';
    const areaPing = parseFloat(document.getElementById('area').value);
    
    if (!buildMode || !installationType || region === '未選擇' || isNaN(areaPing) ||buildMode === 'selfUse' && !winterPrice ||buildMode === 'selfUse' && !summerPrice) {
      alert('請填寫所有必要資訊');
      return;
    }

    document.getElementById(`step${currentStep}`).style.display = 'none';
    document.getElementById('prev-button').style.display = 'none';
    document.getElementById('calculate').style.display = 'none';

    const capacityPerPing = {
        'agriculture': 1/2.73,
        'roofFrame': 1/2.12,
        'roofGround': 1/3.78,
        'roofFlat': 1/1.82
    };

    const capacity = areaPing * capacityPerPing[installationType];

    const sunHours = getSunHours(region);
    const annualOutput = capacity * sunHours * 365;

    // 更新基本信息
    document.getElementById('baseArea').value = areaPing.toFixed(2) + ' 坪';
    document.getElementById('capacity').value = capacity.toFixed(2) + ' kW';
    document.getElementById('city').value = region;
    document.getElementById('sunHour').value = sunHours + ' 小時';
    document.getElementById('annualOutput').value = annualOutput.toFixed(2) + ' kWh';

    document.getElementById('selfUseResults').style.display = 'none';
    document.getElementById('sellElectricityResults').style.display = 'none';
    document.getElementById('rentRoofResults').style.display = 'none';

    if (buildMode === 'selfUse') {
        const winterPrice = parseFloat(document.getElementById('winter').value);
        const summerPrice = parseFloat(document.getElementById('summer').value);
        const avgPrice = (winterPrice + summerPrice) / 2;
        const annualSavings = annualOutput * avgPrice;
        const tRecCount = Math.floor(annualOutput / 1000);
        const greenCertificateIncome = tRecCount * 3000;
        const totalIncome = annualSavings + greenCertificateIncome;
        const avgElectricityIncome = totalIncome / annualOutput;

        document.getElementById('avgElectricityPrice').value = avgPrice.toFixed(2) + ' 元/度';
        document.getElementById('annualSavings').value = annualSavings.toFixed(0).toLocaleString() + ' 元';
        document.getElementById('tRecCount').value = tRecCount.toLocaleString() + ' 張';
        document.getElementById('greenCertificateIncome').value = greenCertificateIncome.toFixed(0).toLocaleString() + ' 元';
        document.getElementById('avgElectricityIncome').value = avgElectricityIncome.toFixed(2) + ' 元/度';
        document.getElementById('totalIncome').value = totalIncome.toFixed(0).toLocaleString() + ' 元';

        infoType.textContent = '自發自用'
        document.getElementById('selfUseResults').style.display = 'block';

    } else if (buildMode === 'sellElectricity') {
        const adjustedWholesalePrice = getAdjustedWholesalePrice(region, capacity);
        const annualIncome = annualOutput * adjustedWholesalePrice;

        infoType.textContent = '自建售電'
        document.getElementById('wholesalePrice').value = adjustedWholesalePrice.toFixed(4) + ' 元/度';
        document.getElementById('annualIncome').value = annualIncome.toFixed(0).toLocaleString() + ' 元';

        document.getElementById('sellElectricityResults').style.display = 'block';

    } else if (buildMode === 'rentRoof') {
        const adjustedWholesalePrice = getAdjustedWholesalePrice(region, capacity);
        const annualIncome = annualOutput * adjustedWholesalePrice;
        const rentalIncome = annualIncome * 0.12;

        infoType.textContent = '出租屋頂'
        document.getElementById('rentalIncome').value = rentalIncome.toLocaleString() + ' 元';
        document.getElementById('rentRoofResults').style.display = 'block';
    }
    document.getElementById('results').style.display = 'flex';
}

function convertFromPing(ping) {
    return {
      ping: ping,
      m2: ping * 3.3058,
      hectare: ping * 0.0003305785,
      mu: ping * 0.0165289,
      jia: ping * 0.0003409
    };
  }

  function updateAreaUnits() {
    const pingArea = parseFloat(document.getElementById('area').value) || 0;
    const conversions = convertFromPing(pingArea);
    
    document.getElementById('areaPing').value = conversions.ping.toFixed(4) + '坪';
    document.getElementById('areaM2').value = conversions.m2.toFixed(4) + '平方米';
    document.getElementById('areaHectare').value = conversions.hectare.toFixed(4) + '公頃';
    document.getElementById('areaMu').value = conversions.mu.toFixed(4) + '畝';
    document.getElementById('areaJia').value = conversions.jia.toFixed(4) + '甲';
  }
  
  // 監聽面積輸入變化
  document.getElementById('area').addEventListener('input', updateAreaUnits);
  
  // 初始化顯示
  updateAreaUnits();
  

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

function restart() {
    document.getElementById('results').style.display = 'none';
    
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step${i}`).style.display = 'flex';
        document.getElementById(`step${i}`).classList.remove('active');
    }
    
    document.getElementById('step1').classList.add('active');
    
    currentStep = 1;
    
    updateNavigationButtons();
    
    document.getElementById('area').value = '';
    document.getElementById('winter').value = '';
    document.getElementById('summer').value = '';
    document.getElementById('avgPrice').textContent = '平均購電成本為 0 元/度！';
    
    const selectedRegion = svgContainer.querySelector('.selected');
    if (selectedRegion) {
        selectedRegion.classList.remove('selected');
    }
    document.getElementById('selected-region').textContent = '口口縣/市!';
    document.getElementById('selected-region-solar').innerHTML = '平均日照時數為:';
    document.getElementById('selected-region-2').textContent = '口口縣/市!';
    document.getElementById('selected-region-solar-2').innerHTML = '平均日照時數為:';
    
    document.querySelectorAll('#buildModeGroup button, #installationTypeGroup button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateElectricGroup(null);
}

document.getElementById('restartButton').addEventListener('click', restart);