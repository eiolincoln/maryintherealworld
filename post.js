// -----------------------------
// POSTS DATA (editable)
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
            { type: "image", value:"images/Beauty.png", width: "25%" },
            { type: "text", value: "not mine, looks like my grandfathers, but his is green", size: "1em" },
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

// -----------------------------
// PAGINATION
// -----------------------------
const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

// -----------------------------
// STICKY HELPERS
// -----------------------------
let stickIdCounter = 0;
function nextStickId() { return "stick-" + (stickIdCounter++); }

// map of stickId => { clone, original }
const stickyMap = new Map();

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

    // Title (make it stickable)
    const title = document.createElement("h2");
    title.innerHTML = post.title || "";
    // make title stickable
    title.dataset.stickId = nextStickId();
    title.dataset.stickType = "text";
    title.classList.add("stickable");
    wrap.appendChild(title);

    // Date (stickable)
    if (post.date) {
      const date = document.createElement("p");
      date.className = "datetime";
      date.textContent = post.date;
      date.dataset.stickId = nextStickId();
      date.dataset.stickType = "text";
      date.classList.add("stickable");
      wrap.appendChild(date);
    }

    const contentWrap = document.createElement("div");
    contentWrap.className = "post-content";

    post.content.forEach(block => {
      if (block.type === "text") {
        const p = document.createElement("p");
        p.innerHTML = block.value || "";
        if (block.size) p.style.fontSize = block.size;
        p.dataset.stickId = nextStickId();
        p.dataset.stickType = "text";
        p.classList.add("stickable");
        contentWrap.appendChild(p);
      }

      if (block.type === "image") {
        const img = document.createElement("img");
        img.src = block.value;
        img.className = "post-image";
        // try to keep original width token (like "50%") but also store computed pixel width
        img.dataset.origWidth = block.width || "";
        img.style.width = block.width || "100%"; // normal
        img.dataset.stickId = nextStickId();
        img.dataset.stickType = "image";
        img.classList.add("stickable");
        contentWrap.appendChild(img);
      }

      if (block.type === "video") {
        const v = document.createElement("video");
        v.src = block.value;
        v.controls = true;
        v.autoplay = false;
        v.muted = true;
        v.loop = true;
        v.className = "post-video";
        v.dataset.origWidth = block.width || "";
        v.style.width = block.width || "100%";
        v.dataset.stickId = nextStickId();
        v.dataset.stickType = "video";
        v.classList.add("stickable");
        contentWrap.appendChild(v);
      }

      if (block.type === "audio") {
        const awrap = document.createElement("div");
        awrap.className = "audio-container";
        // audio wrapper stickable
        awrap.dataset.stickId = nextStickId();
        awrap.dataset.stickType = "audio";
        awrap.classList.add("stickable");
        const a = document.createElement("audio");
        a.controls = true;
        a.src = block.value;
        a.style.width = "100%";
        awrap.appendChild(a);
        contentWrap.appendChild(awrap);
      }
    });

    wrap.appendChild(contentWrap);
    container.appendChild(wrap);
  });

  renderPagination();
  initStickyEngine(); // init sticky behavior after DOM is created
}

