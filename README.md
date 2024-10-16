<p align="center"><a href="https://github.com/oli-laban/alpine-tailwind-lightbox" target="_blank"><img src="https://github.com/user-attachments/assets/64877663-c59b-487d-af6b-5f0eead401bf" width="500" alt="Alpine Tailwind Lightbox"></a></p>

<p align="center">
<a href="https://www.npmjs.com/package/alpine-tailwind-lightbox"><img src="https://img.shields.io/npm/v/alpine-tailwind-lightbox" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/alpine-tailwind-lightbox"><img src="https://img.shields.io/npm/l/alpine-tailwind-lightbox" alt="License"></a>
</p>

A simple lightbox for AlpineJS and Tailwind CSS projects.

### Prerequisites

* [AlpineJS 3.x](https://alpinejs.dev/essentials/installation)
* [AlpineJS Focus Plugin](https://alpinejs.dev/plugins/focus)
* [Tailwind CSS](https://tailwindcss.com/docs/installation)

### Table of Contents

* [Installation](#installation)
* [Demo](#demo)
* [Usage](#usage)
* [Config Object](#config-object)
* [Magics](#magics)
* [License](#license)

## Installation

#### CDN

```html
<!-- Lightbox Plugin -->
<script defer src="https://cdn.jsdelivr.net/npm/alpine-tailwind-lightbox@1.x.x/dist/alpine-tailwind-lightbox.min.js"></script>

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
        // ...
        './node_modules/alpine-tailwind-lightbox/src/template.html',
    ],
    // ...
}
```
## Demo

[View Demo](https://oli-laban.github.io/alpine-tailwind-lightbox/)
## Usage

You can create a lightbox by simply passing a URL to the `x-lightbox` directive. A click handler will automatically be added to the element with the directive.

```html
<a href="#" x-lightbox="'./image.jpg'">
    Open Image
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

By default, all items will be added to the same "default" lightbox. If you want to create separate lightbox instances on the same page, you can specify a group:

```html
<a href="#" x-lightbox="'./cat.jpg'" x-lightbox:group="cats">
    View the Cats
</a>

<a href="#" x-lightbox="'./dog.jpg'" x-lightbox:group="dogs">
    View the Dogs
</a>
```

#### Lazy Loading Images

By default, all images will be fetched in the background on page load. To only fetch an image when it is opened, use the `lazy` modifier (or the `lazy` config property):

```html
<a href="#" x-lightbox.lazy="'./cat.jpg'" x-lightbox:group="cats">
    Open Image
</a>
```

For smoother navigation between images, when an image is opened this will also load the previous and next image in the lightbox.

#### Programmatic Creation

It is possible to create a lightbox without needing a DOM element per item. See [Magics](#magics).

## Config Object

| Option       | Type      | Default | Description                                                                                                         |
|--------------|-----------|---------|---------------------------------------------------------------------------------------------------------------------|
| **url**      | `string`  |         | The media URL.                                                                                                      |
| **type**     | `string`  | `image` | The media type. `image`, `video` or `embed`.                                                                        |
| **group**    | `string?` | `null`  | The lightbox group the item should be added to. If omitted, the item is added to the default lightbox.              |
| **lazy**     | `boolean` | `false` | Indicates whether to delay fetching the image until it is opened. Only applies to the `image` type.                 |
| **muted**    | `boolean` | `false` | Determines whether the video should be muted by default. Only applies to the `video` type.                          |
| **autoplay** | `boolean` | `false` | Determines whether the video should play automatically upon opening the lightbox. Only applies to the `video` type. |

## Magics

There are magic functions available for controlling lightboxes programmatically.

### `$lightbox(items, group)`

#### Parameters

| Parameter | Type                 | Default | Description                                                                                 |
|-----------|----------------------|---------|---------------------------------------------------------------------------------------------|
| **items** | `(string\|object)[]` |         | An array of URLs or config objects.                                                         |
| **group** | `string\|null`       | `null`  | The name of the lightbox group. If `null`, the items will be added to the default lightbox. |

#### Example Usage

```html
<div
    x-data="{ images: ['./image1.jpg', './image2.jpg', './image3.jpg'] }"
    x-init="$lightbox(images)"
></div>
```

> If there are also lightbox items created via `x-lightbox` targeting the same group (default or named), the items will be merged.

### `$lightbox.open(urlOrRef, group)`

#### Parameters

| Parameter    | Type                        | Default | Description                                                                                           |
|--------------|-----------------------------|---------|-------------------------------------------------------------------------------------------------------|
| **urlOrRef** | `string\|HTMLElement\|null` | `null`  | The URL or element ref of the item to open. If `null`, the first item in the lightbox will be opened. |
| **group**    | `string\|null`              | `null`  | The name of the lightbox group. If `null`, the default lightbox will be opened.                       |

#### Example Usage

```html
<img src="#" x-lightbox="'./image.jpg'" x-ref="image" alt="Example image">

<a href="#" @click="$lightbox.open('./image.jpg')">Open Image</a>
or
<a href="#" @click="$lightbox.open($refs.image)">Open Image</a>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
