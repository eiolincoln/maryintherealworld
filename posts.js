// All posts newest first
const posts = [
    {
        title: "Hello",
        date: "2025-11-20 05:39",
        text: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete",
        image: "images/ILoveMyComputer.jpg",
        textAboveImage: true,   // text above or below the image
        textSize: "1em",
        imageWidth: "40%",
        audio: ""               // optional MP3 file path
    },
    {
        title: "Second Post",
        date: "2025-11-19 14:00",
        text: "Text-only post example. No image here.",
        image: "",              // no image
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: ""
    },
    {
        title: "Third Post",
        date: "2025-11-19 14:00",
        text: "This one has audio only.",
        image: "",
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: "audio/sample.mp3" // optional audio
    },
    // ... add more posts here
];

const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = ""; // clear old posts

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const section = document.createElement("section");
        section.className = "post";

        let contentHTML = "";

        // Text above image
        if(post.textAboveImage) {
            if(post.text) contentHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
            if(post.image) contentHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
        } 
        // Image above text
        else {
            if(post.image) contentHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
            if(post.text) contentHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
        }

        // Optional audio player
        if(post.audio) contentHTML += `<audio controls src="${post.audio}" style="width:100%; margin-top: 0.5em;"></audio>`;

        section.innerHTML = `
            <h2>${post.title}</h2>
            <p class="datetime">${post.date}</p>
            ${contentHTML}
        `;

        container.appendChild(section);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    // Previous arrow
    if(currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "<";
        prev.onclick = (e) => { e.preventDefault(); currentPage--; renderPosts(); };
        pagination.appendChild(prev);
    }

    // Page numbers
    for(let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.className = i === currentPage ? "current" : "";
        pageLink.style.color = "black";        // always black
        pageLink.style.textDecoration = i === currentPage ? "none" : "underline";
        pageLink.style.fontWeight = i === currentPage ? "bold" : "normal";
        pageLink.onclick = (e) => { e.preventDefault(); currentPage = i; renderPosts(); };
        pagination.appendChild(pageLink);
    }

    // Next arrow
    if(currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = ">";
        next.onclick = (e) => { e.preventDefault(); currentPage++; renderPosts(); };
        pagination.appendChild(next);
    }
}

// Initial render
renderPosts();
