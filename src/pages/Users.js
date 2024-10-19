import React, { useState, useEffect } from 'react'
import '../css/Users.css'
import axios from 'axios';
import UserCard from '../components/UserCard'
import { Box, Button, CircularProgress, Pagination, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [current, setCurrent] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [exec, setExec] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate()
  const fetchUsers = async (page) => {
      try {
        setLoading(true)
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setLoading(false)
        console.log(users)
      } catch (error) {
        console.error('Failed to fetch users', error);
        setError(error)
        setLoading(false)
      }
    };
    // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if(searchQuery.length === 0) {
      setExec(false)
    } else {
      setExec(true)
    }
    filterUsers(e.target.value);
  };

  // Filter users based on search query
  const filterUsers = (query) => {
    if (query === '') {
      setFilteredUsers(users); // If query is empty, show all users
    } else {
      const filtered = users.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
      // console.log(filteredUsers)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = Date.now();

    // If no token or the token has expired, redirect to login page
    if (!token || (tokenExpiration && currentTime > tokenExpiration)) {
      localStorage.removeItem('token');            // Clear the token
      localStorage.removeItem('tokenExpiration');  // Clear the expiration time
      navigate('/');                          // Redirect to login page
    }
      const fetchData = async () => {
        try{
          setLoading(true)
          const response = await axios.get('https://reqres.in/api/users');
          setLoading(false)
          setTotalPage(response.data.total_pages)
        } catch (error) {
          console.error('Failed to fetch data', error)
          setError(error)
          setLoading(false)
        }
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
      fetchUsers(1)
      fetchData()
      return () => clearInterval(interval);
  }, [navigate]);

  const handleChange = (e, p) => {
    console.log(e, p)
    setCurrent(p)
    fetchUsers(p)
  }
  const handleLogout = () => {
    localStorage.removeItem('token');            // Clear the token
    localStorage.removeItem('tokenExpiration');  // Clear the expiration time
    navigate('/');  
  }
      
  return (
    <div className='users-container'>
      {loading ? (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15%'}}><CircularProgress /></div>
      ) : error ? (
        <div>error...</div>
      ) : (
        <>
          <div className='users-heading-container'>
            <h2 className='users-heading'>Users List</h2>
            <div className='top-section'>
              <div className='search-section'>
                <Box
                  sx={{
                    marginRight: '5%'
                  }}
                >
                  <TextField
                    placeholder='Search'
                    label="Search"
                    id='Search'
                    size='small'
                    className='search-section'
                    value={searchQuery}
                    onChange={handleSearch}
                   />
               </Box>
              </div>
              <Button variant='contained' className='logout-button' onClick={handleLogout}>Logout</Button>
            </div>
          </div>
          <div className='users-list'>
            { exec ? (
              filteredUsers.map((user) => (
                <UserCard
                  img={user.avatar}
                  user_id={user.id}
                  key={user.id}
                  first_name={user.first_name}
                  last_name={user.last_name}
                  email={user.email}
                />
              ))
            ) : (
              users.map((user) => (
                <UserCard img={user.avatar} user_id={user.id} key={user.id} first_name= {user.first_name} last_name= {user.last_name} email={user.email} />
              ))
            )
            }
          </div>
        </>
      )}
      <div className='pagination-section'>
        <Pagination count={totalPage} color='primary' page={current} onChange={handleChange} />
      </div>
    </div>
  )
}

export default Users