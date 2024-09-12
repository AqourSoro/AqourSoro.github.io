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

function changeLanguage(lang) {
    // 可以通过修改URL或者通过后端获取不同的语言页面
    if (lang === 'en') {
        window.location.href = '/en'; // 假设英文页面在 `/en`
    } else if (lang === 'cn') {
        window.location.href = '/cn'; // 假设中文页面在 `/cn`
    }
}