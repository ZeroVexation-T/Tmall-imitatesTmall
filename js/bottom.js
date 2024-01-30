// 放大镜
document.addEventListener('DOMContentLoaded', function () {
  const showGoods = document.getElementById('showGoods');
  const magnifiedImage = document.createElement('img');
  magnifiedImage.classList.add('magnifiedImage');
  document.body.appendChild(magnifiedImage);

  showGoods.addEventListener('mouseover', function (e) {
      if (e.target.tagName === 'IMG') {
          magnifiedImage.src = e.target.src;
          magnifiedImage.style.display = 'block';
          magnifiedImage.style.width = '400px'; // 放大尺寸
          magnifiedImage.style.height = 'auto';
          magnifiedImage.style.top = (e.pageY - magnifiedImage.offsetHeight - 10) + 'px';
          magnifiedImage.style.left = (e.pageX - magnifiedImage.offsetWidth / 2) + 'px';
      }
  });

  showGoods.addEventListener('mouseout', function (e) {
      if (e.target.tagName === 'IMG') {
          magnifiedImage.style.display = 'none';
      }
  });

  showGoods.addEventListener('mousemove', function (e) {
      magnifiedImage.style.top = (e.pageY - magnifiedImage.offsetHeight - 10) + 'px';
      magnifiedImage.style.left = (e.pageX - magnifiedImage.offsetWidth / 2) + 'px';
  });
});