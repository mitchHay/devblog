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

const getTimeToRead = (content: string): number => {
  const averageWPM = 220;
  const words = content.trim().split(/\s+/).length;
  
  return Math.ceil(words / averageWPM);
};

export {
  getPosts,
  retrieveFrontMatter,
  getTimeToRead
};