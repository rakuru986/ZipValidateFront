import React, { useState} from "react";
import axios from "axios";

import { CardContent, Card, Typography } from "@mui/material";

import Center from "./Center";

export const FileUpload = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [show, toggleShow] = useState(true);





  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    toggleShow();
    
  };

  const uploadFile = async (e) => {
    console.log(file);
    const formData = new FormData();
    formData.append("fromFile", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "https://localhost:7218/api/file",
        formData,
      );
      alert(res.data);

      if(res.data === "zip validated"){
        toggleShow(true);
      }
      


      
      

    } catch (ex) {
      alert("please change file");
    }
  };


  


  const saveToFolder = async (e) => {
    console.log(file);
    const formData = new FormData();
    formData.append("fromFile", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "https://localhost:7218/api/savefile",
        formData,
      );
      alert(res.data);
      

      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };


  const deleteFiles = async (e) => {
    try {
      const res = await axios.post("https://localhost:7218/api/deletefiles");
      alert(res.data);

      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <Center>
        <Card sx={{ width: 400 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ my: 3 }}>
              Validate File
            </Typography>

            <input type="file" onChange={saveFile} />
            <input type="button" value="Upload" onClick={uploadFile} />
            <input
              type="button"
              value="Delete all zips from folder"
              onClick={deleteFiles}
            />

            <li
              className="menu__icon"
            >
              <box-icon name="menu" color="floralwhite" size="md" />

             
              {show && <input
              type="button"
              visible = "true"
              value="Save file to zips folder"
              onClick={saveToFolder}
            />}
            </li>
            
          </CardContent>
        </Card>
      </Center>
    </>
  );
};
