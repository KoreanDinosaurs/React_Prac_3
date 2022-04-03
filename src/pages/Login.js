import React, { useState } from "react";

import {Button, Grid, Input, Section, Text } from "../elements/index"
import { setCookie } from "../shared/Cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    
    const changeId = (e) => {
        setId(e.target.value);
    }

    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const login = () => {
        dispatch(userActions.loginAction({user_name: id}));
    }

    return(
        <Section>
            <Grid width="40%">
                <Text size="24px" bold>로그인</Text>
                
                <Grid margin="20px 0 0 0">
                <Input label="Id" placeholder="아이디를 입력하세요" 
                       _onChange={changeId}/>
                </Grid>
                
                <Grid margin="20px 0 0 0">
                <Input label="Password" placeholder="패스워드를 입력하세요" type="password"
                       _onChange={changePwd}/>
                </Grid>
                
                <Button _onClick={login} width="100%" margin="20px 0 0 0">로그인 하기</Button>
            </Grid>
        </Section>
    )
}

export default Login;

