* 关于点击素材，素材出现乱位移的bug
原理: 因为在down中给this.x,this.y赋值了一个位置坐标，又只触发了pointerup事件，所以down中的this.x,this.y就被赋值给当前点击的石头了

解决办法: 在鼠标抬起中增加一步判断，当只触发了素材的鼠标抬起事件，就让它的位置保持不变