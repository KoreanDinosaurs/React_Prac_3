import React, { useEffect, useState } from "react";
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
        if(pwd !== pwd_check) return alert("패스워드가 일치하지 않습니다.")

        dispatch(userActions.signupFB(id, pwd, user_name))
    }

    // 아이디 비밀번호 형식 확인

    const emailValueCheck = (asValue) => {
        const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return emailRegExp.test(asValue);
    }
    
    const pwdValueCheck = (asValue) => {
        const pwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pwdRegExp.test(asValue);
    }

    const emailValueCheckBool = emailValueCheck(id)
    const pwdValueCheckBool = pwdValueCheck(pwd)
    const nicknameValueCheckBool = Boolean(user_name)
    const pwdValueDoubleCheckBool = Boolean(pwd_check)

    const isValid = emailValueCheckBool && pwdValueCheckBool && pwdValueDoubleCheckBool && nicknameValueCheckBool;
    
    return(
        <Section>
            <Grid margin="120px 0" width="40%">
                <Text size="24px" bold>회원가입</Text>
                <Grid margin="20px 0 0 0">
                    <Input label="Email" placeholder="이메일을 입력하세요"
                        _onChange={e => setId(e.target.value)} />
                    <Text className="email" >이메일 형식으로 작성!</Text>
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input label="Nickname" placeholder="닉네임을 입력하세요" 
                       _onChange={e => setUserName(e.target.value)} />
                </Grid>
                <Grid margin="20px 0 0 0">
                    <Input type="password" label="Password" placeholder="패스워드를 입력하세요" 
                       _onChange={e => setPwd(e.target.value)} />
                    <Text>각각 하나 이상의 소문자, 대문자, 특수문자, 숫자로 구성된 8자 이상!</Text>
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input type="password" label="Password Check" placeholder="패스워드를 다시 입력하세요" 
                       _onChange={e => setPwdCheck(e.target.value)} />
                </Grid>
                <Button _onClick={signup} width="100%" margin="20px 0 0 0" disabled={!isValid}>회원가입 하기</Button>
            </Grid>
        </Section>
    )
}

export default Signup;