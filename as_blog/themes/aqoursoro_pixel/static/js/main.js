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

let currentLanguage = '中文'; // 默认语言

function toggleLanguage() {
    const languageBtn = document.getElementById('language-btn');
    const elementsToTranslate = document.querySelectorAll('.translatable');

    if (currentLanguage === '中文') {
        // 切换为英文
        languageBtn.textContent = 'English';
        currentLanguage = 'English';

        // 替换页面的所有文本为英文
        elementsToTranslate.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
    } else {
        // 切换为中文
        languageBtn.textContent = '中文';
        currentLanguage = '中文';

        // 替换页面的所有文本为中文
        elementsToTranslate.forEach(el => {
            el.textContent = el.getAttribute('data-cn');
        });
    }
}