/* jshint esversion:8 */
var theme = [
  {
    bg_main: "hsl(222, 26%, 31%)",
    bg_keypad: "hsl(223, 31%, 20%)",
    bg_screen: "hsl(224, 36%, 15%)",
    bg_key_1: "hsl(225, 21%, 49%)",
    shadow_key_1: "hsl(224, 28%, 35%)",
    bg_key_2: "hsl(6, 63%, 50%)",
    shadow_key_2: "hsl(6, 70%, 34%)",
    bg_key_3: "hsl(30, 25%, 89%)",
    shadow_key_3: "hsl(28, 16%, 65%)",
    color_num: "hsl(221, 14%, 31%)",
    color_action_1: "hsl(0, 0%, 100%)",
    color_action_2: "hsl(0, 0%, 100%)",
    color_text: "hsl(0, 0%, 100%)"
  },
  {
    bg_main: "hsl(0, 0%, 90%)",
    bg_keypad: "hsl(0, 5%, 81%)",
    bg_screen: "hsl(0, 0%, 93%)",
    bg_key_1: "hsl(185, 42%, 37%)",
    shadow_key_1: "hsl(185, 58%, 25%)",
    bg_key_2: "hsl(25, 98%, 40%)",
    shadow_key_2: "hsl(25, 99%, 27%)",
    bg_key_3: "hsl(45, 7%, 89%)",
    shadow_key_3: "hsl(35, 11%, 61%)",
    color_num: "hsl(60, 10%, 19%)",
    color_action_1: "hsl(0, 0%, 100%)",
    color_action_2: "hsl(0, 0%, 100%)",
    color_text: "hsl(60, 10%, 19%)"
  },
  {
    bg_main: "hsl(268, 75%, 9%)",
    bg_keypad: "hsl(268, 71%, 12%)",
    bg_screen: "hsl(268, 71%, 12%)",
    bg_key_1: "hsl(281, 89%, 26%)",
    shadow_key_1: "hsl(285, 91%, 52%)",
    bg_key_2: "hsl(176, 100%, 44%)",
    shadow_key_2: "hsl(177, 92%, 70%)",
    bg_key_3: "hsl(268, 47%, 21%)",
    shadow_key_3: "hsl(290, 70%, 36%)",
    color_num: "hsl(52, 100%, 62%)",
    color_action_1: "hsl(0, 0%, 100%)",
    color_action_2: "hsl(198, 20%, 13%)",
    color_text: "hsl(52, 100%, 62%)"
  }
];

function setTheme(index) {
  var style = document.documentElement.style;
  style.setProperty('--bg_main', theme[index].bg_main);
  style.setProperty('--bg_keypad', theme[index].bg_keypad);
  style.setProperty('--bg_screen', theme[index].bg_screen);
  style.setProperty('--bg_key_1', theme[index].bg_key_1);
  style.setProperty('--shadow_key_1', theme[index].shadow_key_1);
  style.setProperty('--bg_key_2', theme[index].bg_key_2);
  style.setProperty('--shadow_key_2', theme[index].shadow_key_2);
  style.setProperty('--bg_key_3', theme[index].bg_key_3);
  style.setProperty('--shadow_key_3', theme[index].shadow_key_3);
  style.setProperty('--color_num', theme[index].color_num);
  style.setProperty('--color_action_1', theme[index].color_action_1);
  style.setProperty('--color_action_2', theme[index].color_action_2);
  style.setProperty('--color_text', theme[index].color_text);
}

function doOperation(op, num1, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }
}




document.addEventListener('DOMContentLoaded', function () {
  var theme1 = document.getElementById('1');
  var theme2 = document.getElementById('2');
  var theme3 = document.getElementById('3');
  var toggle_btn = document.getElementById('toggle_btn');
  
  
  function checkPreference() {
    if (!localStorage.getItem('preference')) {
      localStorage.setItem('preference', 0);
      setTheme(0);
      theme1.checked = true;
    }
    setTheme(localStorage.getItem('preference'));
    var pref = localStorage.getItem('preference');
    if (pref === '0') {
      theme1.checked = true;
      toggle_btn.style.setProperty('left', '0');
    } else if (pref === '1') {
      theme2.checked = true;
      toggle_btn.style.setProperty('left', '22px');
    } else if (pref === '2') {
      theme3.checked = true;
      toggle_btn.style.setProperty('left', '44px');
    }
  }
  
  function setPreference(index) {
    localStorage.setItem('preference', index);
  }
  
  checkPreference();
  
  var calc_disp = document.getElementById('calc_disp');
  var calc_main = document.getElementById('calc_main');
  var num = '';
  var res = '';
  var op = '';
  var dotFlag = false;
  var child = calc_main.childNodes;
  var main_data = document.getElementById('main_data');
  var sub_data = document.getElementById('sub_data');
  child.forEach((el) => {
    el.addEventListener('click', function () {
      var val = el.innerHTML;
      if (!isNaN(val)) {
        if (op === '=') {
          num = '';
          res = '';
          op = '';
          sub_data.innerHTML = '';
          main_data.innerHTML = '0';
        }
        if (num.length < 1 && val === '0') {
          return;
        }
        if (num.length < 9) {
          if (dotFlag) {
            num += val;
            main_data.innerHTML = num;
          } else {
            num += val;
            main_data.innerHTML = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
        }
      } else {
        if (val === 'RESET') {
          main_data.innerHTML = '0';
          num = '';
          res = '';
          dotFlag = false;
          sub_data.innerHTML = '';
          return;
        } else if (val === 'DEL') {
          if (num.length > 1) {
            var char = num.charAt(num.length - 1);
            if (char === '.') {
              dotFlag = false;
            }
            num = num.slice(0, num.length - 1);
            main_data.innerHTML = num;
          } else {
            num = '';
            main_data.innerHTML = 0;
          }
          return;
        } else if (val === '.') {
          if (num.length < 1 && dotFlag === false) {
            num += '0.';
            main_data.innerHTML = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dotFlag = true;
          }
          if (dotFlag === false) {
            num += val;
            main_data.innerHTML = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            dotFlag = true;
          }
          return;
        } else {
          if (num.length < 1) {
            if (val === '-') {
              num += val;
              main_data.innerHTML = num;
            }
            return;
          }
          if (res === '') {
            if (dotFlag) {
              res = parseFloat(num);
            } else {
              res = parseInt(num);
            }
          } else {
            if (dotFlag) {
              res = doOperation(op, res, parseFloat(num));
            } else {
              res = doOperation(op, res, parseInt(num));
            }
          }
          if (val === '=') {
            op = val;
            main_data.innerHTML = res;
            sub_data.innerHTML = op;
            num = '';
            res = '';
            return;
          }
          num = '';
          op = val;
          main_data.innerHTML = '0';
          sub_data.innerHTML = res + ' ' + op;
        }
      }
    });
  });


  theme1.addEventListener('click', function () {
    if (theme1.checked === true) {
      toggle_btn.style.setProperty('left', '0');
      setPreference(0);
      setTheme(0);
    }
  });

  theme2.addEventListener('click', function () {
    if (theme2.checked === true) {
      toggle_btn.style.setProperty('left', '22px');
      setPreference(1);
      setTheme(1);
    }
  });

  theme3.addEventListener('click', function () {
    if (theme3.checked === true) {
      toggle_btn.style.setProperty('left', '44px');
      setPreference(2);
      setTheme(2);
    }
  });

});