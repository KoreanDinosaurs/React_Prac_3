import React, { useState } from "react";

import {Button, Grid, Input, Section, Text } from "../elements/index"
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch } from "react-redux";

const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')

    const login = () => {
        if(id === '' || pwd === '') return alert("공란이 있습니다.")

        dispatch(userActions.loginFB(id, pwd));
    }

    const emailValueCheckBool = Boolean(id)
    const pwdValueCheckBool = Boolean(pwd)

    const isValid = emailValueCheckBool && pwdValueCheckBool;
    
    
    
    return(
        <Section>
            <Grid margin="120px 0" width="40%">
                <Text size="24px" bold>로그인</Text>
                
                <Grid margin="20px 0 0 0">
                <Input label="Id" placeholder="아이디를 입력하세요"
                _onChange={e => setId(e.target.value)} />
                </Grid>
                
                <Grid margin="20px 0 0 0">
                <Input label="Password" placeholder="패스워드를 입력하세요" type="password"
                _onChange={e => setPwd(e.target.value)} />
                </Grid>
                
                <Button _onClick={login} width="100%" margin="20px 0 0 0" disabled={!isValid}>로그인 하기</Button>
            </Grid>
        </Section>
    )
}

export default Login;

