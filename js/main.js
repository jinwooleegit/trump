// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 이벤트 감지
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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

    // 모바일 메뉴 토글 기능 개선
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('menu-toggle');
    toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    toggleBtn.setAttribute('aria-label', '메뉴 열기');
    toggleBtn.setAttribute('aria-expanded', 'false');
    
    const nav = document.querySelector('nav');
    const headerContainer = document.querySelector('header .container');
    
    headerContainer.appendChild(toggleBtn);
    
    toggleBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', isExpanded ? '메뉴 닫기' : '메뉴 열기');
        toggleBtn.innerHTML = isExpanded ? '<i class="fas fa-times" aria-hidden="true"></i>' : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
    
    // 창 크기가 변경될 때 모바일 메뉴 상태 조정
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', '메뉴 열기');
            toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        }
    });
    
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
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.setAttribute('aria-label', '메뉴 열기');
                    toggleBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
                }
            }
        });
    });
    
    // 현재 활성화된 페이지에 대한 네비게이션 항목 강조
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === filename) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // 이미지에 alt 속성 추가 확인
    document.querySelectorAll('img:not([alt])').forEach(img => {
        console.warn('이미지에 alt 속성이 없습니다:', img);
    });
}); 