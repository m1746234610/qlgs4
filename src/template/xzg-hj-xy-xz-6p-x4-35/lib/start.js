import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    this.arr6 = []
    this.arr8 = []

    // 垃圾桶
    this.bin = createSprite('image_bin')

    // 重置
    this.btn = createSprite('image_reset')

    // ip1
    this.ip1Arr = [createSprite('image_ip1')]

    // ip2
    this.ip2Arr = [createSprite('image_ip2')]

    // 圆
    this.circle = createSprite('image_circle')


    this.eventHandle()
  }

  init() {
    this.x = 0
    this.y = 0
    this.arr6 = []
    this.arr8 = []
    this._stage.addChild(createSprite('image_bg'))

    // 重置
    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1804, 964.5)

    // 垃圾桶
    this.bin.anchor.set(0.5)
    this._stage.addChild(this.bin)
    this.bin.position.set(1581, 931.5)

    // ip1
    this.ip1Arr.map((v, i) => {
      v.id = 6
      v.index = i
      v.Click = true
      v.dragging = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(394.5, 883)
      this.arr6.push(this.getCircle(6, 217, 572, 883, i))
    })

    // ip2
    this.ip2Arr.map((v, i) => {
      v.id = 8
      v.index = i
      v.Click = true
      v.dragging = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(989, 883)
      this.arr8.push(this.getCircle(8, 745, 1233, 883, i))
    })
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    // 重置
    this.btn.on('pointerdown', () => {
      getSound('audio_click').play()
      this.btn.scale.set(0.9)
    }).on('pointerup', () => {
      this.btn.scale.set(1)
      this.init()
    })

    // 木棒
    this.ip1Arr.map((v, i) => {
      v.on('pointerdown', this.onDown.bind(this, i))
        .on('pointermove', this.onMove.bind(this, i))
        .on('pointerup', this.onEnd.bind(this))
        .on('pointerupoutside', this.onEnd.bind(this))
    })

    this.ip2Arr.map((v, i) => {
      v.on('pointerdown', this.onDown.bind(this, i))
        .on('pointermove', this.onMove.bind(this, i))
        .on('pointerup', this.onEnd.bind(this))
        .on('pointerupoutside', this.onEnd.bind(this))
    })

    // 圆
    this.arr6.map((v, i) => {
      v.map((v2, j) => {
        v2.on('pointerdown', this.onDown2.bind(this, j))
          .on('pointermove', this.onMove2.bind(this, j))
          .on('pointerup', this.onEnd2.bind(this, j))
          .on('pointerupoutside', this.onEnd2.bind(this, j))
      })
    })
  }

  // ==================木棒
  onDown(i, e) {
    let current = e.currentTarget

    current.offset_x = e.data.global.x - current.position.x
    current.offset_y = e.data.global.y - current.position.y

    this.x = e.data.global.x
    this.y = e.data.global.y

    current.dragging = true

    if (current.id === 6 && current.x === 394.5 && current.y === 883) {
      this.ip1Arr.push(this.getStick(1, 6, this.ip1Arr.length, 394.5, 883))
      this.arr6.push(this.getCircle(6, 217, 572, 883, i))

      // this._stage.addChild(current)
      // this._stage.addChild(this.arr6[current.index][0])
      // this._stage.addChild(this.arr6[current.index][1])
    } else if (current.id === 8 && current.x === 989 && current.y === 883) {
      this.ip2Arr.push(this.getStick(2, 8, this.ip2Arr.length, 989, 883))
      this.arr8.push(this.getCircle(8, 745, 1233, 883, i))

      this._stage.addChild(current)
      this._stage.addChild(this.arr8[current.index][0])
      this._stage.addChild(this.arr8[current.index][1])
    }

    console.log(current.index);
    console.log(this.arr6);
    console.log(this.ip1Arr);
  }

  onMove(i, e) {
    let current = e.currentTarget
    if (current.dragging) {
      current.position.x = e.data.global.x - current.offset_x
      current.position.y = e.data.global.y - current.offset_y

      let x = current.position.x
      let y = current.position.y

      console.log(current.index);

      // 让圆跟着移动
      if (current.id === 6) {
        this.arr6[i][0].position.set(x - current.width / 2 + 25, y)
        this.arr6[i][1].position.set(x + current.width / 2 - 25, y)
      } else if (current.id === 8) {
        this.arr8[i][0].position.set(x - current.width / 2 + 25, y)
        this.arr8[i][1].position.set(x + current.width / 2 - 25, y)
      }

      if (this.x - 5 < x && x < this.x + 5 && this.y - 5 < y && y < this.y + 5) { // 点击
        current.Click = true
      } else { // 移动
        current.Click = false
        // 如果是移动了，就让当前木棒左右的圆交互生效
        if (current.id === 6) {
          this.arr6[i][0].interactive = true
          this.arr6[i][1].interactive = true
        } else if (current.id === 8) {
          this.arr8[i][0].interactive = true
          this.arr8[i][1].interactive = true
        }
      }
    }
  }

  onEnd(e) {
    let current = e.currentTarget
    if (!current.dragging) return
    current.dragging = false
    console.log(current.index);
    if (current.Click) { // 点击
      if (current.id === 6) {
        this.ip1Arr.splice(this.ip1Arr.length - 1, 1)
        this.arr6.splice(this.arr6.length - 1, 1)
      } else if (current.id === 8) {
        this.ip2Arr.splice(this.ip2Arr.length - 1, 1)
        this.arr8.splice(this.arr8.length - 1, 1)
      }
      // console.log('点击');
    } else { // 移动
      console.log('移动');
    }
    console.log(this.arr6, this.arr6[0][0].index, this.arr6[0][1].index)
    console.log(this.ip1Arr, this.ip1Arr[0].index)

    current.Click = true
  }

  // ==================圆
  onDown2(i, e) {
    let current = e.currentTarget

    current.offset_x = e.data.global.x - current.position.x
    current.offset_y = e.data.global.y - current.position.y

    current.dragging = true

    if (i === 0) { // 左

    } else if (i === 1) { // 右

    }
  }

  onMove2(i, e) {

  }

  onEnd2(i, e) {

  }


  // 添加圆
  getCircle(num, x, x2, y, index) {
    let circle = [createSprite('image_circle'), createSprite('image_circle')]
    circle.map((v, j) => {
      v.id = num
      v.index = index
      v.dragging = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = false
      v.position.y = y
      this._stage.addChild(v)
      v.on('pointerdown', this.onDown2.bind(this, j))
        .on('pointermove', this.onMove2.bind(this, j))
        .on('pointerup', this.onEnd2.bind(this, j))
        .on('pointerupoutside', this.onEnd2.bind(this, j))
    })

    circle[0].dir = 'left'
    circle[1].dir = 'right'

    circle[0].position.x = x
    circle[1].position.x = x2

    return circle
  }

  // 添加木棒
  getStick(num, id, i, x, y) {
    console.log(i);
    let stick = createSprite(`image_ip${num}`)
    stick.id = id
    stick.index = i
    stick.Click = true
    stick.dragging = false
    stick.anchor.set(0.5)
    stick.cursor = 'pointer'
    stick.interactive = true
    stick.position.set(x, y)
    this._stage.addChild(stick)
    stick.on('pointerdown', this.onDown.bind(this, i))
      .on('pointermove', this.onMove.bind(this, i))
      .on('pointerup', this.onEnd.bind(this))
      .on('pointerupoutside', this.onEnd.bind(this))

    return stick
  }

  // 让指针可以转动
  zhenmove(evt) {
    let currentTarget = evt.currentTarget;
    let dx = evt.data.global.x - currentTarget.x;
    let dy = evt.data.global.y - currentTarget.y;

    // 正切角度转换
    let radian = Math.atan2(dy, dx); // 根据x,y坐标，求出正切比例

    //旋转角度设置  (通过正切比例加上 Math.PI / 2（四分之一圆）等于分针应该旋转的角度)
    let rotation = radian + Math.PI / 2; // **让分针跟着鼠标进行旋转

    rotation = Math.PI * 2 + rotation

    currentTarget.rotation = rotation // 把分针因该转动的角度赋值给分针的rotation


    // **rotation在第二象限会变成负数
    // if (rotation <= 0) {
    //   rotation = Math.PI * 2 + rotation
    // }

  }

}
