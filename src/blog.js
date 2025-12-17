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
      slug: "architectural-photography",
      title: "Architectural Photography: A walk through history",
      date: "September 12, 2025",
      author: "John Doe",
      image: "/public/arco.jpg",
      content: `
<p>
Architecture tells the story of humanity’s evolution, capturing the spirit of
entire eras through stone, steel, and design. Architectural photography
challenges us to see buildings not merely as structures, but as living
narratives shaped by time.
</p><br/>
<p>
Old Havana, with its vibrant colors and intricate details, offers a rich
tapestry for architectural exploration. It is a must-visit destination for
photographers seeking to blend history with artistry.
</p><br/>
<p>
Below are a few essential tips and must-have gear considerations for
architectural photography:
</p><br/>

<ul>
  <li>-Use a wide-angle lens to capture the grandeur of buildings.</li>
  <li>-Pay close attention to lines and symmetry for balanced compositions.</li>
  <li>-Shoot during the golden hour for warm, soft lighting.</li>
  <li>-Experiment with different perspectives to highlight unique features.</li>
</ul>
`

},
    {
      slug: "portraits-in-silence",
      title: "Portraits in Silence",
      date: "August 28, 2025",
      author: "Jane Doe",
      image: "/public/brothers.jpg",
      content: `
Stillness reveals more than motion ever could.

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

