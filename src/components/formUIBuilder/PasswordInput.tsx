import { useTranslation } from "react-i18next";
import type { InputType } from "../../types/inputs";
import { Input } from "antd";
import { useState } from "react";

export const PasswordInput = ({
  onChange,
  defaultValue,
  className,
  placeholder,
  readonly
}: InputType) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value
    setValue(digitsOnly);
    onChange?.(digitsOnly);
  };
  return (
    <div>
      <Input.Password
        placeholder={t(placeholder ?? '')}
        readOnly={readonly}
        className={className}
        value={value}
        onChange={handleChange}
        allowClear
      />
    </div>
  );
};