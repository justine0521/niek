import React from 'react'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import Product from '../pages/Product'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <section id='hero'><Hero /></section>
      <section id='popular'><Popular/></section>
      <section id='product'><Product /></section>
    </main>
  )
}
