import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import html from 'remark-html';
import { remark } from 'remark';

export async function getArticleData(articleName) {
    const postsDirectory = path.join(process.cwd(), 'articles');

    const fullPath = path.join(postsDirectory, `${articleName}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    const procesedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = procesedContent.toString();

    return {
        contentHtml,
        ...matterResult.data
    }
}