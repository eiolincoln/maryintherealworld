// posts.js

// Example posts array: newest first
const posts = [
    {
        title: "Hello",
        date: "2025-11-20 05:39",
        text: "Been listening to I Love My Computer by Ninajirachi. Favourite: Delete",
        image: "images/ILoveMyComputer.jpg",
        textAboveImage: true,
        textSize: "1em",
        imageWidth: "100%",
        audio: "" // optional MP3 file path
    },
    { title: "Post 9", date: "2025-11-19 14:00", text: "Text for Post 9", image: "images/image9.jpg", textAboveImage: false, textSize: "1em", imageWidth: "100%", audio: "" },
    { title: "Post 8", date: "2025-11-18 09:30", text: "Text for Post 8", image: "images/image8.jpg", textAboveImage: true, textSize: "1em", imageWidth: "80%", audio: "" },
    { title: "Post 7", date: "2025-11-17 20:00", text: "Text for Post 7", image: "images/image7.jpg", textAboveImage: false, textSize: "1em", imageWidth: "100%", audio: "" },
    { title: "Post 6", date: "2025-11-16 18:00", text: "Text for Post 6", image: "images/image6.jpg", textAboveImage: true, textSize: "1em", imageWidth: "60%", audio: "" },
    { title: "Post 5", date: "2025-11-15 12:00", text: "Text for Post 5", image: "images/image5.jpg", textAboveImage: false, textSize: "1em", imageWidth: "100%", audio: "" },
    { title: "Post 4", date: "2025-11-14 09:00", text: "Text for Post 4", image: "images/image4.jpg", textAboveImage: true, textSize: "1em", imageWidth: "90%", audio: "" },
    { title: "Post 3", date: "2025-11-13 15:00", text: "Text for Post 3", image: "images/image3.jpg", textAboveImage: false, textSize: "1em", imageWidth: "100%", audio: "" },
    { title: "Post 2", date: "2025-11-12 08:00", text: "Text for Post 2", image: "images/image2.jpg", textAboveImage: true, textSize: "1em", imageWidth: "100%", audio: "" },
    { title: "Post 1", date: "2025-11-11 11:00", text: "Text for Post 1", image: "images/image1.jpg", textAboveImage: false, textSize: "1em", imageWidth: "100%", audio: "" },
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

        const postHTML = [];

        if (post.textAboveImage) {
            postHTML.push(`<p style="font-size:${post.textSize}">${post.text}</p>`);
        }

        if (post.image) {
            postHTML.push(`<img src="${post.image}" alt="${post.title}" style="width:${post.imageWidth}">`);
        }

        if (!post.textAboveImage) {
            postHTML.push(`<p style="font-size:${post.textSize}">${post.text}</p>`);
        }

        if (post.audio) {
            postHTML.push(`<audio controls src="${post.audio}"></audio>`);
        }

        section.innerHTML = `
            <h2>${post.title}</h2>
            <p class="datetime">${post.date}</p>
            ${postHTML.join("")}
        `;
        container.appendChild(section);
    });

    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Previous arrow
    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "←";
        prev.onclick = (e) => { e.preventDefault(); currentPage--; renderPosts(); };
        pagination.appendChild(prev);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;

        // Current page
        if (i === currentPage) {
            pageLink.style.textDecoration = "none";
            pageLink.style.fontWeight = "bold";
        } else {
            pageLink.style.textDecoration = "underline";
            pageLink.style.fontWeight = "bold";
        }

        pageLink.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderPosts();
        };

        pagination.appendChild(pageLink);
    }

    // Next arrow
    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = "→";
        next.onclick = (e) => { e.preventDefault(); currentPage++; renderPosts(); };
        pagination.appendChild(next);
    }
}

renderPosts();
