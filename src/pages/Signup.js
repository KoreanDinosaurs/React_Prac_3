import React from "react";

import {Button, Grid, Input, Section, Text } from "../elements/index"

const Signup = (props) => {
    return(
        <Section>
            <Grid width="40%">
                <Text size="24px" bold>회원가입</Text>
                <Grid margin="20px 0 0 0">
                <Input label="Id" placeholder="아이디를 입력하세요" />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input label="Nickname" placeholder="닉네임을 입력하세요" />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input type="password" label="Password" placeholder="패스워드를 입력하세요" />
                </Grid>
                <Grid margin="20px 0 0 0">
                <Input type="password" label="Password Check" placeholder="패스워드를 다시 입력하세요" />
                </Grid>
                <Button width="100%" margin="20px 0 0 0">회원가입 하기</Button>
            </Grid>
        </Section>
    )
}

export default Signup;