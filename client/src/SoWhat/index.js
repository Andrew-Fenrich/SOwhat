import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const SoWhat = () => {
  // Utility variables-----------
  const history = useHistory();
  let userState = useSelector((state) => {
    return state.user;
  });

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
  // handler for submit block
  const handleSubmit = (ev) => {
    ev.preventDefault();

    fetch("/SOwhat", {
      method: "POST",
      body: JSON.stringify({
        userId: userState._id,
        who: whoIsThisFor,
        what: whatIsThisFor,
        where: whereIsThis,
        When: whenIsThis,
        why: whyIsThis,
        flag: false,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("message:", json);
      });

    history.push("/");
  };

  //-----------console log block for testing: delete if not required----------//
  console.log(factor);
  console.log(userState._id);
  //----------^^ this should be emply on production--------------------------//

  if (factor !== "") {
    return (
      <FormWrapper>
        {/* -----------------------------Who Block------------------------------------ */}
        <WhoBlockStyle id="whoBlock">
          <div>
            <div>
              <label for="Who">Who is this for?</label>
              <input
                type="text"
                id="whoFor"
                value={whoIsThisFor}
                onChange={handleIdeaWhoFor}
              />
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
          <div>
            <button onClick={handleUnhideWhat}>SO!what</button>
          </div>
        </WhoBlockStyle>
        {/* ------------------------------What Block-------------------------------- */}
        <WhatBlockStyle id="whatBlock" hidden={showBlockWhat}>
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
        </WhatBlockStyle>
        {/* ------------------------------Where Block-------------------------------- */}
        <WhereBlockStyle id="whereBlock" hidden={showBlockWhere}>
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
        </WhereBlockStyle>
        {/* ------------------------------When Block-------------------------------- */}
        <WhenBlockStyle id="whenBlock" hidden={showBlockWhen}>
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
        </WhenBlockStyle>
        {/* ------------------------------Why Block-------------------------------- */}
        <WhyBlockStyle id="whyBlock" hidden={showBlockWhy}>
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
        </WhyBlockStyle>
        {/*--------------------------- Submit Block------------------------------ */}
        <div id="SubmitBlock" hidden={showBlockSubmit}>
          <button
            onClick={(ev) => {
              handleSubmit(ev);
            }}
          >
            Make It So
          </button>
        </div>
      </FormWrapper>
    );
  } else {
    return <p>loading</p>;
  }
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const WhoBlockStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 15%;
  padding: 10px;
  margin: 5px;
  border-radius: 17px;
  background: #ff808b;
  color: whitesmoke;
`;
const WhatBlockStyle = styled.div`
  border: 2px solid blue;
  width: 80%;
  height: 15%;
`;
const WhereBlockStyle = styled.div`
  border: 2px solid pink;
  width: 80%;
  height: 15%;
`;
const WhenBlockStyle = styled.div`
  border: 2px solid green;
  width: 80%;
  height: 15%;
`;
const WhyBlockStyle = styled.div`
  border: 2px solid yellow;
  width: 80%;
  height: 15%;
`;

export default SoWhat;
