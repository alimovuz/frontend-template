import { TimePicker } from "antd";
import { useTranslation } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";
import { useState, type FC } from "react";
import type { InputType } from "./types/inputs";

interface InputProps extends InputType {
  [key: string]: any;
}

export const TimeInput: FC<InputProps> = ({
  defaultValue,
  onChange,
  readonly,
  className,
  ...restProps
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<Dayjs | null>(
    defaultValue ? dayjs(defaultValue, "HH:mm:ss") : null
  );

  const handleChange = (time: Dayjs | null) => {
    setValue(time);
    const formatted = time ? time.format("HH:mm:ss") : "";
    onChange?.(formatted);
  };

  return (
    <TimePicker
      value={value}
      onChange={handleChange}
      readOnly={readonly}
      format="HH:mm:ss"
      className={`w-full ${className ?? ""}`}
      placeholder={t("Select time")}
      allowClear
      {...restProps}
    />
  );
};
