import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'


export default class Home extends Component {
  render() {
    const location = useLocation()
    

    return (
      <div className='homepage'>
        <h1>Hello{locatio.state.id} Home</h1>
      </div>
    )
  }
}
