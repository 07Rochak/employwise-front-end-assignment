import React, {useState} from 'react'
import '../css/Login.css'
import img1 from '../assets/login.jpg'
import { Box, Button, TextField } from '@mui/material'
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router';


const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#0000FF',
              '--TextField-brandBorderHoverColor': '#007FFF',
              '--TextField-brandBorderFocusedColor': 'blue',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });
  

const Login = () => {
  const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  const outerTheme = useTheme();
  // Email Validation function
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmit = async () => {
    const credentials = { email: email, password: password}
    var flag = 0
    if(validateEmail(email)) {
      flag+=1
    } else {
      alert('Enter a Valid Email Address')
    }
    if(password.length >= 8){
      flag+=1
    } else {
      alert('Password should be atleast 8 characters')
    }
    if(flag === 2) {
      try{
          const response = await axios.post('https://reqres.in/api/login', credentials)
          const expTime = Date.now()+20*60*1000;
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('tokenExpiration', expTime)
          console.log('loggedin')
          navigate('/users')
      } catch (error) {
          console.log('Login failed: ', error)
          alert('Invalid Credentials')
      }
    }
  }
  return (
      <div className='login-container'>
          <div className='container-1'>
            <h1 className='heading'>EmployWise Assignment</h1>
            <h3 className='heading2'><span style={{color: 'blue'}}>Welcome</span>, Login to your project account</h3>
            <div className='login-text'>Enter Your Details</div>
              <form className='login-form'>
                <center>
                <ThemeProvider theme={customTheme(outerTheme)}>
                <Box 
                  sx={{marignBottom: '1.5%',
                    marginTop: '1.5%',
                    width: '80%'
                  }}
                >
                  <TextField
                      fullWidth
                      label="Email ID"
                      id='email'
                      placeholder='Enter Email ID'
                      onChange={(e)=>{
                        setEmail(e.target.value)
                      }}
                  />
                </Box>
                <Box 
                  sx={{marignBottom: '1.5%',
                    marginTop: '1.5%',
                    width: '80%'
                  }}
                >
                  <TextField
                    fullWidth
                    type='password'
                    placeholder='Enter Password'
                    label="Password"
                    id='password'
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                  />
                </Box>
                </ThemeProvider>
                </center>
                <Box sx={{marginTop: '1.5%',
                marginLeft: '10%'
                }}>
                    <Button variant='contained' onClick={handleSubmit}>Login</Button>
                </Box>
                
              </form>
          </div>
          <div className='container-2'><img src={img1} alt='login' className='login-image' /></div>
      </div>
  )
}

export default Login