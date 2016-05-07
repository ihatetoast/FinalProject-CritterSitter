import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import user from './models/user';

import App from './components/App';
import Register from './components/Register';
import Login from './components/Login';


import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import Critters from './components/Pages/Critters';
import Browse from './components/Pages/Browse';
import MessageToSitter from './components/Pages/MessageToSitter';
import MyMessages from './components/Pages/MyMessages';


function requireAuth(nextState, replace) {
	  if (!user.get('id')) {
	    replace({
	      pathname: '/login'
	    });
	}
}



const router = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />

			<Route path="/home" component={Home} />
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/profile" component={Profile} onEnter={requireAuth}/>
			<Route path="/critters" component={Critters} onEnter={requireAuth}/>
			<Route path="/browse" component={Browse} onEnter={requireAuth}/>
			<Route path="/message" component={MessageToSitter} onEnter={requireAuth}/>
			<Route path="/messages" component={MyMessages} onEnter={requireAuth}/>
		</Route>
	</Router>
);


ReactDOM.render(router, document.getElementById('container'));
