// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 이벤트 감지
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // 명언 슬라이더 기능
    const quotes = document.querySelectorAll('.quote-slide');
    let currentQuote = 0;
    
    function showNextQuote() {
        quotes[currentQuote].style.display = 'none';
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].style.display = 'block';
    }
    
    // 초기 설정: 첫 번째 명언만 표시
    if (quotes.length > 0) {
        quotes.forEach(quote => {
            quote.style.display = 'none';
        });
        quotes[0].style.display = 'block';
        
        // 5초마다 다음 명언으로 전환
        if (quotes.length > 1) {
            setInterval(showNextQuote, 5000);
        }
    }

    // 다크 모드 토글 기능
    const createThemeToggle = () => {
        const button = document.createElement('button');
        button.classList.add('theme-toggle');
        button.setAttribute('aria-label', '테마 변경');
        button.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
        document.body.appendChild(button);

        // 저장된 테마가 있으면 적용
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                button.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            }
        }

        // 테마 토글 이벤트 리스너
        button.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // 아이콘 변경
            if (newTheme === 'dark') {
                button.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            } else {
                button.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
            }
        });
    };

    // 다크 모드 토글 생성
    createThemeToggle();

    // 타임라인 애니메이션
    const animateTimeline = () => {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) return;
        
        const checkIfInView = () => {
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                
                if (rect.top <= windowHeight * 0.8) {
                    item.classList.add('visible');
                }
            });
        };
        
        // 초기 체크
        checkIfInView();
        
        // 스크롤 시 체크
        window.addEventListener('scroll', checkIfInView);
    };
    
    // 타임라인 애니메이션 초기화
    animateTimeline();

    // 모바일 메뉴 토글 기능
    function setupMobileMenu() {
        // 이미 메뉴 토글 버튼이 있는지 확인
        if (document.querySelector('.menu-toggle')) return;
        
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        if (!header || !nav) return; // 헤더나 네비게이션이 없으면 실행하지 않음
        
        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('menu-toggle');
        toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        toggleBtn.setAttribute('aria-label', '메뉴 열기');
        toggleBtn.setAttribute('aria-expanded', 'false');
        
        const headerContainer = document.querySelector('header .container');
        
        if (!headerContainer) return;
        
        headerContainer.appendChild(toggleBtn);
        
        // 닫기 버튼 추가
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('menu-close');
        closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        closeBtn.setAttribute('aria-label', '메뉴 닫기');
        closeBtn.style.display = 'none'; // 초기에는 숨김
        
        // nav에 닫기 버튼 추가
        if (!nav.querySelector('.menu-close')) {
            nav.appendChild(closeBtn);
        }
        
        // 모바일 메뉴 타이틀 추가
        if (!nav.querySelector('.mobile-menu-title')) {
            const menuTitle = document.createElement('div');
            menuTitle.classList.add('mobile-menu-title');
            menuTitle.innerHTML = '<h2>메뉴</h2>';
            nav.insertBefore(menuTitle, nav.firstChild);
        }
        
        // 토글 버튼 클릭 이벤트
        toggleBtn.addEventListener('click', function() {
            nav.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            closeBtn.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
        });
        
        // 닫기 버튼 클릭 이벤트
        closeBtn.addEventListener('click', function() {
            nav.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            closeBtn.style.display = 'none';
            document.body.style.overflow = ''; // 스크롤 다시 활성화
        });
        
        // 메뉴 항목 클릭 시 메뉴 닫기
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                closeBtn.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
        
        // 창 크기가 변경될 때 모바일 메뉴 상태 조정
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                closeBtn.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // 부드러운 스크롤 기능
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴가 열려있으면 닫기
                const nav = document.querySelector('nav');
                const toggleBtn = document.querySelector('.menu-toggle');
                if (nav && nav.classList.contains('active') && toggleBtn) {
                    nav.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.setAttribute('aria-label', '메뉴 열기');
                    toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                }
            }
        });
    });
    
    // 현재 활성화된 페이지에 대한 네비게이션 항목 강조
    function highlightCurrentNavItem() {
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        
        document.querySelectorAll('nav ul li a').forEach(link => {
            if (link.getAttribute('href') === filename) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // 이미지에 alt 속성 추가 확인
    function checkImagesAlt() {
        document.querySelectorAll('img:not([alt])').forEach(img => {
            console.warn('이미지에 alt 속성이 없습니다:', img);
        });
    }

    // 소셜 미디어 공유 버튼 생성 및 이벤트 연결
    function createSocialShareButtons() {
        // 모든 콘텐츠 페이지의 article-section에 소셜 미디어 공유 버튼 추가
        const articleSections = document.querySelectorAll('.article-section');
        
        if (articleSections.length === 0) return;
        
        // 마지막 아티클 섹션 다음에 소셜 공유 버튼 추가
        const lastSection = articleSections[articleSections.length - 1];
        
        const socialShareDiv = document.createElement('div');
        socialShareDiv.className = 'social-share';
        
        const pageTitle = document.title;
        const pageUrl = window.location.href;
        
        // 페이스북 공유
        const facebookBtn = document.createElement('a');
        facebookBtn.className = 'social-share-button facebook';
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        facebookBtn.target = '_blank';
        facebookBtn.rel = 'noopener noreferrer';
        facebookBtn.setAttribute('aria-label', '페이스북에 공유하기');
        facebookBtn.innerHTML = '<i class="fab fa-facebook-f"></i>';
        
        // 트위터 공유
        const twitterBtn = document.createElement('a');
        twitterBtn.className = 'social-share-button twitter';
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
        twitterBtn.target = '_blank';
        twitterBtn.rel = 'noopener noreferrer';
        twitterBtn.setAttribute('aria-label', '트위터에 공유하기');
        twitterBtn.innerHTML = '<i class="fab fa-twitter"></i>';
        
        // 링크드인 공유
        const linkedinBtn = document.createElement('a');
        linkedinBtn.className = 'social-share-button linkedin';
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
        linkedinBtn.target = '_blank';
        linkedinBtn.rel = 'noopener noreferrer';
        linkedinBtn.setAttribute('aria-label', '링크드인에 공유하기');
        linkedinBtn.innerHTML = '<i class="fab fa-linkedin-in"></i>';
        
        // 이메일 공유
        const emailBtn = document.createElement('a');
        emailBtn.className = 'social-share-button email';
        emailBtn.href = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent('확인해 보세요: ' + pageUrl)}`;
        emailBtn.setAttribute('aria-label', '이메일로 공유하기');
        emailBtn.innerHTML = '<i class="fas fa-envelope"></i>';
        
        socialShareDiv.appendChild(facebookBtn);
        socialShareDiv.appendChild(twitterBtn);
        socialShareDiv.appendChild(linkedinBtn);
        socialShareDiv.appendChild(emailBtn);
        
        // 아티클 섹션 다음에 삽입
        if (lastSection.nextElementSibling) {
            lastSection.parentNode.insertBefore(socialShareDiv, lastSection.nextElementSibling);
        } else {
            lastSection.parentNode.appendChild(socialShareDiv);
        }
    }

    // 인용구 슬라이더 설정
    function setupQuoteSlider() {
        // 이미 위에서 구현되어 있으므로 별도 코드 불필요
    }

    // 초기화 함수
    function initializeAfterHeaderLoad() {
        // 소셜 미디어 공유 버튼 생성
        createSocialShareButtons();
        
        // 모바일 메뉴 토글 버튼 설정
        setupMobileMenu();
        
        // 네비게이션 현재 페이지 하이라이트
        highlightCurrentNavItem();
        
        // 이미지 alt 속성 체크
        checkImagesAlt();
    }

    // 페이지 로드 직후 초기화 시도
    initializeAfterHeaderLoad();

    // 헤더 로딩이 완료된 후에 모바일 메뉴 재설정 (include.js에서 발생하는 이벤트)
    document.addEventListener('headerLoaded', initializeAfterHeaderLoad);
    
    // header.html 내부에서 발생하는 이벤트도 감지
    document.addEventListener('headerReady', initializeAfterHeaderLoad);

    // 만약 500ms 이후에도 모바일 메뉴가 없다면 강제 초기화
    setTimeout(() => {
        if (document.querySelector('header') && !document.querySelector('.menu-toggle')) {
            initializeAfterHeaderLoad();
        }
    }, 500);
}); 