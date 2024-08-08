class Header extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
      <header>
              <div class="topBtn">
                  <button onclick="topBtn()"><i class="fa-solid fa-arrow-up" style="color: #fefefe;" aria-hidden="true"></i></button>
              </div>
  
              <div class="menu-container">
                  <div class="menu-toggle">☰</div>
                  <div class="menu-items">
                      <a href="https://www.instagram.com/steinlux.gc/" target="_blank" class="menu-item"><i class="fab fa-instagram"></i></a>
                      <a href="https://www.facebook.com/profile.php?id=61561277428728" target="_blank" class="menu-item"><i class="fab fa-facebook"></i></a>
                  </div>
              </div>
  
              <div class="nav-container">
                  <nav class="nav-bar fixed-top bg-white">
                      <ul class="nav-list">
                          <a class="navbar-logo nav-item steinluxLogo" href="../html/index.html"></a>
                          <a href="#" class="nav-link"><li class="nav-item">淨零顧問服務</li></a>
                          <a href="#" class="nav-link"><li class="nav-item">淨零解決方案</li></a>
                          <a href="#" class="nav-link"><li class="nav-item">永續服務</li></a>
                          <a href="#" class="nav-link"><li class="nav-item">INSIGHT</li></a>
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
                      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">淨零顧問服務<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <h2>供應鏈碳管理</h2>
                              <a href="../html/sbti.html">SBTi目標設定/提交</a>
                              <a href="../html/GHG.html">GHG Protocol Scope 3</a>
                              <h2>溫室氣體盤查</h2>
                              <a href="../html/ISO14064-1.html">ISO 14064-1組織型</a>
                              <a href="../html/ISO14067.html">ISO 14067 碳足跡</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">淨零解決方案<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                             <h2>綠電解決方案</h2>
                              <a href="../html/T-REC.html">國內再生能源憑證(T-REC)</a>
                              <a href="../html/CPPA.html">國內購電協議(CPPA)</a>
                              <a href="../html/I-REC TIGR.html">國際再生能源憑證(I-REC/TIGR)</a>
                              <h2>碳權解決方案</h2>
                              <a href="../html/ISO14064-2.html">ISO 14064-2專案開發</a>
                              <a href="#">國內減量額度交易</a>
                              <a href="#">國際自願性碳權採購</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">永續服務<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a href="../html/solarEnergy.html">太陽光電建置</a>
                              <a href="../html/carbonTrade.html">太陽光電計算機</a>
                              <a href="../html/carbonCalculator.html">碳足跡計算機</a>
                          </div>
                      </div>
                      <div class="dropdown2">
                          <a href="#" class="dropbtn">INSIGHT<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                              <a href="../html/media.html">媒體專區</a>
                              <a href="../html/research.html">研究報告 </a>
                              <a href="../html/newsTemplate.html">新聞模板</a>
                          </div>
                      </div>
                     <div class="dropdown2">
                          <a href="#" class="dropbtn">關於我們<i class="fa-solid fa-caret-up"></i></a>
                          <div class="dropdown-content">
                          <a href="../html/aboutUs.html" class="dropbtn">關於我們</a>
                          <a href="../html/feedback.html">意見與回饋</a>
                          </div>
                      </div>
                  </div>
  
                  <span class="openbtn" onclick="openNav()">&#9776;</span>
              </ul>
          </header>
      `;
    }
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
                      <li><a href="../html/solarEnergy.html">太陽光電建置</a></li>
                      <li><a href="../html/carbonCalculator.html">碳足跡計算機</a></li>
                  </ul>
              </div>
              <div>
                  <h4>淨零解決方案</h4>
                  <ul>
                      <li><a href="../html/ISO14064-2.html">ISO 14064-2專案開發</a></li>
                      <li><a href="#">國內減量額度交易</a></li>
                      <li><a href="#">國際自願性碳權採購</a></li>
                  </ul>
              </div>
              <div>
                  <h4>企業採購</h4>
                  <ul>
                      <li><a href="">碳中和產品</a></li>
                      <li><a href="">抵銷碳足跡</a></li>
                  </ul>
                  <h4>聯絡我們</h4>
                  <ul>
                      <li><a href="">shih@steinlux.com.tw</a></li>
                      <li><a href="">品牌合作</a></li>
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
                      <li><a href="../html/feedback.html">意見與回饋</a></li>
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
  
  customElements.define('index-header', Header);//定義header
  customElements.define('index-footer', Footer);//定義footer
  
  function topBtn(){
      window.scrollTo(0,0)
  }
  
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
                          <h2>供應鏈碳管理</h2>
                          <a href="../html/sbti.html">SBTi目標設定/提交</a>
                          <a href="../html/GHG.html">GHG Protocol Scope 3</a>
                          </div>
                          <div>
                          <h2>溫室氣體盤查</h2>
                          <a href="../html/ISO14064-1.html">ISO 14064-1組織型</a>
                          <a href="../html/ISO14067.html">ISO 14067 碳足跡</a>
                          </div>`],
          淨零解決方案: [`<div>
                             <h2>綠電解決方案</h2>
                              <a href="../html/T-REC.html">國內再生能源憑證(T-REC)</a>
                              <a href="../html/CPPA.html">國內購電協議(CPPA)</a>
                              <a href="../html/I-REC TIGR.html">國際再生能源憑證(I-REC/TIGR)</a>
                          </div>
                          <div>
                              <h2>碳權解決方案</h2>
                              <a href="../html/ISO14064-2.html">ISO 14064-2專案開發</a>
                              <a href="#">國內減量額度交易</a>
                              <a href="#">國際自願性碳權採購</a>
                          </div>`],
          永續服務: [`<div>
                          <a href="../html/solarEnergy.html">太陽光電建置</a>
                          <a href="../html/carbonTrade.html">太陽光電計算機</a>
                          <a href="../html/carbonCalculator.html">碳足跡計算機</a>
                      </div>`],
          INSIGHT: [`<div>
                          <a href="../html/media.html">媒體專區</a>
                          <a href="../html/research.html">研究報告 </a>
                          <a href="../html/newsTemplate.html">新聞模板</a>
                      </div>`],
          關於我們: [`<div>
                          <a href="../html/aboutUs.html">關於我們</a>
                          <a href="../html/feedback.html">意見與回饋</a>
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
          dropdownContainer.style.height = '300px';
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
        const triggerPoint = window.innerHeight / 2 * 1.1; // 視窗高度的55%
  
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
  
  function openNav() {
      document.getElementById("mySidenav").style.width = "100%";
  }
  
  function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }
  
  // 為下拉菜單添加切換功能
  document.addEventListener('DOMContentLoaded', function() {
      var dropdowns = document.querySelectorAll('.dropdown2');
      dropdowns.forEach(function(dropdown) {
          dropdown.querySelector('.dropbtn').addEventListener('click', function(e) {
              e.preventDefault();
              this.parentElement.classList.toggle('active');
          });
      });
  });