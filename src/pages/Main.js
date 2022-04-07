import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { Button } from "../elements";
import Section from "../elements/Section";
import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const Main = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list);
    const is_loading = useSelector(state => state.post.is_loading);
    const paging = useSelector(state => state.post.paging);
    // const {post_list, is_loading, paging} = useSelector(state => state.post);
  
    useEffect(() => {
        if(post_list.length === 0){
            dispatch(postActions.getPostFB())
        }
    }, [])

    return(
        <React.Fragment>
            <Section>
                <InfinityScroll 
                    callNext={()=>{dispatch(postActions.getPostFB(paging.next))}}
                    is_next={paging?.next ? true : false}
                    loading={is_loading}
                >
                    {post_list.map((post) => {
                        return <Post key={post.id} {...post}/>
                    })}
                </InfinityScroll>
            </Section>
            <Button circle _onClick={() => {history.push('/write')}}>+</Button>
        </React.Fragment>
    )
}

export default Main;

