import { useTranslation } from "react-i18next";
import { DatePicker } from "antd";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { InputType } from "../../types/inputs";

export const DateInput = ({
  defaultValue,
  onChange,
  readonly,
  showTime,
  className,
}: InputType) => {
  const { t } = useTranslation();

  // defaultValue bo'lsa dayjs ga aylantiramiz, aks holda null
  const [value, setValue] = useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue) : null
  );

  // MATCH: second param can be string | string[]
  const handleChange = (date: Dayjs | null, dateString: string | string[]) => {
    setValue(date);

    // dateString ba'zan array bo'lishi mumkin (range), shuning uchun normalizatsiya qilamiz
    const normalized =
      Array.isArray(dateString) ? dateString.join(" - ") : dateString;

    // tashqariga oddiy string yuboramiz (siz xohlasangiz Dayjs yoki Date ham yuborishingiz mumkin)
    onChange?.(normalized);
  };

  return (
    <DatePicker
      showTime={!!showTime}
      format={showTime ? "DD-MM-YYYY HH:mm:ss" : "DD-MM-YYYY"}
      value={value}
      onChange={handleChange}
      disabled={readonly}
      className={`w-full ${className ?? ""}`}
      placeholder={t("DD-MM-YYYY")}
      allowClear
    />
  );
};
