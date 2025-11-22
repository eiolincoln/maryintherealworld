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

    const title = document.createElement("h2");
    title.innerHTML = post.title || "";
    title.className = "stickable stick-title";
    title.dataset.stickId = nextStickId();
    title.dataset.stickType = "title";
    wrap.appendChild(title);

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
        entry.wrapper.style.left = el.getBoundingClientRect().left + "px";
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

  const clone = el.cloneNode(true);
  const rect = el.getBoundingClientRect();
  clone.style.width = rect.width + "px";
  clone.style.height = rect.height + "px";
  clone.style.opacity = "1";
  clone.style.pointerEvents = "none";

  if (["text","title","date"].includes(el.dataset.stickType)) {
    clone.style.backgroundColor = "white";
    clone.style.padding = "0.15em 0.25em";
    clone.style.margin = "0";
    clone.style.display = "inline-block";
    clone.style.boxSizing = "border-box";
    clone.style.whiteSpace = "pre-wrap";

    // match font styles for exact width
    const computed = getComputedStyle(el);
    clone.style.fontSize = computed.fontSize;
    clone.style.fontFamily = computed.fontFamily;
    clone.style.fontWeight = computed.fontWeight;
    clone.style.lineHeight = computed.lineHeight;

    clone.classList.add("cloned-text");
  } else {
    clone.style.margin = "0";
    clone.style.display = "block";
    clone.classList.add("cloned-media");
  }

  wrapper.appendChild(clone);
  wrapper.style.position = "fixed";
  wrapper.style.top = "0px";
  wrapper.style.left = rect.left + "px";

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
