// -----------------------------
// POSTS DATA
// -----------------------------
const posts = [
    {
        title: "",
        date: "11/21/2025 11:39pm",
        content: [
            { type: "text", value: "this album sucks. i’m preparing for war.", size: "1em" }
        ]
    },
    {
        title: "<u><b>got that water in my еye eye еye</b></u>",
        date: "11/21/2025 10:43pm",
        content: [
            { type: "image", value: "images/Beauty.png", width: "25%" },
            { type: "text", value: "not mine, looks like my grandfathers, but his is green", size: "1em" }
        ]
    },
    {
        title: "21 Photos",
        date: "11/21/2025 8:21pm",
        content: [
            { type: "image", value: "images/Screenshot1.png", width: "25%" }
        ]
    },
    {
        title: "20 Photos",
        date: "11/21/2025 7:16pm",
        content: [
            { type: "text", value: "<i>77</i>", size: "1em" }
        ]
    },
    {
        title: "video test on website",
        date: "11/21/2025 3:19pm",
        content: [
            { type: "video", value: "videos/sparkleinjamen.mp4", width: "50%" },
            { type: "text", value: "11/21/2025 3:19pm anonymous", size: "1em" }
        ]
    },
    {
        title: "hoooly poop Ninajirachi just won ARIAs Best Solo Artist",
        date: "20/11/2025 11:14pm",
        content: [
            { type: "text", value: "this is super f late but", size: "1em" },
            { type: "image", value:"images/AriaAwards2025-LiveShow-VasiliPapathanasopoulos-Ninajirachi-3-6-scaled.jpg", width: "50%" },
            { type: "text", value: "she sniped the mother bullet into john f cuntedys head", size: "1em" },
            { type: "image", value:"images/DiscordNinajirachiQueen.png", width: "25%" },
            { type: "text", value: "gosh i wish listened earlier<br>4562 4562 4562 4562", size: "1em" }
        ]
    },
    {
        title: "",
        date: "20/11/2025 9:14pm",
        content: [
            { type: "text", value: "eating time", size: "5em" },
            { type: "text", value: "update: this was about dinner", size: "1em" }
        ]
    },
    {
        title: "inventions and ideas",
        date: "19/11/2025 7:24pm",
        content: [
            { type: "text", value: "New bread concept...", size: "1.1em" }
        ]
    },
    {
        title: "first post evarrrrrrrrrrrr",
        date: "20/11/2025 5:39pm",
        content: [
            { type: "text", value: "Been listening to I Love My Computer...", size: "1em" },
            { type: "image", value: "images/ILoveMyComputer.jpg", width: "50%" },
            { type: "text", value: "i like this album...", size: "1em" },
            { type: "audio", value: "audio/Delete - Ninajirachi.mp3" }
        ]
    }
];

// -----------------------------
// PAGINATION
// -----------------------------
const postsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

// -----------------------------
// RENDER POSTS
// -----------------------------
function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach((post, index) => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        const stickyWrapper = document.createElement("div");
        stickyWrapper.className = "post-sticky-wrapper";
        stickyWrapper.style.zIndex = 100 + index;

        const title = document.createElement("h2");
        title.innerHTML = post.title;
        stickyWrapper.appendChild(title);

        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        stickyWrapper.appendChild(date);

        // CONTENT
        post.content.forEach(block => {
            let elem;

            if (block.type === "text") {
                elem = document.createElement("p");
                elem.innerHTML = block.value;
                elem.style.fontSize = block.size || "1em";
            }

            if (block.type === "image") {
                elem = document.createElement("img");
                elem.src = block.value;
                elem.style.width = block.width || "100%";
            }

            if (block.type === "video") {
                elem = document.createElement("video");
                elem.src = block.value;
                elem.style.width = block.width || "100%";
                elem.controls = true;
                elem.autoplay = true;
                elem.muted = true;
                elem.loop = true;
            }

            if (block.type === "audio") {
                elem = document.createElement("audio");
                elem.src = block.value;
                elem.controls = true;
            }

            stickyWrapper.appendChild(elem);
        });

        wrap.appendChild(stickyWrapper);
        container.appendChild(wrap);
    });

    renderPagination();
}

// -----------------------------
// RENDER PAGINATION
// -----------------------------
function renderPagination() {
    let pagination = document.getElementById("pagination");

    if (!pagination) {
        pagination = document.createElement("div");
        pagination.id = "pagination";
        document.getElementById("posts-container").after(pagination);
    }

    pagination.innerHTML = "";

    // Previous
    if (currentPage > 1) {
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "Previous";
        prev.style.textDecoration = "underline";
        prev.onclick = (e) => {
            e.preventDefault();
            currentPage--;
            renderPosts();
            window.scrollTo(0, 0);
        };
        pagination.appendChild(prev);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const num = document.createElement("a");
        num.href = "#";
        num.textContent = i;
        num.style.margin = "0 0.5em";
        num.style.textDecoration = "underline";
        if (i === currentPage) num.style.fontWeight = "bold";

        num.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderPosts();
            window.scrollTo(0, 0);
        };

        pagination.appendChild(num);
    }

    // Next
    if (currentPage < totalPages) {
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = "Next";
        next.style.textDecoration = "underline";
        next.onclick = (e) => {
            e.preventDefault();
            currentPage++;
            renderPosts();
            window.scrollTo(0, 0);
        };
        pagination.appendChild(next);
    }
}

// -----------------------------
// INITIAL RENDER
// -----------------------------
renderPosts();
