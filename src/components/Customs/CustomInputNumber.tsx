import React from "react"
import "../../styles/CustomInputNumber.css"

interface IProps {
    label : string,
    setOp : React.Dispatch<React.SetStateAction<string>>,
    setValue : React.Dispatch<React.SetStateAction<number>>,
    max? : number,
    step? : number
}

function CustomInputNumber({label, setOp, setValue, max, step=1} : IProps) {
    return (
        <div>
            <label htmlFor="select">{label}</label>
            <select name="select" className="search-op" onChange={e => setOp(e.target.value)}>
                <option value=">=">{">="}</option>
                <option value="=">{"="}</option>
                <option value="<=">{"<="}</option>
            </select>
            <input type="number" min={0} max={max} step={step} className="input-number" onChange={e => setValue(parseInt(e.target.value))}/>
        </div>
    )
}

export default CustomInputNumber