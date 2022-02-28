import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Content } from '../components/Content';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>All Todo</title>
      </Head>
      <Header />

      <Content page="index" />
    </>
  );
};

export default Home;
