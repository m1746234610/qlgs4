import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor(...a) {
    super(...a)
    this.numArrZb = [188, 375.5, 558, 730, 898, 1069, 1268.5]

    // 抽奖机
    this.ani = getAnimation('animation_kejian5')

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    // 板
    this.ban = createSprite('image_ban')
    this.banY = createSprite('image_banY')

    // 数字
    this.numArr = [createSprite('image_num1'), createSprite('image_num2'), createSprite('image_num3'), createSprite('image_num4'), createSprite('image_num5'), createSprite('image_num6'), createSprite('image_wh')]

    // 线
    this.lineArr = [createSprite('image_line1'), createSprite('image_line2'), createSprite('image_line3')]

    // 算式
    this.mark = createSprite('image_mark')


    this.eventHandle()
  }

  init() {
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1650 + i * 160, 970)
    })
    this.btnArr[0].visible = false

    // 抽奖机
    this.ani.cursor = 'pointer'
    this.ani.interactive = true
    this._stage.addChild(this.ani)
    this.ani.state.setAnimation(0, 'idle', false)

    // 板阴影
    this.banY.visible = false
    this.banY.anchor.set(0.5)
    this._stage.addChild(this.banY)
    this.banY.position.set(740.5, 915)

    // 板
    this.ban.visible = false
    this.ban.anchor.set(0.5)
    this._stage.addChild(this.ban)
    this.ban.position.set(740.5, 510)

    // 算式
    this.mark.visible = false
    this.mark.anchor.set(0.5)
    this._stage.addChild(this.mark)
    this.mark.position.set(722, 402.5)

    // 数字
    this.numArr.map((v, i) => {
      v.flag = false
      v.visible = false
      v.anchor.set(0.5)
      if (i !== 3 && i !== 4 && i !== 5) {
        v.cursor = 'pointer'
        v.interactive = true
      }
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i], 401.5)
    })

    // 动效
    this.aniArr = [getAnimation('animation_kejian5'), getAnimation('animation_kejian5'), getAnimation('animation_kejian5'), getAnimation('animation_kejian5')]
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {
          for (let j = 0; j < 3; j++) {
            if (!this.numArr[j].flag) {
              this.numArr[j].interactive = false
              this.aniFun(j, j + 2)
            }
          }
        } else {
          clearTimeout(this.time)
          this._stage.removeChild(this.ani)
          this.aniArr.map(v => this._stage.removeChild(v))
          this.init()
        }
      })
    })

    // 抽奖机
    this.ani.on('pointertap', () => {
      getSound('audio_click').play()
      this.ani.interactive = false
      this.ani.state.setAnimation(0, 'animation1', false).listener = {
        complete: () => {
          this.time = setTimeout(() => {
            this._stage.removeChild(this.ani)

            this.ban.visible = true
            this.banY.visible = true
            this.mark.visible = true
            this.btnArr[0].visible = true
            this.numArr.map(v => v.visible = true)
          }, 0);
        }
      }
    })

    // 数字
    this.numArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        v.interactive = false
        switch (i) {
          case 0: this.aniFun(0, 2); break
          case 1: this.aniFun(1, 3); break
          case 2: this.aniFun(2, 4); break
          case 6: this.aniFun(3, 6); break
        }
      })
    })
  }

  aniFun(num1, num2) {
    this.numArr[num1].flag = true
    this._stage.addChild(this.aniArr[num1])
    this.aniArr[num1].state.setAnimation(0, `animation${num2}`, false)
    if (num1 === 3) this.numArr[num2].visible = false
  }

}
