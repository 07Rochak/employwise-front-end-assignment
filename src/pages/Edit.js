import React, { useEffect, useState } from 'react'
import '../css/Edit.css'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

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

const Edit = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const [firstName, setFirstName] = useState(data.first_name)
  const [lastName, setLastName] = useState(data.last_name)
  const [email, setEmail] = useState(data.email)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
  const outerTheme = useTheme();
  // Email Validation function
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const isTokenExpired = () => {
    const expiration = localStorage.getItem('tokenExpiration');
    const token = localStorage.getItem('token');
    if (!token || !expiration) {
      return true; // Token is missing or expired
    }
  
    const currentTime = new Date().getTime();
    return currentTime > expiration;  // True if expired, false if still valid
  };
  useEffect(() => {
    if(isTokenExpired()) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      navigate('/');
    }
    const checkTokenExpiration = () => {
        const expiration = localStorage.getItem('tokenExpiration');
        const currentTime = new Date().getTime();
  
        // If the current time exceeds expiration time, clear storage and redirect to login
        if (expiration && currentTime > expiration) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          navigate('/');
        }
      };
      const interval = setInterval(() => {
        checkTokenExpiration();
      }, 60000);
      checkTokenExpiration();
      return () => clearInterval(interval);
  }, [navigate])  
  const handleSubmit = async () => {
    console.log(firstName, lastName, email)
    setLoading(true)
    setError(null)
    console.log(data.user_id)
    var flag=0
    if(validateEmail(email)){
        flag+=1
    } else {
        alert('Enter a Valid Email Address')
        setLoading(false)
    }
    if(firstName.length !== 0) {
        flag+=1
    } else {
        alert('First Name Field is Empty')
        setLoading(false)
    }
    if(lastName.length !== 0) {
        flag+=1
    } else {
        alert('Last Name Field is Empty')
        setLoading(false)
    }
    if(flag === 3) {
        try{
            const response = await axios.put(`https://reqres.in/api/users/${data.user_id}`, {
                first_name: firstName,
                last_name: lastName,
                email: email
            })
            console.log(response)
            alert("User updated Successfully")
            navigate('/users')
        } catch (e) {
            setError(e)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
  }
  return (
    <div className='edit-container'>
        {loading ? (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}><CircularProgress /></div>
        ) : error ? (
            <div>Error Occoured</div>
        ) : (
            <>
              <h2 className='edit-heading'>User Edit Page</h2>
              <div className='edit-parent-container'>
                  <div className='edit-form'>
                    <form>
                    <ThemeProvider theme={customTheme(outerTheme)}>
                      <Box 
                        sx={{marignBottom: '50px',
                          width: '100%'
                        }}
                      >
                        <TextField
                            required
                            label="Email ID"
                            id='email'
                            defaultValue={data.email}
                            placeholder='Enter Email ID'
                            className='edit-input'
                            onChange={(e)=>{
                              setEmail(e.target.value)
                            }}
                        />
                      </Box>
                      <Box 
                        sx={{marignBottom: '50px',
                          marginTop: '20px',
                          width: '100%'
                        }}
                      >
                        <TextField
                          required
                          defaultValue={data.first_name}
                          placeholder='Enter First Name'
                          label="First Name"
                          id='first_name'
                          className='edit-input'
                          onChange={(e)=>{
                              setFirstName(e.target.value)
                          }}
                        />
                      </Box>
                      <Box 
                        sx={{marignBottom: '50px',
                          marginTop: '20px',
                          width: '100%'
                        }}
                      >
                        <TextField
                          required
                          defaultValue={data.last_name}
                          placeholder='Enter Last Name'
                          label="Last Name"
                          id='last_name'
                          className='edit-input'
                          onChange={(e)=>{
                              setLastName(e.target.value)
                          }}
                        />
                      </Box>
                      <Box sx={{marginTop: '10px',
                      }}>
                          <Button variant='contained' onClick={handleSubmit}>Update</Button>
                      </Box>
                      </ThemeProvider>
                    </form>
                  </div>
              </div>
            </>
        )}
    </div>
  )
}

export default Edit