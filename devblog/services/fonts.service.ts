import { Roboto } from "@next/font/google";

const roboto = Roboto({
    weight: [ '100', '300', '400', '700' ],
    subsets: [ 'latin' ]
});

const fontClasses = (): string => {
    return roboto.className;
}

export {
    fontClasses
}