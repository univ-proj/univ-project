import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getResource } from '@univ-project/client-sdk';
import { Section } from '@univ-project/typedefs';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
/* eslint-disable-next-line */

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Student Name',
    minWidth: 160,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'id',
    headerName: 'Student ID',
    minWidth: 160,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'address',
    headerName: 'State',
    renderCell: () => (
      <Button variant="contained" color="success">
        {' '}
        Checked{' '}
      </Button>
    ),
    headerAlign: 'center',
    align: 'center',
    minWidth: 160,
  },
];

export interface SubjectSectionProps {}

export default function SubjectSection(props: SubjectSectionProps) {
  const [students, setStudents] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    const result = async () => {
      const resultData = await getResource<Section>(
        'section',
        '5a7d8783-b3a8-49a8-a461-49922cda309a',
        { expand: 'students' }
      );

      setStudents(resultData.students);
    };

    result();
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="baseline"
        spacing={2}
      >
        <Grid item>
          <Button variant="outlined">Cancel Next Session</Button>
        </Grid>

        <Grid item>
          <Button variant="outlined">Notify Students</Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              history.push('/genrateQrCode');
            }}
          >
            Genrate QR
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              history.push('/createAssignmet');
            }}
          >
            Upload Assiginment
          </Button>
        </Grid>
      </Grid>
      <Container>
        <Box>
          <Typography
            component="h1"
            variant="h4"
            align="left"
            color="primary"
            gutterBottom
          >
            Subject{' '}
          </Typography>
          <Typography variant="h6" align="left" color="secondary" component="p">
            Assiginment description{' '}
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ mt: 5 }}>
          <DataGrid
            disableColumnFilter
            disableColumnMenu
            style={{
              textAlign: 'center',
            }}
            autoHeight
            autoPageSize
            headerHeight={60}
            rowHeight={100}
            rows={students}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
      </Container>
    </>
  );
}
