import type { IBreadcroumb } from "../../../types/breadcroumb";

interface IPageHeader {
  title?: string;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  back?: boolean;
  breadcrumb?: IBreadcroumb[];
}

type IContainer = {
  title?: any;
  isButton?: boolean;
  create_permession: string;
  url?: string;
  onClick?: () => void;
  children: React.ReactNode;
  buttonTitle?: string;
  isButtonNone?: boolean;
  actions?: React.JSX.Element;
  back?: boolean | undefined;
  breadcrumb?: IBreadcroumb[];
};

export type {IPageHeader, IContainer}