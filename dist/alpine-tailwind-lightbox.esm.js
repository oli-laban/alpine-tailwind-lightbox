var x=`<div
    class="fixed inset-0 bg-black/90 touch-pinch-zoom z-[9999]"
    style="display: none;"
    role="region"
    aria-modal="true"
    aria-roledescription="carousel"
    x-show="$store.lightbox.show[group]"
    x-transition.opacity.duration.300ms
    x-trap.noscroll="$store.lightbox.show[group]"
    :aria-hidden="!$store.lightbox.show[group]"
    @touchstart="$store.lightbox.onTouchStart($event)"
    @touchend="$store.lightbox.onTouchEnd($event, group)"
    @keydown.esc="$store.lightbox.show[group] = null"
    @keydown.left="$store.lightbox.prev(group)"
    @keydown.right="$store.lightbox.next(group)"
>
    <ul aria-live="polite" role="presentation" id="lightbox-list">
        <template x-for="(item, index) in $store.lightbox.items[group]">
            <li
                class="absolute inset-0 flex justify-center items-center"
                role="group"
                aria-roledescription="slide"
                x-show="$store.lightbox.show[group]?.el === item.el"
                x-transition.opacity.duration.300ms
                :aria-label="\`\${index + 1} of \${$store.lightbox.items[group].length}\`"
                @click.self="$store.lightbox.show[group] = null"
            >
                <template x-if="item.type === 'image'">
                    <img class="w-auto h-auto max-h-screen max-w-screen" :src="item.url" :alt="item.alt || ''">
                </template>
                <template x-if="item.type === 'embed'">
                    <div class="flex items-center w-full self-stretch max-w-[calc(80vh/0.5625)]">
                        <div class="relative w-full h-0 pb-[56.25%]">
                            <iframe
                                class="absolute top-0 left-0 w-full h-full"
                                allowfullscreen
                                :src="item.url"
                            ></iframe>
                        </div>
                    </div>
                </template>
                <template x-if="item.type === 'video'">
                    <div class="flex items-center w-full self-stretch max-w-[calc(80vh/0.5625)]">
                        <div class="relative w-full h-0 pb-[56.25%]">
                            <video
                                class="absolute top-0 left-0 w-full h-full"
                                :src="item.url"
                                controls
                                playsinline
                                x-data="{
                                    setAttr(attr, val) {
                                        $el[attr] = val
                                    }
                                }"
                                x-init="
                                    setAttr('autoplay', item.autoplay)
                                    setAttr('muted', item.muted)
                                    $watch('item.autoplay', (val) => setAttr('autoplay', val))
                                    $watch('item.muted', (val) => setAttr('muted', val))
                                "
                            ></video>
                        </div>
                    </div>
                </template>
            </li>
        </template>
    </ul>
    <a
        href="#"
        class="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Previous"
        x-show="$store.lightbox.items[group].length > 1"
        @click.prevent="$store.lightbox.prev(group)"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M107.726985,190.9204 L286.938237,27.2629715 C293.19479,21.054178 293.19479,10.8653886 286.938237,4.65659512 C280.681683,-1.55219837 270.524734,-1.55219837 264.284101,4.65659512 L73.5467803,178.821213 C70.2195038,182.164409 68.7867053,186.622005 69.025505,190.9204 C68.7867053,195.377995 70.2195038,199.835591 73.5467803,203.178787 L264.284101,377.343405 C270.524734,383.552198 280.681683,383.552198 286.938237,377.343405 C293.19479,370.975412 293.19479,360.945822 286.938237,354.737029 L107.726985,190.9204"></path>
        </svg>
    </a>
    <a
        href="#"
        class="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Next"
        x-show="$store.lightbox.items[group].length > 1"
        @click.prevent="$store.lightbox.next(group)"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M129.096985,190.9204 L308.308237,27.2629715 C314.56479,21.054178 314.56479,10.8653886 308.308237,4.65659512 C302.051683,-1.55219837 291.894734,-1.55219837 285.654101,4.65659512 L94.9167803,178.821213 C91.5895038,182.164409 90.1567053,186.622005 90.395505,190.9204 C90.1567053,195.377995 91.5895038,199.835591 94.9167803,203.178787 L285.654101,377.343405 C291.894734,383.552198 302.051683,383.552198 308.308237,377.343405 C314.56479,370.975412 314.56479,360.945822 308.308237,354.737029 L129.096985,190.9204" transform="translate(201.685326, 191.000000) scale(-1, 1) translate(-201.685326, -191.000000)"></path>
        </svg>
    </a>
    <a
        href="#"
        class="absolute top-4 right-4 bg-black/40 p-3 md:p-4 rounded"
        role="button"
        aria-controls="lightbox-list"
        aria-label="Close"
        @click.prevent="$store.lightbox.show[group] = null"
    >
        <svg
            class="w-4 h-4 md:w-5 md:h-5 fill-white"
            viewBox="0 0 382 382"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <path d="M376.667262,5.33273811 C383.023836,11.6893126 383.109736,21.9419848 376.924961,28.4038592 L376.667262,28.6672619 L214.335,191 L376.370193,353.035669 C382.813844,359.47932 382.813844,369.926542 376.370193,376.370193 C370.013618,382.726767 359.760946,382.812667 353.299072,376.627892 L353.035669,376.370193 L191,214.335 L28.964331,376.370193 C22.5206802,382.813844 12.073458,382.813844 5.62980723,376.370193 C-0.726767222,370.013618 -0.812666876,359.760946 5.37210827,353.299072 L5.62980723,353.035669 L167.665,191 L5.33273811,28.6672619 C-1.1109127,22.2236111 -1.1109127,11.7763889 5.33273811,5.33273811 C11.6893126,-1.02383634 21.9419848,-1.109736 28.4038592,5.07503915 L28.6672619,5.33273811 L191,167.665 L353.332738,5.33273811 C359.776389,-1.1109127 370.223611,-1.1109127 376.667262,5.33273811 Z"></path>
        </svg>
    </a>
</div>
`;var p=null;function w(e){e.store("lightbox",{show:{},items:{},touchStart:null,onTouchStart(t){if(!t.changedTouches){this.touchStart=null;return}this.touchStart=t.changedTouches[0]},onTouchEnd(t,o){if(!t.changedTouches||!this.touchStart)return;let{screenX:i,screenY:a}=this.touchStart,{screenX:h,screenY:u}=t.changedTouches[0];if(!i||!a||!h||!u)return;let n=i-h,c=a-u;Math.abs(n)<Math.abs(c)||(n>=100?this.next(o):n<=-100&&this.prev(o))},prev(t){let o=this.items[t].findIndex(i=>i.el===this.show[t].el);this.show[t]=o===0?this.items[t][this.items[t].length-1]:this.items[t][o-1]},next(t){let o=this.items[t].findIndex(i=>i.el===this.show[t].el);this.show[t]=o===this.items[t].length-1?this.items[t][0]:this.items[t][o+1]}}),e.directive("lightbox",(t,{value:o,modifiers:i,expression:a},{effect:h,evaluateLater:u})=>{if(o==="group")return;if(!a){console.warn("Alpine warn: no url or config expression passed to x-lightbox",t);return}let n=u(a);h(()=>{n(c=>{let s=b(t,c);if(e.store("lightbox").show[s]===void 0&&(e.store("lightbox").show[s]=null),e.store("lightbox").items[s]??=[],!document.querySelector(`#lightbox-${s}`)){let r=document.createElement("template");r.innerHTML=x;let l=r.content.children[0];l.id=`lightbox-${s}`,l.setAttribute("x-data",`{ group: '${s}' }`),document.body.appendChild(l),setTimeout(()=>{l.hasOwnProperty("_x_isShown")||e.initTree(l)},15)}let m=e.store("lightbox").items,d=e.store("lightbox").items[s]?.findIndex(r=>r.el===t),g=v(c,s,t);d!==-1&&d!==void 0?m[s][d]=g:m[s].push(g),t.addEventListener("click",r=>{r.preventDefault(),e.store("lightbox").show[s]=e.store("lightbox").items[s].find(l=>l.el===t)})})})})}var b=(e,t)=>e.hasAttribute("x-lightbox:group")?e.getAttribute("x-lightbox:group"):t.group?String(t.group):(p??=(Math.random()+1).toString(36).substring(7),p),v=(e,t,o)=>(typeof e=="string"&&(e={url:e}),{el:o,type:"image",autoplay:!1,muted:!1,...e,group:t});var k=w;export{k as default};
