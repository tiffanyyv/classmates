import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B0B4D4',
  '&:hover': {
    backgroundColor: '#acb0cd',
  },
}));

export default function MainButton({ children, ...props }) {

  return (
    <ColorButton variant="contained" onClick={props.onClick}>{props.value}</ColorButton>
  )
}

