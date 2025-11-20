// All posts: newest first
console.log("Posts JS loaded!");

const posts = [
    {
        title: "Hello",
        date: "2025-11-20 5:39",
        text: "Been listening to I Love My Computer by Ninajirachi. Favourite: Delete",
        image: "images/ILoveMyComputer.jpg",
        textPosition: "above",        // "above" or "below" image
        textSize: "1.2em",            // font-size for this post
        imageWidth: "80%",            // width of the image
        imageHeight: "auto"           // height of the image
    },
    {
        title: "Post 2",
        date: "2025-11-19 14:00",
        text: "Text for Post 2",
        image: "images/image2.jpg",
        textPosition: "below",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
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
