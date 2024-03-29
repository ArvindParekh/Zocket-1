import { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

// import useClickOutside from "./useClickOutside";

export const PopoverPicker = (props) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);
  const {color, onChange, ...restprops} = props

//   const close = useCallback(() => toggle(false), []);
//   useClickOutside(popover, close);

  return (
    <div className="picker" {...restprops}>
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle((prev)=>!prev)}
        
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
