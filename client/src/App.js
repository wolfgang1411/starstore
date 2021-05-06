import React from "react";
import { BrowserRouter } from "react-router-dom";

import Homepage from './components/homepage.component';
import setAuthToken from './utils/authToken'
// redux
import { Provider } from "react-redux";
import store from "./redux/store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Homepage />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
