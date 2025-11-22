// --------------------------
// POSTS DATA (unchanged)
// --------------------------
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
let stickyMap = new Map();         // map stickId -> { wrapper, originalRectLeft, originalRectTop }
let stickyScrollHandler = null;    // reference to current scroll handler (so we can remove it)

// --------------------------
// RENDER POSTS
// --------------------------
function renderPosts() {
  const container = document.getElementById("posts-container");
  const stack = document.getElementById("sticky-stack");
  if (!container || !stack) return;

  // clear previous page's DOM and stickies
  container.innerHTML = "";
  stack.innerHTML = "";
  stickyMap.clear();

  // remove previous listeners if present
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

    // Title (stickable)
    const title = document.createElement("h2");
    title.innerHTML = post.title || "";
    title.className = "stickable stick-title";
    title.dataset.stickId = nextStickId();
    title.dataset.stickType = "title";
    wrap.appendChild(title);

    // Date (stickable)
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
        // don't force width here; keep the same behaviour as before
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
  initStickyEngine(); // (re)initialize sticky behavior for this page
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
// STICKY ENGINE (Option A: fixed-to-screen wallpaper, clones behind content)
// --------------------------
function initStickyEngine() {
  const stack = document.getElementById("sticky-stack");
  const stickables = Array.from(document.querySelectorAll(".stickable"));

  // our scroll handler (recreated every page)
  stickyScrollHandler = function() {
    const vpTop = 0;

    stickables.forEach(el => {
      const stickId = el.dataset.stickId;
      if (!stickId) return;
      const rect = el.getBoundingClientRect();

      // if scrolled past top -> create clone (if not already)
      if (rect.top < vpTop) {
        if (!stickyMap.has(stickId)) {
          const wrapper = createCloneBehind(el);
          // record original left so subsequent resize/scroll can keep it accurate
          stickyMap.set(stickId, { wrapper, originalLeft: el.getBoundingClientRect().left });
          stack.appendChild(wrapper);
        } else {
          // update left in case of layout shifts/resizes
          const entry = stickyMap.get(stickId);
          if (entry) {
            entry.wrapper.style.left = el.getBoundingClientRect().left + "px";
          }
        }
      } else {
        // if original is back in view, remove clone
        if (stickyMap.has(stickId)) {
          const entry = stickyMap.get(stickId);
          if (entry.wrapper.parentNode) entry.wrapper.parentNode.removeChild(entry.wrapper);
          stickyMap.delete(stickId);
        }
      }
    });
  };

  // run once now
  stickyScrollHandler();

  // attach listeners
  window.addEventListener('scroll', stickyScrollHandler, { passive: true });
  window.addEventListener('resize', stickyScrollHandler);
}

// --------------------------
// Create clone that sits BEHIND (wallpaper) — not in front of content
// --------------------------
function createCloneBehind(el) {
  const wrapper = document.createElement("div");
  wrapper.className = "stacked-item";

  // clone node itself
  const clone = el.cloneNode(true);

  // For media (image/video) we match the rendered size so it looks identical.
  // Use offsetWidth/offsetHeight (current rendered size).
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  // Apply sizes to clone so it doesn't scale unpredictably
  if (w) clone.style.width = w + "px";
  if (h) clone.style.height = h + "px";

  // Ensure clone is fully opaque and doesn't accept pointer events
  clone.style.opacity = "1";
  clone.style.pointerEvents = "none";

  // Text/title/date: give them an opaque white background (no transparency)
  if (el.dataset.stickType === "text" || el.dataset.stickType === "title" || el.dataset.stickType === "date") {
    clone.style.backgroundColor = "white";
    clone.style.padding = "0.15em 0.25em";
    clone.style.margin = "0";
  } else {
    // media specific tweaks (remove margins)
    clone.style.margin = "0";
    clone.style.display = "block";
  }

  // Put the clone inside wrapper. Wrapper will be positioned fixed and placed behind content.
  wrapper.appendChild(clone);

  // Position wrapper at the top of viewport, at the same X coordinate as the original element.
  const rect = el.getBoundingClientRect();
  wrapper.style.position = "fixed";
  wrapper.style.top = "0px"; // fixed-to-screen at top
  wrapper.style.left = rect.left + "px"; // important: same horizontal position as original
  wrapper.style.zIndex = "0"; // **LOW** z-index — behind main (main has z-index:100)
  wrapper.style.pointerEvents = "none";

  return wrapper;
}

// --------------------------
// INITIALIZE
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
});
