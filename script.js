const photos=[
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

function startScene(){
  actor.classList.add("walk");
  setTimeout(()=>{
    buildRangoliPattern();
    bouquet.classList.add("show");
    text.classList.add("show");
    stage.classList.add("glow");
    restart.classList.add("show");
    createConfetti();
  },7000);
}

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

  const layer1Radius = 120;
  for(let i=0;i<8;i++){
    const angle = (i/8)*Math.PI*2;
    const x = centerX + Math.cos(angle)*layer1Radius;
    const y = centerY + Math.sin(angle)*layer1Radius*0.9;
    const petal = createRangoliPetal(70,x,y,i,angle);
    petal.style.background = "#ff6b9d";
    petal.style.clipPath = "ellipse(50% 80% at 50% 50%)";
    flower.appendChild(petal);
  }

  const layer2Radius = 200;
  for(let i=0;i<12;i++){
    const angle = (i/12)*Math.PI*2;
    const x = centerX + Math.cos(angle)*layer2Radius;
    const y = centerY + Math.sin(angle)*layer2Radius*0.9;
    const petal = createRangoliPetal(60,x,y,i+8,angle);
    petal.style.background = "#2ecc71";
    petal.style.clipPath = "ellipse(50% 80% at 50% 50%)";
    flower.appendChild(petal);
  }
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
  img.src = photos[(index+1)%photos.length].src;
  img.alt = `Photo ${(index+1)%photos.length}`;
  petal.appendChild(img);

  addClickHandler(petal);
  return petal;
}

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

function createConfetti(){
  for(let i=0;i<40;i++){
    const c = document.createElement("div");
    c.className="confetti-piece";
    c.style.left = Math.random()*100+"%";
    c.style.animationDelay = Math.random()*0.5+"s";
    c.style.animationDuration = (2.5+Math.random()*1.5)+"s";
    confetti.appendChild(c);
  }
}

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

setTimeout(()=>{
  loading.style.display="none";
  startCountdown();
},1500);
