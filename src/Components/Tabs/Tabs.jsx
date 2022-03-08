import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import PropTypes from 'prop-types';

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: rgb(3, 37, 65);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  height: 30px;
  background-color: transparent;
  width: 100%;
  padding: 7px 16px;
  border: none;
  border-radius: 40px;
  display: flex;
  justify-content: center;

  &.${tabUnstyledClasses.selected} {
    background-color: rgb(3, 37, 65);

    span {
      background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
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
  margin-bottom: 16px;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  border: 1px solid rgb(3, 37, 65);
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
