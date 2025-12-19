// =====================
// BLOG INIT
// =====================
const blogContent = document.getElementById('blogContent');
const blogList = document.getElementById('blogList');

if (blogContent && blogList) {

  // =====================
  // BLOG POSTS
  // =====================
  const posts = [
    {
      slug: "Blog Section Example",
      title: "Blog Section Example",
      date: "September 12, 2025",
      author: "John Doe",
      image: "arco.jpg",
      content: `This layout demonstrates how blog or article content can be displayed.
      No CMS or backend is included by default.
`

},
    {
      slug: "portraits-in-silence",
      title: "Portraits in Silence",
      date: "August 28, 2025",
      author: "Jane Doe",
      image: "trac-vu-bird.jpg",
      content: `Stillness reveals more than motion ever could.
      Portrait photography is about waiting — for light, for breath,
      for the moment someone forgets the camera is there.
`
    }
  ];

  // =====================
  // SIMPLE MARKDOWN PARSER
  // =====================
  function parseMarkdown(md) {
    return md
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/\n\n/g, '</p><p>');
  }

  // =====================
  // RENDER POST
  // =====================
  function renderPost(post) {
    blogContent.innerHTML = `
      <div class="mb-6 opacity-70 text-sm">
        By ${post.author} · ${post.date}
      </div>

      <h1 class="text-4xl md:text-5xl font-bold mb-8 leading-tight"
          style="font-family: 'Playfair Display', serif;">
        ${post.title}
      </h1>

      <img src="${post.image}" class="w-full max-w-2xl h-[320px] mx-auto rounded-lg mb-10 object-cover" />

      <div class="prose prose-invert prose-lg max-w-none">
        <p>${parseMarkdown(post.content)}</p>
      </div>
    `;
  }

  // =====================
  // RENDER SIDEBAR
  // =====================
  function renderSidebar() {
    blogList.innerHTML = posts.map(post => `
      <li>
        <button data-slug="${post.slug}"
          class="text-left hover:text-yellow-900 transition">
          <div class="font-medium">${post.title}</div>
          <div class="opacity-60 text-xs mt-1">${post.date}</div>
        </button>
      </li>
    `).join('');

    blogList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const slug = btn.dataset.slug;
        const post = posts.find(p => p.slug === slug);
        if (post) renderPost(post);
      });
    });
  }

  // =====================
  // INIT
  // =====================
  renderSidebar();
  renderPost(posts[0]);
}

