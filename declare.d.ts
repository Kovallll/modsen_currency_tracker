declare module '*.module.css' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string }
    export default classes
}

declare module '*.scss' {
    const content: {
        [className: string]: string
    }
    export = content
}

declare module '*.css' {
    const content: {
        [className: string]: string
    }
    export = content
}
