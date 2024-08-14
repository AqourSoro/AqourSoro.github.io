function loadContent(section, url) {
    const contentSection = document.getElementById('content-section');

    if (section === 'posts') {
        // 加载 posts.html 作为文章列表页面
        fetch('/posts.html')
            .then(response => response.text())
            .then(html => {
                contentSection.innerHTML = html;

                // 为每个文章链接添加点击事件处理
                const postLinks = contentSection.querySelectorAll('a');
                postLinks.forEach(link => {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        loadContent('post', link.getAttribute('href'));
                    });
                });
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                contentSection.innerHTML = `<p>Error loading posts.</p>`;
            });
    } else if (section === 'post') {
        // 加载文章内容
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const postContent = doc.querySelector('article').innerHTML || doc.querySelector('main').innerHTML;
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
