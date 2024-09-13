class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
      <header>
              <div class="topBtn">
                  <button onclick="topBtn()"><i class="fa-solid fa-arrow-up" style="color: #fefefe;" aria-hidden="true"></i></button>
              </div>
  
              <div class="menu-container">
                  <div class="menu-toggle"><i class="fa-regular fa-comments"></i></div>
                  <div class="menu-items">
                      <a href="https://www.instagram.com/steinlux.gc/" target="_blank" class="menu-item"><i class="fab fa-instagram"></i></a>
                      <a href="https://www.facebook.com/profile.php?id=61561277428728" target="_blank" class="menu-item"><i class="fab fa-facebook"></i></a>
                  </div>
              </div>
  
              <div class="nav-container">
                  <nav class="nav-bar fixed-top bg-white">
                      <ul class="nav-list">
                          <a class="navbar-logo steinluxLogo" href="../html/index.html"></a>
                          <a class="nav-link"><li class="nav-item">淨零顧問服務</li></a>
                          <a class="nav-link"><li class="nav-item">淨零解決方案</li></a>
                          <a class="nav-link"><li class="nav-item">永續服務</li></a>
                          <a class="nav-link"><li class="nav-item">INSIGHT</li></a>
                          <a href="../html/aboutUs.html" class="nav-link"><li class="nav-item">關於我們</li></a>
                      </ul>
                  </nav>
                  </div>
                  <div class="dropdown-container">
                      <div class="dropdownContent">
                      </div>
                  </div>
                  
                  <div class="background-dimmer">
                  </div>
              </div>
                  <div id="mySidenav" class="sidenav">
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">淨零顧問服務<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a href="../html/carbonManagement.html"><h2>供應鏈碳管理</h2></a>
                              <a href="../html/sbti.html">SBTi目標設定/提交</a>
                              <a href="../html/GHG.html">GHG Protocol Scope 3</a>
                              <a href="../html/gasInterrogation.html"><h2>溫室氣體盤查</h2></a>
                              <a href="../html/ISO14064-1.html">ISO 14064-1組織型</a>
                              <a href="../html/ISO14067.html">ISO 14067 碳足跡</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">淨零解決方案<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a><h2>綠電解決方案</h2></a>
                              <a href="../html/T-REC.html">國內再生能源憑證(T-REC)</a>
                              <a href="../html/CPPA.html">國內購電協議(CPPA)</a>
                              <a href="../html/I-REC TIGR.html">國際再生能源憑證(I-REC/TIGR)</a>
                              <a><h2>碳權解決方案</h2></a>
                              <a href="../html/ISO14064-2.html">ISO 14064-2專案開發</a>
                              <a href="../html/emissionTrading.html">國內減量額度交易</a>
                              <a href="../html/carbonCreditPurchasing.html">國際自願性碳權採購</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">永續服務<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a href="../html/solarEnergy.html">太陽能建置</a>
                              <a href="../html/solarCalculator.html">太陽光電計算機</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">INSIGHT<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a href="../html/media.html">媒體專區</a>
                              <a href="../html/research.html">研究報告 </a>
                          </div>
                      </div>
                     <div class="dropdown2">
                          <a href="#" class="dropbtn">關於我們<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                          <a href="../html/aboutUs.html" class="dropbtn">關於我們</a>
                          </div>
                      </div>
                  </div>
  
                  <span class="openbtn" onclick="toggleNav()">&#9776;</span>
              </ul>
          </header>
      `
            window.toggleNav = () => {
                const backgroundDimmer = document.querySelector('.background-dimmer');
                document.getElementById("mySidenav").classList.toggle('open');
                if (document.getElementById("mySidenav").classList.contains('open')) {
                    backgroundDimmer.style.height = '100vh';
                    backgroundDimmer.style.backgroundColor = 'rgba(256, 256, 256, .8)';
                    backgroundDimmer.style.zIndex = '2';
                } else {
                    backgroundDimmer.style.height = '0';
                }
            };

            window.topBtn = () => {
                window.scrollTo(0, 0);
            };
        };
    }
  
  
  class Footer extends HTMLElement{
    connectedCallback(){
        this.innerHTML = ` 
        <footer>
          <div class="footerContainer">
              <div>
                  <h4>碳淨零顧問</h4>
                  <ul>
                    <li><a href="../html/sbti.html">SBTi目標設定/提交</a></li>
                    <li><a href="../html/GHG.html">GHG Protocol Scope 3</a></li>
                    <li><a href="../html/ISO14064-1.html">ISO 14064-1組織型</a></li>
                    <li><a href="../html/ISO14067.html">ISO 14067 碳足跡</a></li>
                  </ul>
                  <h4>永續服務</h4>
                  <ul>
                    <li><a href="../html/solarEnergy.html">太陽能建置</a><li>
                    <li><a href="../html/solarCalculator.html">太陽光電計算機</a></li>
                  </ul>
              </div>
              <div>
                  <h4>淨零解決方案</h4>
                  <ul>
                    <li><a href="../html/T-REC.html">國內再生能源憑證(T-REC)</a></li>
                    <li><a href="../html/CPPA.html">國內購電協議(CPPA)</a></li>
                    <li><a href="../html/I-REC TIGR.html">國際再生能源憑證(I-REC/TIGR)</a></li>
                    <li><a href="../html/ISO14064-2.html">ISO 14064-2專案開發</a></li>
                    <li><a href="../html/emissionTrading.html">國內減量額度交易</a></li>
                    <li><a href="../html/carbonCreditPurchasing.html">國際自願性碳權採購</a></li>
                  </ul>
              </div>
              <div>
                  <h4>企業採購</h4>
                  <ul>
                    <li><a href="../html/feedback.html">碳中和產品</a></li>
                    <li><a href="../html/feedback.html">抵銷碳足跡</a></li>
                  </ul>
                  <h4>聯絡我們</h4>
                  <ul>
                    <li><a href="../html/feedback.html">shih@steinlux.com.tw</a></li>
                    <li><a href="../html/feedback.html">品牌合作</a></li>
                  </ul>
              </div>
              <div>
                  <h4>INSIGHT</h4>
                  <ul>
                    <li><a href="../html/media.html">媒體專區</a></li>
                    <li><a href="../html/research.html">研究報告</a></li>
                  </ul>
                  <h4>關於我們</h4>
                  <ul>
                    <li><a href="../html/vision.html">楒騄願景與承諾</a></li>
                  </ul>
              </div>
          </div>
          <p>- Steinlux Green Capital -</p>
          <hr>
          <div class="footerCopyright">
              <p>Copyright © 2023. All rights reserved</p>
              <span>
                  <h4>Privacy Policy</h4>
                  <h4>Terms of Use</h4>
                  <h4>Legal</h4>
                  <h4>License</h4>
              </span>
          </div>
  
      </footer>`
    }
  }
  
  class Feedback extends HTMLElement{
    connectedCallback(){
        this.innerHTML = ` 
        <section class="contact">
            <div class="feedbackContainer mt-5 mb-5">
                <div class="feedback">
                    <div class="info">
                        <h2>Contact Us</h2>
                        <p><i class="fa-regular fa-building"></i> : 楒騄綠資本有限公司 STEINLUX GREEN CAPITAL CO.,LTD</p>
                        <p><i class="fa-regular fa-envelope"></i> : shih@steinlux.com.tw</p>
                        <div class="wrapper">
                            <img src="../src/Contact_image.svg">
                        </div>
                    </div>
                    <div class="feedbackForm">
                        <form id="feedback-form">
                            <label for="name">姓名</label><br>
                            <input id="name" name="name" required><br><br>
                            <label for="email">您的電子信箱</label><br>
                            <input type="email" id="email" name="email" required><br><br>
                            <label for="message">意見與回饋</label><br>
                            <textarea id="message" name="message" rows="10" maxlength="500" required style="resize: none;"></textarea><br><br>
                            <input type="submit" value="提交">
                        </form>
                    </div>
                </div>
            </div>
        </section>`
         // 初始化 emailjs
         emailjs.init("DkSbB9bF-Rdk7QVrY");

         // 表單提交邏輯
         document.getElementById('feedback-form').addEventListener('submit', function(event) {
             event.preventDefault();
 
             var templateParams = {
                 name: document.getElementById('name').value,
                 email: document.getElementById('email').value,
                 message: document.getElementById('message').value
             }; // 取得 input 內容
 
             // 使用 EmailJS 服務發送郵件
             emailjs.send('service_dfrw7bo','template_azx7ayk', templateParams)
                 .then(function(response) {
                     alert('感謝您的意見與回饋！');
 
                     // 清除表單資料
                     document.getElementById('name').value = '';
                     document.getElementById('email').value = '';
                     document.getElementById('message').value = '';
                 }, function(error) {
                     alert('發送失敗，請重新發送。');
                 });
         });
    }
  }

  customElements.define('index-header', Header);//定義header
  customElements.define('index-footer', Footer);//定義footer
  customElements.define('feed-back', Feedback);//定義feedback

  
  const menuToggle = document.querySelector('.menu-toggle');
          const menuItems = document.querySelector('.menu-items');
          const items = document.querySelectorAll('.menu-item');
          let isOpen = false;
  
          menuToggle.addEventListener('click', () => {
              isOpen = !isOpen;
              if (isOpen) {
                  menuItems.style.display = 'block';
                  setTimeout(() => {
                      items.forEach((item, index) => {
                          const angle = (index / (items.length - 1)) * 90;
                          const x = Math.cos(angle * Math.PI / 180) * 80;
                          const y = Math.sin(angle * Math.PI / 180) * 80;
                          item.style.transform = `translate(${-x}px, ${-y}px)`;
                      });
                  }, 0);
              } else {
                  items.forEach(item => {
                      item.style.transform = 'translate(0, 0)';
                  });
                  setTimeout(() => {
                      menuItems.style.display = 'none';
                  }, 300);
              }
          });
  
  document.addEventListener('DOMContentLoaded', () => {
      const navItems = document.querySelectorAll('.nav-link');
      const dropdownContainer = document.querySelector('.dropdown-container');
      const dropdownContent = document.querySelector('.dropdownContent');
      const backgroundDimmer = document.querySelector('.background-dimmer');
      let activeNavItem = null;
      let timeout = null;
  
      const products = {
          淨零顧問服務: [`<div>
                         <a href="../html/carbonManagement.html"><h2>供應鏈碳管理</h2></a>                             
                          <a href="../html/sbti.html">- SBTi目標設定/提交</a>
                          <a href="../html/GHG.html">- GHG Protocol Scope 3</a>
                          </div>
                          <div>
                          <a href="../html/gasInterrogation.html"><h2>溫室氣體盤查</h2></a>
                          <a href="../html/ISO14064-1.html">- ISO 14064-1組織型</a>
                          <a href="../html/ISO14067.html">- ISO 14067 碳足跡</a>
                          </div>`],
          淨零解決方案: [`<div>
                            <a><h2>綠電解決方案</h2></a>
                            <a href="../html/T-REC.html">- 國內再生能源憑證(T-REC)</a>
                            <a href="../html/CPPA.html">- 國內購電協議(CPPA)</a>
                            <a href="../html/I-REC TIGR.html">- 國際再生能源憑證(I-REC/TIGR)</a>
                          </div>
                          <div>
                            <a><h2>碳權解決方案</h2></a>
                            <a href="../html/ISO14064-2.html">- ISO 14064-2專案開發</a>
                            <a href="../html/emissionTrading.html">- 國內減量額度交易</a>
                            <a href="../html/carbonCreditPurchasing.html">- 國際自願性碳權採購</a>
                          </div>`],
          永續服務: [`<div>
                          <a href="../html/solarEnergy.html">- 太陽能建置</a>
                          <a href="../html/solarCalculator.html">- 太陽光電計算機</a>
                      </div>`],
          INSIGHT: [`<div>
                          <a href="../html/media.html">- 媒體專區</a>
                          <a href="../html/research.html">- 研究報告 </a>
                      </div>`],
          關於我們: [`<div>
                          <a href="../html/aboutUs.html">- 關於我們</a>
                      </div>`]
      };
  
      function createProductCards(category) {
          return products[category].map(product => `
              <div class="product-card">
                ${product}
              </div>
          `).join('');
      }
  
      function showDropdown(navItem) {
          const category = navItem.querySelector('.nav-item').textContent;
          if (products[category]) {
              dropdownContent.innerHTML = createProductCards(category);
          }
          else {
              dropdownContent.innerHTML = `<div class="product-card"><h3 class="product-title">${category}</h3></div>`;
          }
  
          clearTimeout(timeout);
          dropdownContainer.style.height = '230px';
          dropdownContent.style.width = '100%';
          dropdownContent.style.display = 'block';
          backgroundDimmer.style.height = '100vh';
          backgroundDimmer.style.backgroundColor = 'rgba(256, 256, 256, .5)';
          
          setTimeout(() => {
              dropdownContent.style.opacity = '1';
              dropdownContent.style.transform = 'translateY(0)';
              
              document.querySelectorAll('.product-card').forEach((card, index) => {
                  setTimeout(() => {
                      card.style.opacity = '1';
                      card.style.transform = 'translateY(0)';
                  }, index * 50);
              });
          }, 100);
  
          activeNavItem = navItem;
      }
  
      function hideDropdown() {
          timeout = setTimeout(() => {
              dropdownContainer.style.height = '0';
              backgroundDimmer.style.height = '0';
              backgroundDimmer.style.backgroundColor = 'rgba(0, 0, 0, 0)';
              dropdownContent.style.display = 'none';
              dropdownContent.style.transform = 'translateY(10px)';
              activeNavItem = null;
          }, 200);
      }
  
      navItems.forEach(item => {
          item.addEventListener('mouseenter', () => {
              if (activeNavItem !== item) {
                  showDropdown(item);
              }
          });
  
          item.addEventListener('mouseleave', hideDropdown);
      });
  
      dropdownContainer.addEventListener('mouseenter', () => {
          clearTimeout(timeout);
      });
  
      dropdownContainer.addEventListener('mouseleave', hideDropdown);
  });
  
  // script.js
  document.addEventListener('DOMContentLoaded', function() {
      const hiddenElementsAll = [
          ...document.querySelectorAll('.hidden-element'),
          ...document.querySelectorAll('.hidden-element-left'),
          ...document.querySelectorAll('.hidden-element-right')
        ];
  
    function checkScroll() {
        const triggerPoint = window.innerHeight / 1 * 0.6; // 視窗高度的60%
  
        hiddenElementsAll.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
  
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
              }
        });
    }
  
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始化檢查
  });
  
  // 為下拉菜單添加切換功能
  document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = document.querySelectorAll('.dropdown2');
    dropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBQg9q-RjqlO3LSTc2p0hKwIgOBScrKBM",
    authDomain: "steinlux.firebaseapp.com",
    projectId: "steinlux",
    storageBucket: "steinlux.appspot.com",
    messagingSenderId: "61933345477",
    appId: "1:61933345477:web:94767559db8d9ba68deeac"
  };

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 獲取頁面內容
async function getPageContent(pageName) {
    try {
        const docRef = doc(db, "pages", pageName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        return null;
    }
}

// 填充頁面內容
function fillPageContent(content) {
    if (!content) return;

    // 遍歷內容對象的所有鍵
    Object.keys(content).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === "IMG" ||element.tagName === 'VIDEO') {
                element.src = content[key];
                element.alt = content[key];
            } else if (element.tagName === 'A') {
                element.href = content[key];
            } else {
                element.innerHTML = content[key];
            }
        }
    });
}
// 主函數
async function loadPageContent() {
    const pageName = document.body.id; // 假設每個頁面的 body 標籤都有一個唯一的 id
    const content = await getPageContent(pageName);
    fillPageContent(content);
}

// 當 DOM 加載完成時執行
document.addEventListener('DOMContentLoaded', loadPageContent);