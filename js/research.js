import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

var firebaseConfig = {
    apiKey: "AIzaSyCt4zYdM1ap-GPSIzOLLfG1lB9aYKb06wE",
    authDomain: "test-c9a6e.firebaseapp.com",
    databaseURL: "https://test-c9a6e-default-rtdb.firebaseio.com",
    projectId: "test-c9a6e",
    storageBucket: "test-c9a6e.appspot.com",
    messagingSenderId: "903530691910",
    appId: "1:903530691910:web:820ef02881c960492a7947",
    measurementId: "G-6PDPPX4DBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let itemsPerPage = 10;
let currentPage = 1;
let allNews = [];

async function fetchNewsList() {
    const newsCollection = collection(db, 'research');
    const newsSnapshot = await getDocs(newsCollection);
    allNews = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    renderNewsList();
    setupPagination();
}

function renderNewsList() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedNews = allNews.slice(start, end);

    paginatedNews.forEach(item => {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
            <div class="content">
                <h3>${item.title || ''}</h3>
                <div class="content-container">
                    <div class="wrapper">
                        <a href="research.html?id=${item.id}">
                            <img src="${item.mainImage || '../src/background1.jpg'}" alt="${item.mainImageAlt || ''}">
                        </a>
                    </div>
                    <div class="text mx-3">
                        <div class="title">
                            <p>${item.content && item.content[0] && item.content[0].text ? item.content[0].text.substring(0, 100) + '...' : ''}</p>
                        </div>
                    </div>
                </div>
                <time>${item.date || ''}</time>
            </div>
        `;
        container.appendChild(article);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    const itemsPerPage = 10
    paginationContainer.innerHTML = '';

    const pageCount = Math.ceil(allNews.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderNewsList();
        });
        paginationContainer.appendChild(button);
    }
}

function updateLayout() {
    const cardContainer = document.querySelector('.cardContainer');
    const cards = document.querySelectorAll('.card');
    const layoutToggle = document.getElementById('layoutToggle');

    cardContainer.classList.toggle('verticle');
    cards.forEach(element => {
        element.classList.toggle('verticle');
    });

    if (cardContainer.classList.contains('verticle')) {
        layoutToggle.textContent = '切換到橫向布局';
    } else {
        layoutToggle.textContent = '切換到縱向布局';
    }

    currentPage = 1; // 重置到第一頁
    renderNewsList();
    setupPagination();
}

//分享功能

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
}

function handleShareButtonClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.classList.contains('share-btn')) {
        if (target.classList.contains('facebook')) {
            shareToFacebook();
        } else if (target.classList.contains('twitter')) {
            shareToTwitter();
        } else if (target.classList.contains('linkedin')) {
            shareToLinkedIn();
        }
    }
}

async function generateNewsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    
    if (!newsId) {
        // 如果沒有指定 ID，顯示新聞列表
        fetchNewsList();
        return;
    }

    // 隱藏新聞列表和分頁
    document.getElementById('bannerContainer').style.display = 'none';
    document.getElementById('news-container').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';

    const newsRef = doc(db, 'research', newsId);
    const newsSnap = await getDoc(newsRef);

    if (newsSnap.exists()) {
        const newsData = newsSnap.data();
        document.title = newsData.title;
        console.log(newsData.content)
        
        let content = `
            <div class="title">
                <h1>${newsData.title}</h1>
                <time>${newsData.date}</time>
                <img src="${newsData.mainImage}" alt="${newsData.mainImageAlt}">
            </div>
            <div class="content">
                ${renderContent(newsData.content)}
            </div>
            <div id="share-buttons">
                <a href="#" class="share-btn facebook">分享到 Facebook</a>
                <a href="#" class="share-btn twitter">分享到 Twitter</a>
                <a href="#" class="share-btn linkedin">分享到 LinkedIn</a>
            </div>
            <a href="../html/research.html" class="back-link">返回研究列表</a>
        `;
        const dynamicNewsContent = document.getElementById('dynamicNewsContent');
        dynamicNewsContent.innerHTML = content;

        // 添加事件监听器到包含分享按钮的父元素
        const shareButtonsContainer = document.getElementById('share-buttons');
        shareButtonsContainer.addEventListener('click', handleShareButtonClick);
    } else {
        document.getElementById('dynamicNewsContent').innerHTML = '<h1>新聞不存在</h1><a href="../html/research.html" class="back-link">返回研究列表</a>';
    }
}

function renderContent(contentArray) {
    return contentArray.map(item => {
        switch(item.type) {
            case 'subheading':
                return `<h2>${item.text}</h2>`;
            case 'paragraph':
                return `<p>${item.text}</p>`;
            case 'em':
                return `<em>${item.text}</em>`
            case 'image':
                return `<img src="${item.url}" alt="${item.alt}">`
            default:
                return '';
        }
    }).join('');
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', () => {
    generateNewsPage();
    
    const layoutToggle = document.getElementById('layoutToggle');
    layoutToggle.addEventListener('click', updateLayout);
});