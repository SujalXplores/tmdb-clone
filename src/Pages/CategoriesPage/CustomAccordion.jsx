import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import { default as arrowRight } from '../../assets/icon-right-arrow.svg';

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
        expandIcon={
          <span
            style={{
              backgroundImage: `url(${arrowRight})`,
              minWidth: '1em',
              minHeight: '1em',
              width: '1em',
              height: '1em',
              lineHeight: 'inherit',
            }}
          />
        }
        sx={{
          borderBottom: `${border && expanded ? '1px solid #eee' : 'none'}`,
          '& Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        }}
      >
        <h2>{title}</h2>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
