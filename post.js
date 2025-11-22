// --------------------------
// POSTS DATA
// --------------------------
const posts = [
    // ... your posts data here, keep it the same
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
// RENDER POSTS
// --------------------------
function renderPosts() {
    const container = document.getElementById("posts-container");
    if (!container) return;
    container.innerHTML = "";

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    // reset sticky stack on page change
    stickyMap.clear();
    const stack = document.getElementById("sticky-stack");
    if (stack) stack.innerHTML = "";

    pagePosts.forEach(post => {
        const wrap = document.createElement("div");
        wrap.className = "post-container";

        // title
        const title = document.createElement("h2");
        title.innerHTML = post.title || "";
        wrap.appendChild(title);

        // date
        if (post.date) {
            const date = document.createElement("p");
            date.className = "datetime";
            date.textContent = post.date;
            wrap.appendChild(date);
        }

        const contentWrap = document.createElement("div");
        contentWrap.className = "post-content";

        post.content.forEach(block => {
            let el;
            const stickId = nextStickId();

            if (block.type === "text") {
                el = document.createElement("p");
                el.innerHTML = block.value || "";
                if (block.size) el.style.fontSize = block.size;
                el.dataset.stickId = stickId;
                el.dataset.stickType = "text";
                el.className = "stickable stick-text";
            }

            if (block.type === "image") {
                el = document.createElement("img");
                el.src = block.value;
                el.style.width = block.width || "100%";
                el.dataset.stickId = stickId;
                el.dataset.stickType = "image";
                el.dataset.origWidth = block.width || "";
                el.className = "stickable stick-image";
            }

            if (block.type === "video") {
                el = document.createElement("video");
                el.src = block.value;
                el.controls = true;
                el.autoplay = false;
                el.loop = true;
                el.style.width = block.width || "100%";
                el.dataset.stickId = stickId;
                el.dataset.stickType = "video";
                el.dataset.origWidth = block.width || "";
                el.className = "stickable stick-video";
            }

            if (block.type === "audio") {
                const audioWrap = document.createElement("div");
                audioWrap.className = "audio-container stickable stick-audio";
                audioWrap.dataset.stickId = stickId;
                audioWrap.dataset.stickType = "audio";

                const audio = document.createElement("audio");
                audio.src = block.value;
                audio.controls = true;

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
            renderPosts(); 
            window.scrollTo(0,0); 
        };
        pagination.appendChild(a);
    }
}

// --------------------------
// STICKY STACK ENGINE
// --------------------------
let stickyMap = new Map();

function initStickyEngine() {
    const stack = document.getElementById("sticky-stack");
    if (!stack) return;
    stack.innerHTML = "";

    const stickables = Array.from(document.querySelectorAll(".stickable"));

    function checkStickables() {
        const viewportTop = 0;
        stickables.forEach(el => {
            const stickId = el.dataset.stickId;
            if (!stickId) return;

            const rect = el.getBoundingClientRect();

            if (rect.top <= viewportTop) {
                if (!stickyMap.has(stickId)) {
                    const clone = createCloneFor(el);
                    clone.style.top = `${el.offsetTop}px`; // exact original position
                    stack.appendChild(clone);
                    stickyMap.set(stickId, { clone, original: el });
                    el.classList.add("stuck");
                }
            } else {
                if (stickyMap.has(stickId)) {
                    const entry = stickyMap.get(stickId);
                    if (entry.clone.parentNode) entry.clone.parentNode.removeChild(entry.clone);
                    el.classList.remove("stuck");
                    stickyMap.delete(stickId);
                }
            }
        });
    }

    checkStickables();
    window.removeEventListener("scroll", checkStickables);
    window.removeEventListener("resize", checkStickables);
    window.addEventListener("scroll", checkStickables, { passive: true });
    window.addEventListener("resize", checkStickables);
}

// --------------------------
// CREATE CLONE
// --------------------------
function createCloneFor(el) {
    const wrapper = document.createElement("div");
    wrapper.className = "stacked-item";

    const type = el.dataset.stickType;

    if (type === "text") {
        const textClone = document.createElement("div");
        textClone.className = "cloned-text";
        textClone.innerHTML = el.innerHTML;
        wrapper.appendChild(textClone);
    } else if (type === "image") {
        const img = document.createElement("img");
        img.className = "cloned-media";
        img.src = el.src;
        if (el.dataset.origWidth) img.style.width = el.dataset.origWidth;
        wrapper.appendChild(img);
    } else if (type === "video") {
        const v = document.createElement("video");
        v.src = el.src;
        v.controls = true;
        v.loop = true;
        v.className = "cloned-media";
        if (el.dataset.origWidth) v.style.width = el.dataset.origWidth;
        wrapper.appendChild(v);
    } else if (type === "audio") {
        const a = document.createElement("audio");
        a.src = el.querySelector("audio") ? el.querySelector("audio").src : el.src;
        a.controls = true;
        a.className = "cloned-media";
        wrapper.appendChild(a);
    }

    wrapper.addEventListener("click", e => e.stopPropagation());
    return wrapper;
}

// --------------------------
// INITIAL RENDER
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
});
