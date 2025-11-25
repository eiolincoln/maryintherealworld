const posts = [
    {
        title: "",
        date: "11/25/2025 6:58pm",
        content: [
            { type: "video", value: "videos/tayvioncole.mp4", width: "20%" },
        ]
    },
    {
        title: "Weight of Two Crimes I Only Dreamed",
        date: "11/21/2025 7:16pm",
        content: [
            {
                type: "text",
                value: "1st dream i had a dream where i stabbed someone in my school ...",
                size: "1em"
            },
            {
                type: "text",
                value: "2nd dream i had a dream where i was one of the founders of a drug cartel ...",
                size: "1em"
            }
        ]
    },
    // ... rest of your posts
];

// --------------------------
// PAGINATION CONFIG
// --------------------------
const postsPerPage = 10;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

// --------------------------
// UNIQUE STICK ID HELPER
// --------------------------
let stickIdCounter = 0;
function nextStickId() { return "stick-" + (stickIdCounter++); }

// --------------------------
// GLOBAL STICKY STATE
// --------------------------
let stickyMap = new Map();
let stickyScrollHandler = null;
let cloneStackCounter = 0;

// --------------------------
// RENDER POSTS
// --------------------------
function renderPosts() {
    const container = document.getElementById("posts-container");
    const stack = document.getElementById("sticky-stack");
    if (!container || !stack) return;

    container.innerHTML = "";
    stack.innerHTML = "";
    stickyMap.clear();
    cloneStackCounter = 0;

    if (stickyScrollHandler) {
        window.removeEventListener('scroll', stickyScrollHandler);
        window.removeEventListener('resize', stickyScrollHandler);
        stickyScrollHandler = null;
    }

    const start = (currentPage - 1) * postsPerPage;
    const pagePosts = posts.slice(start, start + postsPerPage);

    pagePosts.forEach(post => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        // Title
        const title = document.createElement("h2");
        title.innerHTML = post.title || "";
        title.className = "stickable stick-title";
        title.dataset.stickId = nextStickId();
        title.dataset.stickType = "title";
        title.style.display = "block";
        wrap.appendChild(title);

        // Date
        if (post.date) {
            const date = document.createElement("p");
            date.className = "datetime stickable stick-date";
            date.textContent = post.date;
            date.dataset.stickId = nextStickId();
            date.dataset.stickType = "date";
            date.style.display = "block";
            wrap.appendChild(date);
        }

        const contentWrap = document.createElement("div");
        contentWrap.className = "post-content";

        post.content.forEach(block => {
            let el;
            const stickId = nextStickId();

            switch (block.type) {
                case "text":
                    el = document.createElement("p");
                    el.innerHTML = block.value;
                    el.style.fontSize = block.size || "1em";
                    el.className = "stickable stick-text";
                    el.dataset.stickId = stickId;
                    el.dataset.stickType = "text";
                    el.style.display = "inline-block";
                    break;
                case "image":
                    el = document.createElement("img");
                    el.src = block.value;
                    if (block.width) el.style.width = block.width;
                    el.className = "stickable stick-image post-image";
                    el.dataset.stickId = stickId;
                    el.dataset.stickType = "image";
                    el.style.display = "block";
                    el.style.maxWidth = "100%";
                    el.style.height = "auto";
                    el.style.background = "transparent";
                    break;
                case "video":
                    el = document.createElement("video");
                    el.src = block.value;
                    el.controls = true;
                    el.loop = true;
                    el.autoplay = true;
                    el.muted = false; // keep sound
                    el.playsInline = true;
                    if (block.width) el.style.width = block.width;
                    el.className = "stickable stick-video post-video";
                    el.dataset.stickId = stickId;
                    el.dataset.stickType = "video";
                    el.style.display = "block";
                    el.style.maxWidth = "100%";
                    el.style.height = "auto";
                    el.style.background = "transparent";
                    break;
                case "audio":
                    const audioWrap = document.createElement("div");
                    audioWrap.className = "stickable stick-audio audio-container";
                    audioWrap.dataset.stickId = stickId;
                    audioWrap.dataset.stickType = "audio";

                    const audio = document.createElement("audio");
                    audio.src = block.value;
                    audio.controls = true;
                    audio.style.width = "100%";

                    audioWrap.appendChild(audio);
                    el = audioWrap;
                    break;
            }

            if (el) contentWrap.appendChild(el);
        });

        wrap.appendChild(contentWrap);
        container.appendChild(wrap);
    });

    renderPagination();
    initStickyEngine();
}

