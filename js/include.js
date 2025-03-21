// HTML 조각 가져오는 유틸리티 함수
function fetchHtmlFragment(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error loading ${url}: ${response.statusText}`);
            }
            return response.text();
        });
}

// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 현재 페이지 확인 및 네비게이션 하이라이트 처리
        const currentPath = window.location.pathname;
        const pageName = currentPath.split('/').pop() || 'index.html';
        
        // 네비게이션 로드 완료 후 적용할 active 클래스
        setTimeout(() => {
            const navItems = document.querySelectorAll('nav ul li a');
            navItems.forEach(item => {
                if (item.getAttribute('href') === pageName) {
                    item.classList.add('active');
                }
            });
        }, 100);
        
    } catch (error) {
        console.error('Error loading page fragments:', error);
    }
}); 