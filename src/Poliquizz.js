import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Poliquizz.css';
import  SideBar from './SideBar.js';
import {GetData}  from './Parser.js'
import $ from 'jquery';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';


var score = 1;
var name="";
var dict = {
  "ZEM": 0,
};
 var names = {
   "ZEM": "Zemmour",
 };

 var questions = [
   "example1 ", " example2"
 ]

 var shadowed = {
 	beforeDatasetsDraw: function(chart, options) {
     chart.ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
     chart.ctx.shadowBlur = 40;
   },
   afterDatasetsDraw: function(chart, options) {
   	chart.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
     chart.ctx.shadowBlur = 0;
   }
 };


function printChart(){

  var scoresChart = [0,0];
  var namesChart = ["",""];

  var namesArray = Object.keys(names).map(function(key) {
    return [key, dict[key]];
  });
/*  namesArray.sort(function(first, second) {
    return second[1] - first[1];
  });*/

  for(var i = 0; i < namesArray.length; i++) scoresChart[i] = namesArray[i][1] == undefined ? 0 : namesArray[i][1];
  for(var i = 0; i < namesArray.length; i++) namesChart[i] = names[namesArray[i][0]] == undefined ? "0" : names[namesArray[i][0]];

  console.log(scoresChart);
  console.log(namesChart);

  $('#myChart')[0].remove();
  $('#end-body-id').append("<canvas id='myChart' ></canvas>");

  const ctx = $('#myChart')[0];
  const context = ctx.getContext('2d');
  context.clearRect(0, 0, ctx.width, ctx.height);

  var gradientRed = ctx.getContext('2d').createLinearGradient(0, 0, 0, 150);
  gradientRed.addColorStop(0, 'rgba(255, 85, 184, 0.9)');
  gradientRed.addColorStop(1, 'rgba(255, 135, 135, 0.8)');


  let delayed;
  const myChart = new Chart(ctx, {
      type: 'radar',
     data : {
        labels: namesChart,
        datasets: [{
          label: "Taux d'affinité ",
          data: scoresChart,
          fill: {
                target: 'start'
              },
           backgroundColor: gradientRed,
           borderColor: 'transparent',
           pointBackgroundColor: "transparent",
           pointBorderColor: "transparent",
           pointHoverBackgroundColor: "transparent",
           pointHoverBorderColor: "transparent",
           pointHitRadius: 5,
           datasetFill : true,
           spanGaps: true
        }]
    },
      options: {
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
          legend: {
      	display: false,
      },
      tooltips: {
      	enabled: false,
        custom: function(tooltip) {
        		var tooltipEl = document.getElementById('tooltip');
          	if (tooltip.body) {
            	tooltipEl.style.display = 'block';
              if (tooltip.body[0].lines && tooltip.body[0].lines[0]) {
              	tooltipEl.innerHTML = tooltip.body[0].lines[0];
              }
            } else {
            	setTimeout(function() {
            		tooltipEl.style.display = 'none';
              }, 500);
            }
        },
      },
      gridLines: {
        display: false
      },
      scale: {
        ticks: {
           maxTicksLimit: 5,
           display: false,
        }
     }
    },
    plugins: [shadowed]

  });

}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dataQuestions(){

  GetData('data/bdd.csv').then(
   function(value) {showMe(value)},
   function(error) {return error}

 );
}

function dataNamesPoliQuizz(){
  GetData('data/pres.csv').then(
   function(value) {storeNames(value)},
   function(error) {return error}

 );
}
function storeNames(value){
  for(var i =0; i < 9; i++ )
    names[value.data[i][0]] = value.data[i][1];

    console.log(names);
}

 function showMe(some){
   var i = getRandomInt(some.data.length-1);
   while(questions.indexOf(some.data[i][1]) != -1) i = getRandomInt(some.data.length-1);
   document.getElementById('Question').innerHTML = some.data[i][1];
   questions.push(some.data[i][1]);
   name = some.data[i][0];
 }


function NextQuestion(){
  score++;
  if(score < 20)
    refresh();
  else
    endPanel();

    document.getElementsByClassName('Score')[0].innerHTML = "Question : " + score + "/20";

}

function clicked(a,b){
  StoreScore(a);
  NextQuestion();
}

function refresh(){
  dataQuestions();
}
function replay(){
  score = 1;
  dict = {
    "ZEM": 0,
  };

  const ctx = $('#myChart')[0];
  const context = ctx.getContext('2d');
  context.clearRect(0, 0, ctx.width, ctx.height);


  document.getElementsByClassName('Score')[0].innerHTML = "Question : " + score + "/20";
  $('#questionPanel').show();
  $('#QuestionNumber').show();
  $('#endPanel').hide();
    refresh();
}

