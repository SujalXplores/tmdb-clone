import {
  FormControl,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';

import CustomAccordion from './CustomAccordion';
import SearchButton from './SearchButton';
import { AVAILABILITIES } from '../../Utils/availabilities';
import { LANGUAGES } from '../../Utils/languages';
import {
  MINIMUM_USER_VOTES_MARKS,
  RUNTIME_MARKS,
  USER_SCORE_MARKS,
} from '../../Utils/slider-defaults';
import { Checkbox } from '../../Components/Checkbox/Checkbox';
import { CERTIFICATIONS } from '../../Utils/certifications';
import { SORT_OPTIONS } from '../../Utils/sort-options';
import { OTT_REGIONS } from '../../Utils/ott-regions';
import { STREAMING_URL } from '../../Constants';
import { CustomTooltip } from '../../Components/Tooltip/Tooltip';

import styles from './Categories.module.scss';

export default function Filters(props) {
  return (
    <div className={styles.filter_container}>
      <CustomAccordion title='Sort' border>
        <div className={styles.inner_padding}>
          <h3>Sort Results By</h3>
          <FormControl fullWidth>
            <Select
              value={props.state.options.sort_by}
              onChange={props.handleChangeSort}
              className={styles['custom-select']}
            >
              {SORT_OPTIONS.map((item) => (
                <MenuItem
                  key={item.value}
                  value={item.value}
                  className={styles['menu-item']}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </CustomAccordion>
      <CustomAccordion title='Filters' border>
        <div className={styles.inner_padding}>
          <h3>Availabilities</h3>
          <Checkbox
            value='all'
            label='Search all availabilities?'
            checked={props.state.searchAllAvailabilities}
            onChange={props.toggleAllAvailabilities}
          />
          {!props.state.searchAllAvailabilities &&
            AVAILABILITIES.map((item) => (
              <Checkbox
                key={item.id}
                value={item.value}
                checked={props.state.availabilities[item.id]}
                onChange={() => props.toggleAvailability(item.id)}
                label={item.label}
              />
            ))}
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>Genres</h3>
          <ul className={styles.multi_select}>
            {props.state.allGenreList.map((genre) => (
              <li
                key={genre.id}
                className={
                  props.state.genreFilterArr.includes(genre.id)
                    ? styles.active
                    : ''
                }
                onClick={() => props.toggleGenre(genre.id)}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>Certification</h3>
          <ul className={styles.multi_select}>
            {props.type === 'movie' &&
              CERTIFICATIONS.map((item) => (
                <li
                  key={item.order}
                  className={
                    props.state.certifications.includes(item.certification)
                      ? styles.active
                      : ''
                  }
                  onClick={() => props.toggleCertification(item.certification)}
                >
                  {item.certification}
                </li>
              ))}
          </ul>
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>Language</h3>
          <FormControl fullWidth>
            <Select
              value={props.state.options.with_original_language || 'en'}
              onChange={props.handleOnChangeLanguage}
              className={styles['custom-select']}
            >
              {LANGUAGES.map((item) => (
                <MenuItem
                  key={item.iso_639_1}
                  value={item.iso_639_1}
                  className={styles['menu-item']}
                >
                  {item.english_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>User Score</h3>
          <Slider
            step={1}
            min={0}
            max={10}
            value={[
              props.state.options.vote_average.gte,
              props.state.options.vote_average.lte,
            ]}
            onChange={props.handleChangeVoteAverage}
            marks={USER_SCORE_MARKS}
            getAriaValueText={props.valueLabelFormat}
            valueLabelFormat={props.valueLabelFormat}
            valueLabelDisplay='auto'
            color='secondary'
          />
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>Minimum User Votes</h3>
          <Slider
            step={50}
            min={0}
            max={500}
            value={props.state.options.vote_count.gte}
            onChange={props.handleChangeVoteCount}
            marks={MINIMUM_USER_VOTES_MARKS}
            valueLabelDisplay='auto'
            color='secondary'
          />
        </div>
        <hr />
        <div className={styles.inner_padding}>
          <h3>Runtime</h3>
          <Slider
            step={15}
            min={0}
            max={400}
            value={[
              props.state.options.with_runtime.gte,
              props.state.options.with_runtime.lte,
            ]}
            onChange={props.handleChangeRuntime}
            marks={RUNTIME_MARKS}
            valueLabelDisplay='auto'
            color='secondary'
          />
        </div>
      </CustomAccordion>
      <CustomAccordion title='Where To Watch' border>
        <div className={styles.inner_padding}>
          <FormControl fullWidth>
            <Select
              value={props.state.ott_country}
              onChange={props.handleOnChangeOttCountry}
              className={styles['custom-select']}
            >
              {OTT_REGIONS.map((item) => (
                <MenuItem
                  key={item.iso_3166_1}
                  value={item.iso_3166_1}
                  className={styles['menu-item']}
                >
                  <img
                    loading='lazy'
                    width='20'
                    src={`https://flagcdn.com/w20/${item.iso_3166_1.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${item.iso_3166_1.toLowerCase()}.png 2x`}
                    alt={item.native_name}
                    style={{
                      marginRight: '10px',
                    }}
                  />
                  {item.native_name + ' ' + item.iso_3166_1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {props.state.ott_providers.length > 0 ? (
            <ul className={styles.ott_ul}>
              {props.state.ott_providers.map((provider) => (
                <li
                  key={provider.provider_id}
                  className={
                    props.state.ott_providers.includes(provider.provider_id)
                      ? styles.active
                      : ''
                  }
                  onClick={() => props.toggleOttProvider(provider.provider_id)}
                >
                  <CustomTooltip title={provider.provider_name} placement='top'>
                    <img
                      src={STREAMING_URL + provider.logo_path}
                      alt={provider.provider_name}
                    />
                  </CustomTooltip>
                </li>
              ))}
            </ul>
          ) : (
            <Typography component='p' variant='body2' sx={{ mt: '10px' }}>
              No results found
            </Typography>
          )}
        </div>
      </CustomAccordion>
      <SearchButton handleSearch={props.handleSearch} />
    </div>
  );
}
