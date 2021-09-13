import React from "react";
import classes from "./App.module.css";

import CartList from "./components/cart-list/cartList";
import Form from "./components/cart-form/form";
import WeatherGame from "./components/weather/WeatherGame";
import WeatherForm from "./components/weather-form/weather-form";

const App: React.FC = () => {
  return (
    <div className={classes.Container}>
      <WeatherForm />
    </div>
  );
};

export default App;
