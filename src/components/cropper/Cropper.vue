<template>
  <div>

    <div class="container">
      <div class="left-half">
        <button color="red" @click="$refs.myFiles.click()"><i class="fas fa-file-upload"></i> Upload</button>
        <button color="blue" @click="rotate(-90)"><i class="fas fa-undo"></i></button>
        <button color="blue" @click="rotate(90)"><i class="fas fa-redo"></i></button>
        <button color="green" @click="saveImage"><i class="fas fa-download"></i> Save</button>

        <input type="file"
               @change="previewFiles"
               ref="myFiles"
               accept="image/png, image/jpeg"
               style="display: none;"
        />
        <div class="croppie">
          <vue-croppie
            ref="croppieRef"
            :enable-orientation="true"
            :enable-resize="false"
            :viewport="{ width: 300, height: 300, type: 'circle' }"
            :show-zoomer="true"
            @result="result"
            @update="crop"
          >
          </vue-croppie>
        </div>

      </div>
      <div class="right-half">
        <div>
          <canvas id="userImg" ref="userImg" :width="width" :height="height"></canvas>
          <canvas id="overlay" ref="overlay" :width="width" :height="height"></canvas>
          <canvas id="combined" ref="combined" :width="width" :height="height"></canvas>
          <div class="cover" :style="coverStyles"></div>
          <a ref="downloader"></a>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
//import Swatches from 'vue-swatches'
//import 'vue-swatches/dist/vue-swatches.min.css'

//import VBtn from './Button'
//import VBtnGroup from './ButtonGroup'

// UGLY HACK, but it's late
const PREFIX = process.env.NODE_ENV === 'production' ? '/playground-token-maker' : ''

const FRAMES = {
  circle1: {
    src: `${PREFIX}/img/circle_frame_1.png`,
    size: { width: 512, height: 512 },
    rect: [35, 30, 440, 440],
    brightness: { r: 0.2, g: 0.2, b: 0.2 }
  },
  circle3: {
    src: `${PREFIX}/img/circle_frame_3.png`,
    size: { width: 512, height: 512 },
    rect: [35, 35, 440, 440],
    brightness: { r: 0.2, g: 0.2, b: 0.2 }
  },
  circle4: {
    src: `${PREFIX}/img/circle_frame_4.png`,
    size: { width: 500, height: 500 },
    rect: [25, 25, 450, 450],
    brightness: { r: 0.3, g: 0.3, b: 0.1 }
  },

  circle5: {
    src: `${PREFIX}/img/circle_frame_5.png`,
    size: { width: 512, height: 512 },
    rect: [75, 75, 365, 365],
    brightness: { r: 0.3, g: 0.5, b: 0.5 }
  },
  circle6: {
    src: `${PREFIX}/img/circle_frame_6.png`,
    size: { width: 512, height: 512 },
    rect: [35, 35, 440, 440],
    brightness: { r: 0.3, g: 0.5, b: 0.5 }
  }
}

export default {
  components: {

  },
  mounted() {
    this.resize()
    this.drawOverlay()
    //this.bind()
  },
  data() {
    const name = 'circle4'
    return {
      FRAMES,
      frameName: name,
      width: '',
      height: '',
      coverStyles: {
        width: '',
        height: ''
      },
      cropped: null,
      uploadedUrl: `${PREFIX}/img/face.png`,
      color: '#b45f06',
      defaultBrightness: { r: 0.1, g: 0.1, b: 0.1 }
    }
  },
  watch: {
    color() {
      this.drawOverlay()
    },
    frameName() {
      this.resize()
      this.drawOverlay()
      this.crop()
    }
  },
  computed: {
    croppie() {
      return this.$refs.croppieRef
    },
    userImg() {
      return this.$refs.userImg
    },
    overlay() {
      return this.$refs.overlay
    },
    combined() {
      return this.$refs.combined
    },
    userImgCtx() {
      return this.$refs.userImg.getContext('2d')
    },
    overlayCtx() {
      return this.$refs.overlay.getContext('2d')
    },
    combinedCtx() {
      return this.$refs.combined.getContext('2d')
    },
    placeholder() {
      return FRAMES[this.frameName].rect
    },
    frameSize() {
      return FRAMES[this.frameName].size
    },
    frame() {
      return FRAMES[this.frameName]
    },
    brightness() {
      return FRAMES[this.frameName].brightness || this.defaultBrightness
    }
  },
  methods: {
    resize() {
      this.width = this.frameSize.width
      this.height = this.frameSize.height
      this.coverStyles = {
        width: `${this.frameSize.width}px`,
        height: `${this.frameSize.height}px`
      }
    },
    async drawOverlay() {
      const imageObj = await this.loadImg(this.frame.src)

      this.overlay.width = this.width
      this.overlay.height = this.height
      this.overlayCtx.drawImage(imageObj, 0, 0)
      this.colorImage(this.overlayCtx, this.brightness, this.color)
    },
    changeFrame(frame) {
      if (frame === this.frameName) return

      this.frameName = frame
    },
    crop() {
      this.croppie.result({
        format: 'png',
        circle: true,
        type: 'rawcanvas'
      })
    },
    async result(output) {
      this.userImgCtx.clearRect(0, 0, this.userImg.width, this.userImg.height)
      this.userImgCtx.drawImage(output, ...this.placeholder)
    },
    async loadImg(src) {
      const imageObj = new Image()
      return new Promise((resolve, reject) => {
        imageObj.onload = () => resolve(imageObj)
        imageObj.onerror = reject
        imageObj.src = src
      })
    },
    rotate(rotationAngle) {
      this.croppie.rotate(rotationAngle)
    },
    async bind() {
      await this.croppie.bind({
        url: this.uploadedUrl
      })
      this.crop()
    },
    previewFiles(ev) {
      const files = ev.target.files
      if (files && files[0]) {
        const reader = new FileReader()

        reader.onload = async e => {
          this.uploadedUrl = e.target.result
          this.bind()
          this.crop()
        }

        reader.readAsDataURL(files[0])
      }
    },
    saveImage() {
      this.combinedCtx.drawImage(this.userImg, 0, 0)
      this.combinedCtx.drawImage(this.overlay, 0, 0)
      this.cropped = this.combined.toDataURL('image/png', 1)

      const link = this.$refs.downloader
      link.href = this.cropped
      link.download = 'token.png'
      link.click()
      this.combinedCtx.clearRect(0, 0, this.combined.width, this.combined.height)
    },

    colorImage(ctx, brightness, hexColor) {
      const imageData = ctx.getImageData(0, 0, this.width, this.height)
      const data = imageData.data

      const rgbColor = this.hexToRgb(hexColor)

      for (let p = 0, len = data.length; p < len; p += 4) {
        if (data[p + 3] === 0) continue

        const bLevel = brightness.r * data[p] + brightness.g * data[p + 1] + brightness.b * data[p + 2]
        data[p] = bLevel + rgbColor.r
        data[p + 1] = bLevel + rgbColor.g
        data[p + 2] = bLevel + rgbColor.b
      }
      ctx.putImageData(imageData, 0, 0)
    },
    hexToRgb(color) {
      color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b)

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : {
            r: 0,
            g: 0,
            b: 0
          }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: start;
}

.croppie {
  padding-top: 1em;
}

.left-half {
  flex: 1;
  padding: 1rem;
}

.right-half {
  flex: 1;
  padding: 1rem;
  position: relative;
  text-align: center;
}

#userImg,
#overlay,
#combined,
.cover {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 7em;
}

#combined {
  display: none;
}
</style>
