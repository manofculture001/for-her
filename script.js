// Embedded placeholder images
const photos = [
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjQwN2EiIC8+PC9zdmc+"},
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjYyNzMiIC8+PC9zdmc+"},
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjI1NzIiIC8+PC9zdmc+"},
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjg1NzQiIC8+PC9zdmc+"},
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjYwNzYiIC8+PC9zdmc+"},
  {src:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZjQ1NzgiIC8+PC9zdmc+"}
];

const loading=document.getElementById("loading"),
      countdown=document.getElementById("countdown"),
      countHolder=document.getElementById("countHolder"),
      actor=document.getElementById("actor"),
      bouquet=document.getElementById("bouquet"),
      flower=document.getElementById("flower"),
      text=document.getElementById("text"),
      confetti=document.getElementById("confetti"),
      stage=document.getElementById("stage"),
      restart=document.getElementById("restart");

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

// Countdown
async function startCountdown(){
  for(let i=3;i>=1;i--){
    const el=document.createElement("div");
    el.className="count"; el.textContent=i;
    countHolder.innerHTML=""; countHolder.appendChild(el);
    await sleep(1200);
  }
  countdown.style.display="none"; startScene();
}

// Start scene
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

// Create petals
function buildRangoliPattern(){
  flower.innerHTML=""; const cx=flower.offsetWidth/2, cy=flower.offsetHeight/2;
  const centerPetal=document.createElement("div"); centerPetal.className="petal center-heart";
  centerPetal.style.width="90px"; centerPetal.style.height="90px";
  centerPetal.style.left=cx+"px"; centerPetal.style.top=cy+"px";
  centerPetal.style.transform="translate(-50%,-50%)";
  centerPetal.style.clipPath="ellipse(50% 50% at 50% 50%)"; centerPetal.style.zIndex=20;
  const img=document.createElement("img"); img.src=photos[0].src; centerPetal.appendChild(img);
  addClickHandler(centerPetal); flower.appendChild(centerPetal);

  const used=new Set([0]); const innerR=120, outerR=200;

  for(let i=0;i<8;i++){
    const angle=i/8*Math.PI*2, x=cx+Math.cos(angle)*innerR, y=cy+Math.sin(angle)*innerR*0.9;
    let idx; do{idx=Math.floor(Math.random()*photos.length);}while(used.has(idx)); used.add(idx);
    flower.appendChild(createPetal(70,x,y,idx,angle));
  }

  for(let i=0;i<12;i++){
    const angle=i/12*Math.PI*2, x=cx+Math.cos(angle)*outerR, y=cy+Math.sin(angle)*outerR*0.9;
    let idx; do{idx=Math.floor(Math.random()*photos.length);}while(used.has(idx)); used.add(idx);
    flower.appendChild(createPetal(60,x,y,idx,angle));
  }
}

function createPetal(size,x,y,idx,angle){
  const p=document.createElement("div"); p.className="petal";
  p.style.width=size+"px"; p.style.height=size*0.9+"px";
  p.style.left=x+"px"; p.style.top=y+"px";
  p.style.transform=`translate(-50%,-50%) rotate(${angle*180/Math.PI}deg)`;
  const img=document.createElement("img"); img.src=photos[idx].src; p.appendChild(img);
  addClickHandler(p); return p;
}

function addClickHandler(p){
  const close=document.createElement("button"); close.className="close-btn"; close.textContent="×";
  close.onclick=e=>{e.stopPropagation(); flower.classList.remove("dim"); document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active"));}
  p.appendChild(close);
  p.onclick=e=>{e.stopPropagation(); flower.classList.add("dim"); document.querySelectorAll(".petal").forEach(p=>p.classList.remove("active")); p.classList.add("active");}
}

// Heart confetti
function createHeartConfetti(){
  const hearts=["❤️","💖","💘","💝"];
  function spawn(){
    const c=document.createElement("div"); c.className="confetti-piece";
    c.style.left=Math.random()*100+"%";
    c.style.fontSize=(10+Math.random()*12)+"px";
    c.style.animationDuration=(2.5+Math.random()*1.5)+"s";
    c.textContent=hearts[Math.floor(Math.random()*hearts.length)];
    confetti.appendChild(c); setTimeout(()=>c.remove(),4000);
  }
  setInterval(spawn,200);
}

// Restart
restart.onclick=()=>{
  actor.classList.remove("walk"); bouquet.classList.remove("show"); text.classList.remove("show"); stage.classList.remove("glow");
  restart.classList.remove("show"); flower.innerHTML=""; confetti.innerHTML=""; countdown.style.display="grid";
  startCountdown();
}

setTimeout(()=>{loading.style.display="none"; startCountdown();},1500);
