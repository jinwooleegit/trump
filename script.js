document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 스크롤 부드럽게
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 인용구 슬라이더
    const quoteSlides = document.querySelectorAll('.quote-slide');
    let currentQuoteIndex = 0;

    function showNextQuote() {
        // 현재 인용구 숨기기
        quoteSlides[currentQuoteIndex].style.display = 'none';
        
        // 다음 인용구 인덱스 계산
        currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length;
        
        // 다음 인용구 표시
        quoteSlides[currentQuoteIndex].style.display = 'block';
        quoteSlides[currentQuoteIndex].style.animation = 'fadeInOut 10s';
    }

    // 초기 상태 설정
    if (quoteSlides.length > 0) {
        quoteSlides.forEach((slide, index) => {
            if (index > 0) {
                slide.style.display = 'none';
            }
        });
        
        // 5초마다 인용구 변경
        setInterval(showNextQuote, 5000);
    }

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');
    
    function updateHeaderStyle() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateHeaderStyle);

    // 카드와 공약 요소 애니메이션
    function animateOnScroll() {
        const elements = document.querySelectorAll('.card, .promise');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 초기 스타일 설정
    const animatedElements = document.querySelectorAll('.card, .promise');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 스크롤 이벤트에 애니메이션 함수 연결
    window.addEventListener('scroll', animateOnScroll);
    
    // 페이지 로드 시 한 번 실행
    animateOnScroll();

    // 모바일 메뉴 기능은 header.html 내에 이미 구현되어 있습니다.
    // 중복 생성을 방지하기 위해 createMobileMenu 함수를 제거했습니다.
}); 