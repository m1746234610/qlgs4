import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'
import start1 from './json/start1.json'
import start2 from './json/start2.json'
import start3 from './json/start3.json'
import start4 from './json/start4.json'
import start5 from './json/start5.json'
import start6 from './json/start6.json'
import start7 from './json/start7.json'

export default class Start extends Common {
  constructor() {
    super()
    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    // 图形
    this.ip1 = createSprite('image_ip1')
    this.ip2 = createSprite('image_ip2')
    this.ip3 = createSprite('image_ip3')
    this.ip4 = createSprite('image_ip4')
    this.ip5 = createSprite('image_ip5')
    this.ip6 = createSprite('image_ip6')
    this.ip7 = createSprite('image_ip7')

    // 恐龙
    this.loong = createSprite('image_loong')

    // 问号
    this.wh = createSprite('image_wh')

    // 提示
    this.hint = createSprite('image_hint')

    // 阴影
    this.yy = createSprite('image_yy')


    this.eventHandle()
  }

  init() {
    this.X = 0
    this.Y = 0
    this.num = 0
    this.leftEar = false
    this.rightEar = false
    this.head = false
    this.body = false
    this.leftLeg = false
    this.rightLegEnd = false
    this.tail = false
    this.ani = getAnimation('animation_long')
    this.ani2 = getAnimation('animation_xiyi')
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.scale.set(1)
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1224.5 + i * 208, 972.5)
    })

    // 图形
    this.ipInit(this.ip1, start1, 327, 421, 0)
    this.ipInit(this.ip2, start2, 419.5, 421, 1)
    this.ipInit(this.ip3, start3, 567, 437, 2)
    this.ipInit(this.ip4, start4, 668, 434.5, 3)
    this.ipInit(this.ip5, start5, 406, 598.5, 4)
    this.ipInit(this.ip6, start6, 665, 600, 5)
    this.ipInit(this.ip7, start7, 498, 780.5, 6)

    // 龙
    this.ani.state.setAnimation(0, 'idle', true)
    this.ani.visible = true
    this._stage.addChild(this.ani)

    // 问号
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // 阴影
    this.yy.visible = false
    this.yy.interactive = true
    this._stage.addChild(this.yy)

    // 提示
    this.hint.visible = false
    this.hint.anchor.set(0.5)
    this._stage.addChild(this.hint)
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
        if (i === 1) {
          v.scale.set(1)
          clearTimeout(this.time)
          getSound('audio_37').stop()
          this._stage.removeChild(this.ani)
          this._stage.removeChild(this.ani2)
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
      this._stage.addChild(this.yy)
      this._stage.addChild(this.hint)
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

    this._stage.addChild(current)
    this.btnArr.map(v => this._stage.addChild(v))
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
    if (current.Click) { // 点击
      getSound('audio_cong').play()
      // 判断旋转还是翻转
      if (this.btnArr[0].scale.x === 0.9) { // 翻转
        this.btnArr[0].scale.set(1)
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
      if (928 < X && X < 1057 && 258 < Y && Y < 387) { // 左耳
        this.leftEar = this.halfCirclePosition(current, this.leftEar, 971, 337.5, 7, 3)
      }
      if (1193.5 < X && X < 1322.5 && 258 < Y && Y < 387) { // 右耳
        this.rightEar = this.halfCirclePosition(current, this.rightEar, 1236, 337, 5, 1)
      }
      if (1039.5 < X && X < 1168.5 && 294.5 < Y && Y < 423.5) { // 头
        if (current.index === 5 && this.head !== true) {
          this.head = true
          current.interactive = false
          current.position.set(1104, 359)
        }
      }
      if (1039.5 < X && X < 1168.5 && 357 < Y && Y < 741) { // 身体
        if (current.index === 4 && current.num === 6 && current.circleX === 1) {
          this.body = true
          current.interactive = false
          current.position.set(1104, 549)
        }
      }
      if (955 < X && X < 1137 && 644 < Y && Y < 733) { // 左腿
        if (current.index === 3 && current.num === 5 && current.circleX === 1) {
          this.leftLeg = true
          current.interactive = false
          current.position.set(1046, 708.5)
        }
      }
      if (1160 < X && X < 1300 && 530 < Y && Y < 880) { // 右腿根
        if (current.index === 6 && current.num === 2) {
          this.rightLegEnd = true
          current.interactive = false
          current.position.set(1231, 705)
        }
      }
      if (1250 < X && X < 1350 && 530 < Y && Y < 715) { // 尾巴
        if (current.index === 2 && current.num === 3) {
          this.tail = true
          current.interactive = false
          current.position.set(1297, 624)
        }
      }

      if (this.leftEar && this.rightEar && this.head && this.body && this.leftLeg && this.rightLegEnd && this.tail) {
        this.ipInteractive(false)

        getSound('audio_37').play()

        this.loong.visible = false
        this.ani.state.setAnimation(0, 'talk', true)
        this._stage.addChild(this.ani)

        this.ani2.state.setAnimation(0, 'right', false)
        this.ani2.position.set(600, -20)
        this._stage.addChild(this.ani2)

        this.time = setTimeout(() => {
          this.loong.visible = true
          // this.ani.state.setAnimation(0, 'talk', true)
          // this._stage.addChild(this.ani)

          this.ani.state.setAnimation(0, 'idle', true)
        }, 2000);
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

  // 半圆的位置
  halfCirclePosition(current, direction, X, Y, num, num2) {
    if (current.index === 0 && current.num === num) {
      if (direction !== true) {
        direction = true
        current.interactive = false
        current.position.set(X, Y)
      }
    } else if (current.index === 1 && current.num === num2) {
      if (direction !== true) {
        direction = true
        current.interactive = false
        current.position.set(X, Y)
      }
    }
    return direction
  }

  // 按钮交互
  ipInteractive(flag) {
    for (let i = 1; i < 8; i++) {
      this[`ip${i}`].interactive = flag
    }
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
    this._stage.addChild(e)
    e.position.set(X, Y)
  }

}
