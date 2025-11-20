const posts = [
    {
        title: "hoooly poop Ninajirachi just won ARIAs Best Solo Artist",
        date: "20/11/2025 11:14",
        content: [
            { type: "text", value: "this is super f (my computer, cuz no 1 in the World knows me Better) late but", size: "1em" },
            { type: "image", value:"images/AriaAwards2025-LiveShow-VasiliPapathanasopoulos-Ninajirachi-3-6-scaled.jpg", width: "50%" },
            { type: "text", value: "she sniped the mother bullet into john f cuntedys head", size: "1em" },
            { type: "image", value:"images/ADiscordNinajirachiQueen.png", width: "50%" },
            { type: "text", value: "gosh i wish listened to her music way earlier i had added f☆ck my computer in  my playlist on 11th June 2025 i should've listened earlier maybe could've got her on my Spotify Wrapped but it's too late already", size: "1em" },
        ]
    },
    {
        title: "",
        date: "20/11/2025 9:14",
        content: [
            { type: "text", value: "eating time", size: "5em" }
        ]
    },
    {
        title: "inventions and ideas",
        date: "19/11/2025 7:24",
        content: [
            { type: "text", value: "New bread i think it would be a good idea like most people eat bread in the mornings and i people might not like it after 5000000000000 Times of eating the same bread so imagine if there were new Bread.", size: "1.1em" }
        ]
    },
    {
        title: "first post evarrrrrrrrrrrr",
        date: "20/11/2025 5:39",
        content: [
            { type: "text", value: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete<br><br>i like this album i like how all the songs converge together like i think every song works as a interlude to the next CSIRAC to delete<br>is great cat paws up to All I Am is epic i havent gone into the second half of the album that much (aka after All I Am) except for maybe like It's You nice song great album hypoppy", size: "1em" },
            { type: "image", value: "images/ILoveMyComputer.jpg", width: "50%" },
            { type: "audio", value: "audio/Delete - Ninajirachi.mp3" }
        ]
    }
];

const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);
let fixedImage = null;

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach((post) => {
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

        post.content.forEach(block => {
            if(block.type === "text") {
                const p = document.createElement("p");
                p.innerHTML = block.value.replace(/ /g, "&nbsp;");
                p.style.fontSize = block.size || "1em";
                contentWrapper.appendChild(p);
            } else if(block.type === "image") {
                const img = document.createElement("img");
                img.src = block.value;
                img.dataset.width = block.width || "100%";
                img.className = "post-image";
                img.style.width = img.dataset.width;
                contentWrapper.appendChild(img);
            } else if(block.type === "audio") {
                const audioContainer = document.createElement("div");
                audioContainer.className = "audio-container";
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.src = block.value;
                audio.style.width = "100%";
                audioContainer.appendChild(audio);
                contentWrapper.appendChild(audioContainer);
            }
        });

        postWrapper.appendChild(contentWrapper);
        container.appendChild(postWrapper);
    });

    if (!fixedImage) {
        fixedImage = document.createElement("img");
        fixedImage.className = "fixed-image";
        fixedImage.style.display = "none";
        document.body.appendChild(fixedImage);
    }

    window.addEventListener("scroll", updateFixedImage);
}

function updateFixedImage() {
    const images = document.querySelectorAll(".post-image");
    let currentSrc = null;
    let scrollY = window.scrollY + 10;

    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const imgTop = window.scrollY + rect.top;
        if (scrollY >= imgTop) {
            currentSrc = img.src;
            fixedImage.style.width = img.dataset.width;
        }
    });

    if (currentSrc) {
        fixedImage.src = currentSrc;
        fixedImage.style.display = "block";
    } else {
        fixedImage.style.display = "none";
    }
}

renderPosts();
