import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Inputs } from '@univ-project/ui';
import { ChangeEvent, useState } from 'react';
import { auth } from '@univ-project/client-sdk';
import { useLocalStorageState } from '../../utils/useLocalStorage';
/* eslint-disable-next-line */
export interface SignInProps {}

const initialValues = {
  email: '',
  password: '',
};

export function SignIn(props: SignInProps) {
  const [values, setValues] = useState(initialValues);
  const [Token, setToken] = useLocalStorageState('Token');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function fetchData() {
    const data = await auth.login(values.email, values.password, 'student');
    setToken(data);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <Container maxWidth="xs" sx={{ alignItems: 'right' }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
          <Box sx={{ mt: 3 }}>
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
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
