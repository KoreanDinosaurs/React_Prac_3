import React from "react";
import _ from "lodash"

const Search = () => {
    const onChange = (e) => {
        console.log(e.targer.value)
    }
    return(
        <React.Fragment>
            <input type="text" onChange={onChange} />
        </React.Fragment>
    )
}

export default Search;