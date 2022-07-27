import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Tooltip({ children, position }) {
  const [popoverShow, setPopoverShow] = useState(false);
  const pos = position || "bottom-left";
  const openTooltip = () => {
    setPopoverShow(true);
  };
  const closeTooltip = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center relative">
          <InformationCircleIcon
            onMouseEnter={openTooltip}
            onMouseLeave={closeTooltip}
            className="w-4 h-4 "
          />
          <div
            className={
              (pos.includes("right") ? " -left-3/4 " : " -right-3/4 ") +
              (pos.includes("top") ? " bottom-full " : " top-full ") +
              (popoverShow ? "" : "hidden ") +
              "absolute rounded-lg bg-black bg-opacity-70  z-50 font-normal leading-normal w-max max-w-xs text-sm  break-words "
            }
          >
            <div className="text-white p-2 normal-case">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
