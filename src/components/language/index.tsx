import { Button, Dropdown, type MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { LuLanguages } from "react-icons/lu";
import i18next from "../../config/i18n";
import type { FC, JSX } from "react";

interface LanguageProps {
  className?: string;
}

const Language: FC<LanguageProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18next.changeLanguage(lang, () => {});
    localStorage.setItem('I18N_LANGUAGE', lang);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => changeLanguage("uz")} className="flex items-center w-full">
          <span className="ms-2">O'zbek</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => changeLanguage("kr")} className="flex items-center w-full">
          <span className="ms-2">Кирилл</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => changeLanguage("ru")} className="flex items-center w-full">
          <span className="ms-2">Русский</span>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => changeLanguage("en")} className="flex items-center w-full">
          <span className="ms-2">English</span>
        </div>
      ),
    },
  ];

  const languageIcons: { [key: string]: JSX.Element } = {
    uz: (
      <div className="flex justify-between gap-2 items-center">
        <LuLanguages size={18} />
        <span>Uz</span>
      </div>
    ),
    kr: (
      <div className="flex justify-between gap-2 items-center">
        <LuLanguages size={18} />
        <span>Кр</span>
      </div>
    ),
    ru: (
      <div className="flex justify-between gap-2 items-center">
        <LuLanguages size={18} />
        <span>Ру</span>
      </div>
    ),
    en: (
      <div className="flex justify-between gap-2 items-center">
        <LuLanguages size={18} />
        <span>En</span>
      </div>
    ),
  };

  return (
    <Dropdown className={`language ${className}`} menu={{ items }} trigger={["click"]} placement="bottomRight" >
      <Button>{languageIcons[i18n.language]}</Button>
    </Dropdown>
  );
};

export default Language;
