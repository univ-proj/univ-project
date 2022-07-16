import { Button, Input } from '@univ-project/ui';
import React, { useState } from 'react';
import logo from '../../../assets/Logo2.svg';
import './signIn.css';
const SignInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleInputChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="signIn-page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>
      <div className="signIn_text">Sign in</div>
      <div className="card_details">Use the information on your ID card</div>

      <div className="inputs_container">
        <Input handleChange={handleInputChange} type="email" />

        <div className="passwordInput_container">
          <Input handleChange={handlePasswordInput} type="password" />
        </div>
      </div>

      <div className="forget_password">Forgot your password?</div>

      <div className="button_container">
        <Button>Log in</Button>
      </div>

      <div className="or">OR</div>

      <div className="scan_input_conatiner">
        <Button type="secondary" icon="qr_code">
          Log in using QR
        </Button>
      </div>

      <div className="scan_QR">Scan QR code on your ID card</div>
    </div>
  );
};

export default SignInPage;
