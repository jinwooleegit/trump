const fs = require('fs');
const path = require('path');

// 처리하지 않을 파일 목록
const excludeFiles = ['header.html', 'footer.html'];

// HTML 파일 목록 가져오기
const getHtmlFiles = () => {
    return fs.readdirSync('./')
        .filter(file => file.endsWith('.html') && !excludeFiles.includes(file));
};

// 파일 내용 업데이트 함수
const updateFile = (filePath) => {
    console.log(`Processing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 헤더 대체하기
    content = content.replace(
        /<body>[\s\S]*?<header>[\s\S]*?<\/header>/m,
        '<body>\n    <div id="header-placeholder"></div>'
    );
    
    // 푸터 대체하기
    content = content.replace(
        /<footer[\s\S]*?<\/footer>[\s\S]*?<script/m,
        '<div id="footer-placeholder"></div>\n\n    <script src="js/include.js"></script>\n    <script'
    );
    
    // 파일 저장
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
};

// 메인 함수
const main = () => {
    const htmlFiles = getHtmlFiles();
    console.log(`Found ${htmlFiles.length} HTML files to update`);
    
    htmlFiles.forEach(file => {
        updateFile(file);
    });
    
    console.log('All files updated successfully!');
};

main(); 