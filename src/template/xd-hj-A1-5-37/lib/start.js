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

    this.a = new PIXI.Graphics()
    this.a.beginFill(0x000000, 1)
    // this.a.drawRect(1144.5, 668, 110, 160)
    // 1300 < X && X < 1447 && 597 < Y && Y < 824
    this.a.moveTo(1300, 597)
    this.a.lineTo(1447, 597)
    this.a.lineTo(1447, 824)
    this.a.lineTo(1300, 824)
    this.a.endFill()

    this.eventHandle()
  }

  init() {
    console.log(getSound('audio_a+1-5-37'));
    this.X = 0
    this.Y = 0
    this.num = 0
    this.leftSay = false
    this.rightSay = false
    this.body = false
    this.leftLeg = false
    this.leftLegEnd = false
    this.rightLeg = false
    this.ani = getAnimation('animation_long')
    this.ani2 = getAnimation('animation_qingwa')

    this._stage.addChild(createSprite('image_bg'))
    // this._stage.addChild(this.a)

    // 按钮
    this.btnArr.map((v, i) => {
      v.scale.set(1)
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1269.5 + i * 163, 969.5)
    })

    // 图形
    this.ipInit(this.ip1, start1, 453, 511.5, 0)
    this.ipInit(this.ip2, start2, 558.5, 511.5, 1)
    this.ipInit(this.ip3, start3, 698.5, 506.5, 2)
    this.ipInit(this.ip4, start4, 802.5, 503.5, 3)
    this.ipInit(this.ip5, start5, 581, 663.5, 4)
    this.ipInit(this.ip6, start6, 804.5, 662.5, 5)
    this.ipInit(this.ip7, start7, 586, 829.5, 6)

    // 龙
    // this.loong.visible = true
    // this.loong.anchor.set(0.5)
    // this._stage.addChild(this.loong)
    // this.loong.position.set(187.5, 773)

    this.ani.state.setAnimation(0, 'idle', true)
    this.ani.visible = true
    // this.ani.anchor.set(0.5)
    this._stage.addChild(this.ani)
    // this.ani.position.set(136, 900)
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
          getSound('audio_a+1-5-37').stop()
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
            // console.log(current.num);
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
            // console.log(current.circleX, current.num);
          }
        })
      }
    } else { // 移动
      getSound('audio_cong').play()
      current.position.x = e.data.global.x - current.offset_x
      current.position.y = e.data.global.y - current.offset_y
      let X = current.position.x
      let Y = current.position.y
      if (1164 < X && X < 1273 && 340 < Y && Y < 448.5) { // 左眼
        this.leftSay = this.circlePosition(current, this.leftSay, 1218.5, 394.5, 1218.5, 367.5, 1218.5, 421.5)
      }
      if (1325.5 < X && X < 1434.5 && 340 < Y && Y < 448.5) { // 右眼
        this.rightSay = this.circlePosition(current, this.rightSay, 1380, 394.5, 1380, 367.5, 1380, 421.5)
      }
      if (1137 < X && X < 1461 && 476 < Y && Y < 824) { // 身体
        if (current.index === 4 && current.num === 6 && current.circleX === 1) {
          this.body = true
          current.interactive = false
          current.position.set(1300, 638)
        }
      }
      if (1144.5 < X && X < 1240 && 588 < Y && Y < 748) { // 左腿
        if (current.index === 3 && current.num === 2 && current.circleX === 1) {
          this.leftLeg = true
          current.interactive = false
          current.position.set(1198, 677)
        }
      }
      if (1207 < X && X < 1250 && 681.5 < Y && Y < 814.5) { // 左腿根
        if (current.index === 2 && current.num === 7) {
          this.leftLegEnd = true
          current.interactive = false
          current.position.set(1245, 758)
        }
      }
      if (1300 < X && X < 1447 && 597 < Y && Y < 824) { // 右腿
        if (current.index === 6 && current.num === 7) {
          this.rightLeg = true
          current.interactive = false
          current.position.set(1381, 732)
        }
      }

      if (this.leftSay && this.rightSay && this.body && this.leftLeg && this.leftLegEnd && this.rightLeg) {
        this.ipInteractive(false)

        getSound('audio_a+1-5-37').play()
        

        this.loong.visible = false
        this.ani.state.setAnimation(0, 'talk', true)
        this._stage.addChild(this.ani)

        this.ani2.state.setAnimation(0, 'right', false)
        this.ani2.position.set(570, -20)
        this._stage.addChild(this.ani2)

        this.time = setTimeout(() => {
          this.loong.visible = true
          // this.ani.state.setAnimation(0, 'talk', true)
          // this._stage.addChild(this.ani)
      
          this.ani.state.setAnimation(0, 'idle', true)
        }, 2000);

        // this.time = setTimeout(() => {
        //   this.loong.visible = true
        //   this._stage.removeChild(this.ani)
        // }, 2000);
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

  // 圆和半圆的位置
  circlePosition(current, direction, X, Y, X2, Y2, X3, Y3) {
    if (current.index === 5) {
      if (direction === false) {
        direction = true
        current.interactive = false
        current.position.set(X, Y)
      }
    } else if (current.index === 0 && current.num === 2) {
      if (direction !== true) {
        if (direction === false) {
          direction = 1
        } else if (direction === 1) {
          direction = true
        }
        current.interactive = false
        current.position.set(X2, Y2)
      }
    } else if (current.index === 1 && current.num === 2) {
      if (direction !== true) {
        if (direction === false) {
          direction = 1
        } else if (direction === 1) {
          direction = true
        }
        current.interactive = false
        current.position.set(X3, Y3)
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
