import React from "react";
import './SearchBox.css'

export function SearchBox({value, onChange}){
    return (
        <div className="SearchBox">
            <input
                type="search"
                placeholder="전시, 계정을 찾아보세요."
                value={value}
            onChange={onChange}
        /></div>
    )
}