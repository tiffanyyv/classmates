import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#B0B4D4'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    boxShadow: 20,
    padding: '50px',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    maxWidth: 400,
    marginBottom: 150,
    minWidth: 350,
  },
  googleButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0B4D4',
    color: 'white',
    variant: 'contained',
    display: 'flex',
    width: '100%',
    '&:hover': {
      backgroundColor: '#acb0cd',
      color: 'white',
    }
  },
  moduleGoogleButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0B4D4',
    color: 'white',
    variant: 'contained',
    display: 'flex',
    width: 336,
    '&:hover': {
      backgroundColor: '#acb0cd',
      color: 'white',
    }
  },
  facebookButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0B4D4',
    color: 'white',
    variant: 'contained',
    display: 'flex',
    width: '100%',
    '&:hover': {
      backgroundColor: '#acb0cd',
      color: 'white',
    }
  },
  moduleFacebookButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0B4D4',
    color: 'white',
    variant: 'contained',
    display: 'flex',
    width: 336,
    '&:hover': {
      backgroundColor: '#acb0cd',
      color: 'white',
    }
  },
  loginButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B0B4D4',
    color: 'white',
    variant: 'contained',
    display: 'flex',
    width: '100%',
    '&:hover': {
      backgroundColor: '#acb0cd',
      color: 'white',
    }
  },
  userInput: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    mb: 500,
    borderRadius: 5,
    width:'100%',
  },
  formControlStyle: {
    position: 'absolute',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  }
});

export default useStyles;