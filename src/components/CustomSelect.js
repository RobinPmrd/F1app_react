import React, { useState } from "react";
import "../styles/CustomSelect.css"; // Import your custom CSS file
import { nationalityToFlag } from "../utils";

function CustomSelect({selectedOption, setSelectedOption}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-select-container">
            <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption !== "All" ? <span className={`fi fi-${nationalityToFlag[selectedOption]}`}></span> : "All"}
                <ul className={`options-list ${isOpen ? "open" : ""}`}>
                    {Object.keys(nationalityToFlag).map((nationality) => (
                        <li key={nationality} className={`option ${selectedOption === nationality ? "selected" : ""}`} onClick={() => handleOptionSelect(nationality)}>
                            <span className={`fi fi-${nationalityToFlag[nationality]}`}></span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomSelect;