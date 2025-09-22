import React from "react";
import { Row, Col, Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import type { IPageHeader } from "./types";
import { Back } from "../buttons/back";

const PageTitle: React.FC<IPageHeader> = ({ title, actions, style, className, back, breadcrumb }) => {
  const { t } = useTranslation();

  return (
    <Row justify="space-between" align="middle" style={{ marginBottom: 16, ...style }} className={className}>
      <Col>
        <div className="flex items-center gap-2">
          {back && <Back />}
          {breadcrumb && Array.isArray(breadcrumb) && (
            <Breadcrumb items={[
                { title: <Back /> },
                { title: <Link to="/">{t("Home page")}</Link> },
                ...breadcrumb.map(item => ({ title: item.href ? <Link to={item.href}>{t(item.title)}</Link> : <p>{t(item.title)}</p> }))
              ]}
            />
          )}
          {title && !breadcrumb ? ( <p className="font-semibold text-base">{t(title)}</p> ) : null}
        </div>
      </Col>
      {actions && ( <Col><div className="page-header-actions">{actions}</div></Col> )}
    </Row>
  );
};

export default PageTitle;
