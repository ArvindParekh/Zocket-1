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
  const [colorArr, setColorArr] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("canvas-element");
    const ctx = canvas.getContext("2d");
    const CanvasInstance = new Canvas(ctx, color, adContent, cta, selectedFile, data);
    
  }, [selectedFile, color, adContent, cta]);

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          setSelectedFile(image);
          // canvas.updateImage(image);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  function handleContentChange(event) {
    setAdContent(event.target.value);
    console.log(adContent);
  }

  function handleCtaChange(event) {
    setCta(event.target.value);
    console.log(cta);
  }

  function handleColorChange(color){
    setColor(color)
    setColorArr((prev)=>[...prev, color]);
  }

  return (
    <aside className="w-[50%] h-[100%]">
      <section className="flex flex-col justify-evenly my-16 mx-16">
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

      <section className="flex flex-col justify-evenly my-16 mx-16">
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
          onChange={handleColorChange}
          className="picker m-2"
        />
        {/* {colorArr.map((color, index)=>{
          console.log(colorArr);
          return <button key={index} className={`rounded-full w-10 h-10 bg-[${color}]`}>1</button>
        })} */}
      </section>
    </aside>
  );
};

export default InputComponent;
