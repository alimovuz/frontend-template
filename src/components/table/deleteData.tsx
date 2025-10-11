import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CLIENT_API } from "../../services/client.service";
import checkPermission from "../../utils/check_permission";
import { Popconfirm } from "antd";

type TypeDeleteData = {
  children: ReactNode;
  id: number | string;
  url: string;
  permission: string;
  refetch: any;
  className?: string;
  placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  navigateUrl?: string;
  data?: any;
  refetchSecond?: any;
};

const DeleteData: React.FC<TypeDeleteData> = ({
  permission,
  children,
  className,
  url,
  id,
  refetch,
  placement,
  navigateUrl,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationKey: ["delete-data"],
    mutationFn: async () => CLIENT_API.deleteData(url, id),
    onSuccess() {
        navigate(navigateUrl ? navigateUrl : "");
        refetch()
    },
  })

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      {checkPermission(permission) ? (
          <Popconfirm
            title={t("Do you want to delete information?")}
            description={t("Once the data is deleted, it cannot be recovered.")}
            onConfirm={handleDelete}
            okText={t("Yes")}
            cancelText={t("No")}
            placement={placement ?? "bottomLeft"}
            okType="danger">
            <span className={className ?? "flex-center"}>
              {children}
            </span>
          </Popconfirm>
      ) : null}
    </>
  );
};

export default DeleteData;
