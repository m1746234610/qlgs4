import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'
import Start from './start'

export default class Start2 extends Common {
  constructor() {
    super()
    this.btnArrZb = [1063.5, 1268.5, 1429, 1589.5]

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn3'), createSprite('image_btn4'), createSprite('image_btn5')]

    this._container = new PIXI.Container


    this.eventHandle()
  }

  init() {
    this._stage.addChild(this._container)
    this._container.addChild(createSprite('image_bg2'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._container.addChild(v)
      v.position.set(this.btnArrZb[i], 973)
    })
  }

  eventHandle() {
    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        if (i === 1) {
          v.scale.set(0.9)
        } else if (i === 3) {
          v.scale.set(0.9)
        }
      }).on('pointerup', () => {
        if (i === 1) {
          v.scale.set(1)
          this._container.visible = false
          new Start().init()
        } else if (i === 3) {
          v.scale.set(1)
          this.init()
        }
      })
    })
  }

}