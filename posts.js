// All posts newest first
const posts = [
    
    {
        title: "inventions and ideas",
        date: "19/11/2025 7:24",
        text: "New bread i think it would be a good idea like most people eat bread in the mornings and i people might not like it after 5000000000000 Times of eating the same bread so imagine if there were new Bread.",
        image: "",              // no image
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
        textAboveImage: true,   // text above or below the image
        textSize: "1em",
        imageWidth: "20%",
        audio: "audio/Delete - Ninajirachi.mp3"               // optional MP3 file path
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
        title: "Second Post",
        date: "2025-11-19 14:00",
        text: "Text-only post example. No image here.",
        image: "",              // no image
        textAboveImage: true,
        textSize: "1.1em",
        imageWidth: "50%",
        audio: ""
    },
    // ... add more posts here
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
        const section = document.createElement("section");
        section.className = "post";

        let contentHTML = "";

        // Text above image
        if (post.textAboveImage) {
            contentHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
            if (post.image) {
                contentHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
            }
        } 
        // Text below image
        else {
            if (post.image) {
                contentHTML += `<img src="${post.image}" style="width:${post.imageWidth}" alt="${post.title}">`;
            }
            contentHTML += `<p style="font-size:${post.textSize}">${post.text}</p>`;
        }

        // Optional audio
        if (post.audio) {
            contentHTML += `<audio controls src="${post.audio}" style="margin:0.5em 0;"></audio>`;
        }

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
