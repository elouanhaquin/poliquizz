import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Kicekiveu.css';
import  SideBar from './SideBar.js';
import {Link} from "react-router-dom";
import {GetData}  from './Parser.js'
import $ from 'jquery';

var score = 0;


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dataQuestions(){

  GetData('data/bdd.csv').then(
   function(value) {showMe(value)},
   function(error) {return error}

 );
}
function dataNames(){
  GetData('data/pres.csv').then(
   function(value) {showMeName(value)},
   function(error) {return error}

 );
}

 function showMe(some){
   if(window.location.href.toLowerCase().includes("kicekiveu")){
     var i = getRandomInt(some.data.length-1);
     document.getElementById('Question').innerHTML = some.data[i][1];
    document.getElementsByClassName('Answer')[0].innerHTML = some.data[i][0];
   }

 }

 var name = "";

 function showMeName(some){
 if(window.location.href.toLowerCase().includes("kicekiveu")){
     let find = false;

     for(var i = 0; i < 9; i++){
       if(document.getElementsByClassName('Answer')[0].innerHTML == some.data[i][0]){
         find = true;
         name = some.data[i][1];
       }
     }
      if(!find){
    //    console.log("not find : " +name );
        refresh();
      }

      //on prend un random de placement
     var l = getRandomInt(4);
     let a = [12];

     for(var i = 0; i < 4 ; i++)
     {
       var k = getRandomInt(9);
       //si on arrive au plcement
       if(i == l)
          document.getElementsByClassName('Answer')[i].innerHTML = name;
      else{
         while(some.data[k][1] == name || a.includes(k)) k = getRandomInt(8);

         document.getElementsByClassName('Answer')[i].innerHTML = some.data[k][1];
      }
       a.push(k);


   }
   $("#PlusOne").fadeOut(0);
    /*for(var i = 0; i < 4; i++)*/
     if(document.getElementsByClassName('Answer')[0].innerHTML.length == 3 ) {

       showMeName(some);
     }
  }



 }

 const delay = millis => new Promise((resolve, reject) => {
   setTimeout(_ => resolve(), millis)
 });

 const lost = async function() {
  showGoodResponse();

  await delay(1000);


  $('#Lost2').show(300);
  $("#Score").text( "Avec un score de : " + score);
  $("#BetterThan").text(  "Vous avez fait mieux que "+ calculateTopPlayers(score) + "% des joueurs ! " );
  $('#Play2').hide();
  score = 0;
  backgroundBAckToNormal();
  refresh();

}

function refresh(){

  dataQuestions();
  dataNames();
}

function calculateTopPlayers(number){
  return (number != 0 ? 100 - (100 / (number + 0.33)) : 0).toFixed(2);
}

 async function showGoodResponse(){

  for(var i = 0; i < 4; i++)
    if(document.getElementsByClassName('Answer')[i].innerHTML == name){
      document.getElementsByClassName('Answer')[i].style.animation = "none";
      document.getElementsByClassName('Answer')[i].style.backgroundColor = "#31ad39";
      document.getElementsByClassName('Answer')[i].style.borderColor = "black";
    }
    else{
      document.getElementsByClassName('Answer')[i].style.animation = "none";
      document.getElementsByClassName('Answer')[i].style.backgroundColor = "#de3737";
      document.getElementsByClassName('Answer')[i].style.borderColor = "black";
    }


}


function backgroundBAckToNormal(){
  for(var i = 0; i < 4; i++){
          document.getElementsByClassName('Answer')[i].style.backgroundColor = "#f8f8f8";
          document.getElementsByClassName('Answer')[i].style.animation = "5s borderrandom infinite";
  }

}

function replay(){

  refresh();
  $('#Lost2').hide(-200);
  $('#Play2').show(300);
}
dataQuestions();
dataNames();


$(document).ready(function(){
    $('#Lost2').hide();
    $('#Play2').show();
});

const KiceKiveu = () => {

   const clicked = (a, b) => {

      if(document.getElementsByClassName('Answer')[a].innerHTML == name){
        score++;
        $("#PlusOne").fadeIn(200);
        $("#PlusOne").fadeOut(1000);
        refresh();
      }
      else{

        lost();
      }
      document.getElementsByClassName('Score')[0].innerHTML = "SCORE : " + score;
    }


  return (
    replay(),
    <div className="App">

    <SideBar></SideBar>

      <header className="App-header">
        <h1>Kicékiveu</h1>
      </header>
      <div className="Playing" id="Play2">
        <div className="Title">
          <h2 id="Question"> </h2>
        </div>
        <div className="Answer-body">
          <h3 onClick={(event) => clicked(0, event)} className="Answer"> Philippe Poutou </h3>
          <h3 onClick={(event) => clicked(1, event)} className="Answer"> Marine Lepen </h3>
          <h3 onClick={(event) => clicked(2, event)} className="Answer"> Yannick Jadot </h3>
          <h3 onClick={(event) => clicked(3, event)} className="Answer"> Valérie Pécresse </h3>
        </div>

        <h4 className="Score"> SCORE : {score}  </h4>
        <h4 className="One" id="PlusOne"> +1  </h4>
      </div>
      <div id="Lost2">
        <div className="Title">
          <h2 > Vous avez perdu !</h2>
          <div >
            <h3 id="Score"> Avec un score de {score} </h3>
            <h3 id="BetterThan"> Vous avez fait mieux que 95% des joueurs !  </h3>
          </div>
          <div >
            <h3 onClick={(event) => replay()} className="Replay">   Rejouer  </h3>
          </div>
        </div>
      </div>

      <footer className="BottomText">
        <p> <a href="https://www.twitter.com/ElouanAQ1" target="_blank"> Vous pouvez me suivre ici.</a></p>
        <p> <a href="https://www.paypal.me/LearDindon" target="_blank"> Ou m'offrir un café ☕</a></p>
      </footer>
    </div>
  );
};

export default KiceKiveu;
