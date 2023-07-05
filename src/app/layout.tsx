'use client'
import React, { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import PlayerContext from 'src/PlayerContext';
import metaData from 'src/MetaData';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [challengingPlayer, setChallengingPlayer] = useState(null);

  return (
      <html lang="en">
        <head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
      </head>
      <body className={inter.className}>
        <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer, challengingPlayer, setChallengingPlayer }}>
          {children}
        </PlayerContext.Provider>
      </body>
    </html>
  )
}
