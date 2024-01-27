class Canvas {
  constructor(ctx, color, adContent, cta, image, data) {
    this.ctx = ctx;
    this.color = color;
    this.adContent = adContent;
    this.cta = cta;
    this.image = image;
    this.data = data;

    this.initializeCanvas();
  }

  initializeCanvas() {
    this.ctx.clearRect(0, 0, 1080, 1080);

    // Layer 1: Background Image
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, 1080, 1080);

    // Layer 2: Design Pattern
    const designPattern = new Image();
    designPattern.src = this.data.urls.design_pattern;
    designPattern.onload = () => {
      this.ctx.drawImage(designPattern, 0, 0, 1080, 1080);
    };

    // Layer 3: Mask
    const mask = new Image();
    mask.src = this.data.urls.mask;
    const maskX = this.data.image_mask.x;
    const maskY = this.data.image_mask.y;
    const maskWidth = this.data.image_mask.width;
    const maskHeight = this.data.image_mask.height;
    if (this.image) {
      const secondaryCanvas = document.createElement("canvas");
      const secondaryContext = secondaryCanvas.getContext("2d");
      secondaryCanvas.width = maskWidth;
      secondaryCanvas.height = maskHeight;
      secondaryContext.drawImage(mask, 0, 0, maskWidth, maskHeight);
      secondaryContext.globalCompositeOperation = "source-in";
      secondaryContext.drawImage(this.image, 0, 0, maskWidth, maskHeight);
      secondaryContext.globalCompositeOperation = "source-over";
      this.ctx.drawImage(secondaryCanvas, maskX, maskY);
    } else {
      mask.onload = () => {
        this.ctx.drawImage(mask, maskX, maskY, maskWidth, maskHeight);
      };
    }

    // Layer 4: Mask Stroke
    const maskStroke = new Image();
    maskStroke.src = this.data.urls.stroke;
    maskStroke.onload = () => {
      this.ctx.drawImage(maskStroke, maskX, maskY, maskWidth, maskHeight);
    };

    // Layer 5: Texts
    // this.ctx.fillStyle = `${this.data.caption.text_color}`;
    // this.ctx.font = `${this.data.caption.font_size}px serif`;
    // this.ctx.fillText(
    //   this.adContent,
    //   this.data.caption.position.x,
    //   this.data.caption.position.y
    // );

    // const text = this.ctx.measureText(this.cta);
    // const textWidth = text.width;

    // const secondaryCanvas = document.createElement("canvas");
    // secondaryCanvas.width = textWidth;
    // secondaryCanvas.height = 70;
    // const secondaryContext = secondaryCanvas.getContext("2d");

    // secondaryContext.fillStyle = "black";
    // secondaryContext.fillRect(0, 0, textWidth, 100);

    // secondaryContext.fillStyle = `${this.data.cta.text_color}`;
    // secondaryContext.font = `${this.data.cta.font_size * 10}px serif`;
    // secondaryContext.fillText(
    //   this.cta,
    //   0, // Adjust the x-coordinate to be 0
    //   100 / 2 // Adjust the y-coordinate to be half the height of the rectangle
    // );

    // // Draw the secondary canvas onto the main canvas
    // this.ctx.drawImage(
    //   secondaryCanvas,
    //   this.data.cta.position.x,
    //   this.data.cta.position.y
    // );

    // this.drawRect(this.cta, this.data.cta.position.x, this.data.cta.position.y)
    this.drawText();
  }

  drawText() {
    const caption = {
      text: this.adContent,
      position: this.data.caption.position,
      font_size: this.data.caption.font_size,
      alignment: this.data.caption.alignment,
      text_color: this.data.caption.text_color,
      max_characters_per_line: this.data.caption.max_characters_per_line,
    };

    this.drawtextElement(caption);

    const cta = {
      text: this.cta,
      position: this.data.cta.position,
      font_size: this.data.cta.font_size,
      text_color: this.data.cta.text_color,
      alignment: this.data.cta.alignment,
      max_characters_per_line: this.data.cta.max_characters_per_line,
      bgColor: this.data.cta.background_color,
    };
    this.drawCtaElement(cta);
  }

  drawtextElement({
    text,
    position,
    font_size,
    alignment,
    text_color,
    max_characters_per_line,
  }) {
    this.ctx.fillStyle = text_color;
    this.ctx.font = `${font_size}px Arial`;
    this.ctx.textAlign = alignment;

    let lines = [];
    let currentLine = "";
    const words = text.split(" ");

    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const testWidth = this.ctx.measureText(testLine).width;

      if (testWidth > max_characters_per_line * (font_size / 2)) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });

    lines.push(currentLine.trim());

    lines.forEach((line, index) => {
      this.ctx.fillText(line, position.x, position.y + index * font_size * 1.2);
    });
  }

  drawCtaElement({
    text,
    position,
    font_size = 30,
    alignment = "center",
    text_color,
    bgColor,
    max_characters_per_line = 20,
  }) {
    // Calculate rectangle dimensions based on text size
    const { rectWidth, rectHeight, lines } =
      this.calculateDynamicRectDimensions(
        text,
        font_size,
        max_characters_per_line
      );
    const offScreenCanvas = document.createElement("canvas");
    const offScreenContext = offScreenCanvas.getContext("2d");

    // Set the off-screen canvas size
    offScreenCanvas.width = rectWidth;
    offScreenCanvas.height = rectHeight;

    // Clear the off-screen canvas
    offScreenContext.clearRect(0, 0, rectWidth, rectHeight);

    // Draw the rounded rectangle on the off-screen canvas
    offScreenContext.roundRect(0, 0, rectWidth, rectHeight, 10);
    offScreenContext.fillStyle = bgColor;
    offScreenContext.fill();

    // Draw text centered within the rectangle
    offScreenContext.fillStyle = text_color;
    offScreenContext.font = `${font_size}px Arial`;
    offScreenContext.textAlign = alignment;
    offScreenContext.textBaseline = "middle"; // Center text vertically

    const lineHeight = font_size;

    // Calculate vertical position for multiline text
    const totalTextHeight = lines.length * lineHeight;
    const startY = rectHeight / 2 - totalTextHeight / 2;

    lines.forEach((line, index) => {
      const textY = startY + index * lineHeight + lineHeight / 2;
      offScreenContext.fillText(line, rectWidth / 2, textY);
    });

    // Draw the off-screen canvas onto the main canvas
    this.ctx.drawImage(
      offScreenCanvas,
      position.x - rectWidth / 2,
      position.y - rectHeight / 2
    );
  }

  calculateDynamicRectDimensions(text, font_size, max_characters_per_line) {
    const words = text.split(" ");

    let lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const testWidth = this.ctx.measureText(testLine).width;

      if (testWidth > max_characters_per_line * (font_size / 2)) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });

    lines.push(currentLine.trim());

    // Calculate total width and height based on the maximum width and number of lines
    const maxLineWidth = max_characters_per_line * (font_size / 2);
    const totalWidth = Math.min(
      this.ctx.measureText(lines[0]).width,
      maxLineWidth + 40
    );
    const totalHeight = lines.length * font_size;

    // Ensure minimum height
    const minHeight = font_size + 20;
    const rectHeight = Math.max(minHeight, totalHeight + 20);

    return { rectWidth: totalWidth + 40, rectHeight, lines };
  }
}

export default Canvas;
