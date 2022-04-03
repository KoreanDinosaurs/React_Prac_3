import React from "react";
import styled from "styled-components"

const Input = (props) => {
    const { placeholder, label, type, _onChange } = props;

    return(
        <React.Fragment>
            <Label>{label}</Label>
            <ElInput type= {type} placeholder={placeholder} onChange={_onChange}/>
        </React.Fragment>
    )
}

Input.defaultProps = {
    placeholder: null,
    label: null,
    type: "text",
    _onChange: () => {},
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    font-size: 18px;
`;

const Label = styled.label`
    font-size: 24px;
`;

export default Input;