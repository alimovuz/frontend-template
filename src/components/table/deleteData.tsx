import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CLIENT_API } from "../../services/client.service";
import checkPermission from "../../utils/check_permission";
import { message, Popconfirm } from "antd";

type TypeDeleteData = {
  children: ReactNode;
  id: number | string;
  url: string;
  permission: string;
  refetch?: ReturnType<typeof useQuery<any>>['refetch'];
  placement?: "left" | "right" | "top" | "bottom" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  navigateUrl?: string;
  data?: any;
};

const DeleteData: React.FC<TypeDeleteData> = ({ permission, children, url, id, refetch, placement, navigateUrl, data }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate } = useMutation({
    mutationKey: ["delete-data"],
    mutationFn: async () => CLIENT_API.deleteData(url, id, data),
    onSuccess() {
        navigate(navigateUrl ? navigateUrl : "");
        if (refetch) refetch();
        message.success(t("Information deleted successfully"));
    },
    onError() {
        message.error(t("An error occurred while deleting the information"));
    }
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
            <span className={"flex-center"}>{children}</span>
          </Popconfirm>
      ) : null}
    </>
  );
};

export default DeleteData;
