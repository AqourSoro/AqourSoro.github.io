
// 动态加载页面内容
function loadContent(section, url) {
    const rightColumn = document.querySelector('.right-column'); // 页面内容区

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

            // 更新右侧内容
            const newContent = doc.querySelector('.right-column').innerHTML;
            rightColumn.innerHTML = newContent;

            // 更新标题
            const newTitle = doc.querySelector('title')?.innerText;
            if (newTitle) {
                document.title = newTitle; // 更新当前网页的标题
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });

    // 更新 URL
    history.pushState(null, null, url);
}


// 初始化页面语言切换按钮
document.addEventListener('DOMContentLoaded', () => {
    loadContent('page', window.location.href);  // 加载当前URL内容
});

// 监听浏览器前进/后退按钮的点击事件
window.addEventListener('popstate', function(event) {
    loadContent('page', window.location.href);
});
