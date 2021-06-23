import React, { Fragment } from "react";
import { Footer, Github, Linkedin, FooterLink } from "./FooterElements";

const FooterComponent = () => {
    return (
        <Fragment>
        <Footer>
          <FooterLink target='_blank' href='https://github.com/Guillermo-Morton'>
            <Github></Github>
          </FooterLink>
          <FooterLink target='_blank' href='https://www.linkedin.com/in/guillermo-morton-055443214/'>
            <Linkedin></Linkedin>
          </FooterLink>
        </Footer>
      </Fragment>
    );
};

export default FooterComponent;