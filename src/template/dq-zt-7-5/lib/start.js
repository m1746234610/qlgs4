import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    this.markArrZb = [384.5, 628, 869, 1108, 1339, 1577.5]
    this.numArrZb = [255.5, 505.5, 750.5, 985.5, 1220.5, 1450.5, 1696]

    this.btn = createSprite('image_btn1')

    this.numArr = [createSprite('image_5'), createSprite('image_5'), createSprite('image_7'), createSprite('image_3'), createSprite('image_10'), createSprite('image_10'), createSprite('image_wh')]

    this.markArr = [createSprite('image_mark1'), createSprite('image_mark1'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark2'), createSprite('image_mark3')]

    this.shapeG = new PIXI.Graphics()
    this.shapeG.beginFill(0xffffff, 0)
    this.shapeG.drawRect(180.5, 404.5, 1570, 150)

    this.ani = getAnimation('animation_kejian5')


    this.eventHandle()
  }

  init() {
    this.aniArr = []
    this._stage.addChild(createSprite('image_bg'))

    this.ani.cursor = 'pointer'
    this.ani.interactive = true
    this.ani.state.setAnimation(0, 'idle', true)
    this._stage.addChild(this.ani)

    this.shapeG.num = 1
    this.shapeG.cursor = 'pointer'
    this.shapeG.interactive = false
    this._stage.addChild(this.shapeG)

    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1782.5, 981)

    this.markArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      v.position.set(this.markArrZb[i], 479.5)
    })

    this.numArr.map((v, i) => {
      v.visible = false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i], 479.5)
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
      clearTimeout(this.time)
      this._stage.removeChild(this.ani)
      this._stage.removeChild(this.ani2)
      this._stage.removeChild(this.ani3)
      this.aniArr.map(v => this._stage.removeChild(v))
      this.init()
    })

    this.ani.on('pointertap', () => {
      getSound('audio_click').play()
      this.ani.state.setAnimation(0, 'animation1', false).listener = {
        complete: () => {
          this.time = setTimeout(() => {
            this.shapeG.interactive = true
            this._stage.removeChild(this.ani)
          }, 0);
          this.numArr.map(v => v.visible = true)
          this.markArr.map(v => v.visible = true)
        }
      }
    })

    this.shapeG.on('pointertap', () => {
      getSound('audio_click').play()
      this.numArr.map(v => v.visible = false)
      this.markArr.map(v => v.visible = false)
      this.shapeG.num++
      switch (this.shapeG.num) {
        case 2:
          this.aniFun(getAnimation('animation_kejian5'), 2)
          break
        case 3:
          this.aniFun(getAnimation('animation_kejian5'), 3)
          break
        case 4:
          this.shapeG.num++
          this.aniFun(getAnimation('animation_kejian5'), 4)
          break
        case 6:
          this.aniFun(getAnimation('animation_kejian5'), 6)
          break
      }
    })
  }

  aniFun(ani, num) {
    this.shapeG.interactive = false
    this._stage.removeChild(this.aniArr[this.aniArr.length - 1])
    this.aniArr.push(ani)
    if (num === 4) {
      this.ani2 = getAnimation('animation_kejian5')
      this.ani3 = getAnimation('animation_kejian5')
      this.ani2.state.setAnimation(0, `animation4`, false)
      this.ani3.state.setAnimation(0, `animation5`, false).listener = {
        complete: () => {
          this.shapeG.interactive = num === 6 ? false : true
        }
      }
      this._stage.addChild(this.ani2)
      this._stage.addChild(this.ani3)

      this.numArr[this.numArr.length - 1].visible = true
      this.markArr[this.markArr.length - 1].visible = true
    } else {
      this.aniArr[this.aniArr.length - 1].state.setAnimation(0, `animation${num}`, false).listener = {
        complete: () => {
          this.shapeG.interactive = num === 6 ? false : true
        }
      }
      this._stage.addChild(this.aniArr[this.aniArr.length - 1])
    }
  }

}
