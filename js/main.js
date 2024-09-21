function loadContent(section, url) {
    const rightColumn = document.querySelector('.right-column'); // 选择右侧的内容区域
    rightColumn.innerHTML = `<p>Loading...</p>`; // 在加载期间显示占位符

    if (section === 'posts') {
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
                const newContent = doc.querySelector('.right-column').innerHTML; // 只加载右侧内容
                rightColumn.innerHTML = newContent;
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                rightColumn.innerHTML = `<p>Error loading posts.</p>`;
            });
    } else if (section === 'post') {
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
                const postContent = doc.querySelector('article').innerHTML;
                rightColumn.innerHTML = postContent; // 替换右侧内容为文章内容
            })
            .catch(error => {
                console.error('Error loading post:', error);
                rightColumn.innerHTML = `<p>Error loading post.</p>`;
            });
    }

    // 更新 URL 而不重新加载页面
    if (url) {
        history.pushState(null, null, url);
    }
}



let currentLanguage = 'en'; // 默认语言是English

function loadTranslations(language) {
    const langFile = `/locales/${language}.json`; // JSON 文件路径

    fetch(langFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 更新页面主要内容
            document.querySelector('#welcome-text').innerText = data.homeTitle;
            document.querySelector('#home-content').innerText = data.homeContent;

            // 更新导航栏按钮的文字
            document.getElementById('home-btn').innerText = data.homeBtn;
            document.getElementById('blog-btn').innerText = data.blogBtn;
            document.getElementById('language-btn').innerText = data.languageButton;
        })
        .catch(error => console.error('Error loading translations:', error));
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'cn' : 'en';
    loadTranslations(currentLanguage);
}

// 页面加载时加载默认语言
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(currentLanguage);
});
