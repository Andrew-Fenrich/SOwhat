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
  const [soWhatName, setSoWhatName] = useState("");

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
  const handleSoWhatName = (ev) => {
    setSoWhatName(ev.target.value);
  };
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
        soWhatName: soWhatName,
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
          <WhoInputBlock>
            <div>
              <label for="soWhatName">Give this SO!what a name</label>
              <input
                type="text"
                id="soWhatName"
                value={soWhatName}
                onChange={handleSoWhatName}
              />
            </div>
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
          </WhoInputBlock>
          <WhoButtonBlock>
            <button onClick={handleUnhideWhat}>SO!what</button>
          </WhoButtonBlock>
        </WhoBlockStyle>
        {/* ------------------------------What Block-------------------------------- */}

        <WhatBlockStyle hidden={showBlockWhat}>
          <WhatInputBlock>
            <p>
              <strong>SO!</strong>
            </p>
            <div>
              <label for="What">What would you like to do?</label>
              <input
                type="text"
                id="What"
                value={whatIsThisFor}
                onChange={handleIdeaWhatFor}
              />
            </div>
          </WhatInputBlock>

          <WhatButtonBlock>
            <button onClick={handleUnhideWhere}>SO!what</button>
          </WhatButtonBlock>
        </WhatBlockStyle>

        {/* ------------------------------Where Block-------------------------------- */}
        <WhereBlockStyle id="whereBlock" hidden={showBlockWhere}>
          <WhereInputBlock>
            <p>
              <strong>SO!</strong>
            </p>
            <div>
              <label for="Where">Where would you like to do this?</label>
              <input
                type="text"
                id="Where"
                value={whereIsThis}
                onChange={handleIdeaWhere}
              />
            </div>
          </WhereInputBlock>
          <WhereButtonBlock>
            <button onClick={handleUnhideWhen}>SO!what</button>
          </WhereButtonBlock>
        </WhereBlockStyle>
        {/* ------------------------------When Block-------------------------------- */}
        <WhenBlockStyle id="whenBlock" hidden={showBlockWhen}>
          <WhenInputBlock>
            <div>
              <p>
                <strong>SO!</strong>
              </p>
            </div>
            <div>
              <label for="When">When must this be acomplished?</label>
              <input
                type="text"
                id="When"
                value={whenIsThis}
                onChange={handleIdeaWhen}
              />
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
          </WhenInputBlock>
          <WhenButtonBlock>
            <button onClick={handleUnhideWhy}>SO!what</button>
          </WhenButtonBlock>
        </WhenBlockStyle>
        {/* ------------------------------Why Block-------------------------------- */}
        <WhyBlockStyle id="whyBlock" hidden={showBlockWhy}>
          <WhyInputBlock>
            <p>
              <strong>SO!</strong>
            </p>
            <div>
              <label for="Why">Why would you like to do this?</label>
              <input
                type="text"
                id="Why"
                value={whyIsThis}
                onChange={handleIdeaWhy}
              />
            </div>
          </WhyInputBlock>
          <WhyButtonBlock>
            <button onClick={handleUnhideSubmit}>SO!what</button>
          </WhyButtonBlock>
        </WhyBlockStyle>
        {/*--------------------------- Submit Block------------------------------ */}
        <div id="SubmitBlock" hidden={showBlockSubmit}>
          <SubmitButton
            onClick={(ev) => {
              handleSubmit(ev);
            }}
          >
            Make It So
          </SubmitButton>
        </div>
      </FormWrapper>
    );
  } else {
    return <p>loading</p>;
  }
};

//---------------------------------- Styling-----------------------------------//

//-----------Formstyling---------------
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

// Who Block Styling------------------
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
const WhoInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding-left: 10px;
  input {
    margin-left: 35px;
    border-radius: 17px;
    border: none;
    width: 200px;
    &:focus {
      outline: none;
    }
  }
  select {
    border-radius: 17px;
    border: none;
    margin-left: 5px;
    width: 200px;
    &:focus {
      outline: none;
    }
  }
`;
const WhoButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-right: 50px;
  button {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: #9698d6;
    font-weight: bold;
    border: 5px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;

// What Block Styling-------------
const WhatBlockStyle = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: space-between;
  width: 80%;
  height: 15%;
  padding: 10px;
  margin: 5px;
  border-radius: 17px;
  background: #9698d6;
  color: whitesmoke;
`;
const WhatInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  padding-left: 10px;
  p {
    font-size: 25px;
  }
  input {
    margin-left: 5px;
    border-radius: 17px;
    border: none;
    width: 400px;
    &:focus {
      outline: none;
    }
  }
`;
const WhatButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-right: 50px;
  button {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: #ff808b;
    font-weight: bold;
    border: 5px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;

//Where Block Styling------------
const WhereBlockStyle = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: space-between;
  width: 80%;
  height: 15%;
  padding: 10px;
  margin: 5px;
  border-radius: 17px;
  background: #ff808b;
  color: whitesmoke;
`;
const WhereInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  padding-left: 10px;
  p {
    font-size: 25px;
  }
  input {
    margin-left: 5px;
    border-radius: 17px;
    border: none;
    width: 350px;
    &:focus {
      outline: none;
    }
  }
`;
const WhereButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-right: 50px;
  button {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: #9698d6;
    font-weight: bold;
    border: 5px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;

//When Block Style -------------
const WhenBlockStyle = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: space-between;
  width: 80%;
  height: 15%;
  padding: 10px;
  margin: 5px;
  border-radius: 17px;
  background: #9698d6;
  color: whitesmoke;
`;

const WhenInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  padding-left: 10px;
  p {
    font-size: 25px;
  }
  input {
    margin-left: 5px;
    border-radius: 17px;
    border: none;
    width: 350px;
    &:focus {
      outline: none;
    }
  }
  select {
    border-radius: 17px;
    border: none;
    margin-left: 5px;
    width: 200px;
    &:focus {
      outline: none;
    }
  }
`;

const WhenButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-right: 50px;
  button {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: #ff808b;
    font-weight: bold;
    border: 5px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;

// Why Block style-------------
const WhyBlockStyle = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: space-between;
  width: 80%;
  height: 15%;
  padding: 10px;
  margin: 5px;
  border-radius: 17px;
  background: #ff808b;
  color: whitesmoke;
`;
const WhyInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-evenly;
  padding-left: 10px;
  p {
    font-size: 25px;
  }
  input {
    margin-left: 5px;
    border-radius: 17px;
    border: none;
    width: 350px;
    &:focus {
      outline: none;
    }
  }
`;
const WhyButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-right: 50px;
  button {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: #9698d6;
    font-weight: bold;
    border: 5px solid white;
    color: white;
    &:hover {
      background: white;
      color: black;
    }
    &:focus {
      outline: none;
    }
  }
`;
// Submit Button style--------
const SubmitButton = styled.button`
  margin-top: 5px;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  background: #4d4cac;
  border: 5px solid #f7e5e9;
  color: #f7e5e9;
  &:hover {
    background: whitesmoke;
    color: #ff808b;
  }
  &:focus {
    outline: none;
  }
`;

export default SoWhat;
