import React from "react";

import {Grid, Input, Button} from "../elements";

const CommentWrite = () => {

    return (
      <React.Fragment>
        <Grid padding="16px" is_flex>
          <Input placeholder="댓글 내용을 입력해주세요 :)" />
          <Button width="70px" margin="0px 0px 0px 20px">작성</Button>
        </Grid>
      </React.Fragment>
    );
}

export default CommentWrite;

