import Layout from 'components/Layout';
import Summary from 'components/Summary';
import { APP_DESCRIPTION, APP_NAME } from 'lib/config';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>{APP_NAME}</title>
                <meta name="description" content={APP_DESCRIPTION} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout icon="🤑" title="Summary" description="Your spending summary">
                <Summary />
            </Layout>
        </>
    );
}