// -----------------------------
// PAGINATION RENDER
// -----------------------------
function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (currentPage > 1) {
    const prev = document.createElement("a");
    prev.href = "#";
    prev.textContent = "Previous";
    prev.onclick = (e) => { e.preventDefault(); currentPage--; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(prev);
  }

  for (let i = 1; i <= totalPages; i++) {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    if (i === currentPage) a.className = "current";
    a.onclick = (e) => { e.preventDefault(); currentPage = i; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(a);
  }

  if (currentPage < totalPages) {
    const next = document.createElement("a");
    next.href = "#";
    next.textContent = "Next";
    next.onclick = (e) => { e.preventDefault(); currentPage++; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(next);
  }
}

// -----------------------------
// STICKY ENGINE (Option A: layered clones at top-left)
// -----------------------------
function initStickyEngine() {
  // clear previous clones and map
  stickyMap.forEach((entry) => {
    if (entry.clone && entry.clone.parentNode) entry.clone.remove();
    if (entry.original) entry.original.style.visibility = "";
  });
  stickyMap.clear();

  const stack = document.getElementById("sticky-stack");
  stack.innerHTML = "";

  // collect stickable elements IN DOM order
  const stickables = Array.from(document.querySelectorAll(".stickable"));

  // helper: create pixel-size from element (so clones do not scale)
  function getPixelWidth(el) {
    // if origWidth is like "50%" or "30em", try to use computed width for exact match
    const rect = el.getBoundingClientRect();
    return Math.max(1, Math.round(rect.width)) + "px";
  }

  // create clone node for an element
  function createCloneFor(el) {
    const wrapper = document.createElement("div");
    wrapper.className = "stacked-item";

    // preserve exact pixel width so clone doesn't scale
    const widthPx = getPixelWidth(el);
    wrapper.style.width = widthPx;

    const type = el.dataset.stickType || el.tagName.toLowerCase();

    if (type === "text" || el.tagName.toLowerCase() === "h2" || el.tagName.toLowerCase() === "p") {
      const textClone = document.createElement("div");
      textClone.className = "cloned-text";
      textClone.innerHTML = el.innerHTML;
      wrapper.appendChild(textClone);
    } else if (type === "image" || el.tagName.toLowerCase() === "img") {
      const img = document.createElement("img");
      img.className = "cloned-media";
      img.src = el.src;
      img.style.width = widthPx;
      wrapper.appendChild(img);
    } else if (type === "video") {
      const v = document.createElement("video");
      v.className = "cloned-media";
      v.src = el.src;
      v.controls = true;
      v.autoplay = false;
      v.muted = el.muted || false;
      v.loop = true;
      v.style.width = widthPx;
      wrapper.appendChild(v);
    } else if (type === "audio") {
      const a = document.createElement("audio");
      a.className = "cloned-media";
      a.controls = true;
      // original may be a wrapper; find actual audio src
      const maybeAudio = el.tagName.toLowerCase() === "audio" ? el : el.querySelector("audio");
      a.src = maybeAudio ? maybeAudio.src : "";
      a.style.width = widthPx;
      wrapper.appendChild(a);
    } else {
      // fallback clone outerHTML inside wrapper
      wrapper.innerHTML = el.outerHTML;
    }

    // set absolute positioning at top-left of stack
    wrapper.style.position = "absolute";
    wrapper.style.top = "0";
    wrapper.style.left = "0";

    // allow interactions inside the clone
    wrapper.addEventListener("click", (e) => e.stopPropagation());
    return wrapper;
  }

  // the checker handles adding/removing clones
  function checkStickables() {
    const viewportTop = 0;
    stickables.forEach((el, idx) => {
      const id = el.dataset.stickId;
      if (!id) return;
      const rect = el.getBoundingClientRect();

      // if element's top <= viewportTop, ensure it's cloned into stack
      if (rect.top <= viewportTop) {
        if (!stickyMap.has(id)) {
          const clone = createCloneFor(el);
          // append clone to stack; because clones are absolute top-left,
          // later appended clones appear on top visually.
          stack.appendChild(clone);
          // ensure clone z-index so more recent clones are on top
          clone.style.zIndex = 1000 + stack.children.length;
          // hide original (keep layout)
          el.style.visibility = "hidden";
          stickyMap.set(id, { clone, original: el });
        }
      } else {
        // element has moved below threshold - if it was cloned remove clone and restore original
        if (stickyMap.has(id)) {
          const entry = stickyMap.get(id);
          if (entry.clone && entry.clone.parentNode) entry.clone.parentNode.removeChild(entry.clone);
          if (entry.original) entry.original.style.visibility = "";
          stickyMap.delete(id);
        }
      }
    });
  }

  // run on scroll and resize
  checkStickables();
  // debounce-ish via passive listener
  window.removeEventListener("scroll", checkStickables);
  window.removeEventListener("resize", checkStickables);
  window.addEventListener("scroll", checkStickables, { passive: true });
  window.addEventListener("resize", checkStickables);
}

// -----------------------------
// INITIAL RENDER
// -----------------------------
renderPosts();
