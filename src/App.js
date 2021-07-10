import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Category from './containers/Category.jsx';
// import Navbar from './components/Navbar.jsx';
import Home from './containers/Home.jsx';
import Item from './containers/Item.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/:storename" component={Home} />
          <Route exact path="/:storename/item/:id" component={Item} />
          <Route exact path="/:storename/category/:id" component={Category} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
