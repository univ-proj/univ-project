import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Inputs } from '@univ-project/ui';
import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '@univ-project/client-sdk';
import { useLocalStorageState } from '../../utils/useLocalStorage';
import { UserContext } from '../context/userContext';
import * as api from '@univ-project/client-sdk';
import { useHistory } from 'react-router-dom';
import styles from './sign-in.module.css';
import logo from '../../assets/Logo1.svg';
import logo2 from '../../assets/Logo2.svg';
import { Button } from '@univ-project/ui';
/* eslint-disable-next-line */
export interface SignInProps {}

const initialValues = {
  email: '',
  password: '',
};

export function SignIn(props: SignInProps) {
  const [values, setValues] = useState(initialValues);
  const { setToken, setUser, setRole } = useContext(UserContext);
  const [userType, setUsertype] = useState<'student' | 'staff'>('staff');

  async function handleLogin() {
    // console.log({ email, password });
    const result = await api.auth.login(
      values.email,
      values.password,
      userType
    );
    setToken?.(result.token);
    setUser?.(result?.user as any);
    setRole?.(result.role);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function fetchData() {
    const data = await auth.login(values.email, values.password, 'student');
    setToken?.(data.token);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  const handleUserType = () => {
    setUsertype('student');
  };

  return (
    // <Container maxWidth="xs" sx={{ alignItems: 'right' }}>
    //   <CssBaseline />
    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //     }}
    //   >
    //     <Button onClick={handleUserType}>Student ?</Button>
    //     <Typography component="h1" variant="h5">
    //       Sign in
    //     </Typography>
    //     <Box sx={{ mt: 2 }}>
    //       <Inputs
    //         name="email"
    //         onChange={handleChange}
    //         value={values.email}
    //         type="text"
    //         placeholder="Email"
    //         color="primary"
    //         required
    //         label="Email"
    //         focused
    //         disabled={false}
    //         error={false}
    //         helperText={''}
    //       />
    //       <Box sx={{ mt: 3 }}>
    //         <Inputs
    //           name="password"
    //           onChange={handleChange}
    //           value={values.password}
    //           focused
    //           color="primary"
    //           placeholder="Password"
    //           required
    //           label="Password"
    //           type="password"
    //           disabled={false}
    //           error={false}
    //           helperText={''}
    //         />
    //       </Box>

    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         onClick={handleLogin}
    //         sx={{ mt: 3, mb: 2 }}
    //       >
    //         Sign In
    //       </Button>
    //       <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    // </Container>

    <div className={styles['signIn_page']}>
      <div className={styles['logo_button_container']}>
        <img alt="FFF" className={styles['logo']} src={logo} />
        <Button size="medium" onClick={handleUserType}>
          Student ?
        </Button>
      </div>

      <div className={styles['logo_form_container']}>
        <img alt="FFF" className={styles['logo2']} src={logo2} />
        <div>
          <div className={styles['welcome_back']}>Welcome Back</div>
          <div className={styles['sub_text']}>
            Please enter your details to sign in
          </div>

          <div className={styles['inputs_container']}>
            <Inputs
              name="email"
              onChange={handleChange}
              value={values.email}
              type="text"
              placeholder="Email"
              color="primary"
              required
              label="Email"
              focused
              disabled={false}
              error={false}
              helperText={''}
            />

            <div className={styles['password_conatiner']}>
              <Inputs
                name="password"
                onChange={handleChange}
                value={values.password}
                focused
                color="primary"
                placeholder="Password"
                required
                label="Password"
                type="password"
                disabled={false}
                error={false}
                helperText={''}
              />
            </div>

            <div className={styles['forget_password']}>Forgot Password</div>

            <div className={styles['button_container']}>
              <Button onClick={handleLogin}>sign In</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
