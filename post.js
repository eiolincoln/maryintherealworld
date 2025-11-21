// posts data (replace or edit these entries as you like)
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
// pagination config
const postsPerPage = 5;
let currentPage = 1;
const totalPages = Math.ceil(posts.length / postsPerPage);

// helper: unique id generator for stickables
let stickIdCounter = 0;
function nextStickId() { return "stick-" + (stickIdCounter++); }

// render posts into #posts-container
function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  pagePosts.forEach((post) => {
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

    // create blocks - each media/text block that should "stick" gets data-stick-id
    post.content.forEach(block => {
      if (block.type === "text") {
        const p = document.createElement("p");
        // keep <br> and inline HTML
        p.innerHTML = block.value || "";
        if (block.size) p.style.fontSize = block.size;
        // text blocks are stickable too
        p.dataset.stickId = nextStickId();
        p.dataset.stickType = "text";
        p.className = "stickable stick-text";
        contentWrap.appendChild(p);
      }

      if (block.type === "image") {
        const img = document.createElement("img");
        img.src = block.value;
        img.className = "post-image stickable stick-image";
        img.style.width = block.width || "100%";
        img.dataset.stickId = nextStickId();
        img.dataset.stickType = "image";
        // preserve original width value for clone sizing
        img.dataset.origWidth = block.width || "";
        contentWrap.appendChild(img);
      }

      if (block.type === "video") {
        const v = document.createElement("video");
        v.src = block.value;
        v.controls = true;
        v.autoplay = false; // autoplay off for original; clones can autoplay if you want
        v.muted = true;
        v.loop = true;
        v.className = "post-video stickable stick-video";
        v.style.width = block.width || "100%";
        v.dataset.stickId = nextStickId();
        v.dataset.stickType = "video";
        v.dataset.origWidth = block.width || "";
        contentWrap.appendChild(v);
      }

      if (block.type === "audio") {
        const audioWrap = document.createElement("div");
        audioWrap.className = "audio-container stickable stick-audio";
        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = block.value;
        audio.style.width = "100%";
        audio.dataset.stickId = nextStickId();
        audio.dataset.stickType = "audio";
        audioWrap.dataset.stickId = audio.dataset.stickId;
        audioWrap.dataset.stickType = "audio";
        audioWrap.appendChild(audio);
        contentWrap.appendChild(audioWrap);
      }
    });

    wrap.appendChild(contentWrap);
    container.appendChild(wrap);
  });

  renderPagination();
  initStickyEngine();
}

// pagination (numbers underlined; previous/next)
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
    a.className = (i === currentPage) ? "current" : "";
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

/* ---------------------------
   STICKY STACK ENGINE (stacking behavior)
   ---------------------------
   - All elements that should be able to stick have class "stickable"
   - When a stickable's bounding top <= 0, we clone it into #sticky-stack
   - When it scrolls back above top (> 0), we remove its clone and restore original
   - Clones are given class "stacked-item" and are stacked in order (newer clones appended -> appear lower visually,
     but JS sets z-index so newest appear on top visually if needed)
*/
let stickyMap = new Map(); // stickId => { clone, originalHidden }

function initStickyEngine() {
  // clear any previous map/clones
  stickyMap.forEach((val) => {
    if (val.clone && val.clone.parentNode) val.clone.remove();
  });
  stickyMap.clear();

  // ensure stack container exists
  const stack = document.getElementById("sticky-stack");
  stack.innerHTML = "";

  // make list of stickable elements on page (in order they appear)
  const stickables = Array.from(document.querySelectorAll(".stickable"));

  // on scroll/resize check state
  function checkStickables() {
    const viewportTop = 0; // use top of viewport
    stickables.forEach((el, idx) => {
      const stickId = el.dataset.stickId;
      if (!stickId) return;
      const rect = el.getBoundingClientRect();
      // if top <= 0 we want it stacked (cloned)
      if (rect.top <= viewportTop) {
        if (!stickyMap.has(stickId)) {
          // create clone
          const cloned = createCloneFor(el);
          // append to stack
          stack.appendChild(cloned);
          // set z-index so later items are visually above earlier ones
          cloned.style.zIndex = 100 + stack.children.length;
          // hide the original while cloned
          hideOriginal(el);
          stickyMap.set(stickId, { clone: cloned, original: el });
        }
      } else {
        // element is above threshold; if it was stuck remove clone and reveal original
        if (stickyMap.has(stickId)) {
          const entry = stickyMap.get(stickId);
          if (entry.clone && entry.clone.parentNode) entry.clone.parentNode.removeChild(entry.clone);
          showOriginal(entry.original);
          stickyMap.delete(stickId);
        }
      }
    });
  }

  // run once now
  checkStickables();

  // attach scroll and resize listeners
  window.removeEventListener("scroll", checkStickables);
  window.removeEventListener("resize", checkStickables);
  window.addEventListener("scroll", checkStickables, { passive: true });
  window.addEventListener("resize", checkStickables);
}

// create a clone element suitable for stacking (keeps media controls interactive)
function createCloneFor(el) {
  const wrapper = document.createElement("div");
  wrapper.className = "stacked-item";

  const type = el.dataset.stickType || el.tagName.toLowerCase();

  if (type === "text" || el.tagName.toLowerCase() === "p") {
    const textClone = document.createElement("div");
    textClone.className = "cloned-text";
    textClone.innerHTML = el.innerHTML;
    wrapper.appendChild(textClone);
  } else if (type === "image" || el.tagName.toLowerCase() === "img") {
    const img = document.createElement("img");
    img.className = "cloned-media";
    img.src = el.src;
    // if original recorded width, use it
    if (el.dataset.origWidth) img.style.width = el.dataset.origWidth;
    wrapper.appendChild(img);
  } else if (type === "video") {
    const v = document.createElement("video");
    v.className = "cloned-media";
    v.src = el.src;
    v.controls = true;
    v.autoplay = false; // leave autoplay off; user can play
    v.muted = false; // do not force mute on the clone
    v.loop = true;
    // size
    if (el.dataset.origWidth) v.style.width = el.dataset.origWidth;
    wrapper.appendChild(v);
  } else if (type === "audio") {
    const a = document.createElement("audio");
    a.className = "cloned-media";
    a.controls = true;
    a.src = (el.tagName.toLowerCase() === "audio") ? el.src : (el.querySelector("audio") ? el.querySelector("audio").src : "");
    wrapper.appendChild(a);
  } else {
    // fallback: clone outerHTML
    wrapper.innerHTML = el.outerHTML;
  }

  // clicking inside stack should still allow interactions with controls
  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return wrapper;
}

function hideOriginal(el) {
  // hide original visually but keep layout (we set visibility: hidden so it still takes space)
  el.style.visibility = "hidden";
}
function showOriginal(el) {
  el.style.visibility = "";
}

// initial render
renderPosts();
