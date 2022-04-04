import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Image, Input, Button, Section } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import Upload from "../shared/Upload";

const Postwrite = (props) => {
    const preview = useSelector(state => state.image.preview)
    const dispatch = useDispatch();
    
    const [contents, setContents] = useState('')

    const changeContents = (e) => {
        setContents(e.target.value)
    }
    
    const addPost = () => {
        dispatch(postActions.addPostFB(contents))
    }
    const is_login = useSelector(state => state.user.is_login)
    
    if(!is_login){
        return(
            <Section>
              <Text size="36px" bold>앗! 잠깐!</Text>
              <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
              <Button _onClick={() => {history.replace('/')}}>로그인 하러가기</Button>
            </Section>
        )
    }
    
    return(
        <Section>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    게시글 작성
                </Text>
                <Upload/>
                </Grid>

                <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>
                    미리보기
                    </Text>
                </Grid>

                <Image shape="rectangle" src={preview}/>
                </Grid>

                <Grid padding="16px">
                <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                </Grid>

                <Grid padding="16px">
                <Button _onClick={addPost}>게시글 작성</Button>
            </Grid>
        </Section>  
    )
}

export default Postwrite;