/**
 * header.html과 footer.html을 로드하는 최적화된 모듈
 * - 캐싱과 성능 개선 구현
 * - 에러 처리 강화
 * - main.js 통합 지원
 */

// 즉시 실행되는 함수 - 스크립트 로드 시 즉시 실행
(function() {
    console.log('include.js 초기화:', new Date().toISOString());

    // 캐시 제어를 위한 타임스탬프 생성 (개발 중에만 사용, 프로덕션에서는 삭제)
    const cacheBuster = '?v=' + new Date().getTime();
    
    // 헤더 및 푸터 로딩 트래킹
    const loadingState = {
        headerLoaded: false,
        footerLoaded: false
    };

    // DOM이 준비되면 실행
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM 준비됨, 컴포넌트 로딩 시작');
        
        // Font Awesome이 로드되었는지 확인
        ensureFontAwesome();
        
        // 헤더 로드
        loadHeader();
        
        // 푸터 로드
        loadFooter();
    });
    
    // Font Awesome이 로드되었는지 확인하고, 안 되어 있으면 다시 로드
    function ensureFontAwesome() {
        // Font Awesome 스타일시트가 있는지 확인
        let fontAwesomeLoaded = false;
        const styleSheets = document.styleSheets;
        
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const href = styleSheets[i].href || '';
                if (href.includes('font-awesome') || href.includes('fontawesome')) {
                    fontAwesomeLoaded = true;
                    break;
                }
            } catch (err) {
                // CORS 오류 등으로 href에 접근할 수 없을 때 예외 처리
                console.warn('스타일시트 정보에 접근할 수 없습니다:', err);
            }
        }
        
        // Font Awesome이 로드되지 않았다면 추가
        if (!fontAwesomeLoaded) {
            console.log('Font Awesome을 로드합니다.');
            const fontAwesomeLink = document.createElement('link');
            fontAwesomeLink.rel = 'stylesheet';
            fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            fontAwesomeLink.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(fontAwesomeLink);
        }
    }

    // 헤더 로드 함수
    function loadHeader() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (!headerPlaceholder) {
            console.error('헤더 플레이스홀더를 찾을 수 없습니다! DOM이 준비되지 않았을 수 있습니다.');
            return;
        }

        console.log('헤더 로딩 시작...');
        
        // 모든 기존 헤더를 정리
        function cleanupExistingHeaders() {
            // 실제 <header> 태그 제거
            const existingHeaders = document.querySelectorAll('header');
            if (existingHeaders.length > 0) {
                console.log('이미 페이지에 헤더가 존재합니다. 모두 제거합니다:', existingHeaders.length);
                existingHeaders.forEach(header => {
                    header.parentNode.removeChild(header);
                });
            }
            
            // 중복된 메뉴 토글 버튼 제거
            const menuButtons = document.querySelectorAll('.menu-toggle');
            if (menuButtons.length > 0) {
                console.log('페이지에 메뉴 버튼이 존재합니다. 모두 제거합니다:', menuButtons.length);
                menuButtons.forEach(button => {
                    if (button.parentNode) {
                        button.parentNode.removeChild(button);
                    }
                });
            }
        }
        
        // 기존 헤더 정리
        cleanupExistingHeaders();
        
        fetch('header.html' + cacheBuster)
            .then(response => {
                if (!response.ok) {
                    throw new Error('헤더 로드 실패: ' + response.status);
                }
                console.log('헤더 HTML 가져오기 성공, 상태:', response.status);
                return response.text();
            })
            .then(html => {
                console.log('헤더 HTML 내용 길이:', html.length);
                
                // 안전하게 헤더 콘텐츠만 추출
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const headerContent = doc.querySelector('header');
                
                if (!headerContent) {
                    throw new Error('유효한 헤더 콘텐츠를 찾을 수 없습니다');
                }
                
                // 마지막으로 한번 더 기존 헤더 정리
                cleanupExistingHeaders();
                
                // 헤더 콘텐츠 삽입
                headerPlaceholder.innerHTML = headerContent.outerHTML;
                
                console.log('헤더 HTML 삽입 완료');
                
                // 스크립트 실행 - header.html 내부의 스크립트
                const headerScript = doc.querySelector('script');
                if (headerScript) {
                    const scriptContent = headerScript.textContent;
                    const newScript = document.createElement('script');
                    newScript.textContent = scriptContent;
                    document.head.appendChild(newScript);
                    console.log('헤더 스크립트 실행 완료');
                }
                
                // 헤더 로드 상태 업데이트
                loadingState.headerLoaded = true;
                
                // 현재 페이지 활성화
                highlightCurrentPage();
                
                // 메인 스크립트 초기화를 위한 이벤트 발생
                document.dispatchEvent(new CustomEvent('headerLoaded'));
                
                // Font Awesome이 제대로 적용되었는지 확인
                setTimeout(checkFontAwesomeIcons, 500);
            })
            .catch(error => {
                console.error('헤더 로드 오류:', error);
                headerPlaceholder.innerHTML = 
                    '<div style="color:#721c24;background-color:#f8d7da;border:1px solid #f5c6cb;' +
                    'padding:12px;border-radius:4px;text-align:center;">헤더를 로드할 수 없습니다</div>';
            });
    }

    // 푸터 로드 함수
    function loadFooter() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        console.log('푸터 로딩 시작...');
        footerPlaceholder.innerHTML = '<div style="text-align:center;padding:15px;background:#f8f8f8;">푸터 로딩 중...</div>';
        
        fetch('footer.html' + cacheBuster)
            .then(response => {
                if (!response.ok) {
                    throw new Error('푸터 로드 실패: ' + response.status);
                }
                return response.text();
            })
            .then(html => {
                // 푸터 콘텐츠 삽입
                footerPlaceholder.innerHTML = html;
                console.log('푸터 로드 완료');
                
                // 푸터 로드 상태 업데이트
                loadingState.footerLoaded = true;
                
                // 푸터 로드 완료 이벤트 발생
                document.dispatchEvent(new CustomEvent('footerLoaded'));
            })
            .catch(error => {
                console.error('푸터 로드 오류:', error);
                footerPlaceholder.innerHTML = 
                    '<div style="color:#721c24;background-color:#f8d7da;border:1px solid #f5c6cb;' +
                    'padding:12px;border-radius:4px;text-align:center;">푸터를 로드할 수 없습니다</div>';
            });
    }

    // Font Awesome 아이콘 로딩 확인
    function checkFontAwesomeIcons() {
        // 메뉴 토글 버튼의 아이콘이 정상적으로 표시되는지 확인
        const menuToggleIcon = document.querySelector('.menu-toggle i');
        if (menuToggleIcon) {
            const style = window.getComputedStyle(menuToggleIcon);
            // Font Awesome이 로드되지 않으면 아이콘이 표시되지 않음
            if (style.fontFamily.indexOf('awesome') === -1) {
                console.warn('Font Awesome 아이콘이 제대로 표시되지 않습니다. 다시 로드합니다.');
                ensureFontAwesome();
                
                // 아이콘에 인라인 스타일 추가
                const allIcons = document.querySelectorAll('.fas, .fab, .far, [class*="fa-"]');
                allIcons.forEach(icon => {
                    if (icon.classList.contains('fa-bars')) {
                        icon.textContent = '☰'; // 메뉴 아이콘 대체
                    }
                });
            }
        }
    }

    // 헤더의 현재 페이지 강조 표시 함수
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log('현재 페이지:', currentPage);
        
        // 모든 네비게이션 링크 선택
        const navLinks = document.querySelectorAll('nav a');
        
        if (navLinks.length === 0) {
            console.log('네비게이션 링크를 찾을 수 없습니다.');
            return;
        }
        
        // 활성 클래스 제거
        navLinks.forEach(link => link.classList.remove('active'));
        
        // 현재 페이지에 활성 클래스 추가
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
                console.log('활성화된 링크:', href);
            }
        });
    }
})();