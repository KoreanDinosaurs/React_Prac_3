import React from "react";
import styled from "styled-components"

const Button = (props) => {
    const { children, _onClick, padding, width, bg, color, size, margin, circle } = props;

    const styles = {
        padding,
        margin,
        width,
        bg,
        color,
        size, 
    }
    
    if(circle){
        return(
            <CircleBtn {...styles} onClick={_onClick}>{children}</CircleBtn>
        )
    }

    return(
        <Btn {...styles} onClick={_onClick}>{children}</Btn>
    )

}

Button.defaultProps = {
    children: null,
    _onClick: () => {},
    padding: "10px",
    margin: false,
    width: "auto",
    bg: "blue",
    color: "white",
    size: "14px",
    circle: false,
}

const Btn = styled.button`
    width: ${props => props.width};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    background: ${props => props.bg};
    color: ${props => props.color};
    font-size: ${props => props.size};
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const CircleBtn = styled.button`
    width: 50px;
    height: 50px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    line-height: 50px;
    border: none;
    border-radius: 50px;
    font-size: 70px;
    background: #9e9e9e;
    color: white;
    cursor: pointer;

    &:hover {
        background: #424242;
    }
`;

export default Button;

