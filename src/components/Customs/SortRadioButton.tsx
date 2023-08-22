import React from "react"
import "../../styles/SortRadioButton.css"

interface IProps {
    sortBy : Fields[],
    setSortedValue : React.Dispatch<React.SetStateAction<string>>,
    setSortOrder : React.Dispatch<React.SetStateAction<string>>
}

interface Fields {
    [key : string] : string
}

function SortRadioButton({sortBy, setSortedValue, setSortOrder}: IProps) {



    return (
        <div className="container">
            <label htmlFor="sort">Sort by :</label>
            <select name="sort" className="sort-select" onChange={e => setSortedValue(e.target.value)}>
                {sortBy.map(attribute => (
                    <option key={Object.keys(attribute)[0]} value={Object.keys(attribute)[0]}>{attribute[Object.keys(attribute)[0]]}</option>
                ))}
            </select>
            <div onChange={e => setSortOrder((e.target as HTMLInputElement).value)}>
                <label htmlFor="acs">Acs</label>
                <input type="radio" id="acs" name="order" value="asc" defaultChecked/>
                <label htmlFor="dsc">Desc</label>
                <input type="radio" id="dsc" name="order" value="dsc"/>
            </div>
        </div>
    )
}

export default SortRadioButton