import React from "react";

import {Button, Grid, Input, Section, Text } from "../elements/index"
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Login = (props) => {
    const dispatch = useDispatch();

    const login = () => {
        dispatch(userActions.loginAction({user_name: 'donghyun'}));
    }

    return(
        <Section>
            <Grid width="40%">
                <Text size="24px" bold>로그인</Text>
                
                <Grid margin="20px 0 0 0">
                <Input label="Id" placeholder="아이디를 입력하세요" />
                </Grid>
                
                <Grid margin="20px 0 0 0">
                <Input label="Password" placeholder="패스워드를 입력하세요" type="password"/>
                </Grid>
                
                <Button _onClick={login} width="100%" margin="20px 0 0 0">로그인 하기</Button>
            </Grid>
        </Section>
    )
}

export default Login;