// --------------------------
// RENDER PAGINATION
// --------------------------
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = i;
        a.className = i === currentPage ? "current" : "";
        a.onclick = e => {
            e.preventDefault();
            currentPage = i;
            window.scrollTo(0, 0);
            renderPosts();
        };
        pagination.appendChild(a);
    }
}

// --------------------------
// STICKY ENGINE
// --------------------------
function initStickyEngine() {
    const stack = document.getElementById("sticky-stack");
    const stickables = Array.from(document.querySelectorAll(".stickable"));

    stickyScrollHandler = function() {
        const vpTop = 0;

        stickables.forEach(el => {
            const stickId = el.dataset.stickId;
            if (!stickId) return;

            const rect = el.getBoundingClientRect();
            const entry = stickyMap.get(stickId);

            if (rect.top <= vpTop) {
                if (!entry) {
                    const freezeRect = el.getBoundingClientRect();
                    el.style.minWidth = freezeRect.width + "px";
                    el.style.minHeight = freezeRect.height + "px";
                    el.style.boxSizing = "border-box";

                    const wrapper = createCloneBehind(el);
                    el.style.visibility = "hidden";

                    stickyMap.set(stickId, { wrapper, frozenWidth: freezeRect.width, frozenHeight: freezeRect.height });
                    stack.appendChild(wrapper);
                } else {
                    entry.wrapper.style.left = Math.round(el.getBoundingClientRect().left) + "px";
                }
            } else if (entry) {
                entry.wrapper.remove();
                stickyMap.delete(stickId);
                el.style.visibility = "visible";
                el.style.minWidth = "";
                el.style.minHeight = "";
                el.style.boxSizing = "";
            }
        });
    };

    stickyScrollHandler();
    window.addEventListener('scroll', stickyScrollHandler, { passive: true });
    window.addEventListener('resize', stickyScrollHandler);
}

// --------------------------
// CREATE CLONE BEHIND
// --------------------------
function createCloneBehind(el) {
    const wrapper = document.createElement("div");
    wrapper.className = "stacked-item";

    const rect = el.getBoundingClientRect();
    const computed = getComputedStyle(el);

    let clone;

    if (el.tagName === "IMG" || el.tagName === "VIDEO") {
        clone = el.cloneNode(true);

        // For video, remove autoplay/muted/controls on clone so browser won't block
        if (el.tagName === "VIDEO") {
            clone.removeAttribute("autoplay");
            clone.removeAttribute("controls");
            clone.muted = true;
            clone.pause();
        }

        clone.style.width = Math.round(rect.width) + "px";
        clone.style.height = Math.round(rect.height) + "px";
        clone.style.display = "block";
        clone.style.objectFit = "contain";
    } else {
        clone = el.cloneNode(true);
        clone.style.fontSize = computed.fontSize;
        clone.style.fontFamily = computed.fontFamily;
        clone.style.fontWeight = computed.fontWeight;
        clone.style.lineHeight = computed.lineHeight;
        clone.style.whiteSpace = "pre-wrap";

        const isInline = ["inline", "inline-block"].includes(computed.display);
        clone.style.display = isInline ? "inline-block" : "block";
        clone.style.width = isInline ? Math.round(rect.width) + "px" : "fit-content";
        clone.style.height = Math.round(rect.height) + "px";
    }

    clone.style.pointerEvents = "none";
    clone.style.margin = "0";
    clone.style.opacity = "1";

    wrapper.appendChild(clone);
    wrapper.style.position = "fixed";
    wrapper.style.top = "0px";
    wrapper.style.left = Math.round(rect.left) + "px";
    wrapper.style.zIndex = String(10 + (++cloneStackCounter));

    return wrapper;
}

// --------------------------
// INITIALIZE
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
});
