import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";

const Notification = (props) => {
    const is_modal = useSelector(state => state.modal.click)

    return (
        <Container style={{display: is_modal}}>
   
                <Card/>

        </Container>
    )
};

const Container = styled.div`
    position: fixed;
    z-index: 1001;
    top: 55px;
    right: 100px;
    border-radius: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2), 0px 0px 10px rgba(0, 0, 0, 0.2);
    width: 500px;
    height: 500px;
    background: white;
    padding: 20px 20px;
`;

export default Notification;


