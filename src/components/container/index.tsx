import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import PageTitle from "./pageTitle";
import checkPermission from "../../utils/check_permission";
import type { IContainer } from "../../types/container";

const Container: React.FC<IContainer> = ({ title, isButton, create_permession, url, onClick, children, buttonTitle, isButtonNone, actions, back, breadcrumb }) => {
  const { t } = useTranslation();

  return (
    <div className={`w-full`}>
        <PageTitle title={title} back={back} breadcrumb={breadcrumb} 
            actions={
                actions ? ( actions ) : !isButtonNone ? (
                <Row gutter={[12, 12]} justify={"start"} align={"middle"}>
                    <Col>
                        <Row gutter={[12, 12]} align={"middle"}>
                            <Col>
                                {isButton ? (
                                    !checkPermission(create_permession) ? (
                                    <Button type="primary" icon={<FaPlus />} onClick={ onClick ? onClick : () => { } }>{ buttonTitle ? t(buttonTitle) : t("Create") }</Button>
                                    ) : null
                                ) 
                                : 
                                checkPermission(create_permession) ? (
                                    <Link to={url ? url : ""} className="primary-btn flex items-center h-8 gap-1">
                                    <FaPlus />
                                    { buttonTitle ? t(buttonTitle) : t("Create") }
                                    </Link>
                                ) : null}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                ) : null
            }
        />
        <div className="mt-2 rounded-xl">{children}</div>
    </div>
  );
};

export default Container;
