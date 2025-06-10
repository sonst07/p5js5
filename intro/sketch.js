let logoImg;
let textImg;

let fadeAlpha = 0;
let fadeDirection = 1;
let isHolding = false;
let holdTime = 1000;     // 완전히 나타난 후 유지 시간
let holdTimer = 0;
let done = false;        // 한 번 애니메이션 끝나면 true

function preload() {
  logoImg = loadImage("logo.png");
  textImg = loadImage("text2.png");
}

function setup() {
  createCanvas(750, 1296);
  imageMode(CENTER);
}

function draw() {
  background(0);

  // 배경 고정
  imageMode(CORNER);
  image(logoImg, 0, 0, width, height);

  // 페이드 인 → 유지 → 페이드 아웃 → 멈춤
  if (!done) {
    if (!isHolding) {
      fadeAlpha += fadeDirection * 3;
      fadeAlpha = constrain(fadeAlpha, 0, 255);

      if (fadeAlpha === 255) {
        isHolding = true;
        holdTimer = millis();
      }
    } else {
      if (millis() - holdTimer > holdTime) {
        fadeAlpha -= 3;
        fadeAlpha = constrain(fadeAlpha, 0, 255);
        if (fadeAlpha === 0) {
          done = true; // 애니메이션 종료
        }
      }
    }
  }

  // "스며들다" 이미지 출력 (650 위치, 크기 축소)
  if (fadeAlpha > 0) {
    imageMode(CENTER);
    const centerX = width / 2;
    const centerY = 650;

    const targetWidth = textImg.width * 0.8;
    const targetHeight = textImg.height * 0.8;

    tint(255, fadeAlpha);
    image(textImg, centerX, centerY, targetWidth, targetHeight);
    noTint();
  }
}
