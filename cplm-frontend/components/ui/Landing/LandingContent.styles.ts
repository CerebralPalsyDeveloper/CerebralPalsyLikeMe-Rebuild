export default {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80%',
    textAlign: 'center',
    zIndex: 1,
  },
  typography: {
    color: 'white',
    maxWidth: '50%',
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '40px',
  },
  buttonPrimary: {
    color: 'white',
    width: '300px',
    height: '50px',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  },
  buttonSecondary: {
    backgroundColor: 'white',
    color: 'black',
    width: '300px',
    height: '50px',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
} as const;