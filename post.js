// -----------------------------
// POSTS DATA
// -----------------------------
const posts = [
    {
        title: "",
        date: "11/21/2025 10:43pm",
        content: [
            { type: "text", value: "this album sucks. i’m preparing for war. ", size: "1em" }
        ]
    },
    {
        title: "<u><b>got that water in my еye eye еye</b></u>",
        date: "11/21/2025 10:43pm",
        content: [
            { type: "image", value:"images/Beauty.png", width: "25%" },
            { type: "text", value: "not mine, looks like my grandfathers, his is green", size: "1em" },
        ]
    },
    {
        title: "21 Photos",
        date: "11/21/2025 8:21pm",
        content: [
            { type: "image", value:"images/Screenshot1.png", width: "25%" },
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

pagePosts.forEach((post, index) => {
    const wrap = document.createElement("div");
    wrap.className = "post-container";

    const stickyWrapper = document.createElement("div");
    stickyWrapper.className = "post-sticky-wrapper";
    stickyWrapper.style.zIndex = 100 + index; // later posts overlay earlier

    const title = document.createElement("h2");
    title.innerHTML = post.title;
    stickyWrapper.appendChild(title);

    const date = document.createElement("p");
    date.className = "datetime";
    date.textContent = post.date;
    stickyWrapper.appendChild(date);

    post.content.forEach(block => {
        let elem;
        if(block.type === "text"){
            elem = document.createElement("p");
            elem.innerHTML = block.value;
            elem.style.fontSize = block.size || "1em";
        }
        if(block.type === "image"){
            elem = document.createElement("img");
            elem.src = block.value;
            elem.className = "post-image";
            elem.style.width = block.width || "100%";
        }
        if(block.type === "video"){
            elem = document.createElement("video");
            elem.src = block.value;
            elem.controls = true;
            elem.autoplay = true;
            elem.muted = true;
            elem.loop = true;
            elem.className = "post-video";
            elem.style.width = block.width || "100%";
        }
        if(block.type === "audio"){
            elem = document.createElement("audio");
            elem.src = block.value;
            elem.controls = true;
            elem.style.width = "100%";
        }

        if(elem) stickyWrapper.appendChild(elem);
    });

    wrap.appendChild(stickyWrapper);
    container.appendChild(wrap);
});


// -----------------------------
// PAGINATION SETTINGS
// -----------------------------
const postsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    let zCounter = 100; // starting z-index for sticky blocks

    pagePosts.forEach(post => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        const title = document.createElement("h2");
        title.innerHTML = post.title;
        wrap.appendChild(title);

        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        wrap.appendChild(date);

        const contentWrap = document.createElement("div");
        contentWrap.className = "post-content";

        post.content.forEach(block => {
            let elem;
            if(block.type === "text"){
                elem = document.createElement("p");
                elem.innerHTML = block.value;
                elem.style.fontSize = block.size || "1em";
            }
            if(block.type === "image"){
                elem = document.createElement("img");
                elem.src = block.value;
                elem.className = "post-image";
                elem.style.width = block.width || "100%";
            }
            if(block.type === "video"){
                elem = document.createElement("video");
                elem.src = block.value;
                elem.controls = true;
                elem.autoplay = true;
                elem.muted = true;
                elem.loop = true;
                elem.className = "post-video";
                elem.style.width = block.width || "100%";
            }
            if(block.type === "audio"){
                elem = document.createElement("audio");
                elem.src = block.value;
                elem.controls = true;
                elem.className = "post-audio";
                elem.style.width = "100%";
            }

            if(elem){
                elem.style.position = "sticky";
                elem.style.top = "0";
                elem.style.zIndex = zCounter++;
                elem.style.marginBottom = "1em";
                contentWrap.appendChild(elem);
            }
        });

        wrap.appendChild(contentWrap);
        container.appendChild(wrap);
    });

    renderPagination();
}

function renderPagination() {
    let pagination = document.getElementById("pagination");
    if(!pagination){
        pagination = document.createElement("div");
        pagination.id = "pagination";
        pagination.style.marginTop = "2em";
        pagination.style.marginBottom = "2em";
        pagination.style.fontSize = "1em";
        document.getElementById("posts-container").after(pagination);
    }
    pagination.innerHTML = "";

    if(currentPage > 1){
        const prev = document.createElement("a");
        prev.href = "#";
        prev.textContent = "Previous";
        prev.style.marginRight = "1em";
        prev.style.textDecoration = "underline";
        prev.onclick = (e) => {
            e.preventDefault();
            currentPage--;
            renderPosts();
            window.scrollTo(0,0);
        };
        pagination.appendChild(prev);
    }

    for(let i = 1; i <= totalPages; i++){
        const num = document.createElement("a");
        num.href = "#";
        num.textContent = i;
        num.style.marginRight = "0.5em";
        num.style.textDecoration = "underline";
        if(i === currentPage) num.style.fontWeight = "bold";
        num.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderPosts();
            window.scrollTo(0,0);
        };
        pagination.appendChild(num);
    }

    if(currentPage < totalPages){
        const next = document.createElement("a");
        next.href = "#";
        next.textContent = "Next";
        next.style.marginLeft = "1em";
        next.style.textDecoration = "underline";
        next.onclick = (e) => {
            e.preventDefault();
            currentPage++;
            renderPosts();
            window.scrollTo(0,0);
        };
        pagination.appendChild(next);
    }
}

renderPosts();


