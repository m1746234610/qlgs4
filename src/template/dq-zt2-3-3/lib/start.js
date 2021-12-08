import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    this.markArrNum = [1, 2, 3, 2, 3]
    this.markArrZb = [723, 567, 879.5, 567, 879.5]

    this.btn = createSprite('image_btn1')

    this.area = createSprite('image_area')

    this.markArr = [createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark3'), createSprite('image_mark2'), createSprite('image_mark3')]

    // 南瓜
    this.nangua = createSprite('image_nangua')


    this.eventHandle()
  }

  init() {
    this._stage.addChild(createSprite('image_bg'))

    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1810, 972)

    this.area.flag = false
    this.area.anchor.set(0.5)
    this.area.cursor = 'pointer'
    this.area.interactive = true
    this._stage.addChild(this.area)
    this.area.position.set(1290.5, 570.5)

    // 南瓜
    this.nangua.visible = true
    this.nangua.anchor.set(0.5)
    this._stage.addChild(this.nangua)
    this.nangua.position.set(1290.5, 570.5)

    this.markArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.texture = res[`image_mark${this.markArrNum[i]}`].texture
      if (i === 0) {
        v.position.set(this.markArrZb[i], 264)
      } else {
        v.position.set(this.markArrZb[i], 406 + (i - 1) * 100.5)
      }
    })
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    this.btn.on('pointerdown', () => {
      getSound('audio_click').play()
      this.btn.scale.set(0.9)
    }).on('pointerup', () => {
      this.btn.scale.set(1)
      TweenMax.killAll()
      this._stage.removeChild(this.ani)
      this.init()
    })

    this.area.on('pointertap', () => {
      getSound('audio_click').play()
      this.nangua.visible = false
      this.area.interactive = false
      this.area.flag = !this.area.flag
      this._stage.removeChild(this.ani)
      if (this.area.flag) {
        this.aniFun(1)
      } else {
        this.aniFun(2)
      }
    })

    this.markArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        v.interactive = false
        v.texture = res[`image_mark${i + 1 + 'L'}`].texture
      })
    })
  }

  aniFun(num) {
    this.ani = getAnimation(`animation_nangua00${num}`)
    this._stage.addChild(this.ani)
    this.ani.state.setAnimation(0, `00${num}`, false).listener = {
      complete: () => {
        this.area.interactive = true
      }
    }
  }

}