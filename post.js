// All posts: newest first
const posts = [
    { title: "hello", date: "2025-11-20 5:16", text: "first post", image: "images/image10.jpg" },
    { title: "Post 9", date: "2025-11-19 14:00", text: "Text for Post 9", image: "images/image9.jpg" },
    { title: "Post 8", date: "2025-11-18 09:30", text: "Text for Post 8", image: "images/image8.jpg" },
    { title: "Post 7", date: "2025-11-17 20:00", text: "Text for Post 7", image: "images/image7.jpg" },
    { title: "Post 6", date: "2025-11-16 18:00", text: "Text for Post 6", image: "images/image6.jpg" },
    { title: "Post 5", date: "2025-11-15 12:00", text: "Text for Post 5", image: "images/image5.jpg" },
    { title: "Post 4", date: "2025-11-14 09:00", text: "Text for Post 4", image: "images/image4.jpg" },
    { title: "Post 3", date: "2025-11-13 15:00", text: "Text for Post 3", image: "images/image3.jpg" },
    { title: "Post 2", date: "2025-11-12 08:00", text: "Text for Post 2", image: "images/image2.jpg" },
    { title: "Post 1", date: "2025-11-11 11:00", text: "Text for Post 1", image: "images/image1.jpg" }
];

const postsPerPage = 5;
let currentPage = 1;

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const section = document.createElement("section");
        section.className = "post";
        section.innerHTML = `
            <h2>${post.title}</h2>
            <p class="datetime">${post.date}</p>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ""}
            <p>${post.text}</p>
        `;
        container.appendChild(section);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "← Previous";
        prev.onclick = (e) => { e.preventDefault(); currentPage--; renderPosts(); };
        pagination.appendChild(prev);
    }

    if (currentPage * postsPerPage < posts.length) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = "Next →";
        next.onclick = (e) => { e.preventDefault(); currentPage++; renderPosts(); };
        pagination.appendChild(next);
    }
}

renderPosts();
