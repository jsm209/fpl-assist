import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getArticleData } from '../lib/articles';

export async function getStaticProps() {
    const articleData = await getArticleData("faq")
    return {
        props: {
            articleData,
        }
    }
}

export default function FAQPage({ articleData }) {
    return (
        <Layout>
            <article>
                <h1 className={utilStyles.headingXl}>FAQ</h1>
                <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
            </article>
        </Layout>
    )
}