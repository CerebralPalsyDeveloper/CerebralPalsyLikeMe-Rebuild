export default {
  root: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent: 'space-between',
    paddingBottom: '100px',
    margin: 'auto',
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection:"column",
    width: '100%',
    marginTop: '40px',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  step: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#374151',
    marginBottom: '10px',
    marginTop: '10px',
    textAlign: 'left',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  input: {
    width: '100%', 
  },
  label: {
    marginBottom: '5px',
    marginTop: '10px',
    color: '#333',
  },
  bottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
  },
  nextButton: {
    color: 'white',
    padding: '12px',
    fontWeight: 'bold',
    width: '100%', 
  },
  signInText: {
    textAlign: 'center',
    marginTop: '10px',
    color: '#333',
  },
  signInLink: {
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  toggleBtnContainer: {
    width: '100%',
  },
  toggleBtn: {
    height: '45px',
    flex: 1, 
  },
  toggleBtnStyle:{
    width: "100%",
    borderRadius: "16px !important",
  }
} as const;
