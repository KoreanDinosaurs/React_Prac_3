import React from "react";

import { Grid, Text, Image, Input, Button, Section } from "../elements";

const Postwrite = (props) => {
    return(
        <Section>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    게시글 작성
                </Text>
                {/* <Upload/> */}
                </Grid>

                <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>
                    미리보기
                    </Text>
                </Grid>

                <Image shape="rectangle" />
                </Grid>

                <Grid padding="16px">
                <Input label="게시글 내용" placeholder="게시글 작성" multiLine />
                </Grid>

                <Grid padding="16px">
                <Button>게시글 작성</Button>
            </Grid>
        </Section>  
    )
}

export default Postwrite;