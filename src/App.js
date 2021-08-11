import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cart from './containers/Cart.jsx';
import Category from './containers/Category.jsx';
import Checkout from './containers/Checkout.jsx';
import Home from './containers/Home.jsx';
import Item from './containers/Item.jsx';
import Login from './containers/Login.jsx';
import SignUp from './containers/SignUp.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/:storename/login" component={Login} />
          <Route exact path="/:storename/signup" component={SignUp} />
          <Route exact path="/:storename" component={Home} />
          <Route exact path="/:storename/item/:id" component={Item} />
          <Route exact path="/:storename/category/:id" component={Category} />
          <Route exact path="/:storename/cart" component={Cart} />
          <Route exact path="/:storename/checkout" component={Checkout} />
          <Route
            component={() => (
              <div className="text-center p-5">
                404 Not found - And some other text here!
              </div>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
