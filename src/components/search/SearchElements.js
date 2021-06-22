import styled from "styled-components";

export const HeroCard = styled.div`
display:flex;
border-radius:30px;
border: 1px solid #909090;
margin: 0 0 1rem 0;
@media screen and (max-width: 767px) {
    height:70%;
  } 
  @media screen and (max-width: 360px) {
    height:unset;
  } 
`
export const HeroImg = styled.img`
width:40%;
border-bottom-left-radius: 30px;
border-top-left-radius: 30px;
object-fit:cover;
object-position:top;
`
export const HeroDetails = styled.div`
width:60%;
padding:3rem;
@media screen and (max-width: 991px) {
    padding:2.5rem;
}
@media screen and (max-width: 767px) {
    padding:2rem;
  } 
@media screen and (max-width: 360px) {
    padding:1rem;
  } 
`
export const HeroTitle = styled.h3`
font-size:1.5rem;
margin: 1rem 0 1rem 0;
@media screen and (max-width: 500px) {
    margin: 0 0 1rem 0;
    font-size:1rem;
}
`
export const HeroText = styled.p`
font-size:1.1rem;
@media screen and (max-width: 500px) {
    font-size:1rem;
}
`
export const HeroBtn = styled.button`
width:100%;
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
  align-self:center;

  &:hover {
    transition: all 0.4s ease-in-out;
    background: #d43333;
  }
  @media screen and (max-width: 991px) {

  }
  @media screen and (max-width: 767px) {
    font-size:0.8rem;
  } 
`