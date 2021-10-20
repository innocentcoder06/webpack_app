/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function () {
  var userData = [];
  var tempData = [];
  var uri = 'https://jsonplaceholder.typicode.com/users';
  var user_div = document.getElementById('user_div');
  var list_btn = document.getElementById('list_btn');
  var grid_btn = document.getElementById('grid_btn');
  var ham_menu = document.getElementById('ham_menu');
  var nav = document.getElementById('nav_div');
  var search_input = document.getElementById('search_box');
  var search_btn = document.getElementById('search_btn');
  async function storeData() {
    userData = await fetchData();
    tempData = userData;
    setTimeout(() => {
      initialValues();
    }, 3000);
  }
  function fetchData() {
    return new Promise(function (resolve, reject) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', uri);
      xmlHttp.responseType = 'json';
      xmlHttp.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xmlHttp.response);
        } else {
          reject({
            status: this.status,
            statusText: xmlHttp.statusText
          });
        }
      };
      xmlHttp.onerror = function () {
        reject({
          status: this.status,
          statusText: xmlHttp.statusText
        });
      };
      xmlHttp.send();
    });
  }
  storeData();

  function removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function searchBy(query) {
    return userData.filter((user) => {
      if (user.name.includes(query, 0) || user.username.includes(query, 0)) {
        return true;
      } else {
        return false;
      }
    });
  }

  search_btn.addEventListener('click', function () {
    var query = search_input.value;
    userData = tempData;
    userData = searchBy(query);
    if (grid_btn.classList.contains('active')) {
      genGrid();
    } else {
      if (window.screen.width <= 768) {
        genList();
      } else {
        genTable();
      }
    }
  });

  search_input.addEventListener('keyup', (event) => {
    var val = search_input.value;
    if (val.length < 1) {
      userData = tempData;
    } else {
      if (event.code === "Enter") {
        userData = searchBy(val);
      } else {
        return;
      }
    }
    if (grid_btn.classList.contains('active')) {
      genGrid();
    } else {
      if (window.screen.width <= 768) {
        genList();
      } else {
        genTable();
      }
    }
  });

  ham_menu.addEventListener('click', function () {
    if (nav.classList.contains('collapse-view')) {
      nav.classList.remove('collapse-view');
      nav.classList.add('expand-view');
    } else {
      nav.classList.add('collapse-view');
      nav.classList.remove('expand-view');
    }
  });


  window.addEventListener('resize', () => {
    initialValues();
  });

  list_btn.addEventListener('click', () => {
    list_btn.classList.add('active');
    grid_btn.classList.remove('active');
    if (window.screen.width <= 768) {
      genList();
    } else {
      genTable();
    } 
  });

  grid_btn.addEventListener('click', () => {
    grid_btn.classList.add('active');
    list_btn.classList.remove('active');
    genGrid();
  });

  function initialValues() {
    if (window.screen.width <= 768) {
      genList();
    } else {
      genTable();
    }
    list_btn.classList.add('active');
    grid_btn.classList.remove('active');
  }
  
  function genTable() {
    removeAllChild(user_div);
    var tableDiv = document.createElement('div');
    tableDiv.classList.add('table-view','table-responsive');
    var tableData = document.createElement('table');
    tableData.classList.add('table');
    var theadData = tableData.createTHead();
    var trData = document.createElement('tr');
    if (userData.length > 0) {
      for (var key in userData[0]) {
        var th = document.createElement('th');
        if (key === 'id') {
          th.innerHTML = '#';
        } else if (key === 'address') {
          continue;
        } else {
          th.innerHTML = key;
        }
        trData.appendChild(th);
      }
    }
    theadData.appendChild(trData);
    tableData.appendChild(theadData);
    var tbodyData = tableData.createTBody();
    userData.forEach((user) => {
      var trData = document.createElement('tr');
      for (var key in user) {
        var td = document.createElement('td');
        if (key === 'address') {
          continue;
        } else if (key === 'phone') {
          var data = user[key].split(' ');
          td.innerHTML = data[0];
        } else if (key === 'company') {
          td.innerHTML = user[key].name;
        } else if (key === 'website') {
          var web = document.createElement('a');
          web.setAttribute('href', `http://${user[key]}`);
          web.innerHTML = user[key];
          td.appendChild(web);
        } else if (key === 'email') {
          var mail = document.createElement('a');
          mail.setAttribute('href', `mailto:${user[key]}`);
          mail.innerHTML = user[key];
          td.appendChild(mail);
        } else {
          td.innerHTML = user[key];
        }
        trData.appendChild(td);
      }
      tbodyData.appendChild(trData);
    });
    tableDiv.appendChild(tableData);
    user_div.appendChild(tableDiv);
  }

  function genGrid() {
    removeAllChild(user_div);
    var gridDiv = document.createElement('div');
    gridDiv.classList.add('grid-view');
    userData.forEach((user) => {
      var card = document.createElement('div');
      card.classList.add('user-card');
      var avatar = document.createElement('img');
      avatar.src = '../assets/avatar.png';
      avatar.alt = 'avatar';
      card.appendChild(avatar);
      var content = document.createElement('div');
      content.classList.add('user-card-content');
      for (var key in user) {
        if (key === 'name') {
          var h2 = document.createElement('h2');
          h2.textContent = user[key];
          card.appendChild(h2);
        }
        if (key === 'username') {
          var uspan = document.createElement('span');
          uspan.classList.add('username');
          uspan.innerHTML = `@${user[key]}`;
          card.appendChild(uspan);
        }
        if (key === 'phone') {
          var data = user[key].split(' ');
          var pa = document.createElement('a');
          pa.href = `tel:${data[0]}`;
          var pspan = document.createElement('span');
          pspan.classList.add('material-icons-round');
          pspan.innerHTML = 'phone';
          pa.appendChild(pspan);
          content.appendChild(pa);
        }
        if (key === 'email') {
          var ma = document.createElement('a');
          ma.href = `mailto:${user[key]}`;
          var mspan = document.createElement('span');
          mspan.classList.add('material-icons-round');
          mspan.innerHTML = 'alternate_email';
          ma.appendChild(mspan);
          content.appendChild(ma);
        }
        if (key === 'website') {
          var wa = document.createElement('a');
          wa.href = `https://${user[key]}`;
          var wspan = document.createElement('span');
          wspan.classList.add('material-icons-round');
          wspan.innerHTML = 'language';
          wa.appendChild(wspan);
          content.appendChild(wa);
        }
      }
      card.appendChild(content);
      gridDiv.appendChild(card);
    });
    user_div.appendChild(gridDiv);
  }

  function genList() {
    removeAllChild(user_div);
    var listDiv = document.createElement('div');
    listDiv.classList.add('list-view');
    userData.forEach((user) => {
      var card = document.createElement('div');
      card.classList.add('list-card');
      var avatar = document.createElement('img');
      avatar.src = '../assets/avatar.png';
      avatar.alt = 'avatar';
      card.appendChild(avatar);
      var content = document.createElement('div');
      content.classList.add('list-content');
      var socialDiv = document.createElement('div');
      socialDiv.classList.add('social-list');
      for (var key in user) {
        if (key === 'name') {
          var h2 = document.createElement('h2');
          h2.textContent = user[key];
          content.appendChild(h2);
        }
        if (key === 'username') {
          var uspan = document.createElement('span');
          uspan.innerHTML = `@${user[key]}`;
          content.appendChild(uspan);
        }
        if (key === 'address') {
          var locDiv = document.createElement('div');
          locDiv.classList.add('location');
          var ico = document.createElement('span');
          ico.classList.add('material-icons-round');
          ico.innerHTML = 'place';
          var locSpan = document.createElement('span');
          locSpan.innerHTML = user[key].city;
          locDiv.appendChild(ico);
          locDiv.appendChild(locSpan);
          content.appendChild(locDiv);
        }
        if (key === 'phone') {
          var data = user[key].split(' ');
          var pa = document.createElement('a');
          pa.href = `tel:${data[0]}`;
          var pspan = document.createElement('span');
          pspan.classList.add('material-icons-round');
          pspan.innerHTML = 'phone';
          pa.appendChild(pspan);
          socialDiv.appendChild(pa);
        }
        if (key === 'email') {
          var ma = document.createElement('a');
          ma.href = `mailto:${user[key]}`;
          var mspan = document.createElement('span');
          mspan.classList.add('material-icons-round');
          mspan.innerHTML = 'alternate_email';
          ma.appendChild(mspan);
          socialDiv.appendChild(ma);
        }
        if (key === 'website') {
          var wa = document.createElement('a');
          wa.href = `https://${user[key]}`;
          var wspan = document.createElement('span');
          wspan.classList.add('material-icons-round');
          wspan.innerHTML = 'language';
          wa.appendChild(wspan);
          socialDiv.appendChild(wa);
        }
      }
      content.appendChild(socialDiv);
      card.appendChild(content);
      listDiv.appendChild(card);
    });
    user_div.appendChild(listDiv);
  }

});

function doSent(event) {
  event.preventDefault();
  alert('Your Query has been received');
}