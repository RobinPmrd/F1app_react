import React from "react";

interface IProps {
    label: string,
    value?: string,
    data: string[] | number[],
    setSelectValue: React.Dispatch<React.SetStateAction<any>>
}

function Select({label, value, data, setSelectValue} : IProps) {


    return (
        <div>
            <label>{label}</label>
            <select onChange={(e) => setSelectValue(e.target.value)} value={value}>
                <option key={"All"} value={"All"}>All</option>
                {data.map(data => (
                    <option key={data} value={data}>{data}</option>
                ))}
            </select>
        </div>
    )
}
export default Select