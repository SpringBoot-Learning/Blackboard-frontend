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

const AddModuleForm = (props) => {
  const { course, handleClose } = props;
  const navigate = useNavigate();
  const classes = useStyles();
  const [module, setModule] = useState({
    label: '',
    description: '',
  });
  const [showMessage, setShowMessae] = useState(false);

  const handleChange = (event) => {
    setModule({ ...module, [event.target.name]: event.target.value });
  };

  const url = 'http://localhost:8080/api/v1/teacher/create/module/'.concat(course.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(url, module)
      .then((response) => {
        console.log(response);
        setShowMessae(true);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate('/app/courses', { replace: true });
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
                  New Module
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  for
                  {' '}
                  {course.label}
                </Typography>
              </Box>
              <TextField
                fullWidth
                label="Label"
                margin="normal"
                name="label"
                onChange={handleChange}
                value={module.label}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                name="description"
                onChange={handleChange}
                value={module.description}
                variant="outlined"
              />
              <DialogActions>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Add Module
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
                Succesful!!
                {'  '}
                {module.label}
                {'  '}
                is added. Please refresh
              </Alert>
            </div>
          ) }
        </Container>
      </Box>
    </Page>
  );
};

AddModuleForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

export default AddModuleForm;
