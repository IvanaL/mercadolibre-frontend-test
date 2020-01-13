import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Listing from './containers/Listing/Listing';
import ProdDetail from './containers/ProdDetail/ProdDetail';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Route path="/" component={Header} />
            <Route path="/items" exact component={Listing} />
            <Route path="/items/:id" component={ProdDetail} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
