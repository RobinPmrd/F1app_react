import React, { useEffect, useRef, useState } from "react"
import { handleClickOutside } from "../../utils";
import "../../styles/InputSuggestion.css"

interface IProps {
    defaultText : string
    data : string[],
    inputValue : string,
    setInputValue : React.Dispatch<React.SetStateAction<string>>
}

function InputSuggestion({defaultText, data, inputValue, setInputValue} : IProps) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    function handleClick(inputValue : string) {
        setInputValue(inputValue);
        setIsVisible(true);
    }

    function showSuggestions(inputValue : string) {
        const filteredDrivers = data.filter(data => data.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredDrivers);
    }

    useEffect(() => {
        handleClickOutside(ref, setIsVisible)
      }, []);

    return (
        <div ref={ref}>
            <input type="text" name="search-name" className="search-name" placeholder={defaultText} autoComplete="off" value={inputValue} onChange={e => handleClick(e.target.value)} onInput={e => showSuggestions((e.target as HTMLInputElement).value)} onClick={e => setIsVisible(true)}/>
            {isVisible && 
            <ul id="suggestionsList" className="suggestionList" onClick={e => setInputValue((e.target as HTMLLIElement).textContent!)}>
                {suggestions.map((name, index) => 
                    <li key={name+index} onClick={() => setIsVisible(false)}>{name}</li>
                    )}
            </ul>}
        </div>
    )
}

export default InputSuggestion