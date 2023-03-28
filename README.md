# silk-smooth-scroll

This is an element that changes its content when the scroll is moved.

## Installation

<!--
Browser ENV

```html
<script src="https://raw.githubusercontent.com/cingfong/silk-smooth-scroller/master/silk-smooth.js"></script>
``` -->

NPM

```bash
npm install silk-smooth-scroll
```

You can get the latest code:

```bash
git clone https://github.com/cingfong/silk-smooth-scroller.git
```

or just [download archive](https://github.com/cingfong/silk-smooth-scroller/archive/refs/heads/master.zip)

## Usage

element
```html
<div id="silk-smooth">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

Browser ENV

```html
<script>
  silkSmooth.init();
</script>
```

NPM

```javascript
import silkSmooth from 'silk-smooth-scroll'
silkSmooth.init()
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
silkSmooth.init(options);
```

## [DEMO]()
