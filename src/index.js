import html from './template.html'

let defaultGroup = null
const lazyLoadedImages = []

export default function (Alpine) {
    Alpine.store('lightbox', {
        show: {},
        items: {},
        touchStart: null,

        onTouchStart(event) {
            if (!event.changedTouches) {
                this.touchStart = null

                return
            }

            this.touchStart = event.changedTouches[0]
        },
        onTouchEnd(event, group) {
            if (!event.changedTouches || !this.touchStart) return

            const { screenX: startX, screenY: startY } = this.touchStart
            const { screenX: endX, screenY: endY } = event.changedTouches[0]

            if (!startX || !startY || !endX || !endY) return

            const horizontalDiff = startX - endX
            const verticalDiff = startY - endY

            if (Math.abs(horizontalDiff) < Math.abs(verticalDiff)) return

            if (horizontalDiff >= 100) {
                this.next(group)
            } else if (horizontalDiff <= -100) {
                this.prev(group)
            }
        },
        loadImage(item, group) {
            const index = this.items[group].findIndex(({ id }) => id === item.id)
            const items = [item, this.nextItem(index, group), this.prevItem(index, group)]

            items.filter(Boolean).forEach(({ id, url, loaded }) => {
                if (loaded) return

                const image = new Image()

                image.onload = () => {
                    const loadedIndex = this.items[group].findIndex((current) => current.id === id)

                    this.items[group][loadedIndex].loaded = true

                    lazyLoadedImages.push(image)
                }
                image.src = url
            })
        },
        open(group, urlOrRef) {
            const item = urlOrRef
                ? this.items[group]
                    .find((item) => item[typeof urlOrRef === 'object' ? 'el' : 'url'] === urlOrRef)
                : (this.items[group][0] || null)

            if (item) {
                this.show[group] = item

                this.loadImage(item, group)
            }
        },
        prevItem(index, group) {
            return index === 0
                ? this.items[group][this.items[group].length - 1]
                : this.items[group][index - 1]
        },
        nextItem(index, group) {
            return index === this.items[group].length - 1
                ? this.items[group][0]
                : this.items[group][index + 1]
        },
        navigate(direction, group) {
            const current = this.items[group].findIndex((item) => item.id === this.show[group].id)
            const newCurrent = direction === 'prev'
                ? this.prevItem(current, group)
                : this.nextItem(current, group)

            this.show[group] = newCurrent

            this.loadImage(newCurrent, group)
        },
        prev(group) {
            this.navigate('prev', group)
        },
        next(group) {
            this.navigate('next', group)
        },
    })

    function createOrUpdateLightbox(items, group, id = null, el = null, modifiers = []) {
        if (!Array.isArray(items)) items = [items]

        if (!document.querySelector(`#lightbox-${group}`)) {
            const template = document.createElement('template')
            template.innerHTML = html

            const templateEl = template.content.children[0]
            templateEl.id = `lightbox-${group}`
            templateEl.setAttribute('x-data', `{ group: '${group}' }`)

            document.body.appendChild(templateEl)

            setTimeout(() => {
                if (!templateEl.hasOwnProperty('_x_isShown')) {
                    Alpine.initTree(templateEl)
                }
            }, 15)
        }

        Alpine.store('lightbox').show[group] ??= null;
        Alpine.store('lightbox').items[group] ??= [];

        const existingItems = Alpine.store('lightbox').items

        items.forEach((config) => {
            const index = Alpine.store('lightbox').items[group]?.findIndex((item) => item.id === id)
            const data = mergeConfig(config, group, id, el, modifiers)

            if (index !== -1 && index !== undefined) {
                existingItems[group][index] = { ...existingItems[group][index], ...data }
            } else {
                data.loaded = !data.lazy

                existingItems[group].push(data)
            }
        })
    }

    Alpine.magic('lightbox', () => {
        function register(items, group = null) {
            items = items.map((item) => {
                if (typeof item === 'string') item = { url: item }

                item.id = getRandomId()

                return item
            })

            createOrUpdateLightbox(items, group || getDefaultGroupName())
        }

        register.open = (urlOrRef = null, group = null) => {
            Alpine.store('lightbox').open(group || getDefaultGroupName(), urlOrRef)
        }

        return register
    })

    Alpine.directive('lightbox', (el, { value, modifiers, expression }, { effect, evaluateLater }) => {
        if (value === 'group') {
            return
        }

        if (!expression) {
            console.warn('Alpine warn: no url or config expression passed to x-lightbox', el)

            return
        }

        const evaluateConfig = evaluateLater(expression)
        const id = getRandomId()
        let hasListener = false

        effect(() => {
            evaluateConfig((config) => {
                Alpine.nextTick(() => {
                    const group = getGroupName(el, config)

                    createOrUpdateLightbox(config, group, id, el, modifiers)

                    if (!hasListener) {
                        el.addEventListener('click', (event) => {
                            event.preventDefault()

                            Alpine.store('lightbox').open(group, el)
                        })

                        hasListener = true
                    }
                })
            })
        })
    })
}

const getRandomId = () => (Math.random() + 1).toString(36).substring(2, 15)

const getGroupName = (el, config) => {
    if (el.hasAttribute('x-lightbox:group')) {
        return el.getAttribute('x-lightbox:group')
    }

    if (config.group) return String(config.group)

    return getDefaultGroupName()
}

const getDefaultGroupName = () => {
    defaultGroup ??= getRandomId()

    return defaultGroup
}

const mergeConfig = (config, group, id = null, el = null, modifiers = []) => {
    if (typeof config === 'string') config = { url: config }

    return {
        type: 'image',
        lazy: modifiers.includes('lazy'),
        autoplay: false,
        muted: false,
        id,
        ...config,
        el,
        group,
    }
}
