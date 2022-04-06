import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Button } from "../elements";
import Section from "../elements/Section";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";

const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list);
    const is_loading = useSelector(state => state.post.is_loading);
    const paging = useSelector(state => state.post.paging);
    console.log(paging)
    // const {post_list, is_loading, paging} = useSelector(state => state.post);
  
    useEffect(() => {
        dispatch(postActions.getPostFB())
    }, [])

    return(
        <React.Fragment>
            <Section>
                {post_list.map((post) => {
                    return <Post key={post.id} {...post}/>

                })}
            </Section>
            <button style={{position: "absolute",bottom: "20px"}}onClick={()=>{dispatch(postActions.getPostFB(paging.next))}}>추가로드</button>
            <Button circle _onClick={() => {history.push('/write')}}>+</Button>
        </React.Fragment>
    )
}

export default Main;

