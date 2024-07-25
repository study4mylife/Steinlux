class Header extends HTMLElement{
  connectedCallback(){
      this.innerHTML = `
    <header>
            <div class="topBtn">
                <button onclick="topBtn()"><i class="fa-solid fa-arrow-up fa-2x" style="color: #fefefe;" aria-hidden="true"></i></button>
            </div>
            <div class="nav-container">
                <nav class="nav-bar fixed-top bg-white">
                    <ul class="nav-list">
                        <a class="navbar-logo nav-item steinluxLogo" href="../html/index.html"></a>
                        <li class="nav-item"><a href="#" class="nav-link link">淨零顧問服務</a></li>
                        <li class="nav-item"><a href="#" class="nav-link link">淨零解決方案</a></li>
                        <li class="nav-item"><a href="#" class="nav-link link">永續服務</a></li>
                        <li class="nav-item"><a href="#" class="nav-link link">INSIGHT</a></li>
                        <li class="nav-item"><a href="../html/aboutUs.html" class="link">關於我們</a></li>
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
                            <a href="../html/ISO14064.html">ISO 14064-1組織型</a>
                            <a href="../html/ISO14067.html">ISO 14067 碳足跡</a>
                        </div>
                    </div>
                    <div class="dropdown2">
                        <a href="#" class="dropbtn">淨零解決方案</a>
                        <div class="dropdown-content">
                           <h2>綠電解決方案</h2>
                            <a href="#">國內再生能源憑證(T-REC)</a>
                            <a href="#">國內購電協議(CPPA)</a>
                            <a href="#">國際再生能源憑證(I-REC/TIGR)</a>
                            <h2>碳權解決方案</h2>
                            <a href="#">ISO 14064-2專案開發</a>
                            <a href="#">國內減量額度交易</a>
                            <a href="#">國際自願性碳權採購</a>
                        </div>
                    </div>
                    <div class="dropdown2">
                        <a href="#" class="dropbtn">永續服務</a>
                        <div class="dropdown-content">
                            <a href="../html/solarEnergy.html">太陽光電建置</a>
                            <a href="../html/carbonCalculator.html">碳足跡計算機</a>
                        </div>
                    </div>
                    <div class="dropdown2">
                        <a href="#" class="dropbtn">INSIGHT</a>
                        <div class="dropdown-content">
                            <a href="../html/media.html">媒體專區</a>
                            <a href="../html/research.html">研究報告 </a>
                        </div>
                    </div>
                   <div class="dropdown2">
                        <a href="../html/aboutUs.html" class="dropbtn">關於我們</a>
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
                    <li><a href="../html/emissionCompliance.html">CBAM合規顧問</a></li>
                    <li><a href="../html/netZeroPath.html">淨零路徑規劃</a></li>
                </ul>
                <h4>永續服務</h4>
                <ul>
                    <li><a href="../html/solarEnergy.html">太陽能規劃/建置</a></li>
                    <li><a href="../html/carbonCalculator.html">碳足跡計算機</a></li>
                    <li><a href="../html/carbonNeutrality.html">碳中和平台</a></li>
                </ul>
            </div>
            <div>
                <h4>淨零解決方案</h4>
                <ul>
                    <li><a href="../html/gasInventories.html">溫室氣體盤查ISO 14064-1</a></li>
                    <li><a href="../html/carbonFootprint.html">產品碳足跡盤查ISO 14067</a></li>
                    <li><a href="../html/greenElectricity.html">再生能源憑證申請/交易</a></li>
                    <li><a href="../html/CarbonTrade.html">碳權專案申請/交易</a></li>
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

customElements.define('index-header', Header);
customElements.define('index-footer', Footer);

function topBtn(){
    window.scrollTo(0,0)
}

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const dropdownContainer = document.querySelector('.dropdown-container');
    const dropdownContent = document.querySelector('.dropdownContent');
    const backgroundDimmer = document.querySelector('.background-dimmer');
    const main = document.querySelectorAll('main')
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
                        <a href="../html/ISO14064.html">ISO 14064-1組織型</a>
                        <a href="../html/ISO14067.html">ISO 14067 碳足跡</a>
                        </div>`],
        淨零解決方案: [`<div>
                           <h2>綠電解決方案</h2>
                            <a href="#">國內再生能源憑證(T-REC)</a>
                            <a href="#">國內購電協議(CPPA)</a>
                            <a href="#">國際再生能源憑證(I-REC/TIGR)</a>
                        </div>
                        <div>
                            <h2>碳權解決方案</h2>
                            <a href="#">ISO 14064-2專案開發</a>
                            <a href="#">國內減量額度交易</a>
                            <a href="#">國際自願性碳權採購</a>
                        </div>`],
        永續服務: [`<div>
                        <a href="../html/solarEnergy.html">太陽光電建置</a>
                        <a href="../html/carbonCalculator.html">碳足跡計算機</a>
                    </div>`],
        INSIGHT: [`<div>
                        <a href="../html/media.html">媒體專區</a>
                        <a href="../html/research.html">研究報告 </a>
                    </div>`],
        關於我們: []
    };

    function createProductCards(category) {
        return products[category].map(product => `
            <div class="product-card">
              ${product}
            </div>
        `).join('');
    }

    function showDropdown(navItem) {
        const category = navItem.querySelector('.nav-link').textContent;
        if (products[category]) {
            dropdownContent.innerHTML = createProductCards(category);
        }

        else if(products[關於我們]){
            dropdownContent.innerHTML = ''
        }
        else  {
            dropdownContent.innerHTML = `<div class="product-card"><h3 class="product-title">${category}</h3></div>`;
        }

        clearTimeout(timeout);
        dropdownContainer.style.height = '380px';
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
            dropdownContent.style.opacity = '0';
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




