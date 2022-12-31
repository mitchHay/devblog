export type FrontMatter = {
    data: FrontMatterData,
    content: any
}

export type FrontMatterData = {
    title: string,
    author: string,
    category: string,
    date: string,
    bannerImage: string,
    published: boolean,
    tags: string[]
}