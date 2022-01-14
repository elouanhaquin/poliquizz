import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink as Link } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Home = lazy(() => import('./Poliquizz'));
const About = lazy(() => import('./Kicekiveu'));

function SideBar() {
  return (
    <ProSidebar className="customClassBar" >

      <Menu className="mobileSideBar" >

          <MenuItem component={Home} path="/about">Accueil <Link to="/" /></MenuItem>
          <MenuItem path="/test"> KicéKiveu <Link to="/KiceKiveu" /></MenuItem>
          <MenuItem href="/test2"> PoliQuizz <Link to="/PoliQuizz" /> </MenuItem>


      </Menu>
    </ProSidebar>
  );
}

export default SideBar;
