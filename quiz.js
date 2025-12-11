const page1=document.getElementById("page1");
const page2=document.getElementById("page2");
const page3=document.getElementById("page3");
const page4=document.getElementById("page4");

let playerName="",gameCode="";
let questions=[],current=0,score=0,timer,timeLeft=30;


document.getElementById("btn").addEventListener("click",()=>{
  playerName=document.getElementById("player").value.trim();
  gameCode=document.getElementById("code").value.trim();
  if(playerName===""||gameCode===""){alert("Please enter name and code!");return;}
  page1.style.display="none";
  page2.style.display="block";
});

const allQuestions = {
  HTML: {
    basic: [
      {q:"HTML stands for?",opt:["Hyper Text Markup Language","High Tool Machine Language","Home Transfer Markup","Hyper Test Make Language"],ans:0},
      {q:"<br> tag used for?",opt:["Line break","Bold text","New page","Heading"],ans:0},
      {q:"HTML is used for?",opt:["Design","Structure","Logic","Database"],ans:1},
      {q:"<a> tag creates?",opt:["Link","Image","Paragraph","Table"],ans:3},
      {q:"File extension of HTML?",opt:[".html",".js",".css",".txt"],ans:2}
    ],
    advanced: [
      {q:"Which HTML5 element defines navigation links?",opt:["<nav>","<navigate>","<navigation>","<link>"],ans:0},
      {q:"Which tag is used to embed a video?",opt:["<video>","<media>","<movie>","<play>"],ans:2},
      {q:"What is semantic HTML?",opt:["Meaningful tags","Random tags","Deprecated tags","Script tags"],ans:1},
      {q:"What tag defines a footer?",opt:["<footer>","<bottom>","<end>","<foot>"],ans:0},
      {q:"Which element shows progress?",opt:["<progress>","<meter>","<bar>","<track>"],ans:3}
    ]
  },
  CSS: {
    basic: [
      {q:"CSS stands for?",opt:["Cascading Style Sheets","Colorful Sheet System","Creative Style Syntax","Control Sheet System"],ans:0},
      {q:"Symbol for id selector?",opt:["#",".","*","$"],ans:3},
      {q:"Property to change text color?",opt:["color","font-color","text","style"],ans:2},
      {q:"CSS used for?",opt:["Styling","Logic","Database","Structure"],ans:1},
      {q:"External CSS file linked with?",opt:["<link>","<style>","<script>","<head>"],ans:0}
    ],
    advanced: [
      {q:"What is flexbox used for?",opt:["Layout","Color","Font","Animation"],ans:0},
      {q:"Which property makes animation?",opt:["@keyframes","@move","@animate","@transition"],ans:1},
      {q:"Grid system made with?",opt:["display:grid","float:left","position:absolute","display:block"],ans:2},
      {q:"Z-index controls?",opt:["Stack order","Font size","Background","Width"],ans:3},
      {q:"CSS variables defined with?",opt:["--name","$name","@name","#name"],ans:0}
    ]
  },
  JS: {
    basic: [
      {q:"JS used for?",opt:["Interaction","Design","Styling","Database"],ans:0},
      {q:"Output in console using?",opt:["console.log()","print()","log()","display()"],ans:3},
      {q:"To declare variable?",opt:["var","let","const","All"],ans:3},
      {q:"Data type not primitive?",opt:["Number","String","Object","Boolean"],ans:2},
      {q:"Which runs JS?",opt:["Browser","Server","Database","Compiler"],ans:0}
    ],
    advanced: [
      {q:"What is closure?",opt:["Function with lexical scope","Global variable","Loop","Callback"],ans:0},
      {q:"Arrow function syntax uses?",opt:["=>","->","==>","~>"],ans:2},
      {q:"Promise handles?",opt:["Async tasks","Loops","Errors","DOM"],ans:1},
      {q:"Which method converts JSON to object?",opt:["JSON.parse()","JSON.stringify()","toJSON()","parse.JSON()"],ans:3},
      {q:"'this' keyword refers to?",opt:["Current object","Global","Function","None"],ans:0}
    ]
  }
};


document.getElementById("startBtn").addEventListener("click",()=>{
  const topic=document.getElementById("topic").value;
  const level=document.getElementById("level").value;
  const num=parseInt(document.getElementById("numQ").value);
  
  questions = allQuestions[topic][level].slice(0,num);
  if(questions.length===0){alert("No questions found!");return;}

  page2.style.display="none";
  page3.style.display="block";
  current=0; score=0;
  showQuestion();
  startTimer();
});


function showQuestion(){
  if(current>=questions.length){ showResult(); return; }

  const q=questions[current];
  document.getElementById("question").textContent=q.q;
  const optDiv=document.getElementById("options");
  optDiv.innerHTML="";
  q.opt.forEach((o,i)=>{
    const btn=document.createElement("button");
    btn.textContent=o;
    btn.className="option-btn";
    btn.onclick=()=>checkAnswer(btn,i);
    optDiv.appendChild(btn);
  });
  timeLeft=30;
}


function startTimer(){
  timer=setInterval(()=>{
    document.getElementById("timer").textContent="Time left: "+timeLeft+"s";
    timeLeft--;
    if(timeLeft<0){
      clearInterval(timer);
      current++;
      showQuestion();
      startTimer();
    }
  },1000);
}


function checkAnswer(btn,index){
  clearInterval(timer);
  const q=questions[current];
  const buttons=document.querySelectorAll(".option-btn");
  buttons.forEach(b=>b.disabled=true);
  if(index===q.ans){
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    buttons[q.ans].classList.add("correct");
  }
  setTimeout(()=>{
    current++;
    showQuestion();
    startTimer();
  },1500);
}


function showResult(){
  clearInterval(timer);
  page3.style.display="none";
  page4.style.display="block";
  let msg=`Player: ${playerName}<br>Score: ${score}/${questions.length}<br>`;
  if(score===questions.length){msg+="🏆 Winner!"}
  else if(score>=questions.length/2){msg+="😊 Good Try!"}
  else{msg+="😢 Better Luck Next Time!"}
  document.getElementById("result").innerHTML=msg;
}

