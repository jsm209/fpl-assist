import Head from 'next/head'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/Link';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>FPL Suggestions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={utilStyles.paddingSection}>
        <h1 className={utilStyles.headingXl}>Home</h1>
        <div className={utilStyles.lightText}>
          <Link href={'/about'}>
            <a>What is this project? Who is it for?</a>
          </Link>
          <br />
          <Link href={'/about'}>
            <a>How do I use FPL Suggestions?</a>
          </Link>
        </div>
      </section>

      <section className={utilStyles.paddingSection}>
        <h1 className={utilStyles.headingXl}>Available Tools</h1>
        <div className={utilStyles.lightText}>
          <Link href={'/player-query'}>
            <a>Player Query</a>
          </Link>
          <br />
          <Link href={'/player-scatterplot'}>
            <a>Player Scatterplot</a>
          </Link>
          <br />
          <Link href={'/team-compare'}>
            <a>Team Comparer</a>
          </Link>
          <br />
          <Link href={'/about'}>
            <a>Fixture Viewer</a>
            {/* <p>Show a list of fixtures, clicking a fixture loads the strength into two bar graphs, 
              lists out the team's players ordered by cost, showing their total points scored, position, and injuries</p> */}
          </Link>
          <br />
          <Link href={'/about'}>
            <a>Player Suggestor (Under Construction)</a>
          </Link>
          <br />
          <Link href={'/about'}>
            <a>Detailed Player Performance Over Time (Under Construction)</a>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
