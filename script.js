const uploadbox = document.querySelector('.upload-box');
const fileinput = document.querySelector("input");
const btn = document.getElementById("themebtn");
const previewimage = uploadbox.querySelector("img");
const widthinput = document.querySelector(".width input");
const heightinput = document.querySelector(".height input");
const ratioinput = document.querySelector(".ratio input");
const qualityinput = document.querySelector(".quality input");
const download = document.querySelector(".download-btn");

let ogimageratio;

btn.addEventListener('click', () => {
  document.body.classList.toggle("dark-mode");
  console.log("clicked");
});

const loadFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  previewimage.src = URL.createObjectURL(file);
  previewimage.addEventListener('load', () => {
    document.querySelector('.wrapper').classList.add('active');
    widthinput.value = previewimage.naturalWidth;
    heightinput.value = previewimage.naturalHeight;
    ogimageratio = previewimage.naturalWidth / previewimage.naturalHeight;
  });
};

widthinput.addEventListener('keyup', () => {
  const height = ratioinput.checked ? widthinput.value / ogimageratio : heightinput.value;
  heightinput.value = Math.floor(height);
});

heightinput.addEventListener('keyup', () => {
  const width = ratioinput.checked ? heightinput.value * ogimageratio : widthinput.value;
  widthinput.value = Math.floor(width);
});

const resizeDownload = ()=>{
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");
  const imgQuality = qualityinput.checked ? 0.7 : 1.0 ;

  canvas.width = widthinput.value ;
  canvas.height = heightinput.value ;
  
  ctx.drawImage(previewimage,0,0,canvas.width,canvas.height);

  a.href = canvas.toDataURL("image/jpeg",imgQuality);
  a.download = new Date().getTime();
  a.click();
}

download.addEventListener('click' , resizeDownload);
uploadbox.addEventListener('click', () => fileinput.click());
fileinput.addEventListener('change', loadFile);
