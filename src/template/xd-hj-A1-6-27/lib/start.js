import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

let that
export default class Start extends Common {
  constructor() {
    super()
    // 问号
    this.wh = createSprite('image_wh')

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    // 文字
    this.text1 = createSprite('image_text1')

    // 箭
    this.arrow = createSprite('image_arrow')

    // 快慢
    this.mArr = [createSprite('image_min'), createSprite('image_max')]

    // ip
    this.ipArr = [createSprite('image_ip1'), createSprite('image_ip2'), createSprite('image_ip3'), createSprite('image_ip4')]

    // ip虚影
    this.ipShadowArr = [createSprite('image_ip1'), createSprite('image_ip2'), createSprite('image_ip3'), createSprite('image_ip4')]

    // 太极
    this.tj = createSprite('image_tj')

    // 阿丘
    this.aq = createSprite('image_aq')

    // 阴影
    this.yy = createSprite('image_yy')

    // 提示
    this.hint = createSprite('image_hint')

    this.grap = new PIXI.Graphics()
    this.grap.beginFill(0xffffff, 0.5)
    this.grap.drawRect(1280, 410, 450, 250)

    this.grap2 = new PIXI.Graphics()
    this.grap2.beginFill(0xff0000, 0.5)
    this.grap2.drawRect(260, 550, 1020, 270)

    that = this
    this.eventHandle()
  }

  init() {
    this.x = 0
    this.y = 0
    this.x2 = 0
    this.y2 = 0
    this.yes = false
    this.ani = getAnimation('animation_27ian')
    this._stage.addChild(createSprite('image_bg'))

    // this._stage.addChild(this.grap)
    // this._stage.addChild(this.grap2)
    // console.log(this.grap2.x, this.grap2.y);

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1268 + i * 162, 970)
    })

    // 文字
    this.text1.anchor.set(0.5)
    this.text1.cursor = 'pointer'
    this.text1.interactive = true
    this._stage.addChild(this.text1)
    this.text1.texture = res['image_text1'].texture
    this.text1.position.set(835.5, 265.5)

    // 问号
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // 太极
    this.tj.anchor.set(0.5)
    this._stage.addChild(this.tj)
    this.tj.position.set(1495, 580)

    // ip虚影
    this.ipShadowArr.map((v, i) => {
      v.alpha = 0.5
      v.anchor.set(0.5)
      v.scale.set(0.9)
      v.visible = false
      this._stage.addChild(v)
      v.position.set(392.5 + i * 226, 894.5)
    })

    // ip
    this.ipArr.map((v, i) => {
      v.dragging = false
      v.anchor.set(0.5)
      v.scale.set(0.9)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(392.5 + i * 226, 894.5)
      v.x2 = v.position.x
      v.y2 = v.position.y
      v.x3 = 0
      v.y3 = 0
    })

    // 阿丘
    this.aq.anchor.set(0.5)
    this._stage.addChild(this.aq)
    this.aq.position.set(135.5, 879)

    // 箭
    this.arrow.anchor.set(0.5)
    this.arrow.visible = false
    this._stage.addChild(this.arrow)
    this.arrow.position.set(767.5, 691.5)

    // 快慢
    this.mArr.map((v, i) => {
      v.alpha = 0
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(123.5 + i * 1303, 688.5)
    })

    // 阴影
    this.yy.visible = false
    this.yy.interactive = true
    this._stage.addChild(this.yy)

    // 提示
    this.hint.anchor.set(0.5)
    this.hint.visible = false
    this._stage.addChild(this.hint)
    this.hint.position.set(960, 540)
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    //** bug: 只能在全屏用
    window.onmousedown = function (e) {
      // console.log(e.x, e.y);
      if (1300 < e.x && e.x < 1710 && 420 < e.y && e.y < 590) {
        that.yes = true
        that.x = e.x
        that.y = e.y

        that.ipArr.map((v, i) => {
          if (v.flag === true) {
            v.x3 = v.position.x
            v.y3 = v.position.y
          }
        })
      } else {
        that.yes = false
      }
    }

    window.onmousemove = function (e) {
      if (that.yes) {
        that.ipArr.map((v, i) => {
          if (v.flag === true) {
            v.position.x = e.x - that.x + v.x3
            v.position.y = e.y - that.y + v.y3
          }
        })
      }
    }

    window.onmouseup = function (e) {
      that.yes = false
    }

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {
          getSound('audio_shoot2').play()
          v.interactive = false
          this._stage.addChild(this.ani)
          this.ani.state.setAnimation(0, 'in', false).listener = {
            complete: () => {
              this.arrow.visible = true
              this.mArr.map(v => v.visible = true)
            }
          }
        } else {
          this._stage.removeChild(this.ani)
          this.init()
        }
      })
    })

    // 文字
    this.text1.on('pointertap', () => {
      this.text1.interactive = false
      this.text1.position.y += 25.5
      this.text1.texture = res['image_text2'].texture
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

    // 快慢
    this.mArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_cong').play()
        v.alpha = 1
        v.interactive = false
      })
    })

    // ip
    this.ipArr.map((v, i) => {
      v.on('pointerdown', this.onDown.bind(this))
        .on('pointermove', this.onMove.bind(this, i))
        .on('pointerup', this.onEnd.bind(this, i))
        .on('pointerupoutside', this.onEnd.bind(this, i))
    })
  }

  onDown(e) {
    let current = e.currentTarget

    current.offset_x = e.data.global.x - current.position.x
    current.offset_y = e.data.global.y - current.position.y

    current.dragging = true

    this._stage.addChild(current)
  }

  onMove(i, e) {
    let current = e.currentTarget
    if (current.dragging) {
      // this.ipShadowArr[i].visible = true

      current.position.x = e.data.global.x - current.offset_x
      current.position.y = e.data.global.y - current.offset_y

      let X = current.position.x
      let Y = current.position.y
      // console.log(X, Y);

      if (1300 < X && X < 1710 && 420 < Y && Y < 590) { // 太极
        current.flag = true
      } else if (350 < X && X < 1235 && 550 < Y && Y < 690) {
        current.flag = 1
      } else {
        current.flag = false
      }
    }
  }

  onEnd(i, e) {
    let current = e.currentTarget
    if (!current.dragging) return
    current.dragging = false
    // console.log(current.x, current.y);
    if (!current.flag) {
      getSound('audio_error').play()
      current.position.set(current.x2, current.y2)
      // this.ipShadowArr[i].visible = false
    } else {
      if (current.flag === 1) {
        if (this.arrow.visible) {
          getSound('audio_cong').play()
          current.position.y = 660
        } else {
          getSound('audio_error').play()
          current.position.set(current.x2, current.y2)
          // this.ipShadowArr[i].visible = false
        }
      } else {
        getSound('audio_cong').play()
      }
    }
  }

}
