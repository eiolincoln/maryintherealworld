v// =====================
// POSTS DATA
// =====================
const posts = [
  {
    title: "",
    date: "11/21/2025 11:39pm",
    content: [{ type: "text", value: "this album sucks. i’m preparing for war.", size: "1em" }]
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
    content: [{ type: "image", value: "images/Screenshot1.png", width: "25%" }]
  },
  {
    title: "20 Photos",
    date: "11/21/2025 7:16pm",
    content: [{ type: "text", value: "<i>77</i>", size: "1em" }]
  },
  {
    title: "video test on website",
    date:"11/21/2025 3:19pm",
    content:[
      { type: "video", value: "videos/sparkleinjamen.mp4", width: "50%" },
      { type: "text", value: "11/21/2025 3:19pm anonymous", size: "1em" }
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
      { type: "text", value: "gosh i wish listened to her music way earlier i had added f☆ck my computer in my playlist on 11th June 2025 i should've listened earlier maybe<br>could've got her on my Spotify Wrapped but it's too late<br><br>4562 4562 4562 4562 ", size: "1em" }
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

// =====================
// PAGINATION CONFIG
// =====================
const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

// =====================
// STICKY ENGINE
// =====================
let stickIdCounter = 0;
function nextStickId() { return `stick-${stickIdCounter++}`; }
let stickyMap = new Map();

// =====================
// RENDER POSTS
// =====================
function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const pagePosts = posts.slice(start, start + postsPerPage);

  pagePosts.forEach(post => {
    const postWrap = document.createElement("div");
    postWrap.className = "post-container";

    // title
    const h2 = document.createElement("h2");
    h2.innerHTML = post.title || "";
    postWrap.appendChild(h2);

    // date
    if (post.date) {
      const dateEl = document.createElement("p");
      dateEl.className = "datetime";
      dateEl.textContent = post.date;
      postWrap.appendChild(dateEl);
    }

    const contentWrap = document.createElement("div");
    contentWrap.className = "post-content";

    post.content.forEach(block => {
      if(block.type === "text") {
        const p = document.createElement("p");
        p.innerHTML = block.value;
        if(block.size) p.style.fontSize = block.size;
        p.dataset.stickId = nextStickId();
        p.dataset.stickType = "text";
        p.className = "stickable stick-text";
        contentWrap.appendChild(p);
      }

      if(block.type === "image") {
        const img = document.createElement("img");
        img.src = block.value;
        img.style.width = block.width || "100%";
        img.dataset.origWidth = block.width || "";
        img.dataset.stickId = nextStickId();
        img.dataset.stickType = "image";
        img.className = "post-image stickable stick-image";
        contentWrap.appendChild(img);
      }

      if(block.type === "video") {
        const v = document.createElement("video");
        v.src = block.value;
        v.controls = true;
        v.muted = true;
        v.loop = true;
        v.style.width = block.width || "100%";
        v.dataset.origWidth = block.width || "";
        v.dataset.stickId = nextStickId();
        v.dataset.stickType = "video";
        v.className = "post-video stickable stick-video";
        contentWrap.appendChild(v);
      }

      if(block.type === "audio") {
        const audioWrap = document.createElement("div");
        audioWrap.className = "audio-container stickable stick-audio";
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = block.value;
        audio.style.width = "100%";
        const id = nextStickId();
        audio.dataset.stickId = id;
        audio.dataset.stickType = "audio";
        audioWrap.dataset.stickId = id;
        audioWrap.dataset.stickType = "audio";
        audioWrap.appendChild(audio);
        contentWrap.appendChild(audioWrap);
      }
    });

    postWrap.appendChild(contentWrap);
    container.appendChild(postWrap);
  });

  renderPagination();
  initStickyEngine();
}

// =====================
// PAGINATION
// =====================
function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if(currentPage > 1) {
    const prev = document.createElement("a");
    prev.href = "#";
    prev.textContent = "Previous";
    prev.onclick = e => { e.preventDefault(); currentPage--; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(prev);
  }

  for(let i=1; i<=totalPages; i++) {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    a.className = i===currentPage ? "current" : "";
    a.onclick = e => { e.preventDefault(); currentPage = i; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(a);
  }

  if(currentPage < totalPages) {
    const next = document.createElement("a");
    next.href = "#";
    next.textContent = "Next";
    next.onclick = e => { e.preventDefault(); currentPage++; renderPosts(); window.scrollTo(0,0); };
    pagination.appendChild(next);
  }
}

// =====================
// STICKY ENGINE FUNCTIONS
// =====================
function initStickyEngine() {
  stickyMap.forEach(v => v.clone?.remove());
  stickyMap.clear();

  const stack = document.getElementById("sticky-stack");
  stack.innerHTML = "";

  const stickables = Array.from(document.querySelectorAll(".stickable"));

  const checkStickables = () => {
    stickables.forEach(el => {
      const id = el.dataset.stickId;
      if(!id) return;
      const rect = el.getBoundingClientRect();
      if(rect.top <= 0) {
        if(!stickyMap.has(id)) {
          const clone = createCloneFor(el);
          stack.appendChild(clone);
          clone.style.zIndex = 100 + stack.children.length;
          el.style.visibility = "hidden";
          stickyMap.set(id, { clone, original: el });
        }
      } else {
        if(stickyMap.has(id)) {
          const entry = stickyMap.get(id);
          entry.clone?.remove();
          entry.original.style.visibility = "";
          stickyMap.delete(id);
        }
      }
    });
  };

  checkStickables();
  window.removeEventListener("scroll", checkStickables);
  window.removeEventListener("resize", checkStickables);
  window.addEventListener("scroll", checkStickables, { passive: true });
  window.addEventListener("resize", checkStickables);
}

function createCloneFor(el) {
  const wrapper = document.createElement("div");
  wrapper.className = "stacked-item";

  const type = el.dataset.stickType || el.tagName.toLowerCase();

  if(type === "text" || el.tagName.toLowerCase() === "p") {
    const clone = document.createElement("div");
    clone.className = "cloned-text";
    clone.innerHTML = el.innerHTML;
    wrapper.appendChild(clone);
  } else if(type === "image" || el.tagName.toLowerCase() === "img") {
    const img = document.createElement("img");
    img.className = "cloned-media";
    img.src = el.src;
    if(el.dataset.origWidth) img.style.width = el.dataset.origWidth;
    wrapper.appendChild(img);
  } else if(type === "video") {
    const v = document.createElement("video");
    v.className = "cloned-media";
    v.src = el.src;
    v.controls = true;
    v.loop = true;
    v.muted = false;
    if(el.dataset.origWidth) v.style.width = el.dataset.origWidth;
    wrapper.appendChild(v);
  } else if(type === "audio") {
    const a = document.createElement("audio");
    a.className = "cloned-media";
    a.controls = true;
    a.src = el.tagName.toLowerCase()==="audio"?el.src:(el.querySelector("audio")?.src||"");
    wrapper.appendChild(a);
  } else {
    wrapper.innerHTML = el.outerHTML;
  }

  wrapper.addEventListener("click", e=>e.stopPropagation());
  return wrapper;
}

// =====================
// INITIAL RENDER
// =====================
renderPosts();
