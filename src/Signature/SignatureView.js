import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Nav } from 'react-bootstrap';
import SignatureCanvas from "react-signature-canvas";
import SignatureType from './SignatureType';
import { toPng } from "html-to-image";

const SignatureView = ({ test=false }) => {
  
  const colors = ["black", "green", "red"];
  const sigCanvas = useRef(null);
  const inputTypeRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('draw');
  const [penColor, setPenColor] = useState("black");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    if (activeTab === 'draw') {
      sigCanvas.current.clear();
    }else{
      inputTypeRef.current.clear()      
    }
    setShow(false);
  }

  const save = () => {
    if (activeTab === 'draw') {
      setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
      sigCanvas.current.clear();
    }else{
      getTypeSignature();
    }    
    setShow(false);
  }

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const drawpenColors = () => {
    return (
        <div className='custom-radio d-flex justify-content-end ml-5'>
            {colors.map((color) => (
              <input 
                className="form-check-input"
                type="radio"
                name="penColor"
                id="penColor"
                key={color}
                onClick={() => setPenColor(color)}
                style={{ backgroundColor: color }}
              />
            ))}
        </div>
    );
  };

    const getTypeSignature = () => {
    const node = inputTypeRef.current;
    node.style.backgroundColor = 'transparent';
    node.style.border = 'none';
    console.log("node", node);
    toPng(node)
      .then((dataUrl) => {
        setImageURL(dataUrl);
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  return (
    <>
      <div onClick={handleShow} className='signPreview' data-testid="signPreview">
      {imageURL ? (
        <img
        className='signatureImg'
          src={imageURL}
          alt="my signature"
        />
      ) : "Sign"}
      </div>
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Signature</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
            <Nav.Item>
              <Nav.Link eventKey="draw">Draw</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="type">Type</Nav.Link>
            </Nav.Item>
          </Nav>
          {drawpenColors()}
          <div>
            {activeTab === 'draw' && (
              <div className='d-flex justify-content-center signature-canvas'>
                {!test &&
                <SignatureCanvas
                  penColor={penColor}
                  canvasProps={{ className: "sigCanvas", width: 550, height: 200 }}
                  ref={sigCanvas}
                />
                }
              </div>
            )}

            {activeTab === 'type' && (
              <div>
                <SignatureType
                  penColor={penColor}
                  inputTypeRef={inputTypeRef}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={save}>
            Done
          </Button>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default SignatureView;