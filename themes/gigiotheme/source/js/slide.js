let posts = document.querySelectorAll(".post-box");

const heightPage = window.innerHeight;
let counter = 0;
posts.forEach((item) => {
  if(item.offsetTop + 250 < (window.pageYOffset + window.innerHeight) && item.offsetTop + 250 > window.pageYOffset
    || item.offsetTop < (window.pageYOffset + window.innerHeight) && item.offsetTop > window.pageYOffset) {
    item.style.opacity = 1
    item.style.transform = "translateY(0px)"
  }
})

window.addEventListener("scroll", function postLoader(e) {

  if(heightPage + (window.pageYOffset + 10) > posts[counter].offsetTop) {

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
})
