window.addEventListener('DOMContentLoaded', function (event) {

  document.getElementById('scroll-left').addEventListener("click", function () {
    var carousel = document.getElementById('carousel-div');
    carousel.scrollLeft = carousel.scrollLeft - 360;
  });

  document.getElementById('scroll-right').addEventListener("click", function () {
    var carousel = document.getElementById('carousel-div');
    carousel.scrollLeft = carousel.scrollLeft + 360;
  });
  
  document.getElementById('nav-btn').addEventListener("click", function () {
    var nav_list = document.getElementById('nav-list');
    var nav_bg = document.getElementById('nav-bg');
    var drop_arrow = document.getElementById('drop-arrow');
    if (nav_list.hasChildNodes()) {
      var children = nav_list.childNodes;
      for (var i = 0; i < children.length; i++) {
        children[i].addEventListener("click", function () {
          nav_bg.style.display = 'none';
          nav_list.classList.add('collapse');
          drop_arrow.classList.remove('rotate');
          setTimeout(function () {
            nav_list.classList.remove('expand');
            nav_list.classList.remove('collapse');  
          }, 250);
          return;    
        });
      }
    }
    if (nav_list.classList.contains('expand')) {
      nav_bg.style.display = 'none';
      nav_list.classList.add('collapse');
      drop_arrow.classList.remove('rotate');
      setTimeout(function () {
        nav_list.classList.remove('expand');
        nav_list.classList.remove('collapse');  
      }, 250);
      return;
    }
    drop_arrow.classList.add('rotate');
    nav_list.classList.add('expand');
    nav_bg.style.display = 'block';
    nav_bg.addEventListener("click", function () {
      nav_bg.style.display = 'none';
      nav_list.classList.add('collapse');
      drop_arrow.classList.remove('rotate');
      setTimeout(function () {
        nav_list.classList.remove('expand');
        nav_list.classList.remove('collapse');  
      }, 250);
    });
  });

  document.getElementById('ham-btn').addEventListener("click", function () {
    var ham_nav = document.getElementById('ham-nav');
    var ham_nav_bg = document.getElementById('ham-nav-bg');
    var ham_search_div = document.getElementById('ham-search-div');
    var search_bg = document.getElementById('search-bg');
    if (ham_search_div.classList.contains('expand')) {
      search_bg.style.display = 'none';
      ham_search_div.classList.add('collapse');
      setTimeout(function () {
        ham_search_div.classList.remove('expand');
        ham_search_div.classList.remove('collapse');
      }, 250);
    }
    if (ham_nav.hasChildNodes()) {
      var children = ham_nav.childNodes;
      for (var i = 0; i < children.length; i++) {
        children[i].addEventListener("click", function () {
          ham_nav_bg.style.display = 'none';
          ham_nav.classList.add('collapse');
          setTimeout(function () {
            ham_nav.classList.remove('expand');
            ham_nav.classList.remove('collapse');
          }, 250);
          return;    
        });
      }
    }
    if (ham_nav.classList.contains('expand')) {
      ham_nav_bg.style.display = 'none';
      ham_nav.classList.add('collapse');
      setTimeout(function () {
        ham_nav.classList.remove('expand');
        ham_nav.classList.remove('collapse');
      }, 250);
      return;
    }
    ham_nav.classList.add('expand');
    ham_nav_bg.style.display = 'block';
    ham_nav_bg.addEventListener("click", function () {
      ham_nav_bg.style.display = 'none';
      ham_nav.classList.add('collapse');
      setTimeout(function () {
        ham_nav.classList.remove('expand');
        ham_nav.classList.remove('collapse');
      }, 250);
    });
  });

  document.getElementById('ham-search').addEventListener('click', function () {
    var ham_search_div = document.getElementById('ham-search-div');
    var ham_nav = document.getElementById('ham-nav');
    var ham_nav_bg = document.getElementById('ham-nav-bg');
    var search_bg = document.getElementById('search-bg');
    if (ham_nav.classList.contains('expand')) {
      ham_nav_bg.style.display = 'none';
      ham_nav.classList.add('collapse');
      setTimeout(function () {
        ham_nav.classList.remove('expand');
        ham_nav.classList.remove('collapse');
      }, 250);
    }
    if (ham_search_div.classList.contains('expand')) {
      search_bg.style.display = 'none';
      ham_search_div.classList.add('collapse');
      setTimeout(function () {
        ham_search_div.classList.remove('expand');
        ham_search_div.classList.remove('collapse');
      }, 250);
      return;
    }
    ham_search_div.classList.add('expand');
    search_bg.style.display = 'block';
    search_bg.addEventListener('click', function () {
      search_bg.style.display = 'none';
      ham_search_div.classList.add('collapse');
      setTimeout(function () {
        ham_search_div.classList.remove('expand');
        ham_search_div.classList.remove('collapse');
      }, 250);
    });
  });

});