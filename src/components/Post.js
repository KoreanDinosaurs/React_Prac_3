import React from "react";

import {Grid, Image, Text} from "../elements/index"

const Post = (props) => {
    return(
            <Grid width="600px" margin="30px 0 0 0">
                <Grid is_flex padding="16px">
                    <Grid is_flex width="auto">
                    <Image shape="circle" src={props.src} />
                    <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex width="auto">
                    <Text>{props.insert_dt}</Text>
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.src} />
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
    src: "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",
    contents: "강아지네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
  };

export default Post;