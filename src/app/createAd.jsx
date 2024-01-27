import { useRef, useEffect } from "react";
import Input from "../components/Input";
import { useState } from "react";
import { PopoverPicker } from "../components/popoverPicker";
import data from "../data/data.js"
import Canvas from "../utils/canvas";


const InputComponent = () => {
  
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [color, setColor] = useState("#aabbcc");
  const [adContent, setAdContent] = useState("1 & 2 BHK Luxury Apartments at just Rs.34.97Lakhs");
  const [cta, setCta] = useState("ShopNow");

  useEffect(() => {
    const canvas = document.getElementById("canvas-element");
    const ctx = canvas.getContext("2d");
    const CanvasInstance = new Canvas(ctx, color, adContent, cta, null, data);
  }, [selectedFile, color, adContent, cta]);

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  function handleContentChange(event) {
    setAdContent(event.target.value);
    console.log(adContent);
  }

  function handleCtaChange(event) {
    setCta(event.target.value);
    console.log(cta);
  }

  return (
    <aside className="w-[50%] h-[100%] border">
      <section className="flex flex-col justify-evenly my-16 mx-16 border">
        <div className="text-center m-5">
          <h1 className="font-bold text-4xl">Ad Customization</h1>
          <p className="font-medium text-lg text-gray-500">
            Customise your ad and get the templates accordingly
          </p>
        </div>
        {/* file selector */}
        {/* <p>here will be the file picker</p> */}
        <input
          type="file"
          accept="image/*"
          id="file"
          ref={inputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <button onClick={handleClick}>Open Files</button>
      </section>

      <hr defaultValue="hello" />

      <section className="flex flex-col justify-evenly my-16 mx-16 border">
        <Input
          value={adContent}
          placeholderText="Ad content"
          onChange={() => handleContentChange}
        />
        <Input
          value={cta}
          placeholderText="CTA"
          onChange={() => handleCtaChange}
        />

        {/* color picker */}
        {/* <p>Here will be the color picker</p> */}
        <PopoverPicker
          color={color}
          onChange={setColor}
          className="picker m-2"
        />
      </section>
    </aside>
  );
};

export default InputComponent;
