
function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
console.log(avatar.width, avatar.height);
// var music = document.getElementById("idAudio");
// music.play();

// var BGM = new Audio('Collide.mp3');
// BGM.play();
let currLeft, currTop;
window.addEventListener("keyup", function (e) {
  const avadimensions = avatar.getBoundingClientRect();
  console.log(avadimensions);
  if (e.key === "ArrowDown" || e.key === "Down") {
    // console.log(currTop, window.innerHeight, avadimensions.top);
    if (currTop + avatar.height >= window.innerHeight && e.key === "ArrowDown")
      return;
    moveVertical(avatar, 50);
    playMusic();
  }
  else if (e.key === "ArrowUp" || e.key === "Up") {
    if (currTop - avatar.height / 2 <= 0 && e.key === "ArrowUp") return;
    // console.log(currTop);
    // console.log(currTop + avatar.height / 2);
    moveVertical(avatar, -50);
    playMusic();
  }
  else if (e.key === "ArrowRight" || e.key === "Right") {
    console.log(avatar.width, window.innerWidth);
    if (currLeft + avatar.width >= window.innerWidth && e.key === "ArrowRight") return;
    moveHorizontal(avatar, 50);
    avatar.style.transform = "scale(1,1)";
    playMusic();
  }
  else if (e.key === "ArrowLeft" || e.key === "Left") {
    if (currLeft <= 0 && e.key === "ArrowLeft") return;
    moveHorizontal(avatar, -50);
    avatar.style.transform = "scale(-1,1)";
    playMusic();
  }


  if (isTouching(avatar, coin)) moveCoin();
});

const moveVertical = (element, amount) => {
  currTop = extractPos(element.style.top);
  console.log(currTop);
  element.style.top = `${currTop + amount}px`;
};

const moveHorizontal = (element, amount) => {
  currLeft = extractPos(element.style.left);
  element.style.left = `${currLeft + amount}px`;
};

const playMusic = () => {
  var music = document.getElementById("idAudio");
  music.play();
  music.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
  });
};

const extractPos = (pos) => {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
};

console.log(coin.width);

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  console.log(x, y);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};
moveCoin();
