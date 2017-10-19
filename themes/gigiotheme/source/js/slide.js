let posts = document.querySelectorAll(".post-box");

const heightPage = window.innerHeight;
let counter = 0;
const header = document.querySelector('.header').offsetHeight
posts.forEach((item) => {
  if(item.offsetTop + 250 + header < (window.pageYOffset + window.innerHeight) && item.offsetTop + 250 + header > window.pageYOffset
    || item.offsetTop + header < (window.pageYOffset + window.innerHeight) && item.offsetTop + header > window.pageYOffset) {
    item.style.opacity = 1
    item.style.transform = "translateY(0px)"
  }
})

window.addEventListener("scroll", function postLoader(e) {

  try {
    if(window.pageYOffset + 10 > posts[counter].offsetTop) {

      try {
        posts[counter].style.opacity = 1
        posts[counter].style.transform = "translateY(0px)"
        posts[counter+1].style.opacity = 1
        posts[counter+1].style.transform = "translateY(0px)"
      } catch (e) {
        window.removeEventListener("scroll", postLoader)
      }

      counter += 2;

      if (counter > posts.length) {
        window.removeEventListener("scroll", postLoader)
      }
    }

  } catch (e) {
    window.removeEventListener("scroll", postLoader)
  }

})
