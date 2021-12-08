import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn3')]

    // 选项
    this.ipArr = [createSprite('image_1'), createSprite('image_2'), createSprite('image_3'), createSprite('image_4'), createSprite('image_5'), createSprite('image_6'), createSprite('image_7'), createSprite('image_8'), createSprite('image_9')]

    // 数字
    this.numArr = [createSprite('image_num1'), createSprite('image_num2'), createSprite('image_num3'), createSprite('image_num4')]

    // 格子
    this.gz = createSprite('image_gz')


    this.eventHandle()
  }

  init() {
    this._stage.addChild(createSprite('image_bg'))

    // 按钮
    this.btnArr.map((v, i) => {
      v.num = 1
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(1612.5 + i * 134.5, 966)
    })

    // 选项
    this.ipArr.map((v, i) => {
      v.visible = true
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      if (i < 3) {
        v.position.set(747.5 + i * 354, 276)
      } else if (i < 6) {
        v.position.set(747.5 + (i - 3) * 354, 565.5)
      } else {
        v.position.set(747.5 + (i - 6) * 354, 854.5)
      }
    })

    // 格子
    this.gz.visible = true
    this.gz.anchor.set(0.5)
    this._stage.addChild(this.gz)
    this.gz.position.set(326.5, 531)

    // 数字
    this.numArr.map((v, i) => {
      v.visible = i === 0 ? true : false
      v.anchor.set(0.5)
      this._stage.addChild(v)
      v.position.set(326.5, 531)
    })
  }

  eventHandle() {
    getSound('audio_true').volume = 0.15
    getSound('audio_error').volume = 0.15
    getSound('audio_click').volume = 0.15

    // 按钮
    this.btnArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_click').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i === 0) {
          v.num++
          switch (v.num) {
            case 2: this.ani2Fun(1); break
            case 3: this.ani2Fun(2); break
            case 4: this.ani2Fun(4); break
          }
        } else {
          this._stage.removeChild(this.ani)
          this._stage.removeChild(this.ani2)
          clearTimeout(this.time1)
          clearTimeout(this.time2)
          clearTimeout(this.time3)
          clearTimeout(this.time4)
          clearTimeout(this.time5)
          this.init()
        }
      })
    })

    // 选项
    this.ipArr.map((v, i) => {
      v.on('pointerdown', () => {
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (this.btnArr[0].num === 1 && i === 6) {
          this.aniFun(3, v)
        } else if (this.btnArr[0].num === 2 && i === 7) {
          this.aniFun(1, v)
        } else if (this.btnArr[0].num === 3 && i === 3) {
          this.aniFun(2, v)
        } else if (this.btnArr[0].num === 4 && i === 0) {
          this.aniFun(4, v)
        } else {
          getSound('audio_error').play()
          this.huangdong(v)
        }
      })
    })

  }

  aniFun(num, v) {
    getSound('audio_true').play()
    v.visible = false
    this.gz.visible = false
    this.numArr.map(v => v.visible = false)
    this._stage.removeChild(this.ani2)

    this.ani = getAnimation(`animation_${num}`)
    this._stage.addChild(this.ani)
    this.ani.state.setAnimation(0, `right${num = num === 4 ? 3 : num}`, false)
  }

  ani2Fun(num) {
    this.ipArr.map(v => v.visible = true)
    this._stage.removeChild(this.ani)
    this._stage.removeChild(this.ani2)

    this.ani2 = getAnimation(`animation_${num}`)
    this._stage.addChild(this.ani2)
    this.ani2.state.setAnimation(0, `in${num = num === 4 ? 3 : num}`, false)
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
