import React, { useState, useEffect } from "react";
import styled from "styled-components";
import thinking from "../Assets/undraw_Code_thinking_re_gka2.svg";
import { useSelector } from "react-redux";

const SoWhat = () => {
  // Component Level State-------
  const [factor, setFactor] = useState("");

  // State for Who block--------
  const [whoIsThisFor, setWhoIsThisFor] = useState("");
  const [showBlockWhat, setShowBlockWhat] = useState(true);

  // State for What block---------
  const [whatIsThisFor, setWhatIsThisFor] = useState("");
  const [showBlockWhere, setShowBlockWhere] = useState(true);

  // State for Where block---------
  const [whereIsThis, setWhereIsThis] = useState("");
  const [showBlockWhen, setShowBlockWhen] = useState(true);

  // State for When block-----------
  const [whenIsThis, setWhenIsThis] = useState("");
  const [showBlockWhy, setShowBlockWhy] = useState(true);
  // State for Why block-----------
  const [whyIsThis, setWhyIsThis] = useState("");
  const [showBlockSubmit, setShowBlockSubmit] = useState(true);

  // use effect to fetch planning factors to be used in the various form inputs
  useEffect(() => {
    fetch("/factors")
      .then((res) => res.json())
      .then((json) => setFactor(json.factors[0]));
  }, []);

  // handler functions will be divided by  form block //

  // handlers and functions for Who block---------
  const handleIdeaWhoFor = (ev) => {
    setWhoIsThisFor(ev.target.value);
  };
  const handleUnhideWhat = (ev) => {
    ev.preventDefault();
    setShowBlockWhat(!showBlockWhat);
  };
  // handlers and functions for the What block--------------
  const handleIdeaWhatFor = (ev) => {
    setWhatIsThisFor(ev.target.value);
  };
  const handleUnhideWhere = (ev) => {
    ev.preventDefault();
    setShowBlockWhere(!showBlockWhere);
  };
  // handlers for the Where block --------------------------
  const handleIdeaWhere = (ev) => {
    setWhereIsThis(ev.target.value);
  };
  const handleUnhideWhen = (ev) => {
    ev.preventDefault();
    setShowBlockWhen(!showBlockWhen);
  };
  // handlers for the When block --------------------------
  const handleIdeaWhen = (ev) => {
    setWhenIsThis(ev.target.value);
  };
  const handleUnhideWhy = (ev) => {
    ev.preventDefault();
    setShowBlockWhy(!showBlockWhy);
  };
  // handlers for the Why block --------------------------
  const handleIdeaWhy = (ev) => {
    setWhyIsThis(ev.target.value);
  };
  const handleUnhideSubmit = (ev) => {
    ev.preventDefault();
    setShowBlockSubmit(!showBlockSubmit);
  };

  //-----------console log block for testing: delete if not required----------//
  console.log(factor);
  //----------^^ this should be emply on production--------------------------//

  if (factor !== "") {
    return (
      <form>
        {/* -----------------------------Who Block------------------------------------ */}
        <div id="whoBlock">
          <div>
            <label for="Who">Who is this for?</label>
            <input
              type="text"
              id="whoFor"
              value={whoIsThisFor}
              onChange={handleIdeaWhoFor}
            />
            <button onClick={handleUnhideWhat}>SO!what</button>
          </div>
          <div>
            <label for="Need Help WHO">Need Some Ideas?</label>
            <select id="whoFor" name="whoFor" onChange={handleIdeaWhoFor}>
              <option>Please Select an option</option>
              {factor.whoFor.map((input) => (
                <option value={input}>{input}</option>
              ))}
            </select>
          </div>
        </div>
        {/* ------------------------------What Block-------------------------------- */}
        <div id="whatBlock" hidden={showBlockWhat}>
          <div>
            <p>
              <strong>SO!</strong>
            </p>
            <label for="What">What would you like to do?</label>
            <input
              type="text"
              id="What"
              value={whatIsThisFor}
              onChange={handleIdeaWhatFor}
            />
            <button onClick={handleUnhideWhere}>SO!what</button>
          </div>
        </div>
        {/* ------------------------------Where Block-------------------------------- */}
        <div id="whereBlock" hidden={showBlockWhere}>
          <div>
            <p>
              <strong>SO!</strong>
            </p>
            <label for="Where">Where would you like to do this?</label>
            <input
              type="text"
              id="Where"
              value={whereIsThis}
              onChange={handleIdeaWhere}
            />
            <button onClick={handleUnhideWhen}>SO!what</button>
          </div>
        </div>
        {/* ------------------------------When Block-------------------------------- */}
        <div id="whenBlock" hidden={showBlockWhen}>
          <div>
            <p>
              <strong>SO!</strong>
            </p>
            <label for="When">When must this be acomplished?</label>
            <input
              type="text"
              id="When"
              value={whenIsThis}
              onChange={handleIdeaWhen}
            />
            <button onClick={handleUnhideWhy}>SO!what</button>
          </div>
          <div>
            <label for="Need Help WHO">Need Some Ideas?</label>
            <select id="whenFor" name="whenFor" onChange={handleIdeaWhen}>
              <option>Please Select an option</option>
              {factor.time.map((input) => (
                <option value={input}>{input}</option>
              ))}
            </select>
          </div>
        </div>
        {/* ------------------------------Why Block-------------------------------- */}
        <div id="whyBlock" hidden={showBlockWhy}>
          <div>
            <p>
              <strong>SO!</strong>
            </p>
            <label for="Why">Why would you like to do this?</label>
            <input
              type="text"
              id="Why"
              value={whyIsThis}
              onChange={handleIdeaWhy}
            />
            <button onClick={handleUnhideSubmit}>SO!what</button>
          </div>
        </div>
        {/*--------------------------- Submit Block------------------------------ */}
        <div id="SubmitBlock" hidden={showBlockSubmit}>
          <input type="submit" value="Make It So" />
        </div>
      </form>
    );
  } else {
    return <p>loading</p>;
  }
};

export default SoWhat;
