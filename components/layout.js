import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'FPL Assist';
const siteTitle = "FPL Assist"

export default function Layout({ children, home }) {
  return (
    <div>
      {home ? <></> :
        <div style={{ backgroundColor: "black", padding: "10px" }}>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/profile.PNG"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </a>
          </Link>
        </div>
      }

      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? <></> : (
            <>
              <div className={utilStyles.pageHeadingSection}>
                <div className={styles.container}>
                  <h2 className={utilStyles.headingPage}>
                    <Link href="/">
                      <a className={utilStyles.colorInherit}>{name}</a>
                    </Link>
                  </h2>
                </div>
              </div>
            </>
          )}
        </header>
        <main>{children}</main>
      </div>
      <section className={utilStyles.footerSection}>
        <div className={styles.container}>
          <div style={{display: "flex"}}>
            <div style={{paddingRight: "60px"}}>
              <p className={utilStyles.headingSm}>FPL Assist</p>
              <div>
                <Link href={'/'}>
                  <a className={utilStyles.footerLinkStyle}>Home</a>
                </Link>
              </div>
              <div>
                <Link href={'/faq'}>
                  <a className={utilStyles.footerLinkStyle}>FAQ</a>
                </Link>
              </div>
            </div>
            <div>
              <p className={utilStyles.headingSm}>Tools</p>
              <div>
                <Link href={'/player-query'}>
                  <a className={utilStyles.footerLinkStyle}>Player Query</a>
                </Link>
              </div>
              <div>
                <Link href={'/player-scatterplot'}>
                  <a className={utilStyles.footerLinkStyle}>Scatterplot</a>
                </Link>
              </div>
              <div>
                <Link href={'/team-compare'}>
                  <a className={utilStyles.footerLinkStyle}>Fixtures</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}