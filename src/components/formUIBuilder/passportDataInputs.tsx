import { Input } from "antd"
import { useState, type FC } from "react"
import type { InputType } from "../../types/inputs";

export const PassportSeria:FC<InputType> = ({defaultValue, readonly, className, onChange, placeholder}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lettersOnly = e.target.value.replace(/[^a-zA-Z]/g, "");
    setValue(lettersOnly.toUpperCase());
    onChange?.(lettersOnly);
  };

  return <Input maxLength={2} readOnly={readonly} className={`${className}`} value={value} onChange={handleChange} placeholder={placeholder || "AA"} allowClear/>
}

export const PassportNumber:FC<InputType> = ({defaultValue, readonly, className, onChange, placeholder}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    setValue(digitsOnly);
    onChange?.(digitsOnly);
  };

  return <Input maxLength={7} readOnly={readonly} className={`${className}`} value={value} onChange={handleChange} placeholder={placeholder || "1234567"} allowClear/>
}

export const PassportPNFL: FC<InputType> = ({ defaultValue, readonly, className, onChange, placeholder }) => {
  const [value, setValue] = useState(defaultValue || "");

  const formatPNFL = (digits: string) => {
    const parts = [];
    if (digits.length > 0) parts.push(digits.substring(0, 4));
    if (digits.length > 4) parts.push(digits.substring(4, 8));
    if (digits.length > 8) parts.push(digits.substring(8, 12));
    if (digits.length > 12) parts.push(digits.substring(12, 14));
    return parts.join(" ");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "").slice(0, 14);
    const formatted = formatPNFL(digitsOnly);
    setValue(formatted);
    onChange?.(digitsOnly);
  };

  return (
    <Input  maxLength={19}  readOnly={readonly}  className={className}  value={value}  onChange={handleChange}  placeholder={placeholder || "1234 5678 9012 12"} allowClear/>
  );
};
