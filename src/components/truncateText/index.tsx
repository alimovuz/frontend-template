import { Popover } from "antd";

type TruncateTextProps =  {
  text?: string;
  maxLength: number;
  placement?: "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | "left" | "leftTop" | "leftBottom" | "right" | "rightTop" | "rightBottom";
}

export const TruncateText: React.FC<TruncateTextProps> = ({ text = "", maxLength, placement = "left" }) => {
  if (!text || text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text.substring(0, maxLength - 1) + "...";

  return (
    <Popover className="cursor-pointer" title={text} placement={placement} trigger="hover" overlayInnerStyle={{ minWidth: "700px", maxWidth: "700px" }}>
      <span>{truncatedText}</span>
    </Popover>
  );
};