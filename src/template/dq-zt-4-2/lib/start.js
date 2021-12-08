import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    this.numArrZb = [478, 713, 948, 1178.5, 1427]
    this.markArrZb = [595.5, 832, 1062.5, 1302]

    this.btn = createSprite('image_btn1')

    this.markArr = [createSprite('image_mark1'), createSprite('image_mark1'), createSprite('image_mark1'), createSprite('image_mark2')]

    this.numArr = [createSprite('image_num1'), createSprite('image_num2'), createSprite('image_num2'), createSprite('image_num3'), createSprite('image_wh')]

    this.ani = getAnimation('animation_kejian3')

    this.aniArr = [getAnimation('animation_kejian3'), getAnimation('animation_kejian3'), getAnimation('animation_kejian3'), getAnimation('animation_kejian3'), getAnimation('animation_kejian3'), getAnimation('animation_kejian3'), getAnimation('animation_kejian3')]

    this.eventHandle()
  }

  init() {
    this.numTrue = 0
    this._stage.addChild(createSprite('image_bg'))


    this.aniArr.map(v => { v.alpha = 0; this._stage.addChild(v) })

    this.ani.cursor = 'pointer'
    this.ani.interactive = true
    this._stage.addChild(this.ani)
    this.ani.state.setAnimation(0, 'idle', true)

    this.btn.anchor.set(0.5)
    this.btn.cursor = 'pointer'
    this.btn.interactive = true
    this._stage.addChild(this.btn)
    this.btn.position.set(1747, 967)

    this.markArr.map((v, i) => {
      v.anchor.set(0.5)
      v.visible = false
      this._stage.addChild(v)
      v.position.set(this.markArrZb[i], 356)
    })


    this.numArr.map((v, i) => {
      v.alpha = 0
      v.visible = false
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(this.numArrZb[i], 348.5)
    })
    this.numArr[this.numArr.length - 1].texture = res['image_wh'].texture
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
      for (let i = 1; i < 7; i++) clearTimeout(this[`time${i}`])
      for (let i = 0; i < this.aniArr.length - 1; i++) this._stage.removeChild(this.aniArr[i])
      this._stage.removeChild(this.ani)
      this.init()
      this._stage.removeChild(this.ani)
      this.markArr.map(v => v.visible = true)
      this.numArr.map(v => { v.visible = true; v.alpha = 1 })
    })

    this.ani.on('pointertap', () => {
      getSound('audio_click').play()
      this.ani.interactive = false
      this.ani.state.setAnimation(0, 'animation1', false).listener = {
        complete: () => {
          this.time6 = setTimeout(() => {
            this._stage.removeChild(this.ani)
            this.markArr.map(v => v.visible = true)
            this.numArr.map(v => { v.visible = true; v.alpha = 1 })
          }, 0);
        }
      }
    })

    this.numArr.map((v, i) => {
      v.on('pointertap', () => {
        if (i === 3) {
          this.numTrue++
          switch (this.numTrue) {
            case 1: this.aniFun(3, 2, i); break
            case 2: this.aniFun(4, 3, i); break
            case 3: this.aniFun(5, 4, i); break
          }
          if (this.numTrue === 3) v.interactive = false
        } else if (i === 4) {
          getSound('audio_true').play()
          this.numArr[4].visible = false
          this.aniFun(6, 9, i)
        } else {
          if (this.numTrue !== 3) {
            getSound('audio_error').play()
            this.huangdong(v)
            return
          } else {
            switch (i) {
              case 0: this.aniFun(0, 5, i); break
              case 1: this.aniFun(1, 6, i); break
              case 2: this.aniFun(2, 7, i); break
            }
          }
        }
      })
    })
  }

  // 动画
  aniFun(i, num, num2) {
    getSound(`audio_${num2 === 4 ? 'true' : 'click'}`).play()

    if (num2 !== 3) this.numArr[num2].interactive = false
    this.aniArr[i].alpha = 1
    this.aniArr[i].state.setAnimation(0, `animation${num}`, false)
  }

  // 左右晃动
  huangdong(v) {
    this.time1 = setTimeout(() => {
      v.position.x = v.position.x - 5
    }, 100)

    this.time2 = setTimeout(() => {
      v.position.x = v.position.x + 5
    }, 200)

    this.time3 = setTimeout(() => {
      v.position.x = v.position.x - 5
    }, 300)

    this.time4 = setTimeout(() => {
      v.position.x = v.position.x + 5
    }, 400)

    this.time5 = setTimeout(() => {
      v.position.x = v.position.x
    }, 500)
  }
}
