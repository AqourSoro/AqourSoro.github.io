// 切换语言的功能
function toggleLanguage() {
    const currentUrl = window.location.href;
    const isEnglish = !currentUrl.includes('/cn/');  // 检查是否为默认语言

    const newUrl = isEnglish
        ? currentUrl.replace(window.location.origin, window.location.origin + '/cn')  // 切换到中文
        : currentUrl.replace('/cn', '');  // 切换回默认语言

    window.location.href = newUrl;  // 重定向到新的 URL
}


function loadContent(section, url) {
    // 不改变当前页面内容，直到新内容加载成功
    const rightColumn = document.querySelector('.right-column');  // 页面内容区

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.right-column').innerHTML;

            // 只有在成功加载后，才替换现有页面内容
            rightColumn.innerHTML = newContent;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            // 如果加载失败，保持页面不变，什么都不做
        });

    // 更新 URL
    history.pushState(null, null, url);
}



// 初始化语言切换按钮状态
document.addEventListener('DOMContentLoaded', () => {

    // 根据当前 URL 加载正确的页面内容（初始化）
    loadContent('page', window.location.href);

    
});

// 监听浏览器前进/后退按钮的点击事件
window.addEventListener('popstate', function(event) {
    // 当点击后退按钮时重新加载正确的页面内容
    loadContent('page', window.location.href);
});
