// --------------------------
// POSTS DATA
// --------------------------
const posts = [
    // ... your posts array unchanged ...
];

// --------------------------
// PAGINATION CONFIG
// --------------------------
const postsPerPage = 5;
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
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        // Title
        const title = document.createElement("h2");
        title.innerHTML = post.title || "";
        title.className = "stickable stick-title";
        title.dataset.stickId = nextStickId();
        title.dataset.stickType = "title";
        wrap.appendChild(title);

        // Date BELOW title
        if (post.date) {
            const date = document.createElement("p");
            date.className = "datetime stickable stick-date";
            date.textContent = post.date;
            date.dataset.stickId = nextStickId();
            date.dataset.stickType = "date";
            wrap.appendChild(date);
        }

        const contentWrap = document.createElement("div");
        contentWrap.className = "post-content";

        post.content.forEach(block => {
            let el;
            const stickId = nextStickId();

            if (block.type === "text") {
                el = document.createElement("p");
                el.innerHTML = block.value;
                el.style.fontSize = block.size || "1em";
                el.dataset.stickId = stickId;
                el.dataset.stickType = "text";
                el.className = "stickable stick-text";
            }

            if (block.type === "image") {
                el = document.createElement("img");
                el.src = block.value;
                if (block.width) el.style.width = block.width;
                el.dataset.stickId = stickId;
                el.dataset.stickType = "image";
                el.className = "stickable stick-image post-image";
            }

            if (block.type === "video") {
                el = document.createElement("video");
                el.src = block.value;
                el.controls = true;
                el.loop = true;
                if (block.width) el.style.width = block.width;
                el.dataset.stickId = stickId;
                el.dataset.stickType = "video";
                el.className = "stickable stick-video post-video";
            }

            if (block.type === "audio") {
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
                    const wrapper = createCloneBehind(el);
                    el.style.visibility = "hidden";
                    stickyMap.set(stickId, { wrapper });
                    stack.appendChild(wrapper);
                }
            } else {
                if (entry) {
                    entry.wrapper.remove();
                    stickyMap.delete(stickId);
                    el.style.visibility = "visible";
                }
            }

            if (entry) {
                const docLeft = el.getBoundingClientRect().left + window.scrollX;
                entry.wrapper.style.left = docLeft + "px";
            }
        });
    };

    stickyScrollHandler();
    window.addEventListener('scroll', stickyScrollHandler, { passive: true });
    window.addEventListener('resize', stickyScrollHandler);
}

// --------------------------
// CREATE PIXEL-PERFECT CLONE
// --------------------------
function createCloneBehind(el) {
    const wrapper = document.createElement("div");
    wrapper.className = "stacked-item";

    const clone = el.cloneNode(true);
    const rect = el.getBoundingClientRect();
    const computed = getComputedStyle(el);
    const docLeft = rect.left + window.scrollX;
    const docTop = rect.top + window.scrollY;

    // Preserve exact pixel size
    clone.style.width = el.offsetWidth + "px";
    clone.style.height = el.offsetHeight + "px";

    // Preserve display type
    clone.style.display = computed.display;
    clone.style.margin = "0";
    clone.style.padding = computed.padding;
    clone.style.background = computed.backgroundColor;
    clone.style.boxSizing = "border-box";
    clone.style.pointerEvents = "none";
    clone.style.opacity = "1";
    clone.style.fontSize = computed.fontSize;
    clone.style.fontFamily = computed.fontFamily;
    clone.style.fontWeight = computed.fontWeight;
    clone.style.lineHeight = computed.lineHeight;
    clone.style.whiteSpace = "pre-wrap";

    wrapper.appendChild(clone);

    wrapper.style.position = "fixed";
    wrapper.style.top = docTop + "px";
    wrapper.style.left = docLeft + "px";

    cloneStackCounter += 1;
    wrapper.style.zIndex = String(10 + cloneStackCounter);

    return wrapper;
}

// --------------------------
// INITIALIZE
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
});
