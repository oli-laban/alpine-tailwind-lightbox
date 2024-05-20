# Alpine Tailwind Lightbox

A simple lightbox for AlpineJS and Tailwind CSS projects.

### Prerequisites

* [AlpineJS 3.x](https://alpinejs.dev/essentials/installation)
* [AlpineJS Focus Plugin](https://alpinejs.dev/plugins/focus)
* [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Installation

#### CDN

```html
<!-- Lightbox Plugin -->
<script defer src="TODO"></script>

<!-- Focus Plugin -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>

<!-- AlpineJS Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

#### Module

Install the package:

```shell
npm install alpine-tailwind-lightbox
```

Then import and initialize the plugin:

```js
import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import lightbox from 'alpine-tailwind-lightbox'

Alpine.plugin(focus)
Alpine.plugin(lightbox)

Alpine.start()
```

#### Styles

Make sure Tailwind can pick up the CSS classes by adding the lightbox HTML to your `tailwind.config.js`:

```js
module.exports = {
    content: [
        ...
        './node_modules/alpine-tailwind-lightbox/src/template.html',
    ],
    ...
}
```
## Demo

[View Demo](https://oli-laban.github.io/alpine-tailwind-lightbox/)
## Usage

You can create a lightbox by simply passing a URL to the `x-lightbox` directive. A click handler will automatically be added to the element with the directive.

```html
<a href="#" x-lightbox="'./image.jpg'">
    Click Me
</a>
```

> Note the single quotes around the URL. It is parsed as a JavaScript expression so you can pass Alpine data or an object as below.

For more options, you can pass an object to the lightbox (see the [Config Object](#config-object) reference):

```html
<a href="#" x-lightbox="{ url: './image.jpg', alt: 'An image of something' }">
    Open Image
</a>

<a href="#" x-lightbox="{ url: './video.mp4', type: 'video' }">
    Open Video
</a>
```

#### Lightbox Groups

By default, all items will be added to the same lightbox. If you want to create separate lightbox instances on the same page, you can specify a group:

```html
<a href="#" x-lightbox="'./cat.jpg'" x-lightbox:group="cats">
    View the Cats
</a>

<a href="#" x-lightbox="'./dog.jpg'" x-lightbox:group="dogs">
    View the Dogs
</a>
```

## Config Object

#### `url` - String (Required)

The URL to the image or video.

#### `type` - String

The media type. Either `image`, `video` or `embed`.

Default: `image`

#### `group` - String

The lightbox group the item should be added to. If the `x-lightbox:group` attribute is used, that will take precedence. Any items without a specified group will be added to their own group.

Default: `none`

#### `muted` - Boolean

Only applies to the `video` type. Determines whether the video should be muted by default.

Default: `false`

#### `autoplay` - Boolean

Only applies to the `video` type. Determines whether the video should play automatically upon opening the lightbox. In most browsers this, **`muted` must also be true** for this to work.

Default: `false`

