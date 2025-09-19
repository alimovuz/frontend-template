import { useState, type FC } from "react";
import type { InputType } from "../../types/inputs";
import { Input } from "antd";

export const NumberInput:FC<InputType> = ({defaultValue, readonly, className, onChange, placeholder, maxLength}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    setValue(digitsOnly);
    onChange?.(digitsOnly);
  };

  return <Input maxLength={maxLength} readOnly={readonly} className={`${className}`} value={value} onChange={handleChange} placeholder={placeholder} allowClear/>
}