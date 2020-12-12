import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import Dialog from '@material-ui/core/Dialog';
import ModuleAccordion from './ModuleAccordion';
import getInitials from '../../../utils/getInitials';
import AddCourseForm from './AddCourseForm';
import AddModuleForm from './AddModuleForm';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CourseCard = ({ className, course, ...rest }) => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);

  const handleOnClick = () => {
    setShowModal(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            className={classes.avatar}
          >
            {getInitials(course.label)}
          </Avatar>
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {course.label}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {course.label}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      {course.modules.length > 0 && (
      <Box p={2} key={course.modules.id}>
        {ModuleAccordion(course)}
      </Box>
      )}
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Fab color="default" aria-label="add" className={classes.fabButton} size="small">
              <AddIcon onClick={handleOnClick} />
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={showModal} onClose={handleClose} aria-labelledby="form-dialog-title">
        <AddModuleForm handleClose={handleClose} course={course} />
      </Dialog>
    </Card>
  );
};

CourseCard.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired
};

export default CourseCard;
