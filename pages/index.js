import Head from 'next/head'
import Image from 'next/image'
import Row from '../components/Row.js'
import Wordsearch from '../components/Wordsearch'
import Dropdown from '../components/Dropdown'
import useWordSearchGrid from '../hooks/useWordSearchGrid';
import {useRef, useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Wordsearch</title>
        <meta name="description" content="Wordsearch" />
        <link rel="icon" href="./favicon.ico" />
      </Head>

      <main className={styles.main}>


      <Wordsearch/>



      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
