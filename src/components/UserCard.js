import React from 'react'
import '../css/UserCard.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UserCard = (props) => {
  const handleDelete = async () => {
    try{
      await axios.delete(`https://reqres.in/api/users/${props.user_id}`)
      alert('User deleted Successfully')
    } catch (error) {
      alert('Failed to delete User')
      console.log(error)
    }
  }
  return (
    <div className='user-card-parent-container'>
      <div className='user-card-child-1'><img src={props.img} alt={props.first_name} className='user-image' /></div>
      <div className='user-card-child-2'>
        <div className='user-card-name'>
          <p className='user-card-first-name'>{props.first_name}</p><p className='user-card-last-name'>{props.last_name}</p>
        </div>
        <div className='user-card-buttons'>
          <div className='user-card-edit-button'><Button variant='contained'><Link to='/edit' state={{email: props.email, first_name: props.first_name, last_name: props.last_name, user_id: props.user_id}} style={{textDecoration: 'none', color: 'white'}}>Edit</Link></Button></div>
          <div className='user-card-delete-button'><Button variant='contained' color='error' onClick={handleDelete}>Delete</Button></div>
        </div>
      </div>
    </div>
  )
}

export default UserCard