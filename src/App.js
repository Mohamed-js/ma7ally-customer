import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Category from './containers/Category.jsx';
import Home from './containers/Home.jsx';
import Item from './containers/Item.jsx';
import Login from './containers/Login.jsx';
import SignUp from './containers/SignUp.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/:storename" component={Home} />
          <Route exact path="/:storename/item/:id" component={Item} />
          <Route exact path="/:storename/category/:id" component={Category} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
