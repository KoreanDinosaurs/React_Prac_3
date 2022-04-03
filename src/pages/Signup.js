import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {Button, Grid, Input, Section, Text } from "../elements/index"
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd_check, setPwdCheck] = useState('');
    const [user_name, setUserName] = useState('');

    const signup = () => {
        if(id === "" || pwd === "" || pwd_check === "" || user_name === "") return alert("공란이 있습니다.")
        if(pwd !== pwd_check) return alert("패스워드가 다릅니다.")

        dispatch(userActions.signupFB(id, pwd, user_name))
    }
    
    return(
        <Section>
            <Grid width="40%">
                <Text size="24px" bold>회원가입</Text>
                <Grid margin="20px 0 0 0">
                <Input label="Id" placeholder="아이디를 입력하세요"
                       _onChange={e => setId(e.target.value)} />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input label="Nickname" placeholder="닉네임을 입력하세요" 
                       _onChange={e => setUserName(e.target.value)} />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input type="password" label="Password" placeholder="패스워드를 입력하세요" 
                       _onChange={e => setPwd(e.target.value)} />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input type="password" label="Password Check" placeholder="패스워드를 다시 입력하세요" 
                       _onChange={e => setPwdCheck(e.target.value)} />
                </Grid>
                <Button _onClick={signup}width="100%" margin="20px 0 0 0">회원가입 하기</Button>
            </Grid>
        </Section>
    )
}

export default Signup;