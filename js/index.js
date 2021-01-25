
$('.single-item').slick({
    arrows :false,
    autoplay: true,
    autoplaySpeed:6300,
    dots: true,
    
    
}  );

class Color {
    constructor(r = 0, g = 0, b = 0, a = 1) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
  }
  
  class Vector2 {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }
  
  class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
  }
  
  class Euler {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
  
  // canvas构造器
  class CanvasSystem {
    constructor() {
      this.canvas = undefined;
      this.context = undefined;
      this.timer = undefined;
    }
  
    init(id) {
      let container = document.getElementById(id);
      this.canvas = document.createElement("canvas");
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      container.appendChild(this.canvas);
      this.context = this.canvas.getContext("2d");
  
      return this;
    }
  
    getCenter() {
      return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
    }
  
    // 绘制图形
    draw(fun) {
      fun(this.context);
    }
  
    // 更新图形
    update(fun) {
      let self = this;
      _update();
  
      function _update() {
        self.timer = requestAnimationFrame(_update);
        fun(self.context);
      }
    }
  
    stop() {
      cancelAnimationFrame(this.timer);
      console.warn("cancelAnimationFrame!");
    }
  
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    // 获取像素点
    getPixels(space = 1) {
      let pixels = [];
      let imageData = this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      for (let x = 0; x < imageData.width; x += space) {
        for (let y = 0; y < imageData.height; y += space) {
          let i = (y * imageData.width + x) * 4;
          // 通过rgba中的a判断，透明度大于0.5的点
          if (imageData.data[i + 3] > 128) {
            pixels.push({
              x: x,
              y: y,
              color: new Color(
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
                imageData.data[i + 3]
              )
            });
          }
        }
      }
      console.log(pixels.length);
      return pixels;
    }
  
    
  
    // 绘制图片
    drawImage(img) {
      this.context.drawImage(
        img,
        this.canvas.width / 2 - img.width / 2,
        this.canvas.height / 2 - img.height / 2
      );
    }
  }
  
  // 文字动画
  class AnimateText {
    constructor(options) {
      this.radius = options.radius || 1;
      this.position = options.position || new Vector3();
      this.targetPos = options.targetPos || new Vector3();
      this.color = options.color || new Color();
      this._startPos = this.position.clone();
      this._flag = true;
      this._timer = 0;
    }
  
    draw(ctx, center) {
      const focalLength = 250;
      let scale = (this.position.z + focalLength) / (2 * focalLength);
  
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle =
        "rgba(" +
        this.color.r +
        "," +
        this.color.g +
        "," +
        this.color.b +
        " , 1)";
      ctx.fillRect(
        center.x + (this.position.x - center.x) * scale,
        center.y + (this.position.y - center.y) * scale,
        this.radius * scale * 2,
        this.radius * scale * 2
      );
      ctx.restore();
    }
  
    animate(callback) {
      if (this._flag) {
        this.position.x += (this.targetPos.x - this.position.x) * 0.1;
        this.position.y += (this.targetPos.y - this.position.y) * 0.1;
        this.position.z += (this.targetPos.z - this.position.z) * 0.1;
  
        if (
          Math.abs(this.position.x - this.targetPos.x) < 0.1 &&
          Math.abs(this.position.y - this.targetPos.y) < 0.1 &&
          Math.abs(this.position.z - this.targetPos.z) < 0.1
        ) {
          this._timer += 1;
          if (this._timer > 100) this._flag = false;
        }
      } else {
        this.position.x += (this._startPos.x - this.position.x) * 0.1;
        this.position.y += (this._startPos.y - this.position.y) * 0.1;
        this.position.z += (this._startPos.z - this.position.z) * 0.1;
  
        if (
          Math.abs(this.position.x - this._startPos.x) < 0.1 &&
          Math.abs(this.position.y - this._startPos.y) < 0.1 &&
          Math.abs(this.position.z - this._startPos.z) < 0.1
        ) {
          return callback();
        }
      }
    }
  }
  
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = 'https://hafly.github.io/resources/CodePen/2018-11-09/love2.png'
  
  // 代码逻辑部分开始
  let ele = document.querySelectorAll(".ele"),
    index = 0;
  
  let cs = new CanvasSystem();
  cs.init("container");
  
  const focalLength = 250;
  let dr = 4;
  let balls = [];
  let dnum = 0;
  let center = cs.getCenter();
  
  function getRandom(a, b) {
    return Math.random() * (b - a) + a;
  }
  
  function initBall() {
    dnum = 0;
    balls = [];
    cs.clear();
    if (index >= 4) index = 0;
    if (ele[index].innerHTML.indexOf("img") >= 0) {
      dr = 3;
      cs.drawImage(img);
    } else {
      dr = 4;
      let text = ele[index].innerHTML;
      let ctx = cs.context;
      for (var i = 0; i < text.length; i++) {
        ctx.save();
        var fontSize = Math.random() * 100 + 100;
        ctx.font = fontSize + "px bold";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var code = text.charAt(i);
        ctx.fillStyle =
          "rgba(" +
          parseInt(Math.random() * 125 + 130) +
          "," +
          parseInt(Math.random() * 125 + 130) +
          "," +
          parseInt(Math.random() * 125 + 130) +
          " , 1)";
        ctx.fillText(
          code,
          cs.canvas.width / 2 - (text.length / 2 - i) * 150,
          cs.canvas.height / 2
        );
        ctx.restore();
      }
    }
    index++;
  
    let pixels = cs.getPixels(dr);
    cs.clear();
  
    for (let i = 0; i < pixels.length; i++) {
      let ball = new AnimateText({
        position: new Vector3(
          getRandom(0, cs.canvas.width),
          getRandom(0, cs.canvas.height),
          getRandom(-focalLength, focalLength)
        ),
        targetPos: new Vector3(pixels[i].x, pixels[i].y, 0),
        color: new Color(
          pixels[i].color.r,
          pixels[i].color.g,
          pixels[i].color.b,
          pixels[i].color.a
        ),
        radius: 4
      });
      balls.push(ball);
    }
  }
  
  function render(ctx) {
    // cs.clear();
    ctx.save();
    // 将画布画成带透明度的黑色，不要清除之前的画布，这样就有粒子拖尾效果了
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, cs.canvas.width, cs.canvas.height);
    ctx.restore();
    for (let i = 0; i < balls.length; i++) {
      balls[i].animate(() => {
        dnum++;
        if (dnum >= balls.length) {
          initBall();
        }
      });
      if (balls[i] === undefined) return;
      balls[i].draw(ctx, center);
    }
  }
  
  img.onload=function(){
    initBall();
    cs.update(render);
  }





  