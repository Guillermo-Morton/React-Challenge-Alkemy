import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

 export const Github =styled(FaGithub)`
    font-size:3rem;
 `   
 export const Linkedin =styled(FaLinkedinIn)`
    font-size:3rem;
 `   
 export const FooterLink= styled.a`
    text-decoration:none;
    color:#fff;
    cursor: pointer;
    margin: 0 1rem;
    
  &:hover {
   transition: all 0.4s ease-in-out;
   color:#999999;
 }
 `

 export const Footer= styled.div`
 background: #404040;
 height: 80px;
 display: flex;
 justify-content:center;
 align-items:center;
 padding: 0.5rem calc((100vw - 1000px) / 2);
 z-index: 10;
 transition: 0.4s;
 margin-top:2rem;
 color:#fff;
 @media screen and (max-width: 852px) {
   height: 60px;
 }
 `