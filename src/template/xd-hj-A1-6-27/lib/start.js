import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    // 问号
    this.wh = createSprite('image_wh')

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2')]

    // 箭
    this.arrow = createSprite('image_arrow')

    // 快慢
    this.mArr = [createSprite('image_min'), createSprite('image_max')]

    // ip
    this.ipArr = [createSprite('image_ip1'), createSprite('image_ip2'), createSprite('image_ip3'), createSprite('image_ip4')]

    // 阴影
    this.yy = createSprite('image_yy')

    // 提示
    this.hint = createSprite('image_hint')


    this.eventHandle()
  }

  init() {
    this.ani = getAnimation('animation_27ian')
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1268 + i * 162, 970)
    })

    // 问号
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // ip
    this.ipArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(392.5 + i * 226, 894.5)
    })

    // 箭
    this.arrow.anchor.set(0.5)
    this.arrow.visible = false
    this._stage.addChild(this.arrow)
    this.arrow.position.set(767.5, 691.5)

    // 快慢
    this.mArr.map((v, i) => {
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

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {

        } else {
          this._stage.removeChild(this.ani)
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
      this.yy.visible = true
      this.hint.visible = true
    })

    // 阴影
    this.yy.on('pointertap', () => {
      this.yy.visible = false
      this.hint.visible = false
    })

  }

}
