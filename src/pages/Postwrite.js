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

    const [contents, setContents] = useState(_post ? _post.contents : "텍스트")
    
    const changeContents = (e) => {
        setContents(e.target.value)
    }
    
    const addPost = () => {
        dispatch(postActions.addPostFB(contents, click))
        console.log(click, contents)
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents}))
    }

    // 레이아웃 선택
    const [click, setClick] = useState('');

    const checkBoxClick = (e) => {
        setClick(e.target.value)
        
        const checkBoxes = document.getElementsByName("layout")
        console.log(checkBoxes)
        checkBoxes.forEach((elem, idx) => {
            elem.checked = false;
        })
        
        e.target.checked = true;
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
            <Grid width="80%" margin="30px 0" shadow>
                <Grid padding="16px">
                    <Text margin="0px" size="36px" bold>
                        {post_id ? "게시글 수정" : "게시글 작성"}
                    </Text>
                    <Grid margin="30px 0 0 0">
                        <Upload/>
                    </Grid>    
                </Grid>

                <Grid padding="16px 16px 0 16px">
                    <Text margin="0px" size="24px" bold>
                    View 고르기
                    </Text>
                </Grid>
                
                <Grid padding="16px">
                    <input onClick={checkBoxClick} name="layout" value="레이아웃1" type="checkbox" /> 레이아웃 1
                    <Grid width="100%" margin="5px 0 0 0" is_flex>
                        <Grid width="50%">
                            <Text size="18px" textAlign="center">{contents}</Text>
                        </Grid>
                        <Grid width="50%">
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid padding="16px">
                    <input onClick={checkBoxClick} name="layout" value="레이아웃2" type="checkbox" /> 레이아웃 2
                    <Grid width="100%" margin="5px 0 0 0" is_flex>
                        <Grid width="50%">
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                        </Grid>
                        <Grid width="50%">
                            <Text size="18px" textAlign="center">{contents}</Text>
                        </Grid>
                    </Grid>
                </Grid>    
                
                <Grid padding="16px">
                    <input onClick={checkBoxClick} name="layout" layout="레이아웃3" type="checkbox" /> 레이아웃 3
                    <Grid width="100%" margin="5px 0 0 0">
                        <Grid padding="16px 16px 16px 0">
                            <Text size="18px">{contents}</Text>
                        </Grid>
                        <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}/>
                    </Grid>
                </Grid>
                
                <Grid padding="16px">
                    <Input _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine value={contents} />
                </Grid>

                <Grid padding="16px">
                    {post_id 
                        ? <Button _onClick={editPost} hover>게시글 수정</Button>
                        : <Button _onClick={addPost} hover>게시글 작성</Button>
                    }
                </Grid>
            </Grid>
        </Section>  
    )
}

export default Postwrite;