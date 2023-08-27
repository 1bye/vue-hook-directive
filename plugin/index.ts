import {reactive, Ref, ref} from "vue";
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

type Obj<T> = {
    [name: string]: T
}

interface vueDirectiveHookOptions {
    clear?: number,
    default?: any,
}

const hook = createHooks();

export const vueDirective = {
    install(app: App, options?: vueDirectiveOptions | null) {
        let _prefix = '';

        if (options) {
            const {listeners, prefix} = options;

            if (listeners)
                eventListeners.push(...listeners);

            if (prefix)
                _prefix = prefix;
        }

        const hooks: Ref<Obj<any>> = ref({});
        const hooksTimeouts: Ref<Obj<any>> = ref({});

        app.config.globalProperties.$hook = (key: string, options?: vueDirectiveHookOptions) => {
            const opts = {clear: null, default: null};
            if (options) {
                const {clear, default: _def} = options;
                if (clear) opts.clear = clear;
                if (_def) opts.default = _def;
            }

            if(hooks.value[key] === undefined) hooks.value[key] = opts.default;

            if (hooksTimeouts.value[key]) clearTimeout(hooksTimeouts.value[key]);

            if (opts.clear) {
                hooksTimeouts.value[key] = setTimeout(() => {
                    hooks.value[key] = opts.default;
                }, opts.clear)
            }
            return hooks.value[key];
        }


        /**
         * Directive
         */


        app.directive('hook', {
            mounted: (el, binding) => {
                const arg = binding.arg || '';
                if (!eventListeners.includes(arg)) return;

                if (!el) {
                    throw new Error('[Vue Hook Directive] Directive should be on an element');
                }

                el.addEventListener(arg, async () => {
                    const modifiers = Object.keys(binding.modifiers);
                    if (modifiers.length >= 1) {
                        const last = modifiers.at(-1) === 'toggle' ? modifiers.pop() : null
                        for (const modifier of modifiers) {
                            let value = last === 'toggle' ? !hooks.value[modifier] : binding.value;
                            hooks.value[modifier] = value;
                            await hook.callHook(`${_prefix}${modifier}`, value);
                        }
                    }
                });
            }
        });

    }
} as Plugin<vueDirectiveOptions>;


export const useHook = () => {
    return hook;
}