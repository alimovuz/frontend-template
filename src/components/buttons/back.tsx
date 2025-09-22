import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Back({size}: {size?: string}) {
  const navigate = useNavigate();

  const hasHistory = window.history.length > 1;

  if (!hasHistory) {
    return null;
  }

  return (
    <div className={hasHistory ? "" : "d-none"}>
      <FaArrowLeft style={{ cursor: "pointer" }} size={size} onClick={() => navigate(-1)} />
    </div>
  );
}