import React from "react";
import styled from "styled-components"
import Grid from "./Grid";
import Text from "./Text";

const Input = (props) => {
    const { placeholder, label, type, _onChange, value, multiLine } = props;

    if(multiLine){
        return (
          <Grid>
            {label && <Text margin="0px">{label}</Text>}
            <ElTextarea
              rows={10}
              value={value}
              placeholder={placeholder}
              onChange={_onChange}
            ></ElTextarea>
          </Grid>
        );
      }

    return(
        <React.Fragment>
            <Label>{label}</Label>
            <ElInput type= {type} placeholder={placeholder} onChange={_onChange} />
        </React.Fragment>
    )
}

Input.defaultProps = {
    placeholder: null,
    label: null,
    type: "text",
    _onChange: () => {},
    value: '',
    multiLine: false,
}

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

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