// All posts newest first
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
        title: "Second Post",
        date: "2025-11-19 14:00",
        text: "Text-only post example. No image here.",
        image: "",
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: ""
    }
];

const postsPerPage = 10;
let currentPage = 1;

const totalPages = Math.ceil(posts.length / postsPerPage);

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const title = document.createElement("h2");
        title.textContent = post.title;
        container.appendChild(title);

        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        container.appendChild(date);

        if (post.textAboveImage) {
            addText(container, post);
            addImage(container, post);
        } else {
            addImage(container, post);
            addText(container, post);
        }

        if (post.audio) {
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = post.audio;
            container.appendChild(audio);
        }

        const spacer = document.createElement("div");
        spacer.style.height = "4em";
        container.appendChild(spacer);
    });

    renderPagination();
}

function addText(container, post) {
    const p = document.createElement("p");
    p.innerHTML = post.text;
    p.style.fontSize = post.textSize;
    container.appendChild(p);
}

function addImage(container, post) {
    if (!post.image) return;
    const img = document.createElement("img");
    img.src = post.image;
    img.style.width = post.imageWidth;
    container.appendChild(img);
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

renderPosts();
