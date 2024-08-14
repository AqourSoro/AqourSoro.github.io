function loadContent(section, url) {
    const contentSection = document.getElementById('content-section');

    if (section === 'posts') {
        // 请求Zola渲染后的页面
        fetch('/posts/')
            .then(response => response.text())
            .then(html => {
                contentSection.innerHTML = html;
                // 给每个文章链接添加事件处理
                const postLinks = contentSection.querySelectorAll('a');
                postLinks.forEach(link => {
                    link.addEventListener('click', function(event) {
                        // 允许默认行为直接跳转到文章页面
                        loadContent('post', link.getAttribute('href'));
                    });
                });
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                contentSection.innerHTML = `<p>Error loading posts.</p>`;
            });
    } else if (section === 'post') {
        // 直接加载文章内容
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
}
