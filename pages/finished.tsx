import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { Content } from '../components/Content';

const Active: NextPage = () => {
  return (
    <>
      <Head>
        <title>Finished Todo</title>
      </Head>
      <Header />

      <Content page="finished" />
    </>
  );
};

export default Active;
