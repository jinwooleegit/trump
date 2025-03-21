/**
 * header.html과 footer.html을 로드하는 유틸리티 함수
 */

document.addEventListener('DOMContentLoaded', function() {
    // 헤더와 푸터 로드
    loadHeader();
    loadFooter();
});

/**
 * 헤더를 로드하는 함수
 */
function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            
            // 현재 페이지의 네비게이션 항목에 active 클래스 추가
            highlightCurrentPage();
            
            // 모바일 메뉴 초기화 이벤트 발생
            document.dispatchEvent(new CustomEvent('headerLoaded'));
        })
        .catch(error => console.error('헤더를 로드하는 중 오류가 발생했습니다:', error));
}

/**
 * 푸터를 로드하는 함수
 */
function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => console.error('푸터를 로드하는 중 오류가 발생했습니다:', error));
}

/**
 * 현재 페이지의 네비게이션 링크에 active 클래스를 추가
 */
function highlightCurrentPage() {
    // 현재 페이지의 파일명 가져오기
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // 모든 네비게이션 링크에 active 클래스 제거
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    
    // 현재 페이지에 해당하는 링크에 active 클래스 추가
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

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