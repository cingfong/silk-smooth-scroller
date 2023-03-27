# silk-smooth

## Installation

CDN

```html
<script src="https://raw.githubusercontent.com/cingfong/silk-smooth-scroller/master/silk-smooth.js"></script>
<script>
  silkSmooth.init();
</script>
```

<!-- NPM
```bash
npm install silk-smooth-scroll
``` -->

## Usage

```html
<div id="silk-smooth">
  <!-- // default div height 100vh -->
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

## Options

```javascript
const options = {
  name: "silk-smooth", // element id name
  speed: 1, // scroll speed
  align: true, // auto align
  alignHeight: 300, // align auto height
  direction: false, // feeding direction
};
silk.init(options);
```

### if you want to see a demo, please clone
