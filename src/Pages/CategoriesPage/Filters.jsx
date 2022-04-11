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
import { FLAG_API, STREAMING_URL } from '../../Constants';
import { CustomTooltip } from '../../Components/Tooltip/Tooltip';
import { RELEASE_TYPES } from '../../Utils/release-types';
import { ALL_COUNTRIES } from '../../Utils/countries';

import styles from './Categories.module.scss';

export default function Filters(props) {
  const sliderStyle = {
    '& .MuiSlider-thumb': {
      width: 14,
      height: 14,
    },
  };

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
          <h3>{props.type === 'movie' ? 'Release Dates' : 'Air Dates'}</h3>
          {props.type === 'movie' ? (
            <Checkbox
              value='all'
              label='Search all releases?'
              checked={props.state.searchAllDates}
              onChange={props.toggleAllDates}
            />
          ) : (
            <Checkbox
              value='all'
              label='Search all episodes?'
              checked={props.state.searchAllEpisodes}
              onChange={props.toggleAllEpisodes}
            />
          )}
          {!props.state.searchAllDates && props.type === 'movie' && (
            <>
              <Checkbox
                value='all'
                label='Search all countries?'
                checked={props.state.searchAllCountries}
                onChange={props.toggleAllCountries}
                style={{ paddingBottom: '20px' }}
              />
              {!props.state.searchAllCountries && (
                <FormControl fullWidth sx={{ mb: '10px' }}>
                  <Select
                    value={props.state.region}
                    onChange={props.handleOnChangeRegion}
                    className={styles['custom-select']}
                  >
                    {ALL_COUNTRIES.map((item) => (
                      <MenuItem
                        key={item.code}
                        value={item.code}
                        className={styles['menu-item']}
                      >
                        <img
                          src={`${FLAG_API}/${item.code}.png`}
                          alt={item.label}
                          className={styles['flag-icon']}
                        />
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {RELEASE_TYPES.map((item) => (
                <Checkbox
                  key={item.id}
                  value={item.value}
                  checked={props.state.releaseTypes?.includes(item.value)}
                  onChange={() => props.toggleReleaseType(item.value)}
                  label={item.label}
                />
              ))}
              {props.type === 'tv' && props.state.searchAllEpisodes && (
                <Checkbox
                  value='all'
                  label='Search first air date?'
                  // checked={props.state.searchFirstAirDate}
                  // onChange={props.toggleFirstAirDate}
                />
              )}
            </>
          )}
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
          <h3>
            Language
            <CustomTooltip
              title='Filter items based on their original language.'
              placement='top'
            >
              <span className={styles['help-icon']}></span>
            </CustomTooltip>
          </h3>
          <FormControl fullWidth>
            <Select
              value={props.state.options.with_original_language || 'xx'}
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
            sx={sliderStyle}
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
            sx={sliderStyle}
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
            sx={sliderStyle}
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
                    src={`${FLAG_API}/${item.iso_3166_1}.png`}
                    alt={item.native_name}
                    className={styles['flag-icon']}
                  />
                  {item.native_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {props.state.ott_providers.length > 0 ? (
            <ul className={styles.ott_ul}>
              {props.state.ott_providers.map((provider) => (
                <li
                  key={provider.provider_id}
                  onClick={() => props.toggleOttProvider(provider.provider_id)}
                >
                  <CustomTooltip title={provider.provider_name} placement='top'>
                    <span>
                      <img
                        className={styles.ott_img}
                        src={STREAMING_URL + provider.logo_path}
                        alt={provider.provider_name}
                      />
                      <div
                        className={
                          props.state.ott_provider_filter.includes(
                            provider.provider_id
                          )
                            ? styles.active
                            : ''
                        }
                      >
                        <span className={styles.tick}></span>
                      </div>
                    </span>
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
