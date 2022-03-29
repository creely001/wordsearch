import Head from 'next/head'
import Image from 'next/image'
import Wordsearch from '../src/components/Wordsearch'

export default function Home() {


  return (
    <div>
      <Head>
        <title>Wordsearch</title>
        <meta name="description" content="Wordsearch" />
        <link rel="icon" href="./favicon.ico" />
      </Head>



        <Wordsearch/>




    </div>
  )
}
