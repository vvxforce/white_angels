import React, { useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import ReactInputVerificationCode from "react-input-verification-code";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import html2canvas from "html2canvas";

import "../css/Form.css";
import { path1, path2 } from "../constants/path";

const Container = styled.div`
  position: relative;
  text-align: center;
`;

const Form = () => {
  let history = useHistory();

  const containerRef = useRef();
  const filterRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    html2canvas(document.body, { allowTaint: true }).then(function(canvas) {
      const cb = () => {
        const coords = path1.length > 0 ? path1.shift() : path2.shift();
        const path1notEmpty = path1.length > 0;

        context.beginPath();
        context.globalCompositeOperation = 'destination-out';
        if (coords) {
          context.arc(
            window.innerWidth / (path1notEmpty ? 2 : 1) + coords[0],
            coords[1] + window.innerWidth * 0.03,
            40,
            0,
            Math.PI * 2,
            false
          );
          context.fill();
          if (path1notEmpty || path2.length > 0) {
            requestAnimationFrame(cb);
          } else {
            containerRef.current.className += ' front';
          }
        }
      };

      if (canvasRef.current) {
        return;
      }
      canvas.className = 'canvas';
      document.body.appendChild(canvas);
      canvasRef.current = canvas;
      
      const context = canvasRef.current.getContext('2d');

      filterRef.current.className += ' hidden';
      
      setTimeout(() => {
        requestAnimationFrame(cb);
      }, 500);
    });
  });

  return (
    <>
      <Container ref={containerRef}>
        <Navbar center={true} />
        <h1 className="h1">White Angels</h1>
        <label className="label">Do you have a signal?</label>
        <div className="code">
          <ReactInputVerificationCode
            onCompleted={(value) => {
              if (value === '9911') {
                canvasRef.current.remove();
                return history.push("/home");
              }
            }}
            placeholder=""
          />
        </div>
        <Formik initialValues={{ email: '' }}>
          <FormikForm>
            <label htmlFor="email" className="label">Enter your email to receive a signal</label>
            <Field type="email" name="email" id="email" className="input email" />
            <div>
              <button type="submit" className="btn btn-primary btn-submit">Subscribe</button>
            </div>
          </FormikForm>
        </Formik>
      </Container>
      {<div ref={filterRef} className="canvas filter"></div>}
    </>
  );
}

export default Form;
