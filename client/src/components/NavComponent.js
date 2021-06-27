import React from 'react';
import styled from 'styled-components';

const NavComponent = () => {

    return (
        <>
            <StyledNav>
                <div className="nav-wrapper">
                    <div className="logo">
                        <div className="img">
                            <h2>Img Placeholder</h2>
                        </div>
                    </div>
                    <div className="links">
                        <p>Home</p>
                        <p>Gallery</p>
                        <p>About</p>
                    </div>
                </div>
            </StyledNav>
        </>
    )
};

const StyledNav = styled.div` 
    background-color: #202040;
    

    .nav-wrapper {
        width: 1640px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100px;
        .logo {
        }
        .links {
            display: flex;
            justify-content: space-between;
        }
    }

   
`



export default NavComponent