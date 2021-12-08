import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()

    this.bg = createSprite('image_bg1')

    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    this.wh = createSprite('image_wh')


    this.eventHandle()
  }

  init() {
    this.bg.texture = res['image_bg1'].texture
    this._stage.addChild(this.bg)

    this.btnArr.map((v, i) => {
      v.num = 1
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1647.5 + i * 163, 970.5)
    })

    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(1495.5, 333.5)
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {
          if (v.num === 1) {
            this.bg.texture = res['image_bg2'].texture
          } else {
            this.bg.texture = res['image_bg3'].texture
          }
          v.num++
        } else {
          this.init()
        }
      })
    })

    this.wh.on('pointertap', () => {
      getSound('audio_click').play()
      this.wh.interactive = false
      this.wh.texture = res['image_5'].texture
    })
  }

}
