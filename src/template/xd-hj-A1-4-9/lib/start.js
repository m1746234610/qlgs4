import { getAnimation, getSound, createSprite } from '../../../loader'
import HitAreaShapes from 'hitarea-shapes'
import { TweenLite, TweenMax } from 'gsap'
import Common from './index'

export default class Start extends Common {
  constructor() {
    super()
    this.numArr = [64, 40, 100]

    this.hundredsArr = [false, false, false, false, false, false, false, false, true, true, false, false, false, false]

    this.tensArr = [true, true, false, false, true, true, false, false, false, false, true, true, false, false]

    this.onesArr = [false, false, true, true, false, false, true, true, false, false, false, false, true, true]

    this.hundredsBigArr1 = [false, false, false, false]
    this.tensBigArr1 = [true, true, false, false]
    this.onesBigArr1 = [false, false, true, true]

    this.hundredsBigArr2 = [true, true, false, false, false, false]
    this.tensBigArr2 = [false, false, true, true, false, false]
    this.onesBigArr2 = [false, false, false, false, true, true]

    this.btnArrZb = [1063.5, 1268.5, 1429]
    this.eqArrZb = [{ x: 515, y: 281.5 }, { x: 1157, y: 274.5 }, { x: 902, y: 826.5 }]
    this.frameArrZb = [{ x: 604.5, y: 281.5 }, { x: 1076.5, y: 401.5 }, { x: 908, y: 724 }]
    this.markArrZb = [
      { x: 819.5, y: 379 }, { x: 819.5, y: 407 }, { x: 875, y: 379 }, { x: 875, y: 407 },
      { x: 1291.5, y: 499 }, { x: 1291.5, y: 526.5 }, { x: 1347.5, y: 499 }, { x: 1347.5, y: 526.5 },
      { x: 1088, y: 821.5 }, { x: 1088, y: 849.5 }, { x: 1132, y: 821.5 }, { x: 1132, y: 849.5 }, { x: 1175.5, y: 821.5 }, { x: 1175.5, y: 849.5 }]

    this.markBigArrZb1 = [{ x: 1132, y: 724 }, { x: 1132, y: 776.5 }, { x: 1237, y: 724 }, { x: 1237, y: 776.5 }]

    this.markBigArrZb2 = [{ x: 1102, y: 724 }, { x: 1102, y: 776.5 }, { x: 1185, y: 724 }, { x: 1185, y: 776.5 }, { x: 1267.5, y: 724 }, { x: 1267.5, y: 776.5 }]


    // 问号
    this.wh = createSprite('image_wh')
    // 提示
    this.hint = createSprite('image_hint')

    // 车
    this.car = createSprite('image_car')

    // 按钮
    this.btnArr = [createSprite('image_btn1'), createSprite('image_btn2'), createSprite('image_btn3')]

    // 阴影
    this.yy = createSprite('image_yy')

    // 式子
    this.eqArr = [createSprite('image_equation1'), createSprite('image_equation2'), createSprite('image_equation3')]

    // 数字框
    this.frameArr = [createSprite('image_frame'), createSprite('image_frame'), createSprite('image_frame')]

    // 数字
    this.num = [createSprite('image_num1'), createSprite('image_num2'), createSprite('image_num3')]

    // 加减号
    this.markArr = [createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2'), createSprite('image_mark1'), createSprite('image_mark2')]

    // 珠子
    this.goodsArr1 = [[], []]
    this.goodsArr2 = [[], []]
    this.goodsArr3 = [[], [], []]
    for (let i = 0; i < 7; i++) {
      this.goodsArr1[0].push(createSprite('image_goods'))
      this.goodsArr1[1].push(createSprite('image_goods'))

      this.goodsArr2[0].push(createSprite('image_goods'))
      this.goodsArr2[1].push(createSprite('image_goods'))

      this.goodsArr3[0].push(createSprite('image_goods'))
      this.goodsArr3[1].push(createSprite('image_goods'))
      this.goodsArr3[2].push(createSprite('image_goods'))
    }

    // 大式子
    this.eqBigArr = [createSprite('image_equationBig1'), createSprite('image_equationBig2'), createSprite('image_equationBig3')]

    // 大加减号
    this.markBigArr = [createSprite('image_markBig1'), createSprite('image_markBig2'), createSprite('image_markBig1'), createSprite('image_markBig2'), createSprite('image_markBig1'), createSprite('image_markBig2')]

    // 大珠子
    this.goodsBigArr = [[], [], []]
    for (let i = 0; i < 7; i++) {
      this.goodsBigArr[0].push(createSprite('image_goodsBig'))
      this.goodsBigArr[1].push(createSprite('image_goodsBig'))
      this.goodsBigArr[2].push(createSprite('image_goodsBig'))
    }


    this.Num = 0
    this.eventHandle()
  }

  init() {
    this.Num = 0
    this.num1 = 0
    this.num2 = 0
    this.num3 = 0
    this.num4 = 0
    this.num5 = 0
    this.num6 = 0
    this.num7 = 0
    this.aniArr = [getAnimation('animation_0901'), getAnimation('animation_0902'), getAnimation('animation_0903')]

    this._stage.addChild(createSprite('image_bg'))

    // 问号
    this.wh.visible = true
    this.wh.anchor.set(0.5)
    this.wh.cursor = 'pointer'
    this.wh.interactive = true
    this._stage.addChild(this.wh)
    this.wh.position.set(1806, 174)

    // 提示
    this.hint.visible = false
    // this.hint.cursor = 'pointer'
    this.hint.interactive = true
    this._stage.addChild(this.hint)

    // 车
    this.car.visible = true
    this.car.anchor.set(0.5)
    this.car.texture = res['image_car'].texture
    this._stage.addChild(this.car)
    this.car.position.set(840, 633)

    this.aniArr.map(v => {
      v.visible = false
      this._stage.addChild(v)
    })

    // 按钮
    this.btnArr.map((v, i) => {
      v.anchor.set(0.5)
      v.cursor = 'pointer'
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(this.btnArrZb[i], 973)
    })
    this.btnArr[1].num = 0

    // 式子
    this.eqArr.map((v, i) => {
      v.anchor.set(0.5)
      v.visible = false
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(this.eqArrZb[i].x, this.eqArrZb[i].y)
    })

    // 数字数字框
    this.frameArr.map((v, i) => {
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = true
      v.texture = res['image_frame'].texture
      this._stage.addChild(v)
      v.position.set(this.frameArrZb[i].x, this.frameArrZb[i].y)
    })

    // 数字
    this.num.map((v, i) => {
      v.anchor.set(0.5)
      v.visible = false
      this._stage.addChild(v)
      v.position.set(this.frameArrZb[i].x, this.frameArrZb[i].y)
    })
    this._stage.addChild(this.eqArr[0])
    this._stage.addChild(this.frameArr[0])
    this._stage.addChild(this.num[0])

    // 加减号
    this.markArr.map((v, i) => {
      if (i < 4) {
        v.num = this.numArr[0]
      } else if (i < 8) {
        v.num = this.numArr[1]
      } else {
        v.num = this.numArr[2]
      }
      v.num2 = (i + 1) % 2 === 1 ? 1 : 2 // num === 1 加号  num === 2 减号
      v.hundreds = this.hundredsArr[i]
      v.tens = this.tensArr[i]
      v.ones = this.onesArr[i]
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = v.num2 === 1 ? true : false
      this._stage.addChild(v)
      v.position.set(this.markArrZb[i].x, this.markArrZb[i].y)
    })

    // 珠子
    this.goodsFun(this.goodsArr1, 64, 819.5, 875, null, 305)
    this.goodsFun(this.goodsArr2, 40, 1291.5, 1347.5, null, 425)
    this.goodsFun(this.goodsArr3, 100, 1088, 1132, 1175.5, 747.5)

    // 阴影
    this.yy.visible = false
    // this.yy.cursor = 'pointer'
    this.yy.interactive = true
    this._stage.addChild(this.yy)

    // 大式子
    this.eqBigArr.map((v, i) => {
      v.anchor.set(0.5)
      v.visible = false
      v.interactive = true
      this._stage.addChild(v)
      v.position.set(820, 540)
    })

    // 大加减号
    this.markBigArr.map((v, i) => {
      v.num = 0
      v.num2 = (i + 1) % 2 === 1 ? 1 : 2 // num === 1 加号  num === 2 减号
      v.anchor.set(0.5)
      v.visible = false
      v.cursor = 'pointer'
      v.interactive = v.num2 === 1 ? true : false
      this._stage.addChild(v)
      v.position.set(this.markBigArrZb2[i].x, this.markBigArrZb2[i].y)
    })

    // 大珠子
    this.goodsBigArr.map((v, i) => {
      v.map((v, j) => {
        v.num = 0
        switch (i) {
          case 0: v.num2 = 1; v.position.x = 1102; break
          case 1: v.num2 = 2; v.position.x = 1185; break
          case 2: v.num2 = 3; v.position.x = 1267.5; break
        }
        v.hundreds = 0
        v.tens = 0
        v.ones = 0
        v.anchor.set(0.5)
        v.visible = false
        this._stage.addChild(v)
        v.position.y = 582.5 - j * 30
      })
    })
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
          v.interactive = false
          this.btnArr[1].interactive = false
          this.car.visible = false
          getSound('audio_bo').play()

          this.aniArr[2].visible = false
          this.eqArr[2].visible = false
          this.frameArr[2].visible = false
          this.num[2].visible = false

          // 珠子
          this.goodsArr3.map((v) => {
            v.map(v => v.visible = false)
          })

          this.aniCar = getAnimation('animation_car')
          this._stage.addChild(this.aniCar)
          this.aniCar.state.setAnimation(0, 'right', false).listener = {
            complete: () => {
              this.time = setTimeout(() => {
                this._stage.removeChild(this.aniCar)
                v.interactive = true
                this.btnArr[1].interactive = true
                this.car.visible = true
                this.car.texture = res['image_car2'].texture
                this.car.position.x = 840 + 24.5
                this.car.position.y = 633 - 22
              }, 0);
            }
          }


          for (let j = 0; j < this.markArr.length; j++) {
            this.markArr[j].visible = false
            console.log(j);
          }
        } else if (i === 1) {
          v.num++
          v.interactive = false
          switch (v.num) {
            case 1: this.aniFun(0); break
            case 2: this.aniFun(1); break
            case 3: this.aniFun(2); v.interactive = false; break
          }
        } else {
          this.aniArr.map(v => this._stage.removeChild(v))
          this._stage.removeChild(this.aniCar)
          getSound('audio_bo').stop()
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
      this.hint.visible = true
      this._stage.addChild(this.hint)
      this.intFun(false)
    })

