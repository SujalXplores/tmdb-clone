import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './Categories.module.scss';
import CategoryCard from './Category-Card';

const Categories = () => {
  const params = useParams();
  const [expanded, setExpanded] = useState(false);
  const { type, category } = params;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  console.log('PARAMS:', params);
  return (
    <>
      <section className={styles.inner_content}>
        <div className={styles.media}>
          <div className={styles.column_wrapper}>
            <div className={styles.content_wrapper}>
              <div className={styles.title}>
                <h2>
                  {category} {type}
                </h2>
              </div>
              <div className={styles.content}>
                <div className={styles.filter_container}>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    className={styles.accordion}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h2>Sort</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                    className={styles.accordion}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h2>Filters</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus
                        feugiat lectus, varius pulvinar diam eros in elit.
                        Pellentesque convallis laoreet laoreet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                    className={styles.accordion}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <h2>Where to watch</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat
                        nisl. Integer sit amet egestas eros, vitae egestas
                        augue. Duis vel est augue.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
                <div>
                  <div className={styles.right_media_container}>
                    <section className={styles.panel_results}>
                      <div className={styles.media_item_results}>
                        <div className={styles.page_wrapper}>
                          <CategoryCard />
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
