import React from "react";
import styled from "styled-components"
import { Grid, Image, Text } from "../elements";

const Card = (props) => {
    return (
        <React.Fragment>
            <Container>
                <Grid width="auto">
                    <Image size="45" shape="circle" ></Image>
                </Grid>
                <Grid>
                    <Text margin="0 0 0 10px" size="16px">해당 게시물에 <b>강동현</b>님이 댓글을 남겼습니다.</Text>
                </Grid>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width: 100%;
    /* height: 100px; */
    margin-bottom: 10px;
    border-radius: 10px;
    
    /* background-color: lightgray; */
    
    display: flex;
    align-items: center;

`;

export default Card;

