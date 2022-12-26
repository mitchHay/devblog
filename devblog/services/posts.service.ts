import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import { FrontMatter, FrontMatterData } from "../models/frontmatter";

const getPosts = (): string[] => {
    return readdirSync('posts');
}

const retrieveFrontMatter = (postFileName: string): FrontMatter => {
    const fileContents = readFileSync(path.join('posts', postFileName), 'utf8');
    const result = matter(fileContents);

    return {
        data: result.data as FrontMatterData,
        content: result.content
    };
}

export {
    getPosts,
    retrieveFrontMatter
};