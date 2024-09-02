import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {getFirestore, collection, doc, getDoc, getDocs, query, where, orderBy, limit} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBQg9q-RjqlO3LSTc2p0hKwIgOBScrKBM",
    authDomain: "steinlux.firebaseapp.com",
    projectId: "steinlux",
    storageBucket: "steinlux.appspot.com",
    messagingSenderId: "61933345477",
    appId: "1:61933345477:web:94767559db8d9ba68deeac"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let itemsPerPage = 10;
let currentPage = 1;
let allNews = [];

async function fetchNewsList() {
    const newsCollection = collection(db, 'news');
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
        article.className = 'cards';
        article.innerHTML = `
            <div class="content">
                <h3>${item.title || ''}</h3>
                <div class="content-container">
                    <div class="wrapper">
                        <a href="media.html?id=${item.id}">
                            <img src="${item.mainImage || '../src/background1.jpg'}" alt="${item.mainImageAlt || ''}">
                        </a>
                    </div>
                    <div class="text mx-3">
                        <p>${item.content && item.content[0] && item.content[0].text ? item.content[0].text.substring(0, 150) + '...' : ''}</p>
                    </div>
                </div>
                <div>
                    <time>${item.date || ''}</time>
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

async function searchNews(searchTerm = '') {
    const newsCollection = collection(db, 'news');
    let q;

    if (searchTerm) {
        q = query(newsCollection, 
            where('title', '>=', searchTerm), 
            where('title', '<=', searchTerm + '\uf8ff'), 
            orderBy('title'), 
            limit(10)
        );
    } else {
        q = query(newsCollection, orderBy('date', 'desc'), limit(10));
    }

    const querySnapshot = await getDocs(q);
    let searchResultsHtml = '';

    querySnapshot.forEach((doc) => {
        const newsData = doc.data();
        searchResultsHtml += `
            <div class="search-result-item">
                <h3><a href="media.html?id=${doc.id}">${newsData.title}</a></h3>
                <div class="search-content-container">
                    <div class="wrapper">
                        <a href="media.html?id=${doc.id}">
                            <img src="${newsData.mainImage || '../src/background1.jpg'}" alt="${newsData.mainImageAlt || ''}">
                        </a>
                    </div>
                    <span>
                        <p>${newsData.content[0].text.substring(0, 100)}...</p>
                    </span>
                </div>
            </div>
        `;
    });

    const searchResultsElement = document.getElementById('searchResults');
    if (searchResultsHtml) {
        searchResultsElement.innerHTML = searchResultsHtml;
        searchResultsElement.style.display = 'block';
    } else {
        searchResultsElement.innerHTML = '<p>沒有符合的新聞</p>';
        searchResultsElement.style.display = 'block';
    }
}



document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    searchNews(searchTerm);
});

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

// 分享函數
function shareToFacebook(url, title) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareToTwitter(url, title) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
}

function shareToLinkedIn(url, title) {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
}

// 事件處理函數
function handleShareButtonClick(event) {
    event.preventDefault();
    const target = event.target.closest('.share-btn');
    if (target) {
        const url = window.location.href;
        const title = document.title;

        if (target.classList.contains('facebook')) {
            shareToFacebook(url, title);
        } else if (target.classList.contains('twitter')) {
            shareToTwitter(url, title);
        } else if (target.classList.contains('linkedin')) {
            shareToLinkedIn(url, title);
        }
    }
}

// 生成新聞頁面函數
async function generateNewsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');
    
    if (!newsId) {
        // 如果沒有指定 ID，顯示新聞列表
        fetchNewsList();
        return;
    }

    // 隱藏新聞列表和分頁
    const bannerContainer = document.getElementById('bannerContainer');
    const newsContainer = document.getElementById('news-container');
    const pagination = document.getElementById('pagination');

    if (bannerContainer) bannerContainer.style.display = 'none';
    if (newsContainer) newsContainer.style.display = 'none';
    if (pagination) pagination.style.display = 'none';

    try {
        const newsRef = doc(db, 'news', newsId);
        const newsSnap = await getDoc(newsRef);

        if (newsSnap.exists()) {
            const newsData = newsSnap.data();
            document.title = newsData.title;
            
            let content = `
            <a href="media.html" class="back-link">返回新聞列表</a>
                <div class="title">
                    <h1>${newsData.title}</h1>
                    <time>${newsData.date}</time>
                    <div class='wrapper'><img src="${newsData.mainImage || '../src/banner1.png'}" alt="${newsData.mainImageAlt || ''}">
                    </div>
                </div>

                <div class="content">
                    ${renderContent(newsData.content)}
                </div>
                <div id="share-buttons">
                    <a href="#" class="share-btn facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#" class="share-btn twitter"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#" class="share-btn linkedin"><i class="fa-brands fa-linkedin"></i></a>
                </div>
                <a href="media.html" class="back-link mb-5">返回新聞列表</a>
            `;
            const dynamicNewsContent = document.getElementById('dynamicNewsContent');
            if (dynamicNewsContent) {
                dynamicNewsContent.innerHTML = content;

                // 添加事件監聽器到包含分享按鈕的父元素
                const shareButtonsContainer = document.getElementById('share-buttons');
                if (shareButtonsContainer) {
                    shareButtonsContainer.addEventListener('click', handleShareButtonClick);
                }
            }
        } else {
            const dynamicNewsContent = document.getElementById('dynamicNewsContent');
            if (dynamicNewsContent) {
                dynamicNewsContent.innerHTML = '<h1>新聞不存在</h1><a href="media.html" class="back-link">返回新聞列表</a>';
            }
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        const dynamicNewsContent = document.getElementById('dynamicNewsContent');
        if (dynamicNewsContent) {
            dynamicNewsContent.innerHTML = '<h1>載入新聞時發生錯誤</h1><a href="media.html" class="back-link">返回新聞列表</a>';
        }
    }
}

// 在頁面加載完成後初始化
document.addEventListener('DOMContentLoaded', generateNewsPage);

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
                return `
                <div class='wrapper'><img src="${item.url}" alt="${item.alt}"></div>`
            default:
                return '';
        }
    }).join('');
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', () => {
    const layoutToggle = document.getElementById('layoutToggle');
    layoutToggle.addEventListener('click', updateLayout);
});