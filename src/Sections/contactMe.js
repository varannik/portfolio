import React from "react";
import "./contactMe.css";
import { Icon } from "semantic-ui-react";
import MyPDF from '../CV.pdf';

const contactMe = () => {
  return (
    <div className="contactMeContainer">
      <div className="hearingFromYou">
        I'd love
        <br />
        to hear from you.
        <br/>
        <a className = 'pdf' href={MyPDF} download="Mohammadreza_Mohammadi_CV.pdf">Click here to download my resume</a>
      </div>

      <a className="Skype" href="skype:varanik@live.com?chat">
        <Icon name="skype" size="big" />
        Start Chat
      </a>
      <a className="Email" href="mailto:varanik@live.com">
        
        <Icon name="mail" size="big" />
        Send Email

      </a>
      <a className="LinkedIn" href="https://www.linkedin.com/in/varanik/" target="_blank" rel="noopener noreferrer">
        <Icon name="linkedin" size="big" />
        Connect
      </a>
    </div>
  );
};
export default contactMe;
