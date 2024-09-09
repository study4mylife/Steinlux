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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchCarouselItems() {
    const newsCollection = collection(db, '國際自願性碳權採購Carousel');
    const newsSnapshot = await getDocs(newsCollection);
    return newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}

document.addEventListener('DOMContentLoaded', async function() {
    const carousel = document.querySelector('.carousel-container');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    // Fetch items from Firebase
    const items = await fetchCarouselItems();

    function createCarouselItem(item) {
        const div = document.createElement('div');
        div.className = 'carouselItem';
        div.innerHTML = `
            <div class="image-wrapper">
                <img src="${item.image}">
            </div>
            <div class="text-wrapper">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
            </div>
        `;
        return div;
    }

    function initCarousel() {
        // Clear existing content
        carousel.innerHTML = '';

        // Add items to carousel
        items.forEach(item => {
            carousel.appendChild(createCarouselItem(item));
        });

        updateCarousel();
    }

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    // Reinitialize carousel on window resize
    window.addEventListener('resize', initCarousel);

    // Initialize carousel
    initCarousel();

    // Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 5000);
});