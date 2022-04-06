import React, { useEffect } from "react";
import {Post, CommentList, CommentWrite} from "../components/index"
import { Grid, Section } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const post_list = useSelector(state => state.post.list)
    const post = post_list.find(v => v.id === id)

    useEffect(() => {
        if(post) return;
        
        dispatch(postActions.getOnePostFB(id))
        
    }, [])
    
    return (
        <React.Fragment>
            <Section>
                <Grid width="600px">
                    <Post {...post} />
                    <CommentWrite post_id={id}/>
                    <CommentList post_id={id}/>
                </Grid>
            </Section>
        </React.Fragment>
    )
}

export default PostDetail;