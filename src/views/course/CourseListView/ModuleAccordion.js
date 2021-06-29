import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function ModuleAccordion(props) {
  const classes = useStyles();
  const { modules } = props;
  console.log(props);
  console.log(modules.sort((a, b) => ((a.id > b.id) ? 1 : -1)));

  return (
    <div className={classes.root}>
      {modules.map((module) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{module.label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {module.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  );
}

ModuleAccordion.propTypes = {
  modules: PropTypes.array.isRequired
};
