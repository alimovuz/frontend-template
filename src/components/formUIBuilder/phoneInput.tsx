import React, { useState, useRef } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import type { InputType } from "../../types/inputs";

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/[^\d+]/g, '');

  // Ensure the number starts with +998
  const withPrefix = cleaned.startsWith('+998') ? cleaned : '+998' + cleaned.replace('+', '');

  // Format the number: +998 (XX) XXX XX XX
  if (withPrefix.length <= 4) return "";
  if (withPrefix.length <= 6) return `+998 (${withPrefix.slice(4)}`;
  // Automatically close parentheses after two digits
  if (withPrefix.length === 6) return `+998 (${withPrefix.slice(4, 6)})`;
  if (withPrefix.length <= 9) return `+998 (${withPrefix.slice(4, 6)}) ${withPrefix.slice(6)}`;
  if (withPrefix.length <= 11) return `+998 (${withPrefix.slice(4, 6)}) ${withPrefix.slice(6, 9)} ${withPrefix.slice(9)}`;
  return `+998 (${withPrefix.slice(4, 6)}) ${withPrefix.slice(6, 9)} ${withPrefix.slice(9, 11)} ${withPrefix.slice(11, 13)}`;
};

export const PhoneInput = ({
  defaultValue,
  onChange,
  placeholder = "+998 (__) ___ __ __",
  readonly,
  className
}: InputType) => {
  const [internal, setInternal] = useState(defaultValue);
  const inputRef = useRef<any>(null);
  const { t } = useTranslation();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setInternal(formatted);
    onChange?.(formatted);
  };

  return (
    <Input ref={inputRef} value={internal} onChange={handleChange} placeholder={t(placeholder ?? '')} readOnly={readonly} className={className} maxLength={20} allowClear />
  );
};