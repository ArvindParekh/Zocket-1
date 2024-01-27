

const CanvasComponent = () => {


  return (
    <aside className="w-[50%] h-[100%] border bg-gray-200 flex items-center justify-center">
      <canvas
        id="canvas-element"
        height="1080px"
        width="1080px"
        className="w-[90%] h-[90%] bg-white "
      >
        Ad content here
      </canvas>
    </aside>
  );
};

export default CanvasComponent;
