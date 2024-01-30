// 中间轮播图，定时自动切换、点击箭头切换、点击圆点切换、鼠标悬浮时停止自动轮播和鼠标离开时开始自动轮播
const doms = {
  carouselList: document.querySelector('.carousel-list'),
  arrowLeft: document.querySelector('.carousel-arrow-left'),
  arrowRight: document.querySelector('.carousel-arrow-right'),
  indicators: document.querySelectorAll('.indicator span'),
};
const count = doms.indicators.length; // 轮播图的数量
let curIndex = 0; // 当前显示的轮播图的索引
let timer; // 定时器

// 指定跳转
function moveTo(index) { 
  doms.carouselList.style.transform = `translateX(-${index}00%)`;
  doms.carouselList.style.transition = '.5s';
  // 去掉指示器的选中效果
  // var active = document.querySelector('.indicator span.active');
  // active.classList.remove('active');
  var active = document.querySelector('.indicator span.active');
  if (active) {
    active.classList.remove('active');
  }
  // 添加选中的指示器
  doms.indicators[index].classList.add('active');
  curIndex = index;
}

doms.indicators.forEach((item, i) => {
  item.onclick = function() {
    moveTo(i);
  }
});

function init() {
  const firstCloned = doms.carouselList.firstElementChild.cloneNode(true);
  const lastCloned = doms.carouselList.lastElementChild.cloneNode(true);
  lastCloned.style.marginLeft = '-100%';
  doms.carouselList.appendChild(firstCloned);
  doms.carouselList.insertBefore(lastCloned, doms.carouselList.firstElementChild);
  startAutoChange(); // 启动自动轮播
}

function moveLeft() {
  if(curIndex === 0) {
    doms.carouselList.style.transform = `translateX(-${count}00%)`;
    doms.carouselList.style.transition = 'none'; // 去掉过渡效果
    doms.carouselList.clientHeight; // 强制渲染 / 等待浏览器渲染后执行
    moveTo(count - 1);
  } else {
    moveTo(curIndex - 1);
  }
}

function moveRight() {
  if(curIndex === count - 1) {
    doms.carouselList.style.transform = `translateX(100%)`;
    doms.carouselList.style.transition = 'none';
    doms.carouselList.clientHeight;
    moveTo(0);
  } else {
    moveTo(curIndex + 1);
  }
}

// 开启自动轮播
function startAutoChange() {
  timer = setInterval(moveRight, 3000);
}

// 停止自动轮播
function stopAutoChange() {
  clearInterval(timer);
}

// 添加鼠标悬浮和移开事件监听器
doms.carouselList.addEventListener('mouseover', stopAutoChange);
doms.carouselList.addEventListener('mouseout', startAutoChange);

doms.arrowLeft.onclick = moveLeft;
doms.arrowRight.onclick = moveRight;

init(); // 初始化轮播图