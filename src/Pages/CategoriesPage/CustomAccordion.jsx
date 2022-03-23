import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Categories.module.scss';

const CustomAccordion = ({ title, children }) => {
  const [expanded, setExpanded] = useState('Sort');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === title}
      onChange={handleChange(title)}
      className={styles.accordion}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <h2>{title}</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
