import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import { Graphics } from 'pixi.js'
import Common from './index'

export default class Start extends Common {
  constructor(...a) {
    super(...a)
    this.numArrint = [true, false, false, false, false]

    this.numArrZb = [{ x: 628, y: 443 }, { x: 944, y: 443 }, { x: 550.5, y: 657.5 }, { x: 707.5, y: 657.5 }, { x: 749.5, y: 862.5 }]

    this.lineArrZb = [{ x: 629.5, y: 575.5 }, { x: 755, y: 665 }]

    // 按钮
    this.btnArr = [createSprite('image_btn1')]

    // 数字
    this.numArr = [createSprite('image_ip1'), createSprite('image_ip2'), createSprite('image_ip3'), createSprite('image_ip4'), createSprite('image_ip5')]

    // 符号
    this.markArr = [createSprite('image_mark')]
    // this.markArr = [createSprite('image_mark1'), createSprite('image_mark2')]

    // 线
    this.lineArr = [createSprite('image_line1'), createSprite('image_line2')]

    // 物品
    this.goodsArr = [
      createSprite('image_goods1'), createSprite('image_goods1'), createSprite('image_goods1'), createSprite('image_goods1'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2'), createSprite('image_goods2')]

    // 问号
    this.wh = createSprite('image_wh')

    // 红色
    this.red = new PIXI.Graphics()
    this.red.beginFill(0xffffff, 0)
    this.red.drawRect(0, 0, 1920, 1080)


    this.eventHandle()
  }

  init() {
    this._stage.addChild(createSprite('image_bg'))

    this.red.cursor = 'pointer'
    this.red.interactive = true
    this._stage.addChild(this.red)

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
      v.scale.set(0.9)
      v.anchor.set(0.5)
      v.visible = false
      this._stage.addChild(v)
      v.position.set(this.lineArrZb[i].x, this.lineArrZb[i].y)
    })
    this.lineArr[1].scale.set(0.89)

    // 数字
    this.numArr.map((v, i) => {
      v.scale.set(0.88)
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = this.numArrint[i]
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i].x, this.numArrZb[i].y)
    })
    this.numArr[4].scale.set(1)

    // 符号
    this.markArr.map((v, i) => {
      v.scale.set(0.9)
      v.anchor.set(0.5)
      v.visible = false
      this._stage.addChild(v)
      v.position.set(944, 440)
    })

    // 问号
    this.wh.scale.set(0.9)
    this.wh.anchor.set(0.5)
    this.wh.visible = false
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this.wh.texture = res['image_wh'].texture
    this._stage.addChild(this.wh)
    this.wh.position.set(1247.5, 433)

    // 物品
    this.goodsArr.map((v, i) => {
      v.flag = true
      v.scale.set(0.9)
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      if (i < 4) {
        v.position.set(570.5 + i * 130.5, 172.5)
        v.texture = res['image_goods1'].texture
      } else {
        v.position.set(1107.5 + (i - 4) * 45.5, 201)
        v.texture = res['image_goods2'].texture
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
        this._stage.removeChild(this.ani)
        clearTimeout(this.time)
        clearTimeout(this.time2)
        clearTimeout(this.time3)
        clearTimeout(this.time4)

        this.init()
      })
    })

    // 数字
    this.numArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.8)
      }).on('pointerup', () => {
        v.scale.set(0.9)
        v.interactive = false
        if (i === 0) {
          for (let j = 1; j < 3; j++) {
            this.numArr[j].interactive = true
          }

          this.ani = getAnimation('animation_xinzhitansuo2')
          this._stage.addChild(this.ani)
          this.ani.state.setAnimation(0, '1', false).listener = {
            complete: () => {
              this.time2 = setTimeout(() => {
                this._stage.removeChild(this.ani)

                this.numArr[2].visible = true
                this.numArr[3].visible = true
                this.lineArr[0].visible = true
              }, 0);
            }
          }
        } else if (i === 1 || i === 2) {
          this.numArr[1].interactive = false
          this.numArr[2].interactive = false

          this.ani = getAnimation('animation_xinzhitansuo2')
          this._stage.addChild(this.ani)
          this.ani.state.setAnimation(0, '2', false).listener = {
            complete: () => {
              this.time3 = setTimeout(() => {
                this._stage.removeChild(this.ani)

                this.lineArr[1].visible = true
                this.numArr[4].visible = true
              }, 0);
            }
          }

        }
      })
    })

    // 问号
    this.wh.on('pointerdown', () => {
      getSound('audio_click').play()
      this.wh.scale.set(0.8)
    }).on('pointerup', () => {
      this.wh.scale.set(0.9)
      // this.wh.visible = false
      this.wh.interactive = false
      this.wh.texture = res['image_26'].texture

      // this.ani = getAnimation('animation_xinzhitansuo2')
      // this._stage.addChild(this.ani)
      // this.ani.state.setAnimation(0, '3', false).listener = {
      //   complete: () => {
      //     this.time4 = setTimeout(() => {
      //       this._stage.removeChild(this.ani)
      //       this.wh.visible = true
      //       this.wh.visible = true
      //       this.wh.interactive = false
      //       this.wh.texture = res['image_26'].texture
      //     }, 0);
      //   }
      // }
    })

    // 物品
    this.goodsArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_click').play()
        v.flag = !v.flag
        if (i < 4) {
          if (v.flag) {
            v.texture = res['image_goods1'].texture
          } else {
            v.texture = res['image_goods1X'].texture
          }
        } else {
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
      this.goodsArr.map(v => { v.visible = true })

      // this.ani = getAnimation('animation_xinzhitansuo2')
      // this._stage.addChild(this.ani)
      // this.ani.state.setAnimation(0, 'in', false).listener = {
      //   complete: () => {
      //     this.time = setTimeout(() => {
      //       this._stage.removeChild(this.ani)

      //       this.wh.visible = true
      //       this.numArr[0].visible = true
      //       this.numArr[1].visible = true
      //       this.markArr.map(v => { v.visible = true })
      //       this.goodsArr.map(v => { v.visible = true })
      //     }, 0);
      //   }
      // }
    })
  }

}
