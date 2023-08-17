# silk-smooth-scroll

This is an element that changes its content when the scroll is moved.

## Installation

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
<script type="module">
  import silkSmooth from "https://cdn.jsdelivr.net/gh/cingfong/silk-smooth-scroller/silk-smooth.js";
  silkSmooth.init();
</script>
```

NPM

```javascript
import silkSmooth from "silk-smooth-scroll";
silkSmooth.init();
```

## Options

```javascript
// page title
const _title = [
  {},
  { number: 1.1, text: "title first" },
  { number: 1.2, text: "title second" },
  { number: 1.3, text: "title third" },
  { number: 1.4, text: "title fourth" },
];
const options = {
  name: "silk-smooth",                  // element id name
  speed: 1,                             // scroll speed transition second
  transformFunction: 'ease-in-out',     // set scroll transition-timing-function, default linear 
  align: true,                          // scroll auto align
  alignHeight: 300,                     // scroll auto align height
  direction: false,                     // scroll direction
  titleClassName: "silk-smooth-title",  // set title class
  titleList: _title,                    // set each title
};
silkSmooth.init(options);
```

## Reload

```javascript
// If you want to reload, you can use this method
silkSmooth.remove();

silkSmooth.init();
```

## [DEMO](https://display-library.vercel.app/silk-smooth-scroll)
