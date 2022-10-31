function getTranslateX(el) {
  var style = window.getComputedStyle(el);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

document.addEventListener("DOMContentLoaded", function () {
  const s_track = document.querySelector(".slider-track"),
    s_slide = document.querySelectorAll(".slider-track .slide");

  let v_savePoints = [];

  let x = 0,
    goX = 0,
    checkPoint = 0,
    timer = null,
    step = 0,
    next = true,
    back = false;

  if (s_track && s_slide) {
    savePoints();

    s_track.addEventListener(
      "touchmove",
      function (e) {
        sliderTrackRemoveTransition();

        if (timer != null) {
          clearInterval(timer);
          timer = null;
          next = true;
          back = false;
        }

        if (x != e.targetTouches[0].clientX) {
          if (x == 0) step = 1;
          else step = e.targetTouches[0].clientX - x;
          x = e.targetTouches[0].clientX;
        }

        goX = getTranslateX(s_track) + step;
        if (goX > 0) goX = 0;

        if (goX >= v_savePoints[v_savePoints.length - 1]) {
          s_track.style.transform = `translateX(${goX}px)`;
        }
      },
      false
    );

    s_track.addEventListener(
      "touchend",
      function (e) {
        stepSlider(step);

        setTimeout(function () {
          sliderTrackRemoveTransition();
          startSliderAuto();
        }, 500);
      },
      false
    );

    startSliderAuto();
  }

  function savePoints() {
    v_savePoints = [];
    for (let i = 0; i < s_slide.length; i++) {
      v_savePoints.push(-1 * s_slide[i].offsetLeft);
    }
  }

  function startSliderAuto() {
    if (!timer) {
      timer = setInterval(function () {
        if (getTranslateX(s_track) == v_savePoints[v_savePoints.length - 1]) {
          next = false;
          back = true;
        } else if (getTranslateX(s_track) == v_savePoints[0]) {
          next = true;
          back = false;
        }

        if (next) stepSlider(-1);
        else if (back) stepSliderBack();
      }, 3000);
    }
  }

  function sliderTrackAddTransition() {
    if (!s_track.classList.contains("slider-track-stop-trans"))
      s_track.classList.add("slider-track-stop-trans");
  }

  function sliderTrackRemoveTransition() {
    if (s_track.classList.contains("slider-track-stop-trans"))
      s_track.classList.remove("slider-track-stop-trans");
  }

  function stepSlider(nav) {
    sliderTrackAddTransition();

    for (let i = 0; i < v_savePoints.length; i++) {
      if (nav >= 0 && i + 1 != v_savePoints.length)
        checkPoint = v_savePoints[i + 1];
      else checkPoint = v_savePoints[i];
      if (getTranslateX(s_track) > checkPoint) {
        s_track.style.transform = `translateX(${v_savePoints[i]}px)`;
        i = v_savePoints.length;
      }
    }

    x = 0;
    step = 0;
  }

  function stepSliderBack() {
    sliderTrackAddTransition();

    for (let i = 0; i < v_savePoints.length; i++) {
      if (getTranslateX(s_track) == v_savePoints[i]) {
        s_track.style.transform = `translateX(${v_savePoints[i - 1]}px)`;
        i = v_savePoints.length;
      }
    }
  }
});
