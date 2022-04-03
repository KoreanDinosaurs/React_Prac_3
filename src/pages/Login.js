import React, { useState } from "react";

import {Button, Grid, Input, Section, Text } from "../elements/index"
import { setCookie, getCookie, deleteCookie } from "../shared/Cookie";

const Login = (props) => {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    
    const changeId = (e) => {
        setId(e.target.value);
    }

    const changePwd = (e) => {
        setPwd(e.target.value);
    }

    const login = () => {
        setCookie("user_id", id, 3);
        setCookie("user_pwd", pwd, 3);
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

