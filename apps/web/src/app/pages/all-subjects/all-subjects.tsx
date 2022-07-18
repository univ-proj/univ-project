import { Button } from '@univ-project/ui';
import { useEffect, useState } from 'react';
import { getResource } from '@univ-project/client-sdk';
import { Staff } from '@univ-project/typedefs';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
/* eslint-disable-next-line */
export interface AllSubjectsProps {}

export function AllSubjects(props: AllSubjectsProps) {
  const grades = ['Grade1', 'Grade2', 'Grade3', 'Grade4'];
  const [subjects, setSubjects] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    const result = async () => {
      const resultData = await getResource<Staff>(
        'staff',
        '4429eba9-154a-46d1-9921-06c45030f607',
        { expand: 'courses' }
      );

      const coursesName = resultData.courses.map((course) => course.name);
      setSubjects(coursesName);
    };

    result();
  }, []);

  function GradesRow() {
    return (
      <>
        {grades.map((grade) => {
          return (
            <Grid key={grade} item xs={3}>
              <Button type="primary" children={grade}></Button>
            </Grid>
          );
        })}
      </>
    );
  }
  function SubjectsRow() {
    return (
      <>
        {subjects.map((title) => {
          return (
            <Grid key={title} item xs={3}>
              <Button
                type="secondary"
                children={title}
                onClick={() => {
                  history.push('/subjectSection');
                }}
              ></Button>
            </Grid>
          );
        })}
      </>
    );
  }

  return (
    <>
      <Container
        disableGutters
        maxWidth="xs"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          All Subjects
        </Typography>
        <Typography variant="h5" align="center" color="secondary" component="p">
          Here are all the subjects taught by you to students
        </Typography>
      </Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid
            container
            item
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <GradesRow />
          </Grid>
          <Grid container item spacing={3}>
            <SubjectsRow />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AllSubjects;
