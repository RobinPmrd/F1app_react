import React, { useEffect, useState } from 'react';
import "../styles/SideMenu.css"
import { useTranslation } from 'react-i18next';
import CustomSelect from './Customs/CustomSelect';
import { languageToFlag } from '../utils';

interface IProps {
    onClick?: (value?: string) => void
}

function SideMenu({onClick} : IProps) {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState<string>("en")

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language])

    return (
        <nav className="side-menu">
            <ul className="menu-list" onClick={onClick && ((e) => onClick((e.target as HTMLLIElement).getAttribute("data-value")!))}>
                <li data-value={"Home"}>{t("Home")}</li>
                <li data-value={"Drivers"}>{t("Drivers")}</li>
                <li data-value={"Teams"}>{t("Teams")}</li>
                <li data-value={"Races"}>{t("Races")}</li>
                <li data-value={"Standings"}>{t("Standings")}</li>
            </ul>
          <CustomSelect label='' selectedNationality={language} ToFlag={languageToFlag} setSelectedNationality={setLanguage} hasAll={false}/>
        </nav>
    )
}

export default SideMenu