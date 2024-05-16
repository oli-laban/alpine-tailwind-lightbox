import html from './template.html'

export default function (Alpine) {
    Alpine.store('lightbox', {
        show: null,
        items: [],
        touchStart: null,

        onTouchStart(event) {
            if (!event.changedTouches) {
                this.touchStart = null

                return
            }

            this.touchStart = event.changedTouches[0]
        },
        onTouchEnd(event) {
            if (!event.changedTouches || !this.touchStart) return

            const { screenX: startX, screenY: startY } = this.touchStart
            const { screenX: endX, screenY: endY } = event.changedTouches[0]

            if (!startX || !startY || !endX || !endY) return

            const horizontalDiff = startX - endX
            const verticalDiff = startY - endY

            if (Math.abs(horizontalDiff) < Math.abs(verticalDiff)) return

            if (horizontalDiff >= 100) {
                this.next()
            } else if (horizontalDiff <= -100) {
                this.prev()
            }
        },
        prev() {
            const current = this.items.findIndex((item) => item.el === this.show.el)

            this.show = current === 0 ? this.items[this.items.length - 1] : this.items[current - 1]
        },
        next() {
            const current = this.items.findIndex((item) => item.el === this.show.el)

            this.show = current === this.items.length - 1 ? this.items[0] : this.items[current + 1]
        },
    })

    if (!document.querySelector('#lightbox')) {
        Alpine.mutateDom(() => {
            const template = document.createElement('template')

            template.innerHTML = html

            document.body.appendChild(template.content.children[0])
        })
    }

    Alpine.directive('lightbox', (el, { modifiers, expression }, { effect, evaluateLater }) => {
        if (!expression) {
            console.warn('Alpine warn: no url or config expression passed to x-lightbox', el)

            return
        }

        const evaluateConfig = evaluateLater(expression)

        effect(() => {
            evaluateConfig((config) => {
                const items = Alpine.store('lightbox').items
                const index = Alpine.store('lightbox').items.findIndex((item) => item.el === el)
                const data = mergeConfig(config, el)

                if (index !== -1) {
                    items[index] = data
                } else {
                    items.push(data)
                }
            })
        })

        el.addEventListener('click', (event) => {
            event.preventDefault()

            Alpine.store('lightbox').show = Alpine.store('lightbox').items.find((item) => item.el === el)
        })
    })
}

const mergeConfig = (config, el) => {
    if (typeof config === 'string') config = { url: config }

    return { el, type: 'image', ...config }
}
