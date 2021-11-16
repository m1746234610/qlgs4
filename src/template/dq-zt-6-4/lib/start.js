import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor(...a) {
    super(...a)

    // 按钮
    this.btn = createSprite('image_btn1')

    // 三角形
    this.shapeArr = [createSprite('image_shape'), createSprite('image_shape'), createSprite('image_shape'), createSprite('image_shape'), createSprite('image_shape')]

    // 算式
    this.equationArr = [createSprite('image_equation1'), createSprite('image_equation2'), createSprite('image_equation3'), createSprite('image_equation4')]

    // 点击区域
    this.bgColor = new PIXI.Graphics()
    this.bgColor.beginFill(0xffffff, 0)
    this.bgColor.drawRect(220, 260, 1230, 790)


    this.eventHandle()
  }

  init() {
    this.num = 0
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1811, 973.5)

    // 三角形
    this.shapeArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      v.texture = res['image_shape'].texture
      this._stage.addChild(v)
      v.position.set(625 + i * 180, 179)
    })

    // 算式
    this.equationArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      if (i < 1) {
        v.position.set(792, 326.5)
      } else {
        v.anchor.set(0, 0.5)
        v.position.set(217, 326.5 + i * 217)
      }
    })

    // 点击区域
    this.bgColor.num = 0
    this.bgColor.cursor = 'pointer'
    this.bgColor.interactive = true
    this._stage.addChild(this.bgColor)

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
      this.init()
    })

    this.bgColor.on('pointertap', () => {
      getSound('audio_click').play()
      if (this.bgColor.num === 0) {
        this.bgColor.interactive = this.num === this.shapeArr.length ? true : false
        this.equationArr[0].visible = true
        // # not defined

      } else if (this.bgColor.num === 1) {
        this.equationArr[1].visible = true
      } else if (this.bgColor.num === 2) {
        this.equationArr[2].visible = true
      } else if (this.bgColor.num === 3) {
        this.bgColor.interactive = false
        this.equationArr[3].visible = true
      }
      this.bgColor.num++
    })

    // 三角形
    this.shapeArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        v.interactive = false
        v.texture = i === this.shapeArr.length - 1 ? res['image_shape2'].texture : res['image_shape1'].texture

        this.num++
        if (this.num === this.shapeArr.length) this.bgColor.interactive = true
      })
    })
  }

}
