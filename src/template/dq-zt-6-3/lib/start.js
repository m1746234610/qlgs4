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
    this.shapeArr = [createSprite('image_shape1'), createSprite('image_shape1'), createSprite('image_shape1'), createSprite('image_shape2')]

    // 算式
    this.equationArr = [createSprite('image_equation1'), createSprite('image_equation2'), createSprite('image_equation3'), createSprite('image_equation4')]

    // 数字
    this.numArr = [createSprite('image_8'), createSprite('image_8'), createSprite('image_8')]

    // 点击区域
    this.bgColor = new PIXI.Graphics()
    this.bgColor.beginFill(0xffffff, 0)
    this.bgColor.drawRect(220, 260, 1230, 790)


    this.eventHandle()
  }

  init() {
    this.num = 0
    this.num2 = 0
    this.num3 = false
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1811, 973.5)

    // 三角形
    this.shapeArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = i === 3 ? true : false
      v.texture = res[`image_shape${i === 3 ? 2 : 1}`].texture
      this._stage.addChild(v)
      v.position.set(625 + i * 180, 179)
    })
    this.shapeArr[3].position.set(1201.5, 174.5)

    // 算式
    this.equationArr.map((v, i) => {
      v.visible = i === 0 ? true : false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      if (i < 1) {
        v.position.set(700.5, 326.5)
      } else {
        v.anchor.set(0, 0.5)
        v.position.set(217, 326.5 + i * 217)
      }
    })

    // 数字
    this.numArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = false
      this._stage.addChild(v)
      v.position.set(628.5 + i * 174, 333)
    })

    // 点击区域
    this.bgColor.num = 1
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
      for (let j = 1; j < this.equationArr.length; j++) {
        if (this.bgColor.num === j) {
          this.equationArr[j].visible = true
          if (j === 3) this.numArr.map(v => v.interactive = true)
          break
        }
      }
      if (this.bgColor.num === 3) this.bgColor.interactive = false
      this.bgColor.num++
    })

    // 三角形
    this.shapeArr[3].on('pointertap', () => {
      getSound('audio_true').play()
      this.shapeArr[3].scale.set(1)
      this.shapeArr[3].interactive = false
      this.shapeArr[3].texture = res['image_shape2L'].texture

      this.ani = getAnimation('animation_xingxing')
      this.ani.position.set(this.shapeArr[3].x, this.shapeArr[3].y + 140)
      this.ani.state.setAnimation(0, 'animation', false)
      this._stage.addChild(this.ani)
    })

    // 数字
    this.numArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        v.interactive = false
        this.shapeArr[i].visible = true
        this.num2++
        if (this.num2 === 3) this.shapeArr[3].visible = true
      })
    })
  }

}
