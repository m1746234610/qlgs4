import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'
import Start from './start'
import start1 from './json/start1.json'
import start2 from './json/start2.json'
import start3 from './json/start3.json'
import start4 from './json/start4.json'
import start5 from './json/start5.json'
import start6 from './json/start6.json'
import start7 from './json/start7.json'

export default class Start2 extends Common {
  constructor() {
    super()
    this.btnArrZb = [1017.5, 1223, 1428]

    // 按钮
    this.btnArr = [createSprite('image_btn3'), createSprite('image_btn4'), createSprite('image_btn5')]

    // 图形
    this.ip1 = createSprite('image_ip1')
    this.ip2 = createSprite('image_ip2')
    this.ip3 = createSprite('image_ip3')
    this.ip4 = createSprite('image_ip4')
    this.ip5 = createSprite('image_ip5')
    this.ip6 = createSprite('image_ip6')
    this.ip7 = createSprite('image_ip7')

    // 问号
    this.wh = createSprite('image_wh')

    // 提示
    this.hint = createSprite('image_hint')

    // 阴影
    this.yy = createSprite('image_yy')

    this._container = new PIXI.Container


    this.eventHandle()
  }

  init() {
    this.X = 0
    this.Y = 0
    this.num = 0
    this.num1 = false
    this.num2 = false
    this.num3 = false
    this.num4 = false
    this.num5 = false
    this.num6 = false
    this.num7 = false
    this._stage.addChild(this._container)
    this._container.addChild(createSprite('image_bg2'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.scale.set(1)
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._container.addChild(v)
      v.position.set(this.btnArrZb[i], 969.5)
    })

    // 图形
    this.ipInit(this.ip1, start1, 300.5, 443, 0)
    this.ipInit(this.ip2, start2, 405, 443, 1)
    this.ipInit(this.ip3, start3, 556, 443, 2)
    this.ipInit(this.ip4, start4, 670, 443, 3)
    this.ipInit(this.ip5, start5, 351, 624, 4)
    this.ipInit(this.ip6, start6, 595, 624, 5)
    this.ipInit(this.ip7, start7, 444, 814, 6)

    // 问号
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._container.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // 阴影
    this.yy.visible = false
    this.yy.interactive = true
    this._container.addChild(this.yy)

    // 提示
    this.hint.visible = false
    this.hint.anchor.set(0.5)
    this._container.addChild(this.hint)
    this.hint.position.set(990, 540)
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_cong').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        if (i === 0) {
          v.scale.set(1)
          this._container.visible = false
          new Start().init()
        } else if (i === 2) {
          v.scale.set(1)
          clearTimeout(this.time)
          getSound('audio_a+1-5-37').stop()
          this._container.removeChild(this.ani)
          this._container.removeChild(this.ani2)
          this.init()
        }
      })
    })

    // 图形
    for (let i = 1; i < 8; i++) {
      this[`ip${i}`].on('pointerdown', this.onDown.bind(this))
        .on('pointermove', this.onMove.bind(this))
        .on('pointerup', this.onEnd.bind(this))
        .on('pointerupoutside', this.onEnd.bind(this))
    }

    // 问号
    this.wh.on('pointerdown', () => {
      getSound('audio_cong').play()
      this.wh.scale.set(0.9)
    }).on('pointerup', () => {
      this.wh.scale.set(1)
      this.yy.visible = true
      this.hint.visible = true
      this._container.addChild(this.yy)
      this._container.addChild(this.hint)
    })

    // 阴影
    this.yy.on('pointertap', () => {
      this.yy.visible = false
      this.hint.visible = false
    })
  }

  onDown(e) {
    let current = e.currentTarget

    current.offset_x = e.data.global.x - current.position.x
    current.offset_y = e.data.global.y - current.position.y

    this.X = e.data.global.x
    this.Y = e.data.global.y

    current.dragging = true
    current.Click = true

    this._container.addChild(current)
    this.btnArr.map(v => this._container.addChild(v))
  }

  onMove(e) {
    let current = e.currentTarget
    if (current.dragging) {
      current.position.x = e.data.global.x - current.offset_x
      current.position.y = e.data.global.y - current.offset_y

      let X = current.position.x
      let Y = current.position.y

      if (this.X - 5 < X && X < this.X + 5 && this.Y - 5 < Y && Y < this.Y + 5) { // 点击
        current.Click = true
      } else { // 移动
        current.Click = false
      }
    }
  }

  onEnd(e) {
    let current = e.currentTarget
    if (!current.dragging) return
    current.dragging = false

    console.log(current.position.x, current.position.y, current.width / 2, current.height / 2);

    if (current.Click) { // 点击
      getSound('audio_cong').play()
      // 判断旋转还是翻转
      if (this.btnArr[1].scale.x === 0.9) { // 翻转
        this.btnArr[1].scale.set(1)
        current.circleX *= -1
        this.ipInteractive(false)
        TweenMax.to(current.scale, 0.5, {
          x: current.circleX,
          ease: Power0.easeOut,
          onComplete: () => {
            this.rotate(current)
            this.ipInteractive(true)
          }
        })
      } else { // 旋转
        let circle = current.rotation + Math.PI / 4
        this.ipInteractive(false)
        TweenMax.to(current, 0.5, {
          rotation: circle,
          ease: Power0.easeOut,
          onComplete: () => {
            this.ipInteractive(true)
            current.num = current.num === 7 ? 0 : current.num + 1
          }
        })
      }
    } else { // 移动
      getSound('audio_cong').play()
      current.position.x = e.data.global.x - current.offset_x
      current.position.y = e.data.global.y - current.offset_y
      let X = current.position.x
      let Y = current.position.y
      if (1034.5 < X && X < 1169.5 && 377 < Y && Y < 513 && !this.num1) {
        if ((current.index === 0 && current.num === 7) || (current.index === 1 && current.num === 3)) {
          this.num1 = this.placePosition(current, 1078.5, 474)
        }
      }
      if (1114.5 < X && X < 1183.5 && 778.5 < Y && Y < 913.5 && !this.num2) {
        if ((current.index === 0 && current.num === 2) || (current.index === 1 && current.num === 6)) {
          this.num2 = this.placePosition(current, 1149, 846)
        }
      }
      if (1080.5 < X && X < 1215.5 && 566.5 < Y && Y < 701.5) {
        if (current.index === 2 && current.num === 1) {
          this.num3 = this.placePosition(current, 1148, 634)
        }
      }
      if (1251.5 < X && X < 1478.5 && 550.5 < Y && Y < 685.5) {
        if (current.index === 3 && current.num === 5) {
          this.num4 = this.placePosition(current, 1365, 618)
        }
      }
      if (800 < X && X < 1156 && 506.5 < Y && Y < 641.5) {
        if (current.index === 4 && current.num === 7) {
          this.num5 = this.placePosition(current, 978, 574)
        }
      }
      if (1080.5 < X && X < 1215.5 && 656 < Y && Y < 792) {
        if (current.index === 5) {
          this.num6 = this.placePosition(current, 1148, 724)
        }
      }
      if (1050 < X && X < 1406 && 413.5 < Y && Y < 548.5) {
        if (current.index === 6 && current.num === 5) {
          this.num7 = this.placePosition(current, 1228, 481)
        }
      }
    }
  }

  // 旋转
  rotate(e) {
    if (e.index === 0 || e.index === 1) { // 圆翻转
      switch (e.num) {
        case 0: e.num = 4; break
        case 1: e.num = 5; break
        case 2: e.num = 6; break
        case 3: e.num = 7; break
        case 4: e.num = 0; break
        case 5: e.num = 1; break
        case 6: e.num = 2; break
        case 7: e.num = 3; break
      }
    } else if (e.index === 2) { // 三角形翻转
      if (e.circleX === -1) {
        switch (e.num) {
          case 0: e.num = 2; break
          case 1: e.num = 3; break
          case 2: e.num = 4; break
          case 3: e.num = 5; break
          case 4: e.num = 6; break
          case 5: e.num = 7; break
          case 6: e.num = 0; break
          case 7: e.num = 1; break
        }
      } else if (e.circleX === 1) {
        switch (e.num) {
          case 0: e.num = 6; break
          case 1: e.num = 7; break
          case 2: e.num = 0; break
          case 3: e.num = 1; break
          case 4: e.num = 2; break
          case 5: e.num = 3; break
          case 6: e.num = 4; break
          case 7: e.num = 5; break
        }
      }
    } else if (e.index === 3) { // 多边形翻转
      // 不用计算，因为正确答案只有一种
    } else if (e.index === 4) { // 多边形翻转
      // 不用计算，因为正确答案只有一种
    } else if (e.index === 5) { // 圆
      // 不用计算，因为正确答案不会变
    } else if (e.index === 6) { // 多边形翻转
      // 不用计算，因为正确答案只有一种
    }
  }

  // 按钮交互
  ipInteractive(flag) {
    this.ip1.interactive = this.num1 === true ? false : flag
    this.ip2.interactive = this.num2 === true ? false : flag
    this.ip3.interactive = this.num3 === true ? false : flag
    this.ip4.interactive = this.num4 === true ? false : flag
    this.ip5.interactive = this.num5 === true ? false : flag
    this.ip6.interactive = this.num6 === true ? false : flag
    this.ip7.interactive = this.num7 === true ? false : flag
  }

  // 设置图形初始位置
  ipInit(e, start, X, Y, num) {
    const hitAreaShapes = new HitAreaShapes(start)
    e.hitArea = hitAreaShapes

    e.num = 0
    e.flag = false
    e.index = num
    e.circleX = 1
    e.Click = true
    e.dragging = false
    e.scale.set(1)
    e.pivot.set(e.width / 2, e.height / 2)
    e.cursor = 'pointer'
    e.interactive = true
    e.rotation = 0
    this._container.addChild(e)
    e.position.set(X, Y)
  }

  // 放置位置
  placePosition(current, x, y) {
    current.interactive = false
    current.position.set(x, y)
    return true
  }

}
