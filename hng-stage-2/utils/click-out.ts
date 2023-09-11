import React from "react";

export const handleClickOutsideEvent = (
  refs: React.RefObject<HTMLElement>[],
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (process.browser) {
    const handleClickOutside = (event: any) => {
      const clickedInsideRef = refs.some((ref) => {
        return ref.current && ref.current.contains(event.target as Node);
      });

      if (!clickedInsideRef) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }
};
