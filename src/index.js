import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from 'components/App/App.js'
import Entrance from 'components/Entrance/Entrance.js'
import Lectures from 'components/Lectures/Lectures.js'
import Lecture from 'components/Lecture/Lecture.js'
require('electron-cookies');
// import MyComponent from 'components/MyComponent/MyComponent.js'

import Api from 'modules/Api.js'
import Session from 'modules/Session.js'

function checkSession(nextState, replace, callback) {
  console.log("sessoin");
  Api.db.post('auth/user')
  .then((user) => {
    console.log("trying to session", user);
    if(!user) { // if login fails
      replace({
        pathname: '/entrance',
        state: { nextPathname: nextState.location.pathname }
      });
      callback();
    } else { // if login succeeds
      var route = 'professor';
      switch(user.type) {
        case "STUDENT":
          route = 'student';
        break;
        case "PROFESSOR":
          route = 'professor';
        break;
      }

      Api.db.findOne(route, user.id)
      .then((user) => {
        console.log("full user?", user);
        Session.user = user;
        callback();
        // console.log('Admin Login? ', Session.isAdmin());
      });
    }
  });
}

function checkAdmin(nextState, replace, callback) {
  if (Session.isAdmin()) {
    callback();
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App} onEnter={checkSession}>
      <IndexRoute component={Entrance} />
      <Route path="/entrance" component={Entrance}/>
      <Route path="/lectures" component={Lectures}/>
      <Route path="/lecture" component={Lecture}/>
    </Route>
  </Router>
), document.getElementById("app"));
