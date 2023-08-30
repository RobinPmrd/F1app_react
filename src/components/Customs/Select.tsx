import React from "react";

interface IProps {
    label: string,
    value?: string | Object,
    data: string[] | number[],
    setSelectValue: React.Dispatch<React.SetStateAction<any>>,
    hasAll?: boolean,
    objectData?: Object[]
}

function Select({label, value, data, setSelectValue, hasAll, objectData} : IProps) {

    function handleOnChange(value: string) {
        if (objectData) setSelectValue(value === "All" ? undefined : JSON.parse(value));
        else setSelectValue(value);
    }

    return (
        <div>
            <label>{label}</label>
            <select onChange={(e) => handleOnChange(e.target.value)} value={value === undefined ? "All" : value instanceof Object ? JSON.stringify(value) : value}>
                {hasAll && <option key={"All"} value={"All"}>All</option>}
                {data.map((data, index) => (
                    <option key={data} value={objectData ? JSON.stringify(objectData[index]) : data}>{data}</option>
                ))}
            </select>
        </div>
    )
}
export default Select