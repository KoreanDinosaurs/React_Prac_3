import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components"
import Button from "../elements/Button";
import { actionCreators as userActions } from "../redux/modules/user";
import { apiKey } from "../shared/firebase";
import { history } from "../redux/configureStore";
import { Grid } from "../elements";
import { Link } from "react-router-dom";
import { viewModal } from "../redux/modules/modal";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    
    // 알림창 모달창
    let [cnt, setCnt] = useState(0)
    
    useEffect(() => {
        if(cnt % 2){
            dispatch(viewModal("block"));
        } else {
            dispatch(viewModal("none"));
        }

    }, [cnt])

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    console.log(is_login, is_session)
    if(is_login && is_session){
        return(
            <React.Fragment>
                <Container>
                    <Grid width="80%" margin="0 auto" is_flex>
                        <Btn>DDongram</Btn>
                        <Grid width="160px" is_flex>
                            <Link to="/" style={{padding: "5px 0 0 0"}} tabIndex="0">
                                <svg aria-label="홈" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path>
                                </svg>
                            </Link>
                            <Link to="/" onClick={() => setCnt(cnt=> cnt + 1)} className="alram" style={{padding: "7px 0 0 0"}} aria-label="Direct 메시지 - 새로운 알림 링크 0개" tabIndex="0">
                                <svg aria-label="Direct" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
                                    <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                                </svg>
                            </Link>
                            
                            <Button size="22px" _onClick={()=>{dispatch(userActions.logoutFB())}} hover>Log Out</Button>
                        </Grid>
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
                    <Button size="22px" margin="0 10px 0 0" _onClick={() => {history.push('/login')}} hover>Log In</Button>
                    <Button size="22px" _onClick={() => {history.push('/signup')}} hover>Sign Up</Button>
                </div>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 60px;
    padding: 20px 40px 20px 20px;
    z-index: 1000;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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



