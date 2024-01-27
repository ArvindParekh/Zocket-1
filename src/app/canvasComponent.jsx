const CanvasComponent = () => {
  const canvas = document.getElementById("canvas-element");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);

  return (
    <aside className="w-[50%] h-[100%] border bg-gray-200 flex items-center justify-center">
      <canvas
        id="canvas-element"
        height={1080}
        width={1080}
        className="w-[40%] h-[40%] bg-white "
      >
        Ad content here
      </canvas>
    </aside>
  );
};

export default CanvasComponent;
