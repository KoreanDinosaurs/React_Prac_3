import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components"
import Button from "../elements/Button";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    
    if(is_login && is_session){
        return(
            <React.Fragment>
                <Container>
                    <Btn>DDongram</Btn>
                    <Grid width="180px" is_flex>
                        <Button size="22px">Info</Button>
                        <Button size="22px">Alram</Button>
                        <Button size="22px" _onClick={()=>{dispatch(userActions.logoutFB())}}>Log Out</Button>
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Container>
                <Btn>DDongram</Btn>
                <div>
                    <Button size="22px" margin="0 10px 0 0" _onClick={() => {history.push('/login')}}>Log In</Button>
                    <Button size="22px" _onClick={() => {history.push('/signup')}}>Sign Up</Button>
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



