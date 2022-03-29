import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Categories.module.scss';

const CustomAccordion = ({ title, children, border = false }) => {
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
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderBottom: `${border && expanded ? '1px solid #e0e0e0' : 'none'}`,
        }}
      >
        <h2>{title}</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
