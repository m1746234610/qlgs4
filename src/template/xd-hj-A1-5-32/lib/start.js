import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'
import Start2 from './start2'

export default class Start extends Common {
  constructor() {
    super()
    this.btnArrZb = [859, 1017.5, 1223, 1428]

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2'), createSprite('image_btn4'), createSprite('image_btn5')]

    // 问号
    this.wh = createSprite('image_wh')

    // 提示
    this.hint = createSprite('image_hint')

    // 恐龙
    this.loong = getAnimation('animation_long')

    this._container = new PIXI.Container


    this.eventHandle()

    // this._container.visible = false
    // new Start2().init()
  }

  init() {
    this.loong = getAnimation('animation_long')

    this._stage.addChild(this._container)
    this._container.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.scale.set(1)
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._container.addChild(v)
      v.position.set(this.btnArrZb[i], 969.5)
    })

    // 问号
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = false
    this._container.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // 龙
    this.loong.state.setAnimation(0, 'idle', true)
    this.loong.visible = true
    this.loong.scale.set(1.7)
    this._container.addChild(this.loong)
    this.loong.position.set(-250, -350)

    // 提示
    this.hint.visible = false
    this.hint.anchor.set(0.5)
    this._container.addChild(this.hint)
    this.hint.position.set(960, 540)
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
        v.scale.set(1)
        if (i === 0) {
          v.interactive = false
          this.loong.state.setAnimation(0, 'talk', true)
          getSound('audio_32').play()
          this.time = setTimeout(() => {
            v.interactive = true
            this.loong.state.setAnimation(0, 'idle', true)
          }, Number(getSound('audio_32').duration.toFixed(3) * 1000));

        } else if (i === 1) {
          clearTimeout(this.time)
          getSound('audio_32').stop()
          this._container.visible = false
          new Start2().init()
        } else if (i === 3) {
          clearTimeout(this.time)
          getSound('audio_32').stop()
          this.init()
        }
      })
    })

    // 问号
    this.wh.on('pointerdown', () => {
      getSound('audio_cong').play()
      this.wh.scale.set(0.9)
    }).on('pointerup', () => {
      this.wh.scale.set(1)
      this.hint.visible = true
    })
  }

}
