import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getArticleData } from '../lib/articles';

export async function getStaticProps() {
    const articleData = await getArticleData("about")
    return {
        props: {
            articleData,
        }
    }
}

export default function AboutPage({ articleData }) {
    return (
        <Layout>
            <article>
                <h1 className={utilStyles.headingXl}>Home</h1>
                <div className={utilStyles.lightText}>
                <p>What is FPL Suggestions?</p>
                </div>
                <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
            </article>
        </Layout>
    )
}