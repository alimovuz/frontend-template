import { Dropdown, type MenuProps } from "antd";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { MEDIA_URL } from "../../config/constants";

export default function Profile() {
  const { t } = useTranslation();
  const { logout, currentUser } = useAuth()

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/user-profile" className="flex items-center w-[100px] r-text-primary">
          <FaCircleUser style={{ width: 20, height: 20 }} />
          <span className="ms-2">
            {t("Profile")}
          </span>
        </Link>
      ),
    },
    {
      key: "2",
      onClick: logout,
      label: (
        <div className="flex items-center w-[100px] r-text-primary">
          <LuLogOut style={{ width: 20, height: 20 }} />
          <span className="ms-2">{t("LogOut")}</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <div className="flex items-center gap-2 cursor-pointer mr-2 h-[32px]">
        {currentUser?.user?.[0]?.photo ? (
          <img
            src={currentUser?.user?.[0]?.photo && `${MEDIA_URL}${currentUser?.user?.[0]?.photo}`}
            alt="img"
            className="w-[32px] h-[32px] rounded-full"
          />) : (<FaUserCircle className="w-[32px] h-[32px] rounded-full" />)}
        <div className="text-sm font-medium">
          {currentUser?.user?.[0]?.surname || "ADMIN"} {currentUser?.user?.[0]?.name?.charAt(0)} {currentUser?.user?.[0]?.middle_name?.charAt(0)}
        </div>
      </div>
    </Dropdown>
  );
}
