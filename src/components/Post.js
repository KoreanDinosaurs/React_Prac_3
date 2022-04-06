import React from "react";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import {Grid, Image, Text, Button} from "../elements/index"


const Post = (props) => {
    const uid = useSelector(state => state?.user?.user?.uid)

    return(
        <Grid width="600px" margin="30px 0 0 0" shadow>
            <Grid is_flex padding="16px">
                <Grid is_flex width="auto">
                    <Image shape="circle" src={props.user_profile} />
                    <Text bold>{props.user_info.user_name}</Text>
                </Grid>
                <Grid is_flex width="auto">
                    <Text>{props.insert_dt}</Text>
                    
                    {props.user_info.user_id === uid ?
                    <Button _onClick={() => {history.push(`/write/${props.id}`)}} padding="12px 10px 10px 10px" bg="transparent"> 
                        <svg aria-label="옵션" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle>
                            <path d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </Button> 
                    :''}
                </Grid>
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url} />
            </Grid>
            <Grid padding="16px">
                <Text bold>댓글 {props.comment_cnt}개</Text>
            </Grid>
        </Grid> 
    )
}

Post.defaultProps = {
    user_info: {
      user_name: "donghyun",
      user_profile: "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",
    },
    image_url: "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",
    contents: "강아지네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
  };

export default Post;