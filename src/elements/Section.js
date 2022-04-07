import React from "react";
import styled from "styled-components"

const Section = (props) => {
    const { children, justify } = props;

    return(
        <Container justify={justify}>{children}</Container>
    )
}

Section.defaultProps = {
    children: null,
    justify: false,
}

const Container = styled.div`
    position: absolute;
    width: 100%;
    padding: 60px 0px; // Header height

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.justify && "center"};
`;

export default Section;