// 切换语言的功能
function toggleLanguage() {
    const currentUrl = window.location.href;
    const isEnglish = currentUrl.includes('/en/');  // 检查当前是否是英文页面

    // 生成新的语言 URL
    const newUrl = isEnglish
        ? currentUrl.replace('/en/', '/cn/')  // 英文切换到中文
        : currentUrl.replace('/cn/', '/en/'); // 中文切换到英文

    // 更新页面内容并切换到新的 URL
    loadContent('page', newUrl);
}

// 更新语言切换按钮的功能
function updateLanguageSwitcher() {
    const languageButton = document.getElementById('language-btn');
    if (!languageButton) return;  // 确保按钮存在

    // 检查当前语言，基于当前 URL
    const currentUrl = window.location.href;
    const isEnglish = currentUrl.includes('/en/');
    
    // 更新按钮文字
    languageButton.innerText = isEnglish ? '中文' : 'English';  // 设置按钮文本
}

function loadContent(section, url) {
    const rightColumn = document.querySelector('.right-column'); // 页面内容区
    const spinner = document.getElementById('loading-spinner');  // 加载指示器

    // 开始加载内容时显示加载指示器
    spinner.style.display = 'block';

    // 发起 fetch 请求来加载内容
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // 成功加载内容后，解析 HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.right-column').innerHTML;
            rightColumn.innerHTML = newContent;

            // 隐藏加载指示器
            spinner.style.display = 'none';

            // 更新其他页面元素（如语言切换器）
            updateLanguageSwitcher();
        })
        .catch(error => {
            console.error('Error loading content:', error);

            // 仅在加载失败时显示错误页面，而不是在加载中途
            rightColumn.innerHTML = `<p>Sorry, we couldn't load the content. Please try again later.</p>`;

            // 隐藏加载指示器
            spinner.style.display = 'none';
        });

    // 更新 URL
    history.pushState(null, null, url);
}





// 初始化语言切换按钮状态
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageSwitcher();  // 页面加载时更新语言切换按钮的状态

    // 根据当前 URL 加载正确的页面内容（初始化）
    loadContent('page', window.location.href);

    // 监听浏览器前进/后退按钮的点击事件
    window.addEventListener('popstate', function(event) {
        // 当点击后退按钮时重新加载正确的页面内容
        loadContent('page', window.location.href);
    });
});

