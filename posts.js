// All posts: newest first
const posts = [
    {
        title: "Hello",
        date: "2025-11-20 05:39",
        text: "Been listening to I Love My Computer by Ninajirachi. Favourite: Delete",
        image: "images/ILoveMyComputer.jpg",
        textPosition: "above",   // text above image
        textSize: "1.2em",
        imageWidth: "80%",
        imageHeight: "auto"
    },
    {
        title: "Post 9",
        date: "2025-11-19 14:00",
        text: "Text for Post 9",
        image: "images/image9.jpg",
        textPosition: "below",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 8",
        date: "2025-11-18 09:30",
        text: "Text for Post 8",
        image: "images/image8.jpg",
        textPosition: "above",
        textSize: "1em",
        imageWidth: "90%",
        imageHeight: "auto"
    },
    {
        title: "Post 7",
        date: "2025-11-17 20:00",
        text: "Text for Post 7",
        image: "images/image7.jpg",
        textPosition: "below",
        textSize: "0.9em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 6",
        date: "2025-11-16 18:00",
        text: "Text for Post 6",
        image: "images/image6.jpg",
        textPosition: "above",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 5",
        date: "2025-11-15 12:00",
        text: "Text for Post 5",
        image: "images/image5.jpg",
        textPosition: "below",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 4",
        date: "2025-11-14 09:00",
        text: "Text for Post 4",
        image: "images/image4.jpg",
        textPosition: "above",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 3",
        date: "2025-11-13 15:00",
        text: "Text for Post 3",
        image: "images/image3.jpg",
        textPosition: "below",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 2",
        date: "2025-11-12 08:00",
        text: "Text for Post 2",
        image: "images/image2.jpg",
        textPosition: "above",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    },
    {
        title: "Post 1",
        date: "2025-11-11 11:00",
        text: "Text for Post 1",
        image: "images/image1.jpg",
        textPosition: "below",
        textSize: "1em",
        imageWidth: "100%",
        imageHeight: "auto"
    }
];

const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    // Calculate posts to show
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    // Render posts
    pagePosts.forEach(post => {
        const section = document.createElement("section");
        section.className = "post";

        const textHTML = `<p style="font-size: ${post.textSize}">${post.text}</p>`;
        const imageHTML = post.image 
            ? `<img src="${post.image}" alt="${post.title}" style="width: ${post.imageWidth}; height: ${post.imageHeight};">` 
            : "";

        const contentHTML = post.textPosition === "above" ? textHTML + imageHTML : imageHTML + textHTML;

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

    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "← Previous";
        prev.onclick = (e) => {
            e.preventDefault();
            currentPage--;
            renderPosts();
        };
        pagination.appendChild(prev);
    }

    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = "Next →";
        next.onclick = (e) => {
            e.preventDefault();
            currentPage++;
            renderPosts();
        };
        pagination.appendChild(next);
    }
}

// Initial render
renderPosts();
