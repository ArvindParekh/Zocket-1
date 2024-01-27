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
    mask.onload = () => {
      this.ctx.drawImage(mask, maskX, maskY, maskWidth, maskHeight);
    };

    // Layer 4: Mask Stroke
    const maskStroke = new Image();
    maskStroke.src = this.data.urls.stroke;
    maskStroke.onload = () => {
      this.ctx.drawImage(maskStroke, maskX, maskY, maskWidth, maskHeight);
    };

    // Layer 5: Texts
    this.ctx.fillStyle = `${this.data.caption.text_color}`
    this.ctx.font = `${this.data.caption.font_size}px serif`;
    this.ctx.fillText(this.adContent, this.data.caption.position.x, this.data.caption.position.y);

    this.ctx.fillStyle = `${this.data.cta.text_color}`
    this.ctx.font = `${this.data.cta.font_size}px serif`;
    this.ctx.fillText(this.cta, this.data.cta.position.x, this.data.cta.position.y);

  }
}

export default Canvas;
