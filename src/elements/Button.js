import React from "react";
import styled from "styled-components"

const Button = (props) => {
    const { children, _onClick, padding, width, bg, color, size, margin } = props;

    const styles = {
        padding,
        margin,
        width,
        bg,
        color,
        size, 
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

export default Button;

