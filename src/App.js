import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar1 from './components/layout/Navbar'

import Dashboard from './components/dashboard/Dashboard'
import DashUsers from './components/dashboard/DashUsers';
import DashboardView from './components/projects/viewNoticeDatas'
import ProjectDetails from './components/projects/ProjectDetails'
import Print from './components/projects/Printtopdf'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'


import CreateMedia from './components/projects/mediaForm';
import CreateNotice from './components/projects/Hookform';
//import EditNotice from './components/projects/EditNotice';
import EditNotice from './components/projects/HookformEdit'
const App = () => {

    console.log('app',)
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar1 />
          <Switch>
            <Route exact path='/users' component={Dashboard} />
            <Route path='/dash' component={DashUsers} />
            <Route path='/view' component={DashboardView} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route path='/edit/:id' component={EditNotice} />
            <Route exact path='/' component={SignIn} />
           { <Route exact path='/print/:id' component={Print} />}
            <Route path='/signup' component={SignUp} />
            <Route path='/create/:id' component={CreateNotice} />
            <Route path='/media/:id' component={CreateMedia} />

          </Switch>
          { /*<Navbar1 />*/}
        </div>
      </BrowserRouter>
    );
  }


export default App;
