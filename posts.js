const posts = [
    {
        title: "Hello",
        date: "2025-11-20 05:39",
        text: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete",
        image: "images/ILoveMyComputer.jpg",
        textAboveImage: true,
        textSize: "1em",
        imageWidth: "10%",
        audio: "" // optional MP3 file path
    },
    // ...add more posts here
];

const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const section = document.createElement("section");
        section.className = "post";

        let postHTML = "";
        if (post.textAboveImage) {
            postHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
            if(post.image) postHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
        } else {
            if(post.image) postHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
            postHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
        }

        if(post.audio) postHTML += `<audio controls src="${post.audio}"></audio>`;

        section.innerHTML = `
            <h2>${post.title}</h2>
            <p class="datetime">${post.date}</p>
            ${postHTML}
        `;
        container.appendChild(section);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Previous arrow
    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "<";
        prev.onclick = (e) => { e.preventDefault(); currentPage--; renderPosts(); };
        pagination.appendChild(prev);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.style.textDecoration = i === currentPage ? "none" : "underline";
        pageLink.style.fontWeight = i === currentPage ? "bold" : "normal";
        pageLink.onclick = (e) => { e.preventDefault(); currentPage = i; renderPosts(); };
        pagination.appendChild(pageLink);
    }

    // Next arrow
    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = ">";
        next.onclick = (e) => { e.preventDefault(); currentPage++; renderPosts(); };
        pagination.appendChild(next);
    }
}

renderPosts();
