import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Modal,
  Box,
  Stack,
  Item
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

export default function MyClasses({ course }) {
  const [showModal, setShowModal] = useState(false);

  const handleChange = () => {
    setShowModal(!showModal)
  }

  const editClass = () => {
  }

  const mentorProfile = () => {
  }

  return (
    <Card sx={{ maxWidth: 350, margin: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={course.classThumbnail}
          alt=""
          onClick={handleChange}
        />
          <Modal open={showModal} onClose={handleChange}>
            <Box >
              <Stack>
                {course.studentList.map((student,index) => (
                  <Typography key={`${index}-${student}`}>{`${student}`}</Typography>
                ))}
              </Stack>
            </Box>
          </Modal>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {course.className}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Mentor:</strong> {course.mentorName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Class Start Time:</strong> {`${course.startTime}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Class End Time:</strong> {`${course.endTime}`}
          </Typography>
          <a href={`${course.zoomLink}`} target="_blank" rel="noreferrer">
            Zoom Link
          </a>
          <div>
            <EditIcon />
          </div>
        </CardContent>
    </Card>
  )
}