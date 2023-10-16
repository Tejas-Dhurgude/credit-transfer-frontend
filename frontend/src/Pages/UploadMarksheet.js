import React from "react";
import "./upload_marksheet.css";
import { Navbar } from "../components";

const UploadMarksheet = () => {
  return (
    <div>
      <Navbar/>

      <div className="container">
        <div className="wrapper">
          <header>File Uploader JavaScript</header>
          <form action="#">
            <input className="file-input" type="file" name="file" hidden />
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Browse File to Upload</p>
          </form>
          <section className="progress-area"></section>
          <section className="uploaded-area"></section>
        </div>
      </div>
      <script src="upload_marksheet.js"></script>
    </div>
  );
};

export default UploadMarksheet;
