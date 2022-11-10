import Head from 'next/head'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import layoutStyles from '../styles/layout.module.css'
import Link from 'next/link';
import { getArticleData } from '../lib/articles';

export async function getStaticProps() {
  const articleData = await getArticleData("about")
  return {
    props: {
      articleData,
    }
  }
}

export default function Home({ articleData }) {
  return (
    <div>
      <div className={utilStyles.landingHeadingSection}>
        <div className={layoutStyles.container}>
          <h1 className={utilStyles.headingLanding}>FPL Assist</h1>
          <p className={utilStyles.subheadingLanding}>Fantasy Premier League Data Visualization Tools</p>
        </div>

      </div>
      <Layout home>
        <Head>
          <title>FPL Suggestions</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className={utilStyles.paddingSection}>
          <h1 className={utilStyles.headingXl}>Home</h1>
          <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
          <p>For more information about the legitimacy and reliability of the data and future tools, <Link href={'/faq'}>click here to view the FAQ</Link>.</p>
          <p className={utilStyles.hint}>Unsure of what to do? Try clicking some of the example questions below to automatically jump to a tool with prepopulated filters.</p>
          <ul>
            <li>
              <Link href={{
                pathname: "/player-scatterplot",
                query: {
                  x: "now_cost",
                  y: "form"
                }
              }}>
                <a>Which players have the highest form for the lowest cost?</a>
              </Link>
            </li>
            <li>
              <Link href={{
                pathname: "/player-scatterplot",
                query: {
                  x: "transfers_in_event",
                  y: "form"
                }
              }}>
                <a>What are the highest form players transferred in this week?</a>
              </Link>
            </li>
            <li>
              <Link href={{
                pathname: "/player-scatterplot",
                query: {
                  x: "element_type",
                  y: "total_points"
                }
              }}>
                <a>Which position (forward, defender, etc.) has the most total points?</a>
              </Link>
            </li>
            <li>
              <Link href={{
                pathname: "/player-scatterplot",
                query: {
                  x: "transfers_out",
                  y: "transfers_in"
                }
              }}>
                <a>Which players have a positive (or negative) overall ratio of being transferred in vs. transferred out?</a>
              </Link>
            </li>
          </ul>
        
        </section>

        <section className={utilStyles.paddingSection}>
          <h1 className={utilStyles.headingXl}>Available Tools</h1>
          <div className={utilStyles.centeredFlexboxColumn}>
            <Link href={'/player-query'}>
              <a>
                <div className={utilStyles.toolButton + " " + utilStyles.greenGradient}>
                  <p className={utilStyles.toolButtonLabel}>Player Query</p>
                </div>
              </a>
            </Link>
            <br />
            <Link href={'/player-scatterplot'}>
              <a>
                <div className={utilStyles.toolButton + " " + utilStyles.greenGradient}>
                  <p className={utilStyles.toolButtonLabel}>Player Scatterplot</p>
                </div>
              </a>
            </Link>
            <br />
            <Link href={'/team-compare'}>
              <a>
                <div className={utilStyles.toolButton + " " + utilStyles.greenGradient}>
                  <p className={utilStyles.toolButtonLabel}>Team Comparer</p>
                </div>
              </a>
            </Link>
            <br />
            <br />
          </div>
        </section>
      </Layout>
    </div>

  )
}
