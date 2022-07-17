import { Box, CssBaseline, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { listing } from '@univ-project/client-sdk';
import { Class } from '@univ-project/typedefs';
import { Button } from '@univ-project/ui';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface UserViewsProps {}

function UserViews(props: UserViewsProps) {
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    const result = async () => {
      const resultData = await listing<Class>('class', {
        page_size: '4',
      });
      setClasses(resultData.results);
    };

    result();
  }, []);

  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          All Assiginments
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Here are all assignments assigined to you
        </Typography>
      </Container>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {classes.map((_class) => {
            return (
              <Box sx={{ mt: 2 }}>
                <Button type="secondary" children={_class.name} />
              </Box>
            );
          })}
          <Box sx={{ mt: 2 }}>
            <Button children="My Uploaded assignments" />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default UserViews;
