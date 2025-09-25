"use client";

import { CustomButtonProps } from "@/types";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  type,
}: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={type}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className="flex-1"></span>
      {title}
    </button>
  );
};

export default CustomButton;
