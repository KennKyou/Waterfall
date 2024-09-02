//----------------------------
// 瀑布流圖片
//----------------------------
export class Waterfall {
  constructor(dom, options = {}) {
    this.dom = dom
    this.options = options
    this.wrap = document.querySelector(this.dom)
    this.img = this.wrap.querySelectorAll('.img-wrap')
    this.init()
  }

  init() {
    this.applyOptions()
    window.addEventListener('resize', this.onResize.bind(this))
    window.addEventListener('load', this.onLoad.bind(this))
    this.setImgWidth()
    this.waterfall()
    this.lazyLoad()
    setTimeout(() => {
      this.waterfall()
    }, 0)
  }

  onLoad() {
    this.updateLayout()
  }

  onResize() {
    this.updateLayout()
  }

  updateLayout() {
    this.applyOptions()
    this.setImgWidth()
    this.waterfall()
  }

  applyOptions() {
    const { gap = 10, count = 4 } = this.options
    this.gap = gap
    this.count = count

    const width = window.innerWidth
    let activeOptions = {...this.options}

    if (this.options.breakpoints) {
      const breakpoints = Object.keys(this.options.breakpoints).map(key => parseInt(key)).sort((a, b) => a - b);
      for (let i = 0; i < breakpoints.length; i++) {
        if (width >= breakpoints[i]) {
          activeOptions = {...activeOptions, ...this.options.breakpoints[breakpoints[i]]};
        }
      }
    }

    this.gap = activeOptions.gap ?? this.gap;
    this.count = activeOptions.count ?? this.count;
  }

  // css setting
  setImgWidth() {
    this.img.forEach((img) => {
      img.style.width = `calc((100% - ${this.gap * (this.count - 1)}px) / ${this.count})`
    })
  }

  waterfall() {
    let wrapWidth = this.wrap.offsetWidth
    let imgWidth = this.img[0].offsetWidth
    this.columnsCount = parseFloat((wrapWidth) / (imgWidth + this.gap)) // 計算一列最多有幾欄（轉成浮點數）
    let firstRowPhotosHeightArray = []
    // 進行照片排序
    for (let i = 0; i < this.img.length; i++) {
      if (i < this.columnsCount) {
        // 放上第一列的照片
        this.img[i].style.top = 0
        this.img[i].style.left = (imgWidth + this.gap) * i + 'px'
        // 紀錄第一列的照片高
        firstRowPhotosHeightArray.push(this.img[i].offsetHeight)
      } else {
        // 放上第二列開始的照片
        // 找出第一列的最小高度
        let minHeight = Math.min(...firstRowPhotosHeightArray)
        // 紀錄最小高度的 index，以取得對應到第一列的位置，來決定 left 要移動多少
        let index = firstRowPhotosHeightArray.indexOf(minHeight)
        // 調整接續的 this.img 位置，放到目前最小高度的地方
        this.img[i].style.top = minHeight + this.gap + 'px'
        // 取得對應到第一列 this.img 的 left 位置
        this.img[i].style.left = this.img[index].offsetLeft + 'px'
        // 最後!!再把原本儲存在陣列裡面為最小高度的值，更新上最新的高度(原本的高度+新的高度+間隔)
        firstRowPhotosHeightArray[index] = firstRowPhotosHeightArray[index] + this.img[i].offsetHeight + this.gap

      }
      // 設定瀑布流外框的高
      let maxHeight = Math.max(...firstRowPhotosHeightArray)
      this.wrap.style.height = maxHeight + 'px'
    }
  }

  lazyLoad() {
    const callback_lazyload = (entries, observerLazy) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src
          observerLazy.unobserve(entry.target)
          entry.target.addEventListener('load', () => {
            entry.target.classList.add('loaded'); // 圖片加載完成後添加 class
            this.updateLayout()
          })
        }
      })
    }

    const observerLazy = new IntersectionObserver(callback_lazyload, {
      root: null,
      rootMargin: '0px',
      threshold: [0]
    })

    const lazyImg = document.querySelectorAll('.lazy')
    lazyImg.forEach(lazy => observerLazy.observe(lazy))
  }
}

/* HTML 結構 */
/*
<div class="waterfall waterfall1">
  <div class="img-wrap">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" class="lazy" data-src="./src/images/1.jpg" alt="">
  </div>
  <div class="img-wrap">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" class="lazy" data-src="./src/images/2.jpg" alt="">
  </div>
  <div class="img-wrap">
    <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" class="lazy" data-src="./src/images/3.jpg" alt="">
  </div>
</div>
 */