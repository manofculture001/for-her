function buildRangoliPattern(){
  flower.innerHTML="";
  const centerX = flower.offsetWidth/2;
  const centerY = flower.offsetHeight/2;

  const centerPetal = document.createElement("div");
  centerPetal.className = "petal center-heart";
  centerPetal.style.width = "90px";
  centerPetal.style.height = "90px";
  centerPetal.style.left = centerX + "px";
  centerPetal.style.top = centerY + "px";
  centerPetal.style.transform = "translate(-50%, -50%)";
  centerPetal.style.clipPath = "ellipse(50% 50% at 50% 50%)";
  centerPetal.style.zIndex = 20;

  const centerImg = document.createElement("img");
  centerImg.src = photos[0].src;
  centerImg.alt = "Photo 1";
  centerPetal.appendChild(centerImg);
  addClickHandler(centerPetal);
  flower.appendChild(centerPetal);

  const totalPetals = [
    {count:8, radius:120},
    {count:12, radius:200}
  ];

  let petalIndex = 1; // start from 1 because center is 0
  totalPetals.forEach(layer=>{
    for(let i=0;i<layer.count;i++){
      const angle = (i/layer.count)*Math.PI*2;
      const x = centerX + Math.cos(angle)*layer.radius;
      const y = centerY + Math.sin(angle)*layer.radius*0.9;

      const petal = createRangoliPetal( layer.radius === 120 ? 70 : 60, x, y, petalIndex, angle );
      petal.style.background = "#ff4f7a"; // same red for all petals
      petal.style.clipPath = "ellipse(50% 80% at 50% 50%)";
      flower.appendChild(petal);
      petalIndex++;
    }
  });
}

function createRangoliPetal(size,x,y,index,angle){
  const petal = document.createElement("div");
  petal.className="petal";
  petal.style.width = size+"px";
  petal.style.height = size*0.9+"px";
  petal.style.left = x+"px";
  petal.style.top = y+"px";
  petal.style.transform = `translate(-50%, -50%) rotate(${angle*180/Math.PI}deg)`;
  petal.style.zIndex = 15-index;

  const img = document.createElement("img");
  img.src = photos[index % photos.length].src; // cycle through photos
  img.alt = `Photo ${index % photos.length + 1}`;
  petal.appendChild(img);

  addClickHandler(petal);
  return petal;
}
// 📸 Photos in /public/photos/
const photos = [
  {src:"/photos/1.jpg"},
  {src:"/photos/2.jpg"},
  {src:"/photos/3.jpg"},
  {src:"/photos/4.jpg"},
  {src:"/photos/5.jpg"},
  {src:"/photos/6.jpg"}
];

const loading = document.getElementById("loading");
const countdown = document.getElementById("countdown");
const countHolder = document.getElementById("countHolder");
const actor = document.getElementById("actor");
const bouquet = document.getElementById("bouquet");
const flower = document.getElementById("flower");
const text = document.getElementById("text");
const confetti = document.getElementById("confetti");
const stage = document.getElementById("stage");
const restart = document.getElementById("restart");

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

// ⏳ Countdown 3-2-1
async function startCountdown(){
  for(let i=3;i>=1;i--){
    const el = document.createElement("div");
    el.className="count";
    el.textContent = i;
    countHolder.innerHTML="";
    countHolder.appendChild(el);
    await sleep(1200);
  }
  countdown.style.display="none";
  startScene();
}

// 🌸 Start Scene: actor walks, bouquet shows, hearts fall
function startScene(){
  actor.classList.add("walk");
  setTimeout(()=>{
    buildRangoliPattern();
    bouquet.classList.add("show");
    text.classList.add("show");
    stage.classList.add("glow");
    restart.classList.add("show");
    createHeartConfetti();
  },7000);
}

