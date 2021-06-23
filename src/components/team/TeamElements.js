import styled from "styled-components";

export const TeamsContainer= styled.div`
min-height:67vh;
`
export const TeamContainer = styled.div`
  border-radius: 50px;
  width: 85%;
  border: 1px solid #909090;
  position: relative;
  display:flex;
  flex-wrap:wrap;
  margin: 0 0 5rem 0;
  @media screen and (max-width: 767px) {
    width: 95%;
    border-top: none;
    border-radius: 30px;
  }
`;
export const HeroContainer = styled.div`
  width: 33.33%;
  height:44rem;
  padding:0;
  @media screen and (max-width: 1200px) {
    height:50rem;
  }
  @media screen and (max-width: 400px) {
    height:57rem;
  }
`;
export const HeroName = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem 0;
  margin: 0;
  border-radius: 100px;
  z-index: -1;
  @media screen and (max-width: 767px) {
    border-top: 1px solid #909090;
  }
`;
export const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 400;
  padding: 1rem 0;
  margin: 0;
  z-index: -1;
`;
export const Appearance = styled.div`
  position: relative;
  height:47%;
  @media screen and (max-width: 767px) {
    height:55%;
  }
  
`;
export const Details = styled.div`
  position: absolute;
  background: #f8f9fa;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-animation: fadeOut 0.2s;
  animation: fadeOut 0.2s;
  animation-fill-mode: forwards;

  &:hover {
    animation: fadeIn linear 0.2s;
    -webkit-animation: fadeIn linear 0.2s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.9;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.9;
    }
  }
  @-webkit-keyframes fadeOut {
    0% {
      opacity: 0.9;
    }
    100% {
      opacity: 0;
    }
  }
`;
export const HeroImage = styled.img`
  object-fit:cover;
  width:100%;
  height:100%;
  object-position:top;
 
`;
export const InnerBorder = styled.div`
position:absolute;
width:1px;
height:100%;
background:#909090;
right:33.33%;
  @media screen and (max-width: 991px) {
    width:100%;
    height:1px;
    right:0;
    top:33.33%
  }
  @media screen and (max-width: 767px) {
    display:none;
  }  
}
`;
export const InnerBorder2 = styled.div`
position:absolute;
width:1px;
height:100%;
background:#909090;
right:66.66%;
  @media screen and (max-width: 991px) {
    right:50%;
  }
  @media screen and (max-width: 767px) {
    display:none;
  }  
}
`;
export const InnerBorder3 = styled.div`
position:absolute;
width:100%;
height:1px;
background:#909090;
top:50%;
  @media screen and (max-width: 991px) {
    top:66.66%
  }
  @media screen and (max-width: 767px) {
    display:none;
  }  
}
`;
export const Btn = styled.button`
  border-radius: 10px;
  background: #f94444;
  padding: 5px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin: 0.5rem 0 1rem 0;
  align-self:center;

  &:hover {
    transition: all 0.4s ease-in-out;
    background: #d43333;
  }
  @media screen and (max-width: 340px) {
    margin:0 0 1rem 0;
    width:80%!important;
  }  
`;
export const AddHeroe = styled.div`
align-self:center;
@media screen and (max-width: 767px) {
    border-top: 1px solid #909090;
  }
`
