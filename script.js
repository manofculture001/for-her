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
