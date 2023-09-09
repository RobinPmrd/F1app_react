import React from "react"
import "../../styles/SortRadioButton.css"
import { useTranslation } from "react-i18next"

interface IProps {
    sortBy : Fields[],
    setSortedValue : React.Dispatch<React.SetStateAction<string>>,
    setSortOrder : React.Dispatch<React.SetStateAction<string>>
}

interface Fields {
    [key : string] : string
}

function SortRadioButton({sortBy, setSortedValue, setSortOrder}: IProps) {

    const {t} = useTranslation();

    return (
        <div className="container">
            <label htmlFor="sort">{`${t("SortBy")} :`}</label>
            <select name="sort" className="sort-select" onChange={e => setSortedValue(e.target.value)}>
                {sortBy.map(attribute => (
                    <option key={Object.keys(attribute)[0]} value={Object.keys(attribute)[0]}>{attribute[Object.keys(attribute)[0]]}</option>
                ))}
            </select>
            <div onChange={e => setSortOrder((e.target as HTMLInputElement).value)}>
                <label htmlFor="acs">{t("Acs")}</label>
                <input type="radio" id="acs" name="order" value="asc" defaultChecked/>
                <label htmlFor="dsc">{t("Desc")}</label>
                <input type="radio" id="dsc" name="order" value="dsc"/>
            </div>
        </div>
    )
}

export default SortRadioButton