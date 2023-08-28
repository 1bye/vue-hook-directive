
export interface vueDirectiveOptions {
    listeners?: Array<string>,
    prefix?: string
}

export type Obj<T> = {
    [name: string]: T
}

export interface vueDirectiveHookOptions {
    clear?: number | null,
    default?: any | null,
}
