function loadContent(section, url) {
    const contentSection = document.getElementById('content-section');

    if (section === 'posts') {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const postList = doc.querySelector('main.container').innerHTML;
                contentSection.innerHTML = postList;
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                contentSection.innerHTML = `<p>Error loading posts.</p>`;
            });
    } else if (section === 'post') {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const postContent = doc.querySelector('article').innerHTML;
                contentSection.innerHTML = postContent;
            })
            .catch(error => {
                console.error('Error loading post:', error);
                contentSection.innerHTML = `<p>Error loading post.</p>`;
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
