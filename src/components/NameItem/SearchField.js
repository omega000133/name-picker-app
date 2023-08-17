import * as React from 'react';

const SearchField = (props) => {
    return (
        <input
            className="p-2 mx-1 border-2 rounded focus:outline-blue-500"
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    )
}
export default SearchField;