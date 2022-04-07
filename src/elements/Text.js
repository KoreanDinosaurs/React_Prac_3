import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, color, size, children, margin, textAlign } = props;

  const styles = {bold: bold, color: color, size: size, margin, textAlign};
  
  return (
      <P {...styles}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  textAlign: false,
};

const P = styled.p`
  text-align: ${props => props.textAlign};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}
`;

export default Text;
