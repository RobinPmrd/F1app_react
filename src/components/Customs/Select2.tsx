import React, { useState } from "react";
import "../../styles/Select.css"
import { SelectedDriver } from "../Standings/Standings";
import { useTranslation } from "react-i18next";

interface IProps {
    label: string,
    value?: string | Object,
    data: SelectedDriver[],
    hasAll?: boolean,
    objectData?: Object[],
    onChange?: (value: SelectedDriver) => void,
    onUnselect?: (value: SelectedDriver) => void
}

function Select2({label, value, data, hasAll, objectData, onChange, onUnselect} : IProps) {
    const [selectedValues, setSelectedValues] = useState<SelectedDriver[]>([]);
    const [values, setValues] = useState<SelectedDriver[]>(data);
    const {t} = useTranslation();
    
    function handleOnChange(value: string) {
        const va: SelectedDriver = JSON.parse(value);
        
        if (onChange) onChange(va);
        setSelectedValues([...selectedValues, va]);
        let v = [...values];
        v.splice(v.findIndex(d => d.id === va.id),1);
        
        setValues([...v]);
    }

    function handleOnClickLi(value: SelectedDriver) {
        if (onUnselect) onUnselect(value);
        setValues([...values, value]);
        let sv = [...selectedValues];
        sv.splice(sv.indexOf(value),1);
        setSelectedValues([...sv]);
    }

    return (
        <div>
            <div className="label-select">
                <label>{label}</label>
                <select onChange={(e) => handleOnChange(e.target.value)}>
                    <option key={"first"}>{t("SelectDriver")}</option>
                    {values.map((v, index) => (
                        <option key={v.id}  value={JSON.stringify(v)}>{v.forename + " " + v.surname}</option>
                    ))}
                </select>
            </div>
            <ul className="select-list">
                {selectedValues.map((v,index) => (
                    <li key={v.id} onClick={() => handleOnClickLi(v)}>{v.forename + " " + v.surname}</li>
                ))}
            </ul>
        </div>
    )
}
export default Select2