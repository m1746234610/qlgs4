import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'
import { Graphics } from 'pixi.js'

export default class Start extends Common {
  constructor(...a) {
    super(...a)
    this.numArrint = [true, false, false, false, false]
    this.numArrZb = [{ x: 593.5, y: 586.5 }, { x: 943, y: 586.5 }, { x: 484, y: 799 }, { x: 705, y: 799 }, { x: 825.5, y: 991.5 }]

    this.lineArrZb = [{ x: 595, y: 711 }, { x: 836, y: 803.5 }]

    // 按钮
    this.btnArr = [createSprite('image_btn1')]

    // 数字
    this.numArr = [createSprite('image_ip1'), createSprite('image_ip2'), createSprite('image_ip3'), createSprite('image_ip4'), createSprite('image_ip5')]

    // 符号
    this.markArr = [createSprite('image_mark1'), createSprite('image_mark2')]

    // 线
    this.lineArr = [createSprite('image_line1'), createSprite('image_line2')]

    // 物品
    this.goodsArr = [
      createSprite('image_goods1'), createSprite('image_goods1'),
      createSprite('image_goods1'),
      createSprite('image_goods2'), createSprite('image_goods2'),
      createSprite('image_goods2'), createSprite('image_goods2'),
      createSprite('image_goods2'), createSprite('image_goods2'),
      createSprite('image_goods2'), createSprite('image_goods2'),
      createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2')]

    // 问号
    this.wh = createSprite('image_wh')

    // 红色
    this.red = createSprite('image_red')


    this.eventHandle()
  }

  init() {
    this._stage.addChild(createSprite('image_bg'))

    this.red.alpha = 0
    this.red.anchor.set(0.5)
    this.red.cursor = 'pointer'
    this.red.interactive = true
    this._stage.addChild(this.red)
    this.red.position.set(930, 511.5)

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1810, 972.5)
    })

    // 线
    this.lineArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      v.position.set(this.lineArrZb[i].x, this.lineArrZb[i].y)
    })

    // 数字
    this.numArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = this.numArrint[i]
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i].x, this.numArrZb[i].y)
    })

    // 符号
    this.markArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      v.position.set(768 + i * 358, 579.5)
    })

    // 问号
    this.wh.visible = false
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this.wh.texture = res['image_wh'].texture
    this._stage.addChild(this.wh)
    this.wh.position.set(1292.5, 579.5)

    // 物品
    this.goodsArr.map((v, i) => {
      v.flag = true
      v.visible = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      this._stage.addChild(v)
      if (i < 3) {
        v.position.set(469 + i * 103.5, 165)
      } else {
        v.texture = res['image_goods2'].texture
        if (i < 9) {
          v.position.set(880 + (i - 3) * 103.5, 191.5)
        } else {
          v.position.set(467.5 + (i - 9) * 103.5, 374.5)
        }
      }

      if (i > 1) {
        v.interactive = true
      }
    })
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15
    // 按钮
    this.btnArr.map(v => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        this.init()
      })
    })

    // 数字
    this.numArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {
          for (let j = 1; j < 3; j++) {
            this.numArr[j].interactive = true
          }
          this.numArr[2].visible = true
          this.numArr[3].visible = true
          this.lineArr[0].visible = true
        } else if (i === 1 || i === 2) {
          this.lineArr[1].visible = true
          this.numArr[4].visible = true
        }
      })
    })

    // 问号
    this.wh.on('pointerdown', () => {
      getSound('audio_click').play()
      this.wh.scale.set(0.9)
    }).on('pointerup', () => {
      this.wh.scale.set(1)
      this.wh.interactive = false
      this.wh.texture = res['image_28'].texture
    })

    // 物品
    this.goodsArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        if (i === 2) {
          v.visible = false
          this.goodsArr.map((v, i) => { if (i > 2) v.visible = true })
        } else if (i > 2) {
          v.flag = !v.flag
          if (v.flag) {
            v.texture = res['image_goods2'].texture
          } else {
            v.texture = res['image_goods2X'].texture
          }
        }
      })
    })

    // red
    this.red.on('pointertap', () => {
      getSound('audio_click').play()
      this._stage.removeChild(this.red)

      this.wh.visible = true
      this.numArr[0].visible = true
      this.numArr[1].visible = true
      this.markArr.map(v => { v.visible = true })
      this.goodsArr.map((v, i) => { v.visible = i < 9 ? true : false })
    })
  }

}
