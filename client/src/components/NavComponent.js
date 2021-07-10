import React, { useEffect } from 'react';
// Dependencies
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// Images
import logo from '../images/logo.jpg'


const NavComponent = ({ isLoggedIn }) => {
    const logout = () => {
        Auth.logout();
        document.location.assign('/');
    }

    return (
        <>
            <StyledNav>
                <div className="nav-wrapper">
                    <div className="logo">
                        <div className="img">
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        {isLoggedIn ? (<Link to='/admin'>Admin</Link>) : ''}
                        {isLoggedIn ? (<button onClick={logout}>Logout</button>) : ''}
                    </div>
                </div>
            </StyledNav>
        </>
    )
};

const StyledNav = styled.div` 
    background-color: #1f1d42;
    

    .nav-wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        .logo {
            .img {
                img {
                    width: 100px;
                }
            }
        }
        .links {
            display: flex;
            justify-content: space-between;
            p {
                margin-left: 3rem;
                font-size: 24px;
            }
        }
    }

   
`



export default NavComponent