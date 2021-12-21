import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import styled from "styled-components";

const Text = styled.div`
padding: 10vh 5vw;
 display:flex;
 justify-content: left;
 font-size: 16px;
`;

const SubText = styled.div`
 margin-top: 8vw;
 display:flex;
 justify-content: center;
 font-size: 48px;
`;

const Contact = () => {
  return (
    <>
      <Navbar/>
      <Text>If You have any questions, You can call +1-800-333-22-11</Text>
    </>
  );
};

export default Contact;