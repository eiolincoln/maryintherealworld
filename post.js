// -----------------------------
// POSTS DATA
// -----------------------------
const posts = [
  // ... same posts as your previous file ...
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
const stickyMap = new Map();

// -----------------------------
// RENDER POSTS
// -----------------------------
function renderPosts() {
  const container = document.getElementById("posts-container");
  container.innerHTML = "";

  const start = (currentPage-1)*postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  pagePosts.forEach(post => {
    const wrap = document.createElement("div");
    wrap.className = "post-container";

    // title
    const title = document.createElement("h2");
    title.innerHTML = post.title || "";
    title.dataset.stickId = nextStickId();
    title.dataset.stickType = "text";
    title.classList.add("stickable");
    wrap.appendChild(title);

    // date
    if(post.date){
      const date = document.createElement("p");
      date.textContent = post.date;
      date.dataset.stickId = nextStickId();
      date.dataset.stickType = "text";
      date.classList.add("stickable");
      date.classList.add("datetime");
      wrap.appendChild(date);
    }

    const contentWrap = document.createElement("div");
    contentWrap.className = "post-content";

    post.content.forEach(block=>{
      let el;
      if(block.type==="text"){
        el=document.createElement("p");
        el.innerHTML=block.value||"";
        if(block.size) el.style.fontSize=block.size;
      }
      else if(block.type==="image"){
        el=document.createElement("img");
        el.src=block.value;
        el.style.width=block.width||"100%";
      }
      else if(block.type==="video"){
        el=document.createElement("video");
        el.src=block.value;
        el.controls=true;
        el.autoplay=false;
        el.muted=true;
        el.loop=true;
        el.style.width=block.width||"100%";
      }
      else if(block.type==="audio"){
        el=document.createElement("audio");
        el.controls=true;
        el.src=block.value;
        el.style.width="100%";
      }
      if(el){
        el.dataset.stickId=nextStickId();
        el.dataset.stickType=block.type;
        el.classList.add("stickable");
        contentWrap.appendChild(el);
      }
    });

    wrap.appendChild(contentWrap);
    container.appendChild(wrap);
  });

  renderPagination();
  initStickyEngine();
}

// -----------------------------
// PAGINATION
// -----------------------------
function renderPagination(){
  const pagination=document.getElementById("pagination");
  pagination.innerHTML="";

  if(currentPage>1){
    const prev=document.createElement("a");
    prev.href="#";
    prev.textContent="Previous";
    prev.onclick=e=>{e.preventDefault(); currentPage--; renderPosts(); window.scrollTo(0,0);};
    pagination.appendChild(prev);
  }

  for(let i=1;i<=totalPages;i++){
    const a=document.createElement("a");
    a.href="#";
    a.textContent=i;
    if(i===currentPage)a.className="current";
    a.onclick=e=>{e.preventDefault(); currentPage=i; renderPosts(); window.scrollTo(0,0);};
    pagination.appendChild(a);
  }

  if(currentPage<totalPages){
    const next=document.createElement("a");
    next.href="#";
    next.textContent="Next";
    next.onclick=e=>{e.preventDefault(); currentPage++; renderPosts(); window.scrollTo(0,0);};
    pagination.appendChild(next);
  }
}

// -----------------------------
// STICKY ENGINE
// -----------------------------
function initStickyEngine(){
  const stack=document.getElementById("sticky-stack");
  stack.innerHTML="";
  stickyMap.clear();

  const stickables=Array.from(document.querySelectorAll(".stickable"));

  function getPixelWidth(el){return Math.round(el.getBoundingClientRect().width)+"px";}

  function createClone(el){
    const wrapper=document.createElement("div");
    wrapper.className="stacked-item";
    const widthPx=getPixelWidth(el);
    wrapper.style.width=widthPx;

    if(el.tagName.toLowerCase()==="p" || el.tagName.toLowerCase()==="h2" || el.dataset.stickType==="text"){
      const txt=document.createElement("div");
      txt.className="cloned-text";
      txt.innerHTML=el.innerHTML;
      wrapper.appendChild(txt);
    }
    else if(el.dataset.stickType==="image" || el.tagName.toLowerCase()==="img"){
      const img=document.createElement("img");
      img.src=el.src;
      img.className="cloned-media";
      img.style.width=widthPx;
      wrapper.appendChild(img);
    }
    else if(el.dataset.stickType==="video"){
      const v=document.createElement("video");
      v.src=el.src;
      v.controls=true;
      v.autoplay=false;
      v.muted=true;
      v.loop=true;
      v.style.width=widthPx;
      v.className="cloned-media";
      wrapper.appendChild(v);
    }
    else if(el.dataset.stickType==="audio"){
      const a=document.createElement("audio");
      a.controls=true;
      a.src=el.src||el.querySelector("audio")?.src||"";
      a.style.width=widthPx;
      a.className="cloned-media";
      wrapper.appendChild(a);
    }

    wrapper.style.position="absolute";
    wrapper.style.top="0";
    wrapper.style.left="0";
    wrapper.addEventListener("click",e=>e.stopPropagation());
    return wrapper;
  }

  function updateSticky(){
    stickables.forEach(el=>{
      const id=el.dataset.stickId;
      if(!id) return;
      const rect=el.getBoundingClientRect();

      if(rect.top<=0){
        if(!stickyMap.has(id)){
          const clone=createClone(el);
          stack.appendChild(clone);
          clone.style.zIndex=1000+stack.children.length;
          el.style.visibility="hidden";
          stickyMap.set(id,{clone,original:el});
        }
      } else {
        if(stickyMap.has(id)){
          const entry=stickyMap.get(id);
          if(entry.clone && entry.clone.parentNode) entry.clone.parentNode.removeChild(entry.clone);
          if(entry.original) entry.original.style.visibility="";
          stickyMap.delete(id);
        }
      }
    });
  }

  updateSticky();
  window.removeEventListener("scroll",updateSticky);
  window.removeEventListener("resize",updateSticky);
  window.addEventListener("scroll",updateSticky,{passive:true});
  window.addEventListener("resize",updateSticky);
}

// -----------------------------
// INITIAL RENDER
// -----------------------------
renderPosts();
