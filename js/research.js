import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
    const newsCollection = collection(db, 'research');
    const newsSnapshot = await getDocs(newsCollection);
    allNews = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    
    // 按日期降序排序
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    renderTopNews();
    renderNewsList();
    renderSideNews();
    setupPagination();
}

//頂部新聞
function renderTopNews() {
    const topNewsContainer = document.querySelector('.topNews');
    const latestNews = allNews[0];

    const contentText = latestNews.content && latestNews.content[0] && latestNews.content[0].text
    ? latestNews.content[0].text
    : '';

    const displayContent = contentText.length > 250
    ? contentText.substring(0, 250) + '...'
    : contentText;

    topNewsContainer.innerHTML = `
        <div class="top-news-card">
            <div class="wrapper">
                <a href="research.html?id=${latestNews.id}">
                    <img src="${latestNews.mainImage || '../src/background1.jpg'}" alt="${latestNews.mainImageAlt || ''}">
                </a>
            </div>
            <span>
                <h2><a href="media.html?id=${latestNews.id}">${latestNews.title}</a></h2>
                <p>${displayContent}</p>
                <time>${latestNews.date || ''}</time>
            </span>
        </div>
    `;
}

//主要新聞列表
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
                <div class="content-container">
                    <div class="wrapper">
                        <a href="research.html?id=${item.id}">
                            <img src="${item.mainImage || '../src/background1.jpg'}" alt="${item.mainImageAlt || ''}">
                        </a>
                    </div>
                    <div class="text">
                        <h3><a href="research.html?id=${item.id}">${item.title || ''}</h3>
                        <p>${item.content && item.content[0] && item.content[0].text ? item.content[0].text.substring(0, 50) + '...' : ''}</a></p>
                    </div>
                </div>
                <div class="time">
                    <time>${item.date || ''}</time>
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

//側邊欄新聞
function renderSideNews() {
    const sideNewsContainer = document.getElementById('sideNews');
    const sideNewsItems = allNews.slice(0, 6); // 獲取接下來的6條新聞

    sideNewsContainer.innerHTML = '<h3>Latest News</h3>';
    sideNewsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'side-news-item';
        newsItem.innerHTML = `
            <a href="research.html?id=${item.id}">
                <h4>${item.title}</h4>
                <time>${item.date || ''}</time>
            </a>
        `;
        sideNewsContainer.appendChild(newsItem);
    });
}

function setupPagination() {
    const paginationContainer = document.getElementById('pagination');
    const itemsPerPage = 6
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
    
    // Hide news list elements
    const cardContainer = document.querySelector('.cardContainer');
    const newsContainer = document.querySelector('.newsContainer');
    
    if (newsId) {
        // If a specific news ID is provided, hide the news list and show the individual news
        if (cardContainer) cardContainer.style.display = 'none';
        if (newsContainer) newsContainer.style.display = 'flex';

        try {
            const newsRef = doc(db, 'research', newsId);
            const newsSnap = await getDoc(newsRef);

            if (newsSnap.exists()) {
                const newsData = newsSnap.data();
                document.title = newsData.title;
                
                let content = `
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
                    <a href="research.html" class="back-link mb-5">返回新聞列表</a>
                `;
                const dynamicNewsContent = document.getElementById('dynamicNewsContent');
                if (dynamicNewsContent) {
                    dynamicNewsContent.innerHTML = content;

                    // Add event listener to the parent element containing share buttons
                    const shareButtonsContainer = document.getElementById('share-buttons');
                    if (shareButtonsContainer) {
                        shareButtonsContainer.addEventListener('click', handleShareButtonClick);
                    }
                }
            } else {
                const dynamicNewsContent = document.getElementById('dynamicNewsContent');
                if (dynamicNewsContent) {
                    dynamicNewsContent.innerHTML = '<h1>新聞不存在</h1><a href="research.html" class="back-link">返回新聞列表</a>';
                }
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            const dynamicNewsContent = document.getElementById('dynamicNewsContent');
            if (dynamicNewsContent) {
                dynamicNewsContent.innerHTML = '<h1>載入新聞時發生錯誤</h1><a href="research.html" class="back-link">返回新聞列表</a>';
            }
        }
    } else {
        // If no specific news ID is provided, show the news list and hide the individual news container
        if (cardContainer) cardContainer.style.display = 'flex';
        if (newsContainer) newsContainer.style.display = 'none';
        fetchNewsList();
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