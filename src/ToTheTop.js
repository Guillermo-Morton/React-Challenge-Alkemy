import styled from "styled-components";
import {FaArrowUp} from "react-icons/fa";

export const ToTopArrow =styled(FaArrowUp)`
background:#fff;
border-radius:100px;
position:fixed;
bottom:1rem;
right:1rem;
transition: 0.4s;
cursor:pointer;
font-size:2rem;
&.hide{
    bottom:-2rem;
}
&:hover {
    transition: all 0.4s ease-in-out;
    color:#505050;
  }
`
export default ToTopArrow