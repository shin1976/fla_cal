'use strict';
{
  const board = document.getElementById('board');
  const btn = document.getElementById('btn');
  const display = document.getElementById('display');
  const num_btns = document.getElementsByClassName('num_btn');
  const clear = document.getElementById('clear');
  const input = document.getElementById('input');
  const input_num = document.getElementById('input_num');
  const start = document.getElementById('start');
  const remain_num = document.getElementById('remain_num');
  const nums = [];
  const max = 9;
  const q_count_max = 10;
  let q_count = 0;
  let calc_result=0;
  let timeoutId;
  let startTime=0;

choose_num();

  function choose_num() {
    board.textContent= Math.floor(Math.random() * max+1,1);
    add_num(parseInt(board.textContent));
  }

function add_num(num) {
  calc_result+=num;
}

function display_show(num) {
if(display.textContent.length>7){
  return;
}
display.textContent+=num;
}

function answer_check(num) {
  if(num==calc_result){
    clearTimeout(timeoutId);
    alert('正解！');
  }else{
    clearTimeout(timeoutId);
    alert('不正解！');
    console.log(calc_result);
  }
}

function runTimer() {
  const timer = document.getElementById('timer');
  timer.textContent = ((Date.now()-startTime)/1000).toFixed(2);
  timeoutId=setTimeout(()=>{
    runTimer();
  });

}

  btn.addEventListener('touchstart', ()=>{

    if(q_count===q_count_max){
      // console.log(calc_result)
      input_num.classList.remove('hidden');
      return;
    }

    q_count++;
    if(q_count===q_count_max) {
      btn.textContent='答える';
      btn.style.backgroundColor = '#ff0000';
    }
    remain_num.textContent=q_count_max-q_count;

  event.preventDefault();
  board.textContent='';

      setTimeout(()=>{
          choose_num();
      },100);
});

  btn.addEventListener('click',()=>{

    if(q_count===q_count_max){
      return;
    }
    q_count++;
    console.log(q_count);
    board.textContent='';

        setTimeout(()=>{
            choose_num();
        },100);

  });

input_num.classList.add('hidden');
start.classList.remove('hidden');
// start.classList.add('hidden');
  for(let i = 0; i < num_btns.length; i++){
    num_btns[i].addEventListener('touchstart', () =>{
      display_show(num_btns[i].textContent);
      num_btns[i].classList.add('pushed');
      setTimeout(()=>{
       num_btns[i].classList.remove('pushed');
      },500);
      event.preventDefault();
    },false);
    num_btns[i].addEventListener('click', () =>{
      display_show(num_btns[i].textContent);
    },false);

  }

  clear.addEventListener('touchstart', ()=>{
    display.textContent='';
    event.preventDefault();
  });

  clear.addEventListener('click', ()=>{
    display.textContent='';
  });

  input.addEventListener('touchstart',()=>{
    console.log(display.textContent);
    let num=display.textContent;
    answer_check(num);
    event.preventDefault();
  });
  input.addEventListener('click',()=>{
    let num=display.textContent;
    answer_check(num);

  });
  start.addEventListener('touchstart',()=>{
    start.classList.add('hidden');
    startTime=Date.now();
     runTimer();
    event.preventDefault();
  });
  start.addEventListener('click',()=>{
    start.classList.add('hidden');
    startTime=Date.now();
     runTimer();
  });


}
