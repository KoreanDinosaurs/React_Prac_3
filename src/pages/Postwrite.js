import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Image, Input, Button, Section } from "../elements";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import Upload from "../shared/Upload";
import { useParams } from "react-router-dom";
import { actionCreators as imageActions } from "../redux/modules/image";

const Postwrite = (props) => {
    const dispatch = useDispatch();
    
    const is_login = useSelector(state => state.user.is_login)
    const preview = useSelector(state => state.image.preview)
    const post_list = useSelector(state => state.post.list)
    
    const params = useParams();
    const post_id = params.id;
    let _post = post_id ? post_list.find(p => p.id === post_id) : null;
    
    useEffect(() => {
        if(post_id && !_post){
            alert("포스트 정보가 없어요!");
            history.goBack();
            return;
        }

        if(post_id){
            dispatch(imageActions.setPreview(_post.image_url))
        }

    }, [])

    const [contents, setContents] = useState(_post ? _post.contents : "")
    const changeContents = (e) => {
        setContents(e.target.value)
    }
    
    const addPost = () => {
        dispatch(postActions.addPostFB(contents))
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents}))
    }
    
    if(!is_login){
        return(
            <Section>
              <Text size="36px" bold>앗! 잠깐!</Text>
              <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
              <Button _onClick={() => {history.replace('/login')}}>로그인 하러가기</Button>
            </Section>
        )
    }
    
    return(
        <Section>
            <Grid width="600px" margin="30px 0 0 0" shadow>
                <Grid padding="16px">
                    <Text margin="0px" size="36px" bold>
                        {post_id ? "게시글 수정" : "게시글 작성"}
                    </Text>
                    <Upload/>
                </Grid>

                <Grid>
                    <Grid padding="16px">
                        <Text margin="0px" size="24px" bold>
                        미리보기
                        </Text>
                    </Grid>

                    <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                </Grid>

                <Grid padding="16px">
                    <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine value={contents} />
                </Grid>

                <Grid padding="16px">
                    {post_id 
                        ? <Button _onClick={editPost}>게시글 수정</Button>
                        : <Button _onClick={addPost}>게시글 작성</Button>
                    }
                </Grid>
            </Grid>
        </Section>  
    )
}

export default Postwrite;