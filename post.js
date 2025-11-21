// -----------------------------
// POSTS DATA
// -----------------------------
const posts = [
    {
        title: "<u><b>21 Photos</b></u>",
        date: "11/21/2025 8:21pm",
        content: [
            { type: "image", value:"images/Screenshot1.png", width: "25%" },
        ]
    },
    {
        title: "<u><b>20 Photos</b></u>",
        date: "11/21/2025 7:16pm",
        content: [
            { type: "text", value: "<i>77</i>", size: "1em" }
        ]
    },
    {
        title: "video test on website",
        date:"11/21/2025 3:19pm",
        content:[
            { type: "video", value: "videos/sparkleinjamen.mp4", width: "50%" },
            { type: "text", value: "11/21/2025 3:19pm anonymous", size: "1em" },
        ]
    },
    {
        title: "hoooly poop Ninajirachi just won ARIAs Best Solo Artist",
        date: "20/11/2025 11:14pm",
        content: [
            { type: "text", value: "this is super f (my computer, cuz no 1 in the World knows me Better) late but", size: "1em" },
            { type: "image", value:"images/AriaAwards2025-LiveShow-VasiliPapathanasopoulos-Ninajirachi-3-6-scaled.jpg", width: "50%" },
            { type: "text", value: "she sniped the mother bullet into john f cuntedys head", size: "1em" },
            { type: "image", value:"images/DiscordNinajirachiQueen.png", width: "25%" },
            { type: "text", value: "gosh i wish listened to her music way earlier i had added f☆ck my computer in my playlist on 11th June 2025 i should've listened earlier maybe<br>could've got her on my Spotify Wrapped but it's too late<br><br>4562 4562 4562 4562 ", size: "1em" },
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
            { type: "text", value: "New bread i think it would be a good idea like most people eat bread in the mornings and i people might not like it after 5000000000000 Times of eating the same bread so imagine if there were new Bread", size: "1.1em" }
        ]
    },
    {
        title: "first post evarrrrrrrrrrrr",
        date: "20/11/2025 5:39pm",
        content: [
            { type: "text", value: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete", size: "1em" },
            { type: "image", value: "images/ILoveMyComputer.jpg", width: "50%" },
            { type: "text", value: "i like this album i like how all the songs converge together like i think every song works as a interlude to the next CSIRAC to delete<br>is great cat paws up to All I Am is epic i havent gone into the second half of the album that much (aka after All I Am) except for maybe<br>like It's You nice song great album hypoppy", size: "1em" },
            { type: "audio", value: "audio/Delete - Ninajirachi.mp3" }
        ]
    }
];

// -----------------------------
// PAGINATION SETTINGS
// -----------------------------
const postsPerPage = 5;
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

    pagePosts.forEach(post => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        // Title (HTML works here)
        const title = document.createElement("h2");
        title.innerHTML = post.title;
        wrap.appendChild(title);

        // Date
        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        wrap.appendChild(date);

        // Content
        const contentWrap = document.createElement("div");
        contentWrap.className = "post-content";

        post.content.forEach(block => {
            if(block.type === "text"){
                const p = document.createElement("p");
                p.innerHTML = block.value;
                p.style.fontSize = block.size || "1em";
                contentWrap.appendChild(p);
            }
            if(block.type === "image"){
                const img = document.createElement("img");
                img.src = block.value;
                img.className = "post-image";
                img.style.width = block.width || "100%";
                contentWrap.appendChild(img);
            }
            if(block.type === "video"){
                const v = document.createElement("video");
                v.src = block.value;
                v.controls = true;
                v.className = "post-video";
                v.style.width = block.width || "100%";
                contentWrap.appendChild(v);
            }
            if(block.type === "audio"){
                const a = document.createElement("audio");
                a.src = block.value;
                a.controls = true;
                a.style.width = "100%";
                contentWrap.appendChild(a);
            }
        });

        wrap.appendChild(contentWrap);
        container.appendChild(wrap);
    });

    renderPagination();
}

// -----------------------------
// RENDER PAGINATION BUTTONS
// -----------------------------
function renderPagination() {
    let pagination = document.getElementById("pagination");
    if(!pagination){
        pagination = document.createElement("div");
        pagination.id = "pagination";
        pagination.style.marginTop = "2em";
        pagination.style.marginBottom = "2em";
        document.body.appendChild(pagination);
    }
    pagination.innerHTML = "";

    for(let i = 1; i <= totalPages; i++){
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.style.marginRight = "0.5em";
        btn.style.padding = "0.3em 0.6em";
        if(i === currentPage){
            btn.style.fontWeight = "bold";
            btn.disabled = true;
        }
        btn.onclick = () => {
            currentPage = i;
            renderPosts();
            window.scrollTo(0,0);
        };
        pagination.appendChild(btn);
    }
}

// -----------------------------
// INITIAL RENDER
// -----------------------------
renderPosts();
