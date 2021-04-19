import React, { useState, useEffect } from "react";
import styled from "styled-components";
import thinking from "../Assets/undraw_Code_thinking_re_gka2.svg";
import { useSelector } from "react-redux";

const SoWhat = () => {
  const [factor, setFactor] = useState("");
  const [whoIsThisFor, setWhoIsThisFor] = useState("");

  useEffect(() => {
    fetch("/factors")
      .then((res) => res.json())
      .then((json) => setFactor(json.factors[0]));
  }, []);
  const handleIdeaWhoFor = (ev) => {
    console.log(ev.target.value);
    setWhoIsThisFor(ev.target.value);
  };

  console.log(factor);
  console.log(whoIsThisFor);

  if (factor !== "") {
    return (
      <form>
        <label for="Who">Who is this for?</label>
        <input
          type="text"
          id="whoFor"
          value={whoIsThisFor}
          onChange={handleIdeaWhoFor}
        />
        <button>SO!what</button>
        <label for="Need Help WHO">Need Some Ideas?</label>
        <select id="whoFor" name="whoFor" onChange={handleIdeaWhoFor}>
          {factor.whoFor.map((input) => (
            <option value={input}>{input}</option>
          ))}
        </select>
      </form>
    );
  } else {
    return <p>loading</p>;
  }
};

export default SoWhat;
