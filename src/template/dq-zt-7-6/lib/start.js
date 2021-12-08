import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()

    this.ip = createSprite('image_ip')

    this.btn = createSprite('image_btn1')

    this.shapeG = new PIXI.Graphics()
    this.shapeG.beginFill(0xffffff, 0)
    this.shapeG.drawRect(39, 387.5, 1840, 171.5)

    this.ani = getAnimation('animation_kejian6')


    this.eventHandle()
  }

  init() {
    this.aniArr = []
    this._stage.addChild(createSprite('image_bg'))

    this.ani.cursor = 'pointer'
    this.ani.interactive = true
    this.ani.state.setAnimation(0, 'idle', true)
    this._stage.addChild(this.ani)

    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1782.5, 981)

    this.ip.visible = false
    this.ip.anchor.set(0.5)
    this._stage.addChild(this.ip)
    this.ip.position.set(959, 473.5)

    this.shapeG.num = 1
    this.shapeG.cursor = 'pointer'
    this.shapeG.interactive = false
    this._stage.addChild(this.shapeG)
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
      this._stage.removeChild(this.ani)
      this.aniArr.map(v => this._stage.removeChild(v))
      this.init()
    })

    this.ani.on('pointertap', () => {
      getSound('audio_click').play()
      this.ani.state.setAnimation(0, 'animation1', false).listener = {
        complete: () => {
          this.ani.interactive = false
          this.shapeG.interactive = true
          // this.ip.visible = true
        }
      }
    })

    this.shapeG.on('pointertap', () => {
      getSound('audio_click').play()
      this.shapeG.num++
      if (this.shapeG.num === 2) {
        this.aniFun(getAnimation('animation_kejian6'), 2)
      } else if (this.shapeG.num === 3) {
        this.aniFun(getAnimation('animation_kejian6'), 3)
      }
    })
  }

  aniFun(ani, num) {
    console.log(num);
    this.shapeG.interactive = false
    this._stage.removeChild(this.aniArr[this.aniArr.length - 1])
    this.aniArr.push(ani)
    this.aniArr[this.aniArr.length - 1].state.setAnimation(0, `animation${num}`, false).listener = {
      complete: () => {
        this.shapeG.interactive = num === 3 ? false : true
      }
    }
    this._stage.addChild(this.aniArr[this.aniArr.length - 1])
  }

}
