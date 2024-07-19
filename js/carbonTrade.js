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