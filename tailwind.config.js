/** @type {import("tailwindcss").Config} */
// const colors = require("tailwindcss/colors")
// const plugin = require('tailwindcss/plugin')
/// https://github.com/tailwindlabs/tailwindcss/discussions/3105
const values = ["borderRadius","borderWidth","outlineWidth","outlineOffset", "fontSize","lineHeight", "spacing", "maxWidth","minWidth","minHeight","maxHeight","width","height"]
const extendedValues = Object.fromEntries(values.map((value) => {
    const sizes = {}
    for(let i = 0; i < 26; i++) {
        sizes[`${i}em`] = `${i}em`
        sizes[`${i}-1em`] = `${i}.1em`
        sizes[`${i}-2em`] = `${i}.2em`
        sizes[`${i}-25em`] = `${i}.25em`
        sizes[`${i}-3em`] = `${i}.3em`
        sizes[`${i}-4em`] = `${i}.4em`
        sizes[`${i}-5em`] = `${i}.5em`
        sizes[`${i}-6em`] = `${i}.6em`
        sizes[`${i}-7em`] = `${i}.7em`
        sizes[`${i}-75em`] = `${i}.75em`
        sizes[`${i}-8em`] = `${i}.8em`
        sizes[`${i}-9em`] = `${i}.9em`
    }
    return [value, {
        "none": "none",
        "0-05em": "0.05em",
        "0-1em": "0.1em",
        "0-15em": "0.15em",
        "0-24em": "0.24em",
        ...sizes,
        "screen-dh": "100dvh",
        "screen-dw": "100dvw",
        "screen-h": "100vh",
        "screen-w": "100vw",
        "full-px": "9999px",
    }]
})) 
export default {
    separator: "_",
    theme: {
        fontFamily: {
            // codelight: ["Code-Light","sans-serif"],
            // barlow: ["Barlow", "sans-serif"],
            // sofia: ["Sofia Sans Condensed", "sans-serif"],
            // play: ["Play", "sans-serif"],
            comfortaa: ["Comfortaa", "sans-serif"],
            unbounded: ["Unbounded", "cursive"],
            
            // jetbrains: ["JetBrains Mono", "mono"],
            didact: ["Didact Gothic", "sans-serif"],
            raleway: ["Raleway", "sans-serif"],
            // cormorant: ["Cormorant Infant", "serif"],
            // sourceserif: ["'Source Serif 4'", "serif"],
            monocraft: ["Monocraft"]
        },
        extend: {
            rotate: {
                '360': "360deg"
            },
            width: {
                "1440": "1440px"
            },
            ...extendedValues,
        },
        
    }
}