    // 提示
    this.hint.on('pointertap', () => {
      getSound('audio_cong').play()
      this.hint.visible = false
      this.intFun(true)
    })

    // 数字框
    this.frameArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_cong').play()
        v.interactive = false
        this.num[i].visible = true
      })
    })

    // 加减号
    this.markArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (i < 4) { // 64
          if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数');
            this.num1 = this.markFun(v, this.num1, this.goodsArr1[0], i)
          } else {
            console.log('个位数');
            this.num2 = this.markFun(v, this.num2, this.goodsArr1[1], i)
          }
        } else if (i < 8) { // 40
          if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数');
            this.num3 = this.markFun(v, this.num3, this.goodsArr2[0], i)
          } else {
            this.num4 = this.markFun(v, this.num4, this.goodsArr2[1], i)
          }
        } else { // 100
          if (v.hundreds && !v.tens && !v.ones) {
            console.log('百位数');
            this.num5 = this.markFun(v, this.num5, this.goodsArr3[0], i)
          } else if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数');
            this.num6 = this.markFun(v, this.num6, this.goodsArr3[1], i)
          } else {
            this.num7 = this.markFun(v, this.num7, this.goodsArr3[2], i)
            console.log('个位数', this.num7);
          }
        }
      })
    })

    // 算式
    this.eqArr.map((v, i) => {
      v.on('pointertap', () => {
        getSound('audio_cong').play()
        this.yy.visible = true
        this._stage.addChild(this.yy)
        this.eqBigArr.map(v => this._stage.addChild(v))
        this.markBigArr.map(v => this._stage.addChild(v))
        this.goodsBigArr[0].map(v => this._stage.addChild(v))
        this.goodsBigArr[1].map(v => this._stage.addChild(v))
        this.goodsBigArr[2].map(v => this._stage.addChild(v))
        this.intFun(false)

        if (i === 0) {
          this.goodsBigFun(this.hundredsBigArr1, this.tensBigArr1, this.onesBigArr1, this.eqBigArr[0], 64, this.num1, this.num2, null)
        } else if (i === 1) {
          this.goodsBigFun(this.hundredsBigArr1, this.tensBigArr1, this.onesBigArr1, this.eqBigArr[1], 40, this.num3, this.num4, null)
        } else {
          this.goodsBigFun(this.hundredsBigArr2, this.tensBigArr2, this.onesBigArr2, this.eqBigArr[2], 100, this.num5, this.num6, this.num7)
        }
      })
    })

    // 大加减号
    this.markBigArr.map((v, i) => {
      v.on('pointerdown', () => {
        getSound('audio_cong').play()
        v.scale.set(0.9)
      }).on('pointerup', () => {
        v.scale.set(1)
        if (this.goodsBigArr[0][0].num === 64) { // 64
          if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数',);
            this.num1 = this.markBigFun(v, this.num1, this.goodsBigArr[0], i)
          } else {
            console.log('个位数');
            this.num2 = this.markBigFun(v, this.num2, this.goodsBigArr[1], i)
          }
        } else if (this.goodsBigArr[0][0].num === 40) { // 40
          if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数');
            this.num3 = this.markBigFun(v, this.num3, this.goodsBigArr[0], i)
          } else {
            this.num4 = this.markBigFun(v, this.num4, this.goodsBigArr[1], i)
          }
        } else if (this.goodsBigArr[0][0].num === 100) { // 100
          if (v.hundreds && !v.tens && !v.ones) {
            console.log('百位数');
            this.num5 = this.markBigFun(v, this.num5, this.goodsBigArr[0], i)
          } else if (v.tens && !v.hundreds && !v.ones) {
            console.log('十位数');
            this.num6 = this.markBigFun(v, this.num6, this.goodsBigArr[1], i)
          } else {
            console.log('个位数');
            this.num7 = this.markBigFun(v, this.num7, this.goodsBigArr[2], i)
          }
        }
      })
    })

    // 阴影
    this.yy.on('pointertap', () => {
      getSound('audio_cong').play()
      this.yy.visible = false
      // 大加减号消失
      this.markBigArr.map(v => v.visible = false)
      // 大算式消失
      this.eqBigArr.map(v => v.visible = false)
      // 大珠子消失
      this.goodsBigArr.map((v, i) => {
        v.map((v, j) => { v.visible = false })
      })

      this.intFun(true)
      if (this.Num === 0) {
        // 64
        this.goodsArr1.map((v, i) => {
          if (i === 0) {
            v.map((v, j) => { v.visible = j >= this.num1 ? false : true })
            this.markArr[1].interactive = this.num1 === 0 ? false : true
          } else {
            v.map((v, j) => { v.visible = j >= this.num2 ? false : true })
            this.markArr[3].interactive = this.num2 === 0 ? false : true
          }
        })
      } else if (this.Num === 1) {
        // 40
        this.goodsArr2.map((v, i) => {
          if (i === 0) {
            v.map((v, j) => { v.visible = j >= this.num3 ? false : true })
            this.markArr[5].interactive = this.num3 === 0 ? false : true
          } else {
            v.map((v, j) => { v.visible = j >= this.num4 ? false : true })
            this.markArr[7].interactive = this.num4 === 0 ? false : true
          }
        })
      } else if (this.Num === 2) {
        // 100
        this.goodsArr3.map((v, i) => {
          if (i === 0) {
            v.map((v, j) => { v.visible = j >= this.num5 ? false : true })
            this.markArr[9].interactive = this.num5 === 0 ? false : true
          } else if (i === 1) {
            v.map((v, j) => { v.visible = j >= this.num6 ? false : true })
            this.markArr[11].interactive = this.num6 === 0 ? false : true
          } else {
            v.map((v, j) => { v.visible = j >= this.num7 ? false : true })
            this.markArr[13].interactive = this.num7 === 0 ? false : true
          }
        })
      }
    })
  }

  aniFun(num) {
    this.Num = num
    if (num > 0) {
      this.aniArr[num - 1].visible = false
      this.eqArr[num - 1].visible = false
      this.frameArr[num - 1].visible = false
      this.num[num - 1].visible = false

      // 珠子
      this[`goodsArr${num}`].map((v) => {
        v.map(v => v.visible = false)
      })

      for (let j = 0; j < num * 4; j++) {
        this.markArr[j].visible = false
      }
    }

    this.aniArr[num].visible = true
    this.btnArr.map(v => this._stage.addChild(v))
    this.aniArr[num].state.setAnimation(0, 'in', false).listener = {
      complete: () => {
        this.aniArr[num].visible = false

        this.eqArr[num].visible = true
        this.frameArr[num].visible = true

        this.markArr.map((v, j) => {
          if (num === 0) {
            if (j < 4) {
              v.visible = true
            } else {
              v.visible = false
            }
          } else if (num === 1) {
            if (j >= 4 && j < 8) {
              v.visible = true
            } else {
              v.visible = false
            }
          } else if (num === 2) {
            if (j >= 8) {
              v.visible = true
            } else {
              v.visible = false
            }
          }
        })
        this.btnArr[1].interactive = num === 2 ? false : true
      }
    }
  }

  goodsFun(arr, num, x, x2, x3, y) {
    arr.map((v, i) => {
      v.map((v, j) => {
        v.num = num
        switch (i) {
          case 0: v.num2 = 1; v.position.x = x; break
          case 1: v.num2 = 2; v.position.x = x2; break
          case 2: v.num2 = 3; v.position.x = x3; break
        }
        v.hundreds = 0
        v.tens = 0
        v.ones = 0
        v.anchor.set(0.5)
        v.visible = false
        this._stage.addChild(v)
        v.position.y = y - j * 19
      })
    })
  }

  intFun(flag) {
    this.eqArr.map(v => v.interactive = flag)
    this.btnArr.map(v => v.interactive = flag)
    this.markArr.map(v => v.interactive = flag)
    this.frameArr.map(v => v.interactive = flag)

    this.goodsArr1.map(v => v.interactive = flag)
    this.goodsArr2.map(v => v.interactive = flag)
    this.goodsArr3.map(v => v.interactive = flag)

    if (this.Num === 0) {
      this.goodsArr1.map(v => v.interactive = true)
      this.goodsArr2.map(v => v.interactive = false)
      this.goodsArr3.map(v => v.interactive = false)
      console.log(1);
    } else if (this.Num === 1) {
      this.goodsArr1.map(v => v.interactive = false)
      this.goodsArr2.map(v => v.interactive = true)
      this.goodsArr3.map(v => v.interactive = false)
      console.log(2);
    } else if (this.Num === 2) {
      this.btnArr[1].interactive = false
      this.goodsArr1.map(v => v.interactive = false)
      this.goodsArr2.map(v => v.interactive = false)
      this.goodsArr3.map(v => v.interactive = true)
      console.log(3);
    }
  }

  markFun(v, num, arr, i) {
    if (v.num2 === 1) { // 加号
      if (num < 7) {
        arr[num].visible = true
        this.markArr[i + 1].interactive = true
        num++
      }
      v.interactive = num === 7 ? false : true
    } else { // 减号
      if (num > 0) {
        num--
        this.markArr[i - 1].interactive = true
        arr[num].visible = false
      }
      v.interactive = num === 0 ? false : true
    }
    return num
  }

  markBigFun(v, num, arr, i) {
    if (v.num2 === 1) { // 加号
      if (num < 7) {
        arr[num].visible = true
        this.markBigArr[i + 1].interactive = true
        num++
      }
      v.interactive = num === 7 ? false : true
    } else { // 减号
      if (num > 0) {
        num--
        this.markBigArr[i - 1].interactive = true
        arr[num].visible = false
      }
      v.interactive = num === 0 ? false : true
    }
    return num
  }

  goodsBigFun(arr1, arr2, arr3, val, num, num2, num3, num4) {
    val.visible = true
    // 调整珠子位置
    this.goodsBigArr.map((v, i) => {
      v.map((v, j) => {
        v.num = num
        if (num !== 100) {
          v.position.x = i === 0 ? 1132 : 1237.5
        } else {
          switch (i) {
            case 0: v.position.x = 1102; break
            case 1: v.position.x = 1185; break
            case 2: v.position.x = 1267.5; break
          }
        }
      })
    })

    // 显示珠子
    for (let i = 0; i < num2; i++) {
      this.goodsBigArr[0][i].visible = true
    }
    for (let i = 0; i < num3; i++) {
      this.goodsBigArr[1][i].visible = true
    }
    if (typeof num4 === 'number') {
      for (let i = 0; i < num4; i++) {
        this.goodsBigArr[2][i].visible = true
      }
    }

    // 计算对应珠子数量，出现的加减号数量
    this.markBigArr.map((v, i) => {
      v.hundreds = arr1[i]
      v.tens = arr2[i]
      v.ones = arr3[i]
      if (this.goodsBigArr[0][0].num !== 100 && i < 4) {
        v.visible = true
        v.position.x = this.markBigArrZb1[i].x
      } else if (this.goodsBigArr[0][0].num === 100) {
        v.visible = true
        v.position.x = this.markBigArrZb2[i].x
      }
    })

    // 启用减号功能
    if (num2 !== 0) {
      this.markBigArr[1].interactive = true
    }
    if (num3 !== 0) {
      this.markBigArr[3].interactive = true
    }
    if (num4 !== 0) {
      this.markBigArr[5].interactive = true
    }
  }

}