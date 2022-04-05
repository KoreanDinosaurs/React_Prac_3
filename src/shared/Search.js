import React, { useCallback, useState } from "react";
import _ from "lodash"
import { Section } from "../elements";

const Search = () => {
    const [text, setText] = useState('')
    
    const debounce = _.debounce((e) => {
        console.log("debounce", e.target.value)
    }, 1000)

    const throttle = _.throttle((e) => {
        console.log("throttle", e.target.value)
    }, 1000)
    
    const keyPress = useCallback(debounce, []);
    
    const onChange = (e) => {
        setText(e.target.value)
        keyPress(e);
    }

    return(
        <Section>
            <input type="text" onChange={onChange} value={text}/>
        </Section>
    )
}

export default Search;