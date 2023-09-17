import React, { useState } from "react";
import "../../styles/Select.css"
import { useTranslation } from "react-i18next";
import { Driver, Team, alphabeticOrder } from "../../utils";

interface IProps {
    label: string,
    value?: string | Object,
    data: Driver[] | Team[],
    hasAll?: boolean,
    objectData?: Object[],
    onChange?: (value: any) => void,
    onUnselect?: (value: any) => void
}

function Select2({label, value, data, hasAll, objectData, onChange, onUnselect} : IProps) {
    const [selectedValues, setSelectedValues] = useState<(Driver | Team)[]>([]);
    const [values, setValues] = useState<(Driver | Team)[]>(data.sort((v1,v2) => "name" in v1 ? alphabeticOrder(v1.name, (v2 as Team).name)
    : alphabeticOrder(v1.surname, (v2 as Driver).surname)));
    const {t} = useTranslation();
    
    function handleOnChange(value: string) {
        const va: Driver | Team = JSON.parse(value);
        
        if (onChange) onChange(va);
        setSelectedValues([...selectedValues, va]);
        let v = [...values];
        v.splice(v.findIndex(d => d.id === va.id),1);
        
        setValues([...v]);
    }

    function handleOnClickLi(value: Driver | Team) {
        if (onUnselect) onUnselect(value);
        setValues([...values, value].sort((v1,v2) => "name" in v1 ? alphabeticOrder(v1.name, (v2 as Team).name)
                                                                : alphabeticOrder(v1.surname, (v2 as Driver).surname)));
        let sv = [...selectedValues];
        sv.splice(sv.indexOf(value),1);
        setSelectedValues([...sv]);
    }

    return (
        <div>
            <div className="label-select">
                <label>{label}</label>
                <select onChange={(e) => handleOnChange(e.target.value)}>
                    <option key={"first"}>{"forename" in values[0] ? t("SelectDriver") : t("SelectTeam")}</option>
                    {values.map((v, index) => (
                        <option key={v.id}  value={JSON.stringify(v)}>{"forename" in v ? v.forename + " " + v.surname : v.name}</option>
                    ))}
                </select>
            </div>
            <ul className="select-list">
                {selectedValues.map((v,index) => (
                    <li key={v.id} onClick={() => handleOnClickLi(v)}>{"forename" in v ? v.forename + " " + v.surname : v.name}</li>
                ))}
            </ul>
        </div>
    )
}
export default Select2