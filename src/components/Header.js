import React from "react";

import styled from "styled-components"
import Button from "../elements/Button";

const Header = (props) => {
    return(
        <React.Fragment>
            <Container>
                <Btn>DDongram</Btn>
                <div>
                    <Button size="22px" margin="0 10px 0 0" >Log In</Button>
                    <Button size="22px" >Sign Up</Button>
                </div>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 60px;
    border: 1px solid red;
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Btn = styled.button`
    font-family: 'Dancing Script', cursive;
    font-size: 28px;
    font-weight: bold;
    border: none;
    background: transparent;
    cursor: pointer;
`;


export default Header;



