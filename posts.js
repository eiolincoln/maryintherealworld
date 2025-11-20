const posts = [
    {
        title: "hoooly poop Ninajirachi just won ARIAs Best Solo Artist",
        date: "20/11/2025 11:14",
        content: [
            { type: "text", value: "this is super f (my computer, cuz no 1 in the World knows me Better) late but" },
            { type: "image", value:"images/AriaAwards2025-LiveShow-VasiliPapathanasopoulos-Ninajirachi-3-6-scaled.jpg" },
            { type: "text", value: "she sniped the mother bullet into john f cuntedys head" },
            { type: "image", value:"images/ADiscordNinajirachiQueen.png" },
            { type: "text", value: "gosh i wish listened to her music way earlier i had added f☆ck my computer in  my playlist on 11th June 2025 i should've listened earlier maybe could've got her on my Spotify Wrapped but it's too late already" },
        ]
    },
    {
        title: "",
        date: "20/11/2025 9:14",
        content: [
            { type: "text", value: "eating time", size: "3em" }
        ]
    },
    {
        title: "inventions and ideas",
        date: "19/11/2025 7:24",
        content: [
            { type: "text", value: "New bread i think it would be a good idea like most people eat bread in the mornings and i people might not like it after 5000000000000 Times of eating the same bread so imagine if there were new Bread." }
        ]
    },
    {
        title: "first post evarrrrrrrrrrrr",
        date: "20/11/2025 5:39",
        content: [
            { type: "text", value: "Been listening to I Love My Computer by Ninajirachi.<br>Favourite: Delete<br><br>i like this album i like how all the songs converge together like i think every song works as a interlude to the next CSIRAC to delete is great cat paws up to All I Am is epic i havent gone into the second half of the album that much (aka after All I Am) except for maybe like It's You nice song great album hypoppy" },
            { type: "image", value: "images/ILoveMyComputer.jpg" },
            { type: "audio", value: "audio/Delete - Ninajirachi.mp3" }
        ]
    }
];

function renderPosts() {
    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    posts.forEach(post => {
        const postWrapper = document.createElement("div");
        postWrapper.className = "post-container";

        if (post.title) {
            const title = document.createElement("h2");
            title.textContent = post.title;
            postWrapper.appendChild(title);
        }

        const date = document.createElement("p");
        date.className = "datetime";
        date.textContent = post.date;
        postWrapper.appendChild(date);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "post-content";

        post.content.forEach(block => {
            if (block.type === "text") {
                const p = document.createElement("p");
                // Removed the .replace space logic so text wraps normally
                p.innerHTML = block.value; 
                if (block.size) p.style.fontSize = block.size;
                contentWrapper.appendChild(p);
            } 
            else if (block.type === "image") {
                const img = document.createElement("img");
                img.src = block.value;
                img.className = "post-image";
                contentWrapper.appendChild(img);
            } 
            else if (block.type === "audio") {
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
}

renderPosts();
