import React, { useEffect, useState } from "react";
import {Post, CommentList, CommentWrite} from "../components/index"
import { Grid, Section } from "../elements";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../shared/firebase";

const PostDetail = (props) => {
    
    const id = props.match.params.id;
    const post_list = useSelector(state => state.post.list)
    const post_data = post_list.find(v => v.id === id)

    const [post, setPost] = useState([])

    useEffect(() => {
        async function post(){
            const docRef = doc(db, "post", id);
            const docSnap = await getDoc(docRef); 
            if (docSnap.exists()) {
                
                let _post = docSnap.data();
            
                let post = {
                    id: docSnap.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id
                    },
                    image_url: _post.image_url,
                    contents: _post.contents,
                    comment_cnt: _post.comment_cnt,
                    insert_dt: _post.insert_dt,
                }
                
                setPost(post)
            }   
        }
        post(); 
    }, [])
    
    return (
        <React.Fragment>
            <Section>
                <Grid width="600px">
                    <Post {...post} />
                    <CommentWrite/>
                    <CommentList/>
                </Grid>
            </Section>
        </React.Fragment>
    )
}

export default PostDetail;