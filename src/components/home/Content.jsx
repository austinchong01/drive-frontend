// src/components/home/Content.jsx
import { useState, useEffect } from "react";
import { api } from "../../services/homeAPI";
import { useError } from "../../contexts/ErrorContext";

const Content = () => {
  const { showError } = useError();

  return (
    <>
      <div style={{ display: "flex"}}>
        <h1>CONTENT</h1>
      </div>
    </>
  );
};

export default Content;