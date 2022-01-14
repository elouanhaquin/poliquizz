import  SideBar from './SideBar.js';
import './Home.css';

const Home = () => {

  return (

    <div className="App">

    <SideBar></SideBar>

      <header className="App-header">
        <h1> <strong className="Blue">Savez-vous</strong > pour qui  <strong className="Red">voter en 2022 ? </strong> ️</h1>
      </header>
      <div className="App-body" id="Play2">
        <div>
         <h3>Cela tombe bien, moi non plus. <br></br> Du coup j'ai créé ce site. </h3>

         <section className="home">
          <div className="flex-el">
            <h2 className="Blue" > Comment ça fonctionne ? </h2>
            <hr></hr>
            <h3> <i>Cliquez </i>simplement sur un des éléments du menu en haut à gauche.<br></br> <br></br>  </h3>
             <br></br>
            <h3>  <strong> KiceKiveu </strong> est un mini jeu où il faut trouver quel est le politique qui souhaite mettre en place cette mesure.</h3>
             <br></br>
            <h3>  <strong> PoliQuizz</strong> permet de connaître après une vingtaine de questions quel est votre meileur "match" politiquement. </h3>
          </div>
          <div className="flex-el">
            <h2> Quelles sont les limitations ? </h2>
              <hr></hr>
            <h3> Ayant pris uniquement les programmes politiques dévoilés, certains politiques ne sont pas présents (cc Emmanuel Macron).<br></br> <br></br>  </h3>
            <h3>  <strong> Jean-Luc Mélenchon </strong> est plus présent au niveau des propositions, car il a simplmement plus de propositions.</h3>
            <h3>  Mais si vous n'êtes pas d'accord avec ces idées, vous n'aurez en aucun cas plus de chance de tomber sur Mélenchon.</h3>
          </div>
          <div className="flex-el">
            <h2 className="Red"> En quoi dois-je vous faire confiance ?  </h2>
              <hr></hr>
            <h3> Avez-vous vu des pubs ? Avez-vous eu une pop-up de cookies ? <br></br> <br></br>  </h3>
            <h3>  <strong> Non, et non</strong> car le site ne me coûte presque rien.</h3>
            <h3> Et je ne collecte pas vos données.</h3>
            <h3>Je ne suis également affilié à aucun parti politique.</h3>
            <h3>Mais ne prennez pas votre résultat de test comme final, renseignez-vous de votre côté.</h3>

          </div>

          </section>
        </div>


      </div>
  <br></br> <br></br> <br></br>
    <br></br> <br></br> <br></br>

      <footer className="BottomText">
        <p> <a href="https://www.twitter.com/ElouanAQ1" target="_blank"> Vous pouvez me suivre ici.</a></p>
        <p> <a href="https://www.paypal.me/LearDindon" target="_blank"> Ou m'offrir un café ☕</a></p>
      </footer>
    </div>
  );
};

export default Home;
