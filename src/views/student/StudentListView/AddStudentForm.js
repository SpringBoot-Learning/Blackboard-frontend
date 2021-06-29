import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import * as axios from 'axios';
import PropTypes from 'prop-types';
import DialogActions from '@material-ui/core/DialogActions';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AddStudentForm = (props) => {
  const { handleClose } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const [student, setStudent] = useState({
    name: '',
    age: '',
    email: '',
    address: '',
    phoneNo: '',
    gradYear: ''
  });
  const [showMessage, setShowMessae] = useState(false);
  const [loginDetails, setloginDetails] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/v1/teacher/create/students', student)
      .then((response) => {
        setloginDetails({
          username: response.data.username,
          password: response.data.password
        });
        setShowMessae(true);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate('/app/students', { replace: true });
  };

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {!showMessage ? (
            <form onSubmit={handleSubmit} action="#">
              <Box mb={3}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  New Student
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use student email to create new account
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                onChange={handleChange}
                value={student.name}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Age"
                margin="normal"
                name="age"
                onChange={handleChange}
                value={student.age}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                name="email"
                onChange={handleChange}
                type="email"
                value={student.email}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Address"
                margin="normal"
                name="address"
                onChange={handleChange}
                type="address"
                value={student.address}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Phone"
                margin="normal"
                name="phoneNo"
                onChange={handleChange}
                type="phoneNo"
                value={student.phoneNo}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Grad Year"
                margin="normal"
                name="gradYear"
                onChange={handleChange}
                type="gradYear"
                value={student.gradYear}
                variant="outlined"
              />
              <DialogActions>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
          ) : (
            <div>
              <Alert
                action={(
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="medium"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                )}
              >
                Succesful!! Please email the student username -
                {' '}
                {loginDetails.username}
                {' '}
                and password -
                {' '}
                {loginDetails.password}
              </Alert>
            </div>
          ) }
        </Container>
      </Box>
    </Page>
  );
};

AddStudentForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default AddStudentForm;
