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
    // 1354.5 394
    this.sayZb = [
      { x: 1192, y: 394 },
      { x: 1200, y: 375.5 },
      { x: 1219, y: 368.5 },
      { x: 1238, y: 375.5 },
      { x: 1246, y: 394 },
      { x: 1238, y: 414 },
      { x: 1219, y: 421.5 },
      { x: 1200, y: 414 }]

    this.btnArrZb = [1065, 1269, 1432.5]

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2'), createSprite('image_btn3')]

    // 图形
    this.ip1 = createSprite('image_ip1')
    this.ip2 = createSprite('image_ip2')
    this.ip3 = createSprite('image_ip3')
    this.ip4 = createSprite('image_ip4')
    this.ip5 = createSprite('image_ip5')
    this.ip6 = createSprite('image_ip6')
    this.ip7 = createSprite('image_ip7')

    // 图形蒙层
    this.ipM1 = createSprite('image_ip6')
    this.ipM3 = createSprite('image_ip7')
    this.ipM5 = createSprite('image_ip5')
    this.ipM6 = createSprite('image_ip6')
    this.ipM7 = createSprite('image_ip7')

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
    this.leftSay = false
    this.rightSay = false
    this.body = false
    this.leftLeg = false
    this.rightLeg = false
    this.ani = getAnimation('animation_long')
    this.ani2 = getAnimation('animation_qingwa')

    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.scale.set(1)
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(this.btnArrZb[i], 969.5)
    })

    // 图形
    this.ipInit(this.ip1, start1, 453, 511.5, 0)
    this.ipInit(this.ip2, start2, 558.5, 511.5, 1)
    this.ipInit(this.ip3, start3, 698.5, 506.5, 2)
    this.ipInit(this.ip4, start4, 802.5, 503.5, 3)
    this.ipInit(this.ip5, start5, 581, 663.5, 4)
    this.ipInit(this.ip6, start6, 804.5, 662.5, 5)
    this.ipInit(this.ip7, start7, 586, 829.5, 6)

    // 图形蒙层
    this.ipMInit(this.ipM1, start6, 1218, 394, 0, 0, 1)
    this.ipMInit(this.ipM3, start7, 1221, 732, 1, Math.PI / 4, -1)
    this.ipMInit(this.ipM5, start5, 1300, 638, 3, Math.PI / 4 * 6, 1)
    this.ipMInit(this.ipM6, start6, 1381, 394, 4, 0, 1)
    this.ipMInit(this.ipM7, start7, 1381, 732, 5, Math.PI / 4 * 7, 1)

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
    window.onclick = function (e) {
      // console.log(e.x);
    }

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        if (i === 1) {
          v.scale.set(1)
          if (this.leftSay === true && this.rightSay === true && this.body === true && this.leftLeg === true && this.rightLeg === true) {
            this.ipInteractive(false)

            getSound('audio_37').play()

            this.ani.state.setAnimation(0, 'talk', true)
            this.ani2.state.setAnimation(0, 'right', false)
            
            this._stage.addChild(this.ani2)
            this._stage.addChild(this.ani)

            this.time = setTimeout(() => {
              this.ani.state.setAnimation(0, 'idle', true)
            }, 2000);
          }
        } else if (i === 2) {
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

    // 图形蒙层
    this.ipM1.on('pointertap', (e) => { // 左眼
      getSound('audio_cong').play()
      if (this.leftSay === false && (this.rightSay === false || this.rightSay === true)) {
        this.leftSay = 1

        this.ip1.num = 0
        this.ip1.rotation = Math.PI / 4 * 0
        this.placeTrue(this.ip1, this.sayZb[0].x, this.sayZb[0].y)
      } else if (this.leftSay === 1) {
        this.leftSay = true
        this.ipM1.interactive = false
        if (this.ip1.interactive) { // 左没放
          // 计算ip2放入的角度
          let num = this.ip2.num

          this.ip1.num = this.ip2.num
          this.ip1.rotation = this.ip2.rotation
          this.placeTrue(this.ip1, this.sayZb[num].x, this.sayZb[num].y)
        } else if (this.ip2.interactive) { // 右没放
          // 计算ip1放入的角度
          let num = this.halfCircleNum(this.ip1.num)

          this.ip2.num = this.ip1.num
          this.ip2.rotation = this.ip1.rotation
          this.placeTrue(this.ip2, this.sayZb[num].x, this.sayZb[num].y)
        }
      } else if (this.leftSay === false && (!this.ip1.interactive || !this.ip2.interactive)) {
        if (this.ip6.interactive) {
          this.leftSay = true
          this.ipM1.interactive = false
          this.placeTrue(this.ip6, 1218, 394)
        }
      }
    })

    this.ipM6.on('pointertap', (e) => { // 右眼
      getSound('audio_cong').play()
      let x = 162.5
      if (this.rightSay === false && (this.leftSay === false || this.leftSay === 1)) {
        this.rightSay = true
        this.ipM6.interactive = false
        this.ip6.num = 0
        this.ip6.rotation = Math.PI / 4 * 0
        this.placeTrue(this.ip6, this.ipM6.x, this.ipM6.y)
      } else if (this.rightSay === 1) {
        this.rightSay = true
        this.ipM6.interactive = false
        if (this.ip1.interactive) { // 左没放
          // 计算ip2放入的角度
          let num = this.ip2.num

          this.ip1.num = this.ip2.num
          this.ip1.rotation = this.ip2.rotation
          this.placeTrue(this.ip1, this.sayZb[num].x + x, this.sayZb[num].y)
        } else if (this.ip2.interactive) { // 右没放
          // 计算ip1放入的角度
          let num = this.halfCircleNum(this.ip1.num)

          this.ip2.num = this.ip1.num
          this.ip2.rotation = this.ip1.rotation
          this.placeTrue(this.ip2, this.sayZb[num].x + x, this.sayZb[num].y)
        }
      } else if (this.rightSay === false && !this.ip6.interactive) {
        this.rightSay = 1

        this.ip1.num = 0
        this.ip1.rotation = Math.PI / 4 * 0
        this.placeTrue(this.ip1, this.sayZb[0].x + 162.5, this.sayZb[0].y)
      } else if (this.leftSay === true && this.ip6.interactive) {
        this.rightSay = true
        this.ipM6.interactive = false
        this.ip6.num = 0
        this.ip6.rotation = Math.PI / 4 * 0
        this.placeTrue(this.ip6, this.ipM6.x, this.ipM6.y)
      }
    })

    this.ipM3.on('pointertap', (e) => { // 左腿
      getSound('audio_cong').play()
      if (this.body === false && this.leftLeg === false && this.rightLeg === false) {
        this.leftLeg = 1
        this.ip3.num = 7
        this.ip3.rotation = Math.PI / 4 * 7
        this.placeTrue(this.ip3, 1245, 758)
      } else if (this.leftLeg === 1) {
        this.leftLeg = true
        this.ipM3.interactive = false
        if (this.ip3.interactive) { // 3没放
          this.ip3.num = 7
          this.ip3.rotation = Math.PI / 4 * 7
          this.placeTrue(this.ip3, 1245, 758)
        } else if (this.ip4.interactive) { // 4没放
          this.ip4.num = 2
          this.ip4.rotation = Math.PI / 4 * 2
          this.placeTrue(this.ip4, 1198, 677)
        }
      } else if (this.body === true && this.ip5.circleX === 1) {
        this.leftLeg = 1
        this.ip3.num = 7
        this.ip3.rotation = Math.PI / 4 * 7
        this.placeTrue(this.ip3, 1245, 758)
      } else if (this.rightLeg === true && !this.ip7.interactive && this.ip7.x > 1200) {
        if (this.leftLeg === false) {
          this.leftLeg = 1
          this.ip3.num = 7
          this.ip3.rotation = Math.PI / 4 * 7
          this.placeTrue(this.ip3, 1245, 758)
        } else {
          if (this.ip3.interactive) { // 3没放
            this.ip3.num = 7
            this.ip3.rotation = Math.PI / 4 * 7
            this.placeTrue(this.ip3, 1245, 758)
          } else if (this.ip4.interactive) { // 4没放
            this.ip4.num = 2
            this.ip4.rotation = Math.PI / 4 * 2
            this.placeTrue(this.ip4, 1198, 677)
          }
        }
      } else if (((this.rightLeg === 1 || this.rightLeg === true) && this.ip7.interactive) || this.body === true && this.ip5.circleX === -1) {
        this.leftLeg = true
        this.ipM3.interactive = false
        this.ip7.num = 2
        this.ip7.circleX = -1
        this.ip7.scale.set(-1, 1)
        this.ip7.rotation = Math.PI / 4
        this.placeTrue(this.ip7, 1221, 732)
      }
    })

    this.ipM7.on('pointertap', (e) => { // 右腿
      getSound('audio_cong').play()
      if (this.body === false && this.leftLeg === false && this.rightLeg === false) {
        this.rightLeg = true
        this.ipM7.interactive = false

        this.ip7.num = 7
        this.ip7.rotation = Math.PI / 4 * 7
        this.placeTrue(this.ip7, 1381, 732)
      } else if (this.rightLeg === 1) {
        this.rightLeg = true
        this.ipM7.interactive = false
        if (this.ip3.interactive) { // 3没放
          this.ip3.num = 3
          this.ip3.rotation = Math.PI / 4 * 3
          this.placeTrue(this.ip3, 11355.5, 758)
        } else if (this.ip4.interactive) { // 4没放
          this.ip4.num = 6
          this.ip4.circleX = -1
          this.ip4.scale.set(-1, 1)
          this.ip4.rotation = Math.PI / 4 * 6
          this.placeTrue(this.ip4, 1402.5, 677)
        }
      } else if (this.body === true && this.ip5.circleX === -1) {
        if (this.rightLeg === false) {
          this.rightLeg = 1
          this.ip3.num = 3
          this.ip3.rotation = Math.PI / 4 * 3
          this.placeTrue(this.ip3, 1355.5, 758)
        } else {
          if (this.ip3.interactive) { // 3没放
            this.ip3.num = 3
            this.ip3.rotation = Math.PI / 4 * 3
            this.placeTrue(this.ip3, 1355.5, 758)
          } else if (this.ip4.interactive) { // 4没放
            this.ip4.num = 6
            this.ip4.circleX = -1
            this.ip4.scale.set(-1, 1)
            this.ip4.rotation = Math.PI / 4 * 6
            this.placeTrue(this.ip4, 1402.5, 677)
          }
        }
      } else if (this.leftLeg === true && this.ip7.interactive) {
        this.rightLeg = true
        this.ipM7.interactive = false

        this.ip7.num = 7
        this.ip7.rotation = Math.PI / 4 * 7
        this.placeTrue(this.ip7, 1381, 732)
      } else if (this.leftLeg === 1 || (this.body === true && this.ip5.circleX === 1)) {
        this.rightLeg = true
        this.ipM7.interactive = false
        this.ip7.num = 7
        this.ip7.rotation = Math.PI / 4 * 7
        this.placeTrue(this.ip7, 1381, 732)
      }
    })

    this.ipM5.on('pointertap', (e) => { // 身体
      getSound('audio_cong').play()
      this.body = true
      this.ipM5.interactive = false
      this.placeTrue(this.ip5, 1300, 638)
      if (((this.leftLeg === false) || (this.leftLeg === 1) || (this.leftLeg === true && this.ip4.x < 1200 && !this.ip4.interactive)) && (this.rightLeg === false || (this.rightLeg === true && this.ip7.x > 1200 && !this.ip7.interactive))) {
        this.ip5.num = 6
        this.ip5.circleX = 1
        this.ip5.scale.set(1)
        this.ip5.rotation = Math.PI / 4 * 6
      } else if ((this.leftLeg === true && !this.ip7.interactive) || (this.rightLeg === 1) || (this.rightLeg === true && this.ip4.x > 1200 && !this.ip4.interactive)) {
        this.ip5.num === 2
        this.ip5.circleX === -1
        this.ip5.scale.set(-1, 1)
        this.ip5.rotation = Math.PI / 4 * 2
      }
    })

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
            console.log();
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
      if (1164 < X && X < 1273 && 340 < Y && Y < 448.5) { // 左眼
        this.leftSay = this.circlePosition(current, 'left', this.leftSay, this.rightSay)
        if (this.leftSay === true) this.ipM1.interactive = false
      }
      if (1325.5 < X && X < 1434.5 && 340 < Y && Y < 448.5) { // 右眼
        this.rightSay = this.circlePosition(current, 'right', this.leftSay, this.rightSay)
        if (this.rightSay === true) this.ipM6.interactive = false
      }
      /* 
        1. 身体先放
          1. X === 1
          2. X === -1

        2. 腿先放
          1. 腿放左边
          2. 腿放右边
      */
      if (1245 < X && X < 1355 && 476 < Y && Y < 824 && current.index === 4) { // 身体
        if (this.leftLeg === false && this.rightLeg === false) { // 身体先放
          if ((current.circleX === 1 && current.num === 6) || (current.num === 2 && current.circleX === -1)) {
            this.body = true
            this.placeTrue(current, 1300, 638)
          }
        } else {
          if (this.leftLeg === 1 || this.bodyCircleX(this.ip7, 1381, 732, 7) || (this.bodyCircleX(this.ip3, 1245, 758, 7) && this.bodyCircleX(this.ip4, 1198, 677, 2) && this.ip4.circleX === 1)) { // circleX只能为1
            if (current.circleX === 1 && current.num === 6) {
              this.body = true
              this.placeTrue(current, 1300, 638)
            }
          } else if (this.rightLeg === 1 || this.bodyCircleX(this.ip7, 1221, 732, 1) || (this.bodyCircleX(this.ip3, 1355.5, 758, 3) && this.bodyCircleX(this.ip4, 1402.5, 677, 6) && this.ip4.circleX === -1)) { // circleX只能为-1
            if (current.num === 2 && current.circleX === -1) {
              this.body = true
              this.placeTrue(current, 1300, 638)
            }
          }
        }

        if (this.body === true) this.ipM5.interactive = false
      }

      if (1150 < X && X < 1244.9 && 597 < Y && Y < 824) { // 左腿
        if (current.index === 6) { // ip7
          this.ip7Position(current, -1, 1, 'left')
        }

        if (current.index === 2 && current.num === 7) { // ip3
          this.ip34LeftPosition(current)
        }

        if (current.index === 3 && current.num === 2 && current.circleX === 1) { // ip4
          this.ip34LeftPosition(current)
        }

        if (this.leftLeg === true) this.ipM3.interactive = false
      }

      if (1355.1 < X && X < 1449 && 597 < Y && Y < 824) { // 右腿
        if (current.index === 6) { // ip7
          this.ip7Position(current, 1, 7, 'right')
        }

        if (current.index === 2 && current.num === 3) { // ip3
          this.ip34RightPosition(current)
        }

        if (current.index === 3 && current.num === 6 && current.circleX === -1) { // ip4
          this.ip34RightPosition(current)
        }

        if (this.rightLeg === true) this.ipM7.interactive = false
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
  circlePosition(current, direction, dir, dir2) {
    /* 
      1. 半圆什么角度都可以放下
      2. 两个半圆要实时做成一个圆
      3. 当一个眼睛有半圆，另一个眼睛不能放半圆
      4. 当一个眼睛有半圆，这个眼睛不能放整圆


      1. 只有为false才能放
      2. 放了之后直接是true
    */
    let num = direction === 'left' ? 0 : 162.5
    let direct
    if (direction === 'left') {
      direct = dir
    } else if (direction === 'right') {
      direct = dir2
    }

    if (current.index === 0) {
      direct = this.halfCirclePosition(current, dir, dir2, direct, direction, num, 0)
    }

    if (current.index === 1) {
      direct = this.halfCirclePosition(current, dir, dir2, direct, direction, num, 1)
    }

    if (current.index === 5) {
      if (direction === 'left' && dir === false) {
        direct = true
        this.placeTrue(current, 1218, 394)
      } else if (direction === 'right' && dir2 === false) {
        direct = true
        this.placeTrue(current, 1381, 394)
      }
    }

    // console.log(direct);
    return direct
  }

  // 计算半圆的位置
  halfCirclePosition(current, dir, dir2, direct, direction, num, index) {
    if (dir === false && dir2 === false) {
      let i = index === 0 ? current.num : this.halfCircleNum(current.num)
      direct = 1

      this.placeTrue(current, this.sayZb[i].x + num, this.sayZb[i].y)
    } else if (dir === 1 && dir2 === false) {
      direct = this.hCPModel1(current, index, direct, num)
    } else if (dir === true && dir2 === false && direction === 'right') {
      let i = index === 0 ? current.num : this.halfCircleNum(current.num)
      direct = 1

      this.placeTrue(current, this.sayZb[i].x + num, this.sayZb[i].y)
    } else if (dir === true && dir2 === 1) {
      direct = this.hCPModel1(current, index, direct, num)
    } else if (dir === false && dir2 === 1) {
      direct = this.hCPModel1(current, index, direct, num)
    } else if (dir === false && dir2 === true && direction === 'left') {
      let i = index === 0 ? current.num : this.halfCircleNum(current.num)
      direct = 1

      this.placeTrue(current, this.sayZb[i].x + num, this.sayZb[i].y)
    } else if (dir === 1 && dir2 === true) {
      direct = this.hCPModel1(current, index, direct, num)
    }
    return direct
  }

  // 计算半圆位置组件1
  hCPModel1(current, index, direct, num) {
    if (index === 0) {
      if (this.ip2.num === current.num) {
        let i = this.ip2.num
        direct = true

        this.placeTrue(current, this.sayZb[i].x + num, this.sayZb[i].y)
      }
    } else if (index === 1) {
      if (this.ip1.num === current.num) {
        let i = this.halfCircleNum(this.ip1.num)
        direct = true

        this.placeTrue(current, this.sayZb[i].x + num, this.sayZb[i].y)
      }
    }
    return direct
  }

  // 计算半圆的num
  halfCircleNum(num) {
    switch (num) {
      case 0: return 4;
      case 1: return 5;
      case 2: return 6;
      case 3: return 7;
      case 4: return 0;
      case 5: return 1;
      case 6: return 2;
      case 7: return 3;
    }
  }

  // 计算身体的circleX
  bodyCircleX(ip, x, y, num) {
    if (ip.x === x && ip.y === y && ip.num === num && ip.interactive === false) {
      return true
    }

    return false
  }

  // 图片放置成功
  placeTrue(current, x, y) {
    current.flag = true
    current.interactive = false
    current.position.set(x, y)
  }

  // ip3、ip4左腿的位置
  ip34LeftPosition(current) {
    if (this.leftLeg === 1) {
      this.leftLeg = true
    } else if (this.leftLeg === false) {
      this.leftLeg = 1
    }

    if (current.index === 2) {
      this.placeTrue(current, 1245, 758)
    } else if (current.index === 3) {
      this.placeTrue(current, 1198, 677)
    }
  }

  // ip3、ip4右腿的位置
  ip34RightPosition(current) {
    if (this.rightLeg === 1) {
      this.rightLeg = true
    } else if (this.rightLeg === false) {
      this.rightLeg = 1
    }

    if (current.index === 2) {
      this.placeTrue(current, 1355.5, 758)
    } else if (current.index === 3) {
      this.placeTrue(current, 1402.5, 677)
    }
  }

  // ip7腿的位置
  ip7Position(current, circleX, num, direction) {
    if (current.circleX === circleX && current.num === num) {
      if (direction === 'left' && this.leftLeg === false) {
        this.leftLeg = true
        this.placeTrue(current, 1221, 732)
      } else if (direction === 'right' && this.rightLeg === false) {
        this.rightLeg = true
        this.placeTrue(current, 1381, 732)
      }
    }
  }

  // 按钮交互
  ipInteractive(flag) {
    for (let i = 1; i < 8; i++) {
      this[`ip${i}`].interactive = this[`ip${i}`].flag === true ? false : flag
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

  // 设置图形蒙层初始位置
  ipMInit(e, start, X, Y, num, rot, scale) {
    const hitAreaShapes = new HitAreaShapes(start)
    e.hitArea = hitAreaShapes


    e.index = num
    e.alpha = 0
    e.scale.x = scale
    e.scale.y = 1
    e.pivot.set(e.width / 2, e.height / 2)
    e.cursor = 'pointer'
    e.interactive = true
    e.rotation = rot
    this._stage.addChild(e)
    e.position.set(X, Y)
  }

}
