import type {App, Plugin} from "@vue/runtime-core";
import {createHooks} from 'hookable';

const eventListeners: string[] = [
    'abort', 'animationcancel', 'animationend', 'animationiteration', 'animationstart',
    'auxclick', 'beforeinput', 'beforeunload', 'blur', 'cancel', 'canplay', 'canplaythrough',
    'change', 'click', 'close', 'contextmenu', 'copy', 'cuechange', 'cut', 'dblclick',
    'drag', 'dragend', 'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart',
    'drop', 'durationchange', 'emptied', 'ended', 'error', 'focus', 'focusin', 'focusout',
    'fullscreenchange', 'fullscreenerror', 'gotpointercapture', 'hashchange', 'input',
    'invalid', 'keydown', 'keypress', 'keyup', 'load', 'loadeddata', 'loadedmetadata',
    'loadstart', 'lostpointercapture', 'message', 'messageerror', 'mousedown', 'mouseenter',
    'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'mousewheel', 'offline',
    'online', 'pagehide', 'pageshow', 'paste', 'pause', 'play', 'playing', 'pointercancel',
    'pointerdown', 'pointerenter', 'pointerleave', 'pointermove', 'pointerout', 'pointerover',
    'pointerup', 'popstate', 'progress', 'ratechange', 'reset', 'resize', 'scroll', 'securitypolicyviolation',
    'seeked', 'seeking', 'select', 'selectionchange', 'selectstart', 'show', 'stalled', 'submit',
    'suspend', 'timeupdate', 'toggle', 'touchcancel', 'touchend', 'touchmove', 'touchstart',
    'transitioncancel', 'transitionend', 'transitionrun', 'transitionstart', 'unload',
    'volumechange', 'waiting', 'wheel',
];

interface vueDirectiveOptions {
    listeners?: Array<string>,
    prefix?: string
}

const hook = createHooks();

export const vueDirective = {
    install(app: App, options?: vueDirectiveOptions | null) {


        app.directive('hook', (el, binding) => {
            if(!eventListeners.includes(binding.arg || '')) return;
            let _prefix = '';

            if(options) {
                const {listeners, prefix} = options;

                if(listeners)
                    eventListeners.push(...listeners);

                if(prefix)
                    _prefix = prefix;
            }
            if(!binding.arg) {
                throw new Error('[Vue Directive] Directive doesn\'t have event listener');
            }

            if(!el) {
                throw new Error('[Vue Directive] Directive should be on element');
            }

            el.addEventListener(binding.arg, async () => {
                if(Object.keys(binding.modifiers).length >= 1) {
                    for (const key of Object.keys(binding.modifiers)) {
                        await hook.callHook(`${_prefix}${key}`, binding.value)
                    }
                } else {
                    await hook.callHook(`${_prefix}${binding.arg}`, binding.value)
                }
            })
        });
    }
} as Plugin<vueDirectiveOptions>;


export const useHook = () => {
    return hook;
}