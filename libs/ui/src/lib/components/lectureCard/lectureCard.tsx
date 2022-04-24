import * as React from 'react';
import Box from '@mui/material/Box';
import MUICard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';

export interface ILectureCardProps {
  name: string;
  topic: string;
  files_count: number;
  videos_count: number;
  lecturer: {
    title: string;
    full_name: string;
    avatar: string;
  };
}

export const LectureCard = (props: ILectureCardProps) => {
  return (
    <MUICard sx={{ minWidth: 275 }}>
      <CardContent>
        <Box
          component="div"
          sx={{
            maxWidth: 'fit-content',
            padding: '2px 8px',
            height: 20,
            backgroundColor: 'secondary.main',
            borderRadius: 1,
          }}
        >
          <Typography color="text.primary" fontWeight={700}>
            New
          </Typography>
        </Box>
        <Typography variant="h6" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {props.topic}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          <InsertDriveFileOutlinedIcon /> {props.files_count} Files
          <br />
          <SmartDisplayOutlinedIcon /> {props.videos_count} Videos
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          Uploaded by
          <br />
          <CardHeader
            avatar={
              <Avatar
                alt={props.lecturer.full_name}
                src={props.lecturer.avatar}
              />
            }
            title={`${props.lecturer.title.toUpperCase()}/ ${
              props.lecturer.full_name
            }`}
          />
          {/* <Avatar alt={props.lecturer.full_name} src={props.lecturer.avatar} />
          {props.lecturer.title.toUpperCase()}/ {props.lecturer.full_name} */}
        </Typography>
      </CardContent>
    </MUICard>
  );
};
