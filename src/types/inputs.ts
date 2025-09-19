export interface InputType {
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
  maxLength?: number;
  minLenth?: number;
  showTime?: boolean;
};