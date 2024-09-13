import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Components/Nav';
import Route from './Components/Rout';
import Footer from './Components/Footer';
import TitleCards from './Components/TitleCards.jsx';
import CartIcon from './Components/CartIcon';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cartItem, setCartItem] = useState([]);

  const addtocart = (movies) => {
    const exist = cartItem.find((x) => x.id === movies.id);

    if (exist) {
      alert('This movie is already added');
    } else {
      setCartItem([...cartItem, { ...movies, quantity: 1, Price: 10 }]);
      alert('Movie is added successfully');
    }
  };

  return (
    <>
      <Router>
        <Nav cartItem={cartItem} />
        <Route addtocart={addtocart} cartItem={cartItem} setCartItem={setCartItem} />
        <div className="app">
          <CartIcon cartItem={cartItem} />
          <TitleCards title="Popular Movies" addtocart={addtocart} cartItem={cartItem} />
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;