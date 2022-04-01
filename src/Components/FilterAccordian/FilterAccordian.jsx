import { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropTypes from 'prop-types';

import styles from './FilterAccordian.module.scss';

const FilterAccordian = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === title}
      onChange={handleChange(title)}
      className={styles.accordion}
    >
      <AccordionSummary expandIcon={<ChevronRightIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

FilterAccordian.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FilterAccordian.defaultProps = {
  title: 'Filter',
  children: null,
};

export default FilterAccordian;
