import React, {FC,  useState} from "react";

interface OwnProps {}

import classes from "./form.module.css";
import { WeatherResponseInterface } from "../../types/WeatherTypes";
import { useGetTempQuery } from "../../feature-slices/api/weather-api-slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { compare, incrementTries } from "../../feature-slices/counter/counter-slice";
import { cities } from "../../config/config";

type Props = OwnProps;
const WeatherForm: FC<Props> = (props) => {

    const [status, setStatus] = useState<'You won!'| 'You lost!'| ''>('')

    const counts = useAppSelector((state) => state.counter.counts);

  const res = useAppSelector((state) => state.counter.status);
  const [city, setCity] = useState<string>("");
  const dispatch = useAppDispatch();
  const { data: weather = {} as WeatherResponseInterface | null } =
    useGetTempQuery(city || "London");
  const [temp, setTemp] = useState<number|''>('');

  const onCityChanged = (event: any, value: string) => {
    setCity(event.target.value);
  };
  const onTempChanged = (e: any) => {
    e.preventDefault();
    setTemp(e.target.value);
  };
  const submitHandler = async () => {
    const tempFromServer = weather ? weather.main.temp : null;
    console.log(tempFromServer, temp);
    dispatch(
      compare({ temp: Number(temp), tempServer: tempFromServer as number })
    );
    dispatch(incrementTries());
    setTemp('')
  };
  return (
    <div className={classes.form}>
      <div className={classes.title}>Welcome</div>
      <div className={classes.subtitle}>Let's guess your temperature!</div>
      <div className={classes.ic1}>
        <div className={classes.box}>
          <select
            defaultValue={city}
            className={classes.input}
            placeholder="select city..."
            onChange={(e) => onCityChanged(e, city)}
          >
            {cities.map((CITY) => (
              <option key={CITY} value={CITY}>
                {CITY}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={[classes.inputContainer, classes.ic2].join(" ")}>
        <label>Your temperature</label>
        <input
          value={temp}
          id="temp"
          className={classes.input}
          type="number"
          placeholder="enter temp... "
          onChange={onTempChanged}
        />
      </div>

      <button onClick={submitHandler} className={classes.submit}>
        guess
      </button>

         <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {counts.map((c, index) => (
          <span
            className={c === "win" ? classes.win : classes.lose}
            key={index}
          >
            {c}
          </span>
        ))}
      </div>
        {res!=''&& <h4>{res}</h4>}
    </div>
  );
};

export default WeatherForm;
