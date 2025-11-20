const posts = [
    {
        title: "inventions and ideas",
        date: "19/11/2025 7:24",
        text: "New bread i think it would be a good idea like most people eat bread in the mornings and i people might not like it after 5000000000000 Times of eating the same bread so imagine if there were new Bread.",
        image: "",
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: ""
    },
    {
        title: "first post evarrrrrrrrrrrr",
        date: "20/11/2025 5:39",
        text: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete<br><br>i like this album i like how all the songs converge together like i think every song works as a interlude to the next CSIRAC to delete is great cat paws up to All I Am is epic i havent gone into the second half of the album that much (aka after All I Am) except for maybe like It's You nice song great album hypoppy<br>4562",
        image: "images/ILoveMyComputer.jpg",
        textAboveImage: true,
        textSize: "1em",
        imageWidth: "30%",
        audio: "audio/Delete - Ninajirachi.mp3"
    },
    {
        title: "Second Post",
        date: "2025-11-19 14:00",
        text: "Text-only post example. No image here.",
        image: "",
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
        audio: "audio/sample.mp3"
    },
    {
        title: "Fourth Post",
        date: "2025-11-19 14:00",
        text: "Another text-only post example.",
        image: "",
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: ""
    }
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
        const postWrapper = document.createElement("div");
        postWrapper.className = "post-container";

        const title = document.createElement("h2");
        title.textContent = post.title;
        postWrapper.appendChild(title);

        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        postWrapper.appendChild(date);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "post-content";

        if (post.text) {
            const p = document.createElement("p");
            p.innerHTML = post.text.replace(/ /g, "&nbsp;");
            p.style.fontSize = post.textSize;
            contentWrapper.appendChild(p);
        }

        if (post.audio) {
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = post.audio;
            contentWrapper.appendChild(audio);
        }

        postWrapper.appendChild(contentWrapper);
        container.appendChild(postWrapper);

        // Add the image inside postWrapper but NOT sticky — we handle sticky globally
        if (post.image) {
            const img = document.createElement("img");
            img.src = post.image;
            img.style.width = post.imageWidth;
            img.className = "post-image"; // just for reference
            img.dataset.postIndex = posts.indexOf(post); // track index
            postWrapper.appendChild(img);
        }
    });

    renderPagination();
    setupStickyImage();
}

function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "<";
        prev.onclick = e => { e.preventDefault(); currentPage--; renderPosts(); };
        pagination.appendChild(prev);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.className = i === currentPage ? "current" : "";
        pageLink.onclick = e => { e.preventDefault(); currentPage = i; renderPosts(); };
        pagination.appendChild(pageLink);
    }

    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = ">";
        next.onclick = e => { e.preventDefault(); currentPage++; renderPosts(); };
        pagination.appendChild(next);
    }
}

// Sticky image setup
function setupStickyImage() {
    let stickyImg = document.querySelector(".sticky-image");
    if (!stickyImg) {
        stickyImg = document.createElement("img");
        stickyImg.className = "sticky-image";
        document.body.appendChild(stickyImg);
    }

    const postImages = document.querySelectorAll(".post-image");
    function updateSticky() {
        let currentSrc = "";
        for (let img of postImages) {
            const rect = img.getBoundingClientRect();
            if (rect.top <= 0) {
                currentSrc = img.src;
            }
        }
        if (currentSrc) {
            stickyImg.src = currentSrc;
            stickyImg.style.display = "block";
        } else {
            stickyImg.style.display = "none";
        }
    }

    window.addEventListener("scroll", updateSticky);
    updateSticky();
}

renderPosts();
