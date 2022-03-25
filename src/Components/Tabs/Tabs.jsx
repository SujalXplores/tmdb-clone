import styled from '@emotion/styled';
import {
  TabUnstyled,
  TabsUnstyled,
  TabsListUnstyled,
  buttonUnstyledClasses,
  tabUnstyledClasses,
} from '@mui/base';

import PropTypes from 'prop-types';

const Tab = styled(TabUnstyled)`
  color: #032541;
  font-family: inherit;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  height: 30px;
  background-color: transparent;
  width: 100%;
  padding: 4px 16px;
  border: none;
  border-radius: 30px;
  display: flex;
  justify-content: center;

  &.${tabUnstyledClasses.selected} {
    background-color: #032541;

    span {
      font-weight: 600;
      background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: -webkit-text-fill-color 0.5s;
    }
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  width: 120%;
  background-color: transparent;
  border-radius: 40px;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  border: 1px solid #032541;

  @media (max-width: 369px) {
    margin: 16px 0;
  }
`;
function CustomTab({ tabs, value, handleChange }) {
  return (
    <TabsUnstyled defaultValue={0} value={value} onChange={handleChange}>
      <TabsList>
        {tabs.map((tab) => (
          <Tab key={tab} value={tab}>
            <span>{tab}</span>
          </Tab>
        ))}
      </TabsList>
    </TabsUnstyled>
  );
}

CustomTab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

CustomTab.defaultProps = {
  tabs: [],
  value: '',
  handleChange: () => {},
};

export default CustomTab;
