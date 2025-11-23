// --------------------------
// POSTS DATA
// --------------------------
const posts = [
    {
        title: "<u>This House Has People in It</u>",
        date: "11/22/2025 12:18am",
        content: [
            { 
                type: "image", 
                value: "https://raw.githubusercontent.com/eiolincoln/maryintherealworld/main/images/niche1.png", 
                width: "25%" 
            },
            { 
                type: "image", 
                value: "https://raw.githubusercontent.com/eiolincoln/maryintherealworld/main/images/niche2.png", 
                width: "30%" 
            }
        ]
    },
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
            { type: "image", value:"images/Beauty.png", width: "10%" },
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
let stickyMap = new Map(); // stickId -> { wrapper }
let stickyScrollHandler = null;
let cloneStackCounter = 0;

// --------------------------
// RENDER POSTS
// --------------------------
function renderPosts() {
  const container = document.getElementById("posts-container");
  const stack = document.getElementById("sticky-stack");
  if (!container || !stack) return;

  // clear current
  container.innerHTML = "";
  stack.innerHTML = "";
  stickyMap.clear();
  cloneStackCounter = 0;

  // remove old listeners if present
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

    // Title (block so date sits below)
    const title = document.createElement("h2");
    title.innerHTML = post.title || "";
    title.className = "stickable stick-title";
    title.dataset.stickId = nextStickId();
    title.dataset.stickType = "title";
    title.style.display = "block";
    wrap.appendChild(title);

    // Date under the title
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

      if (block.type === "text") {
        el = document.createElement("p");
        el.innerHTML = block.value;
        el.style.fontSize = block.size || "1em";
        el.className = "stickable stick-text";
        el.dataset.stickId = stickId;
        el.dataset.stickType = "text";
        // inline-block so highlight hugs text
        el.style.display = "inline-block";
      }

      if (block.type === "image") {
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
      }

      if (block.type === "video") {
        el = document.createElement("video");
        el.src = block.value;
        el.controls = true;
        el.loop = true;
        el.autoplay = true;
        el.muted = true;       // original should be muted
        el.playsInline = true;
        if (block.width) el.style.width = block.width;
        el.className = "stickable stick-video post-video";
        el.dataset.stickId = stickId;
        el.dataset.stickType = "video";
        el.style.display = "block";
        el.style.maxWidth = "100%";
        el.style.height = "auto";
        el.style.background = "transparent";
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
// - Stick when element's top <= 0
// - Unstick when element's top > 0
// - Clones are created/removed dynamically
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
          // create clone and hide original
          const wrapper = createCloneBehind(el);

          // hide original after measuring
          el.style.visibility = "hidden";

          stickyMap.set(stickId, { wrapper });
          stack.appendChild(wrapper);
        } else {
          // keep clone aligned horizontally if layout shifts
          const left = el.getBoundingClientRect().left;
          entry.wrapper.style.left = Math.round(left) + "px";
        }
      } else {
        if (entry) {
          // remove clone and restore original
          entry.wrapper.remove();
          stickyMap.delete(stickId);
          el.style.visibility = "visible";
        }
      }
    });
  };

  // initial run
  stickyScrollHandler();

  window.addEventListener('scroll', stickyScrollHandler, { passive: true });
  window.addEventListener('resize', stickyScrollHandler);
}

// --------------------------
// CREATE CLONE BEHIND
// - Muted, non-interactive clones for videos
// - Pixel sized clones so they visually match originals
// --------------------------
function createCloneBehind(el) {
  const wrapper = document.createElement("div");
  wrapper.className = "stacked-item";

  const rect = el.getBoundingClientRect();
  const tag = el.tagName;

  let clone;

  if (tag === "IMG") {
    clone = document.createElement("img");
    clone.src = el.src;
    clone.style.width = Math.round(rect.width) + "px";
    clone.style.height = Math.round(rect.height) + "px";
    clone.style.display = "block";
    clone.style.objectFit = "contain";
    clone.style.background = "transparent";
  } else if (tag === "VIDEO") {
    // clone as a fresh video element and force it silent and static
    clone = document.createElement("video");
    clone.src = el.currentSrc || el.src || el.getAttribute('src');
    clone.muted = true;
    clone.volume = 0;
    clone.pause();
    clone.removeAttribute("controls");
    clone.setAttribute("playsinline", "");
    clone.style.pointerEvents = "none";

    clone.style.width = Math.round(rect.width) + "px";
    clone.style.height = Math.round(rect.height) + "px";
    clone.style.display = "block";
    clone.style.objectFit = "contain";
    clone.style.background = "transparent";
  } else {
    // text/date/title or other elements: clone node to preserve markup
    clone = el.cloneNode(true);
    clone.style.display = "inline-block";
    clone.style.whiteSpace = "pre-wrap";
    clone.style.width = Math.round(rect.width) + "px";
    clone.style.height = Math.round(rect.height) + "px";

    const computed = getComputedStyle(el);
    // copy key text styles to avoid visual diffs
    clone.style.fontSize = computed.fontSize;
    clone.style.fontFamily = computed.fontFamily;
    clone.style.fontWeight = computed.fontWeight;
    clone.style.lineHeight = computed.lineHeight;
    clone.style.background = computed.backgroundColor || "white";
    clone.style.padding = computed.padding;
    clone.style.boxSizing = "border-box";
  }

  // Universal clone tweaks
  clone.style.pointerEvents = "none";
  clone.style.margin = "0";
  clone.style.opacity = "1";

  wrapper.appendChild(clone);

  // place fixed at top; left is viewport-left so it lines up
  wrapper.style.position = "fixed";
  wrapper.style.top = "0px";
  wrapper.style.left = Math.round(rect.left) + "px";

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
