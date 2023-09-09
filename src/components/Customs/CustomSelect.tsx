import React, { useEffect, useRef, useState } from "react";
import "../../styles/CustomSelect.css"; // Import your custom CSS file
import { NationalityToFlag, handleClickOutside } from "../../utils";
import { useTranslation } from "react-i18next";

interface IProps {
    label: string,
    selectedNationality : string,
    setSelectedNationality: React.Dispatch<React.SetStateAction<string>>,
    ToFlag: NationalityToFlag
    hasAll?: boolean
}

function CustomSelect({label, selectedNationality , setSelectedNationality, ToFlag, hasAll=true} : IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const refList = useRef<HTMLUListElement>(null)
    const {t} = useTranslation();

    const handleOptionSelect = (nationality : string) => {
        setSelectedNationality(nationality);
        setIsOpen(false);
    };

    useEffect(() => {
        handleClickOutside(refList, setIsOpen)
      }, []);

    return (
        <div className="custom-select-container">
            <label htmlFor="search-nationality">{label}</label>
            <div>
                <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                {selectedNationality !== "All" ? <span className={`fi fi-${ToFlag[selectedNationality]}`}></span> : t("All")}
                {isOpen && 
                    <ul ref={refList} className={`options-list`}>
                        {hasAll && <li key={"All"} className={`option ${selectedNationality === "All" ? "selected" : ""}`} onClick={() => handleOptionSelect("All")}>All</li>}
                        {Object.keys(ToFlag).map((nationality) => (
                            <li key={nationality} className={`option ${selectedNationality === nationality ? "selected" : ""}`} onClick={() => handleOptionSelect(nationality)}>
                                <span className={`fi fi-${ToFlag[nationality]}`}></span>
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
        </div>
    );
}

export default CustomSelect;