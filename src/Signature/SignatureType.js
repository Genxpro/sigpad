import React, { useState } from "react";


const SignatureType = ({ penColor, inputTypeRef }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFont, setSelectedFont] = useState("Allura");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFontSelect = (font) => {
    setSelectedFont(font);
  };


  return (
    <div className="font-selector-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className={`input-text ${selectedFont} ${penColor}`}
          ref={inputTypeRef}
          placeholder="Signature"
        />
        <button className="clear-signature" onClick={() => setInputValue("")}> Clear Signature </button>
      </div>

      <div className="container">
        <div className="row radio-box-row">
          <div className="col ps-4 radio-box-col">
            <input
              type="radio"
              name="fontRadio"
              value="Allura"
              checked={selectedFont === "Allura"}
              onChange={() => handleFontSelect("Allura")}
              className="col-radio"
            />
            <label className={`ps-4 col-label Allura ${penColor}`}>{inputValue ? inputValue : "Signature"}</label>
          </div>
          <div className="col ps-4 radio-box-col">
            <input
              type="radio"
              name="fontRadio"
              value="Caveat"
              checked={selectedFont === "Caveat"}
              onChange={() => handleFontSelect("Caveat")}
              className="col-radio"
            />
            <label className={`ps-4 col-label Caveat ${penColor}`}>{inputValue ? inputValue : "Signature"}</label>
          </div>
        </div>
        <div className="row radio-box-row">
          <div className="col ps-4 radio-box-col">
            <input
              type="radio"
              name="fontRadio"
              value="MarckScript"
              checked={selectedFont === "MarckScript"}
              onChange={() => handleFontSelect("MarckScript")}
              className="col-radio"
            />
            <label className={`ps-4 col-label MarckScript ${penColor}`}>{inputValue ? inputValue : "Signature"}</label>
          </div>
          <div className="col ps-4 radio-box-col">
            <input
              type="radio"
              name="fontRadio"
              value="Meddon"
              checked={selectedFont === "Meddon"}
              onChange={() => handleFontSelect("Meddon")}
              className="col-radio"
            />
            <label className={`ps-4 col-label Meddon ${penColor}`}>{inputValue ? inputValue : "Signature"}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureType;