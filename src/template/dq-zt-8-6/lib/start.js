import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'                                                                                                               
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor(...a) {
    super(...a)
    this.numArrZb = [225, 456, 679.5, 981, 1228.5]

    // 抽奖机
    this.ani = getAnimation('animation_kejian6')

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    // 板
    this.ban = createSprite('image_ban')
    this.banY = createSprite('image_banY')

    // 数字  
    this.numArr = [createSprite('image_num1'), createSprite('image_num2'), createSprite('image_num3'), createSprite('image_num4'), createSprite('image_num5')]

    this.wh = createSprite('image_wh')

    // 线
    this.lineArr = [createSprite('image_line1'), createSprite('image_line2')]

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
    this.banY.position.set(960, 915)

    // 板
    this.ban.visible = false
    this.ban.anchor.set(0.5)
    this._stage.addChild(this.ban)
    //          729  515
    this.ban.position.set(960, 486)

    // 算式
    this.mark.visible = false
    this.mark.anchor.set(0.5)
    this._stage.addChild(this.mark)
    this.mark.position.set(723, 541.5)

    // 数字
    this.numArr.map((v, i) => {
      v.flag = false
      v.visible = false
      v.anchor.set(0.5)
      if (i !== 4) {
        v.cursor = 'pointer'
        v.interactive = true
      }
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i], 541.5)
    })

    // 问号
    this.wh.visible = false
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(829, 540.5)

    // 动效
    this.aniArr = [getAnimation('animation_kejian6'), getAnimation('animation_kejian6'), getAnimation('animation_kejian6'), getAnimation('animation_kejian6')]
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
          this.numArr.map(v => v.interactive = false)
          for (let j = 0; j < 2; j++) {
            if (!this.numArr[j].flag) {
              this.aniFun(j, j + 2)
            }
          }
        } else {
          clearTimeout(this.time)
          this._stage.removeChild(this.ani)
          this._stage.removeChild(this.ani2)
          this.aniArr.map(v => this._stage.removeChild(v))
          this.init()

          this._stage.removeChild(this.ani)

          this.wh.visible = true
          this.ban.visible = true
          this.banY.visible = true
          this.mark.visible = true
          this.btnArr[0].visible = true
          this.numArr.map(v => v.visible = true)
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

            this.wh.visible = true
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
        if (i === 0 || i === 3) {
          this.numArr[0].interactive = false
          this.numArr[3].interactive = false
        } else {
          this.numArr[1].interactive = false
          this.numArr[2].interactive = false
        }
        switch (i) {
          case 0: this.aniFun(0, 2); break
          case 1: this.aniFun(1, 3); break
          case 2: this.aniFun(2, 3); break
          case 3: this.aniFun(3, 2); break
        }
      })
    })

    // 问号
    this.wh.on('pointertap', () => {
      getSound('audio_true').play()
      this.wh.visible = false
      this.ani2 = getAnimation('animation_kejian6')
      this._stage.addChild(this.ani2)
      this.ani2.state.setAnimation(0, 'animation5', false)
    })
  }

  aniFun(num1, num2) {
    this.numArr[num1].flag = true
    this._stage.addChild(this.aniArr[num1])
    this.aniArr[num1].state.setAnimation(0, `animation${num2}`, false)
  }

}
