import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  BrowserRouter as Router,  Route, Routes} from "react-router-dom";

import  KiceKiveu from './Kicekiveu.js';
import  PoliQuizz from './Poliquizz.js';
import Home from './Home.js'

function App() {

  return (
  <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/Kicekiveu" element={<KiceKiveu/>}></Route>
        <Route exact path="/PoliQuizz" element={<PoliQuizz/>}></Route>
      </Routes>
  </Router>


  );
}

export default App;