// 🌺 Build Rangoli Petals (center + inner + outer)
function buildRangoliPattern(){
  flower.innerHTML="";
  const centerX = flower.offsetWidth/2;
  const centerY = flower.offsetHeight/2;

  // ✅ Center Petal
  const centerPetal = document.createElement("div");
  centerPetal.className = "petal center-heart";
  centerPetal.style.width = "90px";
  centerPetal.style.height = "90px";
  centerPetal.style.left = centerX + "px";
  centerPetal.style.top = centerY + "px";
  centerPetal.style.transform = "translate(-50%, -50%)";
  centerPetal.style.clipPath = "ellipse(50% 50% at 50% 50%)";
  centerPetal.style.zIndex = 20;

  const centerImg = document.createElement("img");
  centerImg.src = photos[0].src;  // center photo
  centerImg.alt = "Photo 1";
  centerPetal.appendChild(centerImg);
  addClickHandler(centerPetal);
  flower.appendChild(centerPetal);

  const innerLayerCount = 8;
  const outerLayerCount = 12;
  const innerLayerRadius = 120;
  const outerLayerRadius = 200;

  let usedIndices = new Set([0]); // center used

  // 🔴 INNER LAYER
  for(let i=0; i<innerLayerCount; i++){
    const angle = (i/innerLayerCount)*Math.PI*2;
    const x = centerX + Math.cos(angle)*innerLayerRadius;
    const y = centerY + Math.sin(angle)*innerLayerRadius*0.9;

    let photoIndex;
    do {
      photoIndex = Math.floor(Math.random()*photos.length);
    } while(usedIndices.has(photoIndex));
    usedIndices.add(photoIndex);

    const petal = createRangoliPetal(70, x, y, photoIndex, angle);
    petal.style.background = "#ff4f7a";
    petal.style.clipPath = "ellipse(50% 80% at 50% 50%)";
    flower.appendChild(petal);
  }

  // 🔴 OUTER LAYER
  for(let i=0; i<outerLayerCount; i++){
    const angle = (i/outerLayerCount)*Math.PI*2;
    const x = centerX + Math.cos(angle)*outerLayerRadius;
    const y = centerY + Math.sin(angle)*outerLayerRadius*0.9;

    let photoIndex;
    do {
      photoIndex = Math.floor(Math.random()*photos.length);
    } while(usedIndices.has(photoIndex));
    usedIndices.add(photoIndex);

    const petal = createRangoliPetal(60, x, y, photoIndex, angle);
    petal.style.background = "#ff4f7a";
    petal.style.clipPath = "ellipse(50% 80% at 50% 50%)";
    flower.appendChild(petal);
  }
}

// 🌸 Create single petal
function createRangoliPetal(size, x, y, photoIndex, angle){
  const petal = document.createElement("div");
  petal.className="petal";
  petal.style.width = size+"px";
  petal.style.height = size*0.9+"px";
  petal.style.left = x+"px";
  petal.style.top = y+"px";
  petal.style.transform = `translate(-50%, -50%) rotate(${angle*180/Math.PI}deg)`;

  const img = document.createElement("img");
  img.src = photos[photoIndex].src; // linked image
  img.alt = `Photo ${photoIndex+1}`;
  petal.appendChild(img);

  addClickHandler(petal);
  return petal;
}

// 🔴 Petal click & close logic
function addClickHandler(petal){
  const close = document.createElement("button");
  close.className="close-btn";
  close.textContent="×";
  close.onclick = (e)=>{
    e.stopPropagation();
    flower.classList.remove("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
  };
  petal.appendChild(close);

  petal.onclick = (e)=>{
    e.stopPropagation();
    flower.classList.add("dim");
    document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));
    petal.classList.add("active");
  };
}

// 💖 Continuous Heart Confetti
function createHeartConfetti(){
  const hearts = ["❤️","💖","💘","💝"];

  function spawnHeart(){
    const c = document.createElement("div");
    c.className="confetti-piece";
    c.style.left = Math.random()*100 + "%";
    c.style.fontSize = `${10 + Math.random()*12}px`;
    c.style.animationDuration = (2.5 + Math.random()*1.5) + "s";
    c.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    confetti.appendChild(c);
    setTimeout(()=>c.remove(), 4000); // remove after falling
  }

  // Spawn hearts continuously
  setInterval(spawnHeart, 200);
}

// 🔄 Restart
restart.onclick = ()=>{
  actor.classList.remove("walk");
  bouquet.classList.remove("show");
  text.classList.remove("show");
  stage.classList.remove("glow");
  restart.classList.remove("show");
  flower.innerHTML="";
  confetti.innerHTML="";
  countdown.style.display="grid";
  startCountdown();
};

// ⏳ Start countdown after loader
setTimeout(()=>{
  loading.style.display="none";
  startCountdown();
},1500);

