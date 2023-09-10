import React, { useEffect, useState } from 'react';
import "../styles/SideMenu.css"
import { useTranslation } from 'react-i18next';
import CustomSelect from './Customs/CustomSelect';
import { languageToFlag } from '../utils';

interface IProps {
    language: string,
    setLanguage: React.Dispatch<React.SetStateAction<string>>,
    onClick?: (value?: string) => void
}

function SideMenu({language, setLanguage, onClick} : IProps) {
    const {t, i18n} = useTranslation();

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