import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

async function fetchRandomNews() {
    const newsCollection = collection(db, 'news');
    const newsSnapshot = await getDocs(newsCollection);
    const allNews = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // Randomly select two articles
    const randomNews = [];
    while (randomNews.length < 2 && allNews.length > 0) {
        const randomIndex = Math.floor(Math.random() * allNews.length);
        randomNews.push(allNews.splice(randomIndex, 1)[0]);
    }

    return randomNews;
}

function renderRandomNews(newsItems) {
    const container = document.getElementById('newsItem');
    if (!container) return;

    container.innerHTML = '';

    newsItems.forEach(item => {
        const article = document.createElement('article');
        article.className = 'newsItem';
        article.innerHTML = `
            <div class="newsContent">
                <div class="wrapper">
                    <a href="media.html?id=${item.id}">
                        <img src="${item.mainImage || '../src/background1.jpg'}" alt="${item.mainImageAlt || ''}">
                    </a>
                </div>
                <div class="content">
                    <h2>${item.title || ''}</h2>
                    <p>${item.content && item.content[0] && item.content[0].text ? item.content[0].text.substring(0, 150) + '...' : ''}</p>
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

// Function to initialize random news display
async function initRandomNewsDisplay() {
    try {
        const randomNews = await fetchRandomNews();
        renderRandomNews(randomNews);
    } catch (error) {
        console.error("Error fetching random news:", error);
    }
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', initRandomNewsDisplay);

// Function to fetch news items from Firebase
async function fetchCarouselItems() {
    const newsCollection = collection(db, 'indexCarousel');
    const newsSnapshot = await getDocs(newsCollection);
    return newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

document.addEventListener('DOMContentLoaded', async function() {
    const carousel = document.querySelector('.carousel-container');
    const controls = document.querySelector('.carousel-controls');
    let currentIndex = 0;

    // Fetch items from Firebase
    const items = await fetchCarouselItems();

    function createCarouselItem(item) {
        const div = document.createElement('div');
        div.className = 'carouselItem';
        div.innerHTML = `
            <a href="${item.link}" target="_blank">
                <img src="${item.image}" alt="${item.title}">
            </a>
        `;
        return div;
    }

    function initCarousel() {
        // Clear existing content
        carousel.innerHTML = '';
        controls.innerHTML = '';

        // Add items to carousel
        items.forEach(item => {
            carousel.appendChild(createCarouselItem(item));
        });

        // Add extra items for infinite loop
        const itemsPerView = getItemsPerView();
        for (let i = 0; i < itemsPerView; i++) {
            carousel.appendChild(createCarouselItem(items[i]));
        }

        // Create dot controls
        items.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            controls.appendChild(dot);
        });

        updateCarousel();
    }

    function getItemsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        else return 1;
    }

    function updateCarousel() {
        const itemsPerView = getItemsPerView();
        const slideWidth = 100 / itemsPerView;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        carousel.style.transition = '0.5s';
        updateDots();

        // Check if we need to reset position
        if (currentIndex >= items.length) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(0)`;
                setTimeout(() => {
                    carousel.style.transition = '0.5s';
                }, 50);
            }, 500);
        }
    }

    function updateDots() {
        const dots = controls.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex % items.length);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Reinitialize carousel on window resize
    window.addEventListener('resize', initCarousel);

    // Initialize carousel
    initCarousel();

    // Auto-play
    setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 5000);
});

async function loadBrandImages() {
    const brandScroll = document.getElementById('brandScroll');
    const brandsCollection = collection(db, 'brands');
    
    try {
        const querySnapshot = await getDocs(brandsCollection);
        let brandImages = [];
        querySnapshot.forEach((doc) => {
            const brandData = doc.data();
            brandImages.push(`
                <div class="brand-item">
                    <img src="${brandData.image}" alt="${brandData.alt}">
                </div>
            `);
        });

        // 重複圖片組以實現無縫循環
        const doubledBrandImages = brandImages.concat(brandImages);
        brandScroll.innerHTML = doubledBrandImages.join('');

        // 調整動畫持續時間
        const scrollWidth = brandScroll.scrollWidth;
        const animationDuration = scrollWidth / 200; // 50px per second
        brandScroll.style.animationDuration = `${animationDuration}s`;
    } catch (error) {
        console.error("Error loading brand images:", error);
    }
}

window.addEventListener('load', loadBrandImages);