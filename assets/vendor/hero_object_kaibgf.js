/* KAIBGF 홈 3D 오브젝트 (미리보기용 초안, 미적용)
   블록 6개가 체인으로 이어진 KAIBGF 로고를 CSS 3D로 띄움. A·I 블록 위 칩 핀이 빛남.
   천천히 흔들리며 떠 있고, 마우스 위치에 따라 살짝 기울어짐. 1280px 미만 화면에서는 숨김. 외부 라이브러리 없음. */
(function () {
  var host = document.querySelector('.wrap_main .section_1');
  if (!host || document.getElementById('kaibgf-obj')) return;
  function cub(cls, x, y, z, w, h, d, front) {
    var f = function (n, tf, W, H, inner) { return '<i class="f-' + n + (inner ? ' ltr' : '') + '" style="width:' + W + 'px;height:' + H + 'px;transform:' + tf + '">' + (inner || '') + '</i>'; };
    return '<div class="cub ' + cls + '" style="transform:translate3d(' + x + 'px,' + y + 'px,' + z + 'px)">' +
      f('front', 'translateZ(' + d / 2 + 'px)', w, h, front) +
      f('back', 'rotateY(180deg) translateZ(' + d / 2 + 'px)', w, h) +
      f('right', 'translateX(' + (w - d) / 2 + 'px) rotateY(90deg) translateZ(' + w / 2 + 'px)', d, h) +
      f('left', 'translateX(' + (w - d) / 2 + 'px) rotateY(-90deg) translateZ(' + w / 2 + 'px)', d, h) +
      f('top', 'translateY(' + (h - d) / 2 + 'px) rotateX(90deg) translateZ(' + h / 2 + 'px)', w, d) +
      f('bottom', 'translateY(' + (h - d) / 2 + 'px) rotateX(-90deg) translateZ(' + h / 2 + 'px)', w, d) + '</div>';
  }
  var L = ['K', 'A', 'I', 'B', 'G', 'F'], W = 64, H = 60, D = 64, GAP = 16, x0 = -((W * 6 + GAP * 5) / 2), y0 = -H / 2, z0 = -D / 2, out = '';
  for (var i = 0; i < 6; i++) {
    var x = x0 + i * (W + GAP);
    out += cub('blk', x, y0, z0, W, H, D, L[i]);
    out += cub('stud', x + 14, y0 - 8, z0 + 14, 14, 8, 14) + cub('stud', x + 36, y0 - 8, z0 + 14, 14, 8, 14) +
           cub('stud', x + 14, y0 - 8, z0 + 36, 14, 8, 14) + cub('stud', x + 36, y0 - 8, z0 + 36, 14, 8, 14);
    if (i < 5) { out += cub('link', x + W - 2, y0 + 10, z0 + 24, GAP + 4, 12, 16) + cub('link', x + W - 2, y0 + H - 22, z0 + 24, GAP + 4, 12, 16); }
    if (i === 1 || i === 2) { for (var p = 0; p < 3; p++) { out += cub('pin', x + 12 + p * 16, y0 + H, z0 + D / 2 - 4, 8, 14, 8); } }
  }
  var el = document.createElement('div');
  el.id = 'kaibgf-obj'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<style>' + "#kaibgf-obj{position:absolute;right:6vw;top:50%;width:560px;height:520px;margin-top:-240px;z-index:5;perspective:1400px;pointer-events:none}\n#kaibgf-obj .ko-stage{position:absolute;left:50%;top:50%;transform-style:preserve-3d;transform:rotateX(-22deg) rotateY(-32deg);transition:transform .25s ease-out}\n#kaibgf-obj .ko-spin{transform-style:preserve-3d;animation:koSpin 18s linear infinite}\n#kaibgf-obj .ko-float{transform-style:preserve-3d;animation:koFloat 5s ease-in-out infinite}\n#kaibgf-obj .cub{position:absolute;transform-style:preserve-3d}\n#kaibgf-obj .cub i{position:absolute;left:0;top:0;display:block;backface-visibility:hidden;border:1px solid rgba(160,205,255,.35);box-sizing:border-box}\n#kaibgf-obj .f-front{background:linear-gradient(160deg,#3d7bff,#1a54e0)}\n#kaibgf-obj .f-back{background:#123a9e}\n#kaibgf-obj .f-right{background:linear-gradient(160deg,#1d55d6,#0f3aa8)}\n#kaibgf-obj .f-left{background:#174bc4}\n#kaibgf-obj .f-top{background:linear-gradient(135deg,#6aa2ff,#2f6cf0)}\n#kaibgf-obj .f-bottom{background:#0b2a7a}\n#kaibgf-obj .ltr{display:flex;align-items:center;justify-content:center;color:#fff;font:800 40px Montserrat,sans-serif;text-shadow:0 0 12px rgba(120,190,255,.6)}\n#kaibgf-obj .stud .f-top{background:radial-gradient(circle at 35% 35%,#8cb8ff,#2f6cf0 70%);border-radius:50%}\n#kaibgf-obj .pin .f-front,#kaibgf-obj .pin .f-top,#kaibgf-obj .pin .f-right,#kaibgf-obj .pin .f-left,#kaibgf-obj .pin .f-back{background:#46e0ff;box-shadow:0 0 14px #46e0ff;border-color:rgba(255,255,255,.5);animation:koPin 2.4s ease-in-out infinite}\n#kaibgf-obj .link .f-front,#kaibgf-obj .link .f-top,#kaibgf-obj .link .f-right,#kaibgf-obj .link .f-left,#kaibgf-obj .link .f-back{background:#2a63ea}\n#kaibgf-obj .ko-shadow{position:absolute;left:50%;top:50%;width:440px;height:120px;margin:180px 0 0 -220px;border-radius:50%;background:radial-gradient(closest-side,rgba(14,91,216,.45),rgba(14,91,216,0));filter:blur(6px);animation:koShadow 5s ease-in-out infinite}\n@keyframes koSpin{0%{transform:rotateY(0)}50%{transform:rotateY(-24deg)}100%{transform:rotateY(0)}}\n@keyframes koFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}\n@keyframes koShadow{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(.92)}}\n@keyframes koPin{0%,100%{opacity:.75}50%{opacity:1}}\n@media (max-width:1279px){#kaibgf-obj{display:none}}\n@media (prefers-reduced-motion:reduce){#kaibgf-obj .ko-spin,#kaibgf-obj .ko-float,#kaibgf-obj .ko-shadow{animation:none}}" + '</style><div class="ko-shadow"></div><div class="ko-stage"><div class="ko-float"><div class="ko-spin">' + out + '</div></div></div>';
  host.appendChild(el);
  var stage = el.querySelector('.ko-stage');
  window.addEventListener('mousemove', function (e) {
    var rx = -22 + (e.clientY / innerHeight - .5) * -14, ry = -32 + (e.clientX / innerWidth - .5) * 24;
    stage.style.transform = 'rotateX(' + rx.toFixed(1) + 'deg) rotateY(' + ry.toFixed(1) + 'deg)';
  }, { passive: true });
})();
