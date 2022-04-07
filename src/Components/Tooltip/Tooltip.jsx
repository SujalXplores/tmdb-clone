import { styled, Tooltip, tooltipClasses } from '@mui/material';

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#032541',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#032541',
    color: '#fff',
    fontSize: 16,
    lineHeight: 1.5,
  },
}));
