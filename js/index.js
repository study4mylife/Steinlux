document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    const controls = document.querySelector('.carousel-controls');
    let currentIndex = 0;

    const items = [
        {
            image: "../src/event1.png",
            title: "",
            description: "",
            link: "https://www.accupass.com/event/2408010630384537218920?utm_source=ios_accupass&utm_medium=share_2110101316487467428630&utm_campaign=accu_e"
        },
        {
            image: "../src/event2.jpg",
            title: "",
            description: "",
            link: "https://docs.google.com/forms/d/e/1FAIpQLScO4tJRtuViSAl7gNQ6zwDZxr5YShSHAAi9_I2vq3u1wOOj3g/viewform?fbclid=IwY2xjawEZQwBleHRuA2FlbQIxMAABHapHOEH_NuGUP0tDU3U_Unhvl3hjJpmk3uH6r7SrvdU6t6vu1amFglWccw_aem_HN21mByvW27DNmptV8oL9Q"
        },
        {
            image: "../src/event3.png",
            title: "",
            description: "",
            link: "https://www.accupass.com/event/2406240750398011702440"
        }
    ];

    function createCarouselItem(item) {
        const div = document.createElement('div');
        div.className = 'carouselItem';
        div.innerHTML = `
            <a href="${item.link}" target="_blank">
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </a>
        `;
        return div;
    }

    function initCarousel() {
        // 清空現有內容
        carousel.innerHTML = '';
        controls.innerHTML = '';

        // 添加項目到輪播
        items.forEach(item => {
            carousel.appendChild(createCarouselItem(item));
        });

        // 為無限循環添加額外的項目
        const itemsPerView = getItemsPerView();
        for (let i = 0; i < itemsPerView; i++) {
            carousel.appendChild(createCarouselItem(items[i]));
        }

        // 創建圓點控制
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
        if (window.innerWidth > 480) return 2;
        return 1;
    }

    function updateCarousel() {
        const itemsPerView = getItemsPerView();
        const slideWidth = 100 / itemsPerView;
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        carousel.style.transition = '0.5s';
        updateDots();

        // 檢查是否需要重置位置
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

    // 視窗大小變化時重新初始化輪播
    window.addEventListener('resize', initCarousel);

    // 初始化輪播
    initCarousel();

    // 自動播放
    setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 5000);
});




