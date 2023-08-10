'use client'
import React, { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import PlayerContext from 'src/utils/PlayerContext';
import metaData from 'src/utils/MetaData';
import { Player } from 'src/types/Player';
import '#/i18n'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
const [challengingPlayer, setChallengingPlayer] = useState<Player | null>(null);

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
