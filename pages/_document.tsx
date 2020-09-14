import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

// Document component is strongly typed with `@types/next`
export default class MyDocument extends Document {
  render () {
    return (
      <html lang="en">
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}