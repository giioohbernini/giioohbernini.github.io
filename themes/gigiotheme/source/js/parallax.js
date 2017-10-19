function parallaxHeader() {
  var scrollPos;
  var headerText = document.querySelector('.header .header-content') || document.querySelector('.header .post-header');
  scrollPos = window.scrollY;
  var size = document.querySelector('.header').offsetHeight

  if (scrollPos <= size) {
    headerText.style.transform =  "translateY(" + (-scrollPos/3) +"px" + ")";
    headerText.style.opacity = 1 - (scrollPos/size);
  }
}

window.addEventListener('scroll', parallaxHeader);
