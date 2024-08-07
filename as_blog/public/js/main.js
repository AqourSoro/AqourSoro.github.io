function loadContent(section) {
    const contentSection = document.getElementById('content-section');
    
    if (section === 'home') {
        contentSection.innerHTML = `
            <h2>Welcome to my blog!</h2>
            <p>Home page content goes here.</p>
        `;
    } else if (section === 'about') {
        contentSection.innerHTML = `
            <h2>About</h2>
            <p>About page content goes here.</p>
        `;
    } else if (section === 'posts') {
        fetch('/posts/')
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const postContent = doc.querySelector('main.container').innerHTML;
                contentSection.innerHTML = postContent;
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                contentSection.innerHTML = `<p>Error loading posts.</p>`;
            });
    } else if (section === 'contact') {
        contentSection.innerHTML = `
            <h2>Contact</h2>
            <p>Contact page content goes here.</p>
        `;
    }
}
