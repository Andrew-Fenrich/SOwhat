import React, { useState } from "react";
import styled from "styled-components";
import upload from "./Assets/undraw_Upload_re_pasx.svg";
import deletePic from "./Assets/undraw_Login_re_4vu2.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";
import { useHistory } from "react-router";

const Settings = ({ flag, setFlag }) => {
  // utility functions---------------------
  const dispatch = useDispatch();
  const history = useHistory();

  // component level state----------------
  const [image, setImage] = useState("");
  const [buttonHide, setButtonHide] = useState(true);

  //---component variables--------------
  let user = useSelector((state) => {
    return state.user;
  });

  //--------handler functions---------------------

  //-----to set state of file user wants to upload
  const handleFileChange = (ev) => {
    setImage(ev.target.files[0]);
  };
  //----to hide condirm delete/ cancel delete button

  const handleButtons = () => {
    setButtonHide(!buttonHide);
  };

  //-----to soft delete a user from SOwhat client side-----------
  const handleDelete = (ev) => {
    ev.preventDefault();
    fetch(`/users/${ev.target.value}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((json) => {
        logOutHandler();
        history.push("/signin");
      });
  };

  //----utility to log user out upon delete and image upload
  //---I did this because the app need to re fetch the user data in order to either
  // delete or show the newly uploaded photo

  const logOutHandler = () => {
    localStorage.removeItem("Current User");
    dispatch(
      getUser({
        user: "",
        _id: "",
        name: "",
        delete: "",
        imgUrl: "",
        status: "no user",
      })
    );
  };

  //--------the client side function which allows for the upload of an image to the server

  const UploadImage = (ev) => {
    let formData = new FormData();
    formData.append("avatar", image);
    formData.append("email", user.email);
    fetch("/uploadUserAvatar", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        setFlag(!flag);
        logOutHandler();
        history.push("/signin");
      });
  };
  //------------------------------Console Log Block: delete for production-------------------//
  //------------------------------End of Console.log block-----------------------------------//
  return (
    <>
      <UploadImageDashboard>
        <h2>Upload an image</h2>
        <p>Would you like to upload a user photo?</p>
        <input type="file" onChange={handleFileChange} />
        <img src={upload} alt="person uploading" />
        <button onClick={UploadImage}>Upload</button>
      </UploadImageDashboard>
      <DeleteImageDashboard>
        <h2>We are sorry to see you go.</h2>
        <p>
          You can re-sign up at any time. To delete your account please select
          the delete button below
        </p>
        <button onClick={handleButtons}>Delete Acount</button>
        <button value={user.email} onClick={handleDelete} hidden={buttonHide}>
          Contirm?
        </button>

        <img src={deletePic} alt="user exiting a door" />
      </DeleteImageDashboard>
      <CancelButton onClick={handleButtons} hidden={buttonHide}>
        Cancel
      </CancelButton>
    </>
  );
};

export default Settings;

//-------------------------styling ------------------//
//styling for the upload area
const UploadImageDashboard = styled.div`
  position: relative;
  width: 90%;
  height: 25%;
  left: 5%;
  top: 5%;
  margin-top: 10px;

  background: #eef2fd;
  border-radius: 17px;
  h2 {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 12%;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;

    color: #ff808b;
  }
  p {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 35%;
    font-style: normal;
    font-size: 13px;
    line-height: 18px;
  }
  input {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 50%;
    ::-webkit-file-upload-button {
      background: #eef2fd;
      border-radius: 8px;
      border: 2px solid whitesmoke;
      color: white;
      background: #ff808b;
      :focus {
        outline: none;
      }
      :hover {
        background: white;
        color: #ff808b;
      }
    }
  }
  button {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 65%;
    width: 86px;
    background: #eef2fd;
    border-radius: 8px;
    border: 2px solid whitesmoke;
    color: white;
    background: #ff808b;
    :hover {
      background: white;
      color: #ff808b;
    }
  }
  img {
    position: absolute;
    left: 60%;
    top: 25%;
    width: 30%;
    height: 70%;
  }
  strong {
    margin-left: 2px;
  }
`;

// styling for the delete area
const DeleteImageDashboard = styled.div`
  position: relative;
  width: 90%;
  height: 25%;
  left: 5%;
  top: 5%;
  margin-top: 10px;

  background: #f7e5e9;
  border-radius: 17px;
  h2 {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 12%;

    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;

    color: #ff808b;
  }
  p {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 35%;
    font-style: normal;
    font-size: 13px;
    line-height: 18px;
  }
  img {
    position: absolute;
    left: 60%;
    top: 25%;
    width: 30%;
    height: 70%;
  }
  strong {
    margin-left: 2px;
  }
  button {
    position: absolute;
    max-width: 40%;
    left: 10%;
    top: 67%;
    width: 120px;
    background: #eef2fd;
    border-radius: 8px;
    border: 2px solid whitesmoke;
    color: white;
    background: #ff808b;
    padding: 5px;
    :hover {
      background: white;
      color: #ff808b;
    }
    :focus {
      outline: none;
    }
  }
`;
const CancelButton = styled.button`
  position: absolute;
  max-width: 40%;
  left: 32%;
  top: 49.3%;
  width: 120px;
  background: #eef2fd;
  border-radius: 8px;
  border: 2px solid whitesmoke;
  color: white;
  background: #ff808b;
  padding: 5px;
  :hover {
    background: white;
    color: #ff808b;
  }
  :focus {
    outline: none;
  }
`;
