import React from 'react'
import { NavLink, useHistory } from "react-router-dom"
import headerBanner from "../../assets/headerImg.png"
import styled from 'styled-components'

const StyledHeader = styled.div`
display:flex;
width:100%;
align-items:center;
background-color:#4D4D4D;
color:#A8A7A7;
max-height:10vh;
h1{
  padding:.5%;
  
  font-size:calc(2rem + 0.2vw);
  margin-right:auto;
}
`
const StyledNav = styled.div`
display:flex;
width:50%;
justify-content: flex-end;


a{
  text-decoration:none;
  font-size:calc(1.5rem + 0.2vw);
  margin: 1%;
  
  color:#A8A7A7;
  }
  a:hover{
    transform:scale(1.2);
    transition:all 0.2s ease-in-out;
    color:#0392A6;
}
`
const StyledImg = styled.img`
  width:100%;
  max-height:65vh;
`




export default function Header() {
  const { push } = useHistory()

  const logout = () => {
    localStorage.clear("token")
  }

  return (
    <>
      <StyledHeader>
      <h1>Food Truck TrackR</h1>
        <StyledNav>
        <NavLink
            activeClassName="active"
            className="header-nav-link left"
            to="/dashboard"
          >Dashboard</NavLink>
          <NavLink
            activeClassName="active"
            className="header-nav-link left"
            to="/"
          >Home</NavLink>
          <NavLink
            activeClassName="active"
            className="header-nav-link left"
            to="/signup"
        >Sign Up</NavLink>
        <NavLink
          activeClassName="active"
          className="header-nav-link right"
          to="/signin"
        >Sign In</NavLink>
        { localStorage.getItem("token") !== null && 
          <NavLink to="/" onClick={ logout }>Sign Out</NavLink>
        }
        </StyledNav>
      </StyledHeader>
      <StyledImg src={headerBanner} href="food truck" />
    </>
  )
}
