import { useContext, useState } from 'react';

import { Button, Inputs } from '@univ-project/ui';
import * as api from '@univ-project/client-sdk';
import logo from '../../../assets/Logo2.svg';
import './signIn.css';
import { UserContext } from '../../context/userContext';

const SignInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setToken, setUser } = useContext(UserContext);

  function handleInputChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  async function handleLogin() {
    console.log({ email, password });
    const result = await api.auth.login(email, password, 'student');
    setToken(result.token);
    setUser(result.user);
  }

  return (
    <div className="signIn-page">
      <div className="logo-container">
        <img alt="fff" src={logo} />
      </div>
      <div className="signIn_text">Sign in</div>
      <div className="card_details">Use the information on your ID card</div>

      <div className="inputs_container">
        <Inputs onChange={handleInputChange} type="email" />

        <div className="passwordInput_container">
          <Inputs onChange={handlePasswordInput} type="password" />
        </div>
      </div>

      <div className="forget_password">Forgot your password?</div>

      <div className="button_container">
        <Button onClick={handleLogin}>Log in</Button>
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
