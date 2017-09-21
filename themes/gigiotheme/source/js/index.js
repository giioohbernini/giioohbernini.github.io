let body =  document.querySelector("body");
let sidenav =  document.querySelector(".side-nav");
let overlay =  document.querySelector(".overlay");
let navButton = document.querySelector(".navButton");
let pageSetOf = pageYOffset;
let navbar = document.querySelector(".nav-bar");

function openNav() {
  sidenav.style.transform = "translateX(250px)";
  body.style.transform = "translateX(-250px)";
  overlay.style.background = "rgba(0,0,0,0.6)";
  navButton.innerHTML = "X";
  navButton.setAttribute('onclick', 'closeNav()');
}

function closeNav() {
  sidenav.style.transform = "translateX(250px)";
  body.style.transform = "translateX(0px)";
  overlay.style.background = "rgba(0,0,0,0)";
  navButton.innerHTML = "&#9776;";
  navButton.setAttribute('onclick', 'openNav()');
}

var touchstartX = 0,
  touchstartY = 0,
  touchendX   = 0,
  touchendY   = 0;

let estado = true;

document.addEventListener('scroll', function() {
  setTimeout(function() {
    if (pageSetOf < window.pageYOffset && estado == true){
      navbar.style.opacity = 0;
      estado = false;
    } else if (pageSetOf > window.pageYOffset && estado == false) {
      navbar.style.opacity = 1;
      estado = true;
    }
    pageSetOf = window.pageYOffset;
  }, 300);
})

body.addEventListener('touchstart', function(e) {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
}, false);

body.addEventListener('touchend', function(e) {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  handleGesure();
}, false);

function handleGesure() {
  if ((touchendX + 80) < touchstartX) {
    openNav();
  }
  if (touchendX > (touchstartX + 80)) {
    closeNav();
  }
}