function StoreScore(a){
  dict[name] = dict[name] != null ? dict[name]+a : a;

/* const d = new Date();
 d.setTime(d.getTime() + (1*24*60*60*1000));
 let expires = "expires="+ d.toUTCString();
 document.cookie = name + "=" + dict[name] + ";" + expires + ";path=/";*/

}

function endPanel(){
score = 1;
questions = [];
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });
  items.sort(function(first, second) {
    return second[1] - first[1];
  });
  var a = new String(items[0][0]);
  var b = new String(items[1][0]);
  var c = new String(items[2][0]);
  var d = new String(items[3][0]);

  document.getElementById('best').innerHTML = names[a];
  var color = "linear-gradient(90deg, rgba(72, 52, 212, 1.0) 0%, rgba(104, 109, 224,1.0)" + dict[a]*5 + "%, rgba(248, 248, 248, 1) " + dict[a]*5 +"%, rgba(248, 248, 248, 1) 100%)"
    $('#bestSection').attr('style', "background: " +  color + " !important");

  document.getElementById('nice').innerHTML = names[b] != undefined ? names[b] : "No one";
  var color = "linear-gradient(90deg, rgba(34, 166, 179,1.0) 0%, rgba(126, 214, 223,1.0)" + dict[b]*5 + "%, rgba(248, 248, 248, 1) " + dict[b]*5 +"%, rgba(248, 248, 248, 1) 100%)"
    $('#niceSection').attr('style', "background: " +  color + " !important");

  document.getElementById('cool').innerHTML = names[c] != undefined ? names[c] : "No one";
  var color = "linear-gradient(90deg, rgba(240, 147, 43,1.0) 0%, rgba(255, 190, 118,1.0)" + dict[c]*5 + "%, rgba(248, 248, 248, 1) " + dict[c]*5 +"%, rgba(248, 248, 248, 1) 100%)"
    $('#coolSection').attr('style', "background: " + color+ " !important");

  document.getElementById('okay').innerHTML = names[d] != undefined ? names[d] : "No one";
  var color = "linear-gradient(90deg, rgba(249, 202, 36,1.0) 0%,rgba(246, 229, 141,1.0) " + dict[d]*5 + "%, rgba(248, 248, 248, 1) " + dict[d]*5 +"%, rgba(248, 248, 248, 1) 100%)"
    $('#okaySection').attr('style', "background: " +  color + " !important");

end();
}

function end(){

  $('#questionPanel').hide();
  $('#QuestionNumber').hide();
  $('#endPanel').show();
    printChart();

}

$(document).ready(function(){
    $('#questionPanel').show();
    $('#QuestionNumber').show();

    $('#endPanel').hide();
});

dataNamesPoliQuizz();

const PoliQuizz = () => {

  return (
refresh(),
    <div className="App">

    <SideBar></SideBar>

      <header className="App-header">
        <h1 > PoliQuizz</h1>
      </header>
  <section id="questionPanel">
        <div className="Title">
          <h2 id="Question"> "Instaurer une taxe carbonne à l'entrée de l'UE" </h2>
        </div>
        <div className="Answer-body">
          <h3 className="Answer-quizz" onClick={(event) => clicked(6, event)} > Super   </h3>
          <h3 className="Answer-quizz" onClick={(event) => clicked(3, event)} > Cool  </h3>
          <h3 className="Answer-quizz" onClick={(event) => clicked(1, event)} > Bof  </h3>
          <h3 className="Answer-quizz" onClick={(event) => clicked(0, event)} > Beurk  </h3>
        </div>

    </section>
      <h4 id="QuestionNumber" className="Score" > Question : 1/20 </h4>

      <section id="endPanel">
        <div className="Title">
          <h2 id="Question"> Voilà de qui tu es le plus proche:  </h2>
        </div>
        <div className="end-body" id="end-body-id">
         <section className="endSection" id="bestSection" >  <h3 className="endAnswer" id="best"  > Pecresse   </h3></section>
         <section className="endSection" id="niceSection" >  <h3 className="endAnswer" id="nice"  > Zemmour  </h3></section>
         <section className="endSection" id="coolSection" >  <h3 className="endAnswer" id="cool"  > Macron  </h3></section>
         <section className="endSection" id="okaySection" >  <h3 className="endAnswer" id="okay" > Mélenchon  </h3></section>
        <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        <div >
          <h3 onClick={(event) => replay()} className="Replay">   Recommencer  </h3>
        </div>
      </section>
      <footer className="BottomText">
        <p> <a href="https://www.twitter.com/ElouanAQ1" target="_blank"> Vous pouvez me suivre ici.</a></p>
        <p> <a href="https://www.paypal.me/LearDindon" target="_blank"> Ou m'offrir un café ☕</a></p>
      </footer>
    </div>
  );
};

export default PoliQuizz;
