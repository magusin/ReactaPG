'use client'
import React, { useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import PlayerContext from 'src/PlayerContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ReactPG',
  description: 'Fight for Glory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [challengingPlayer, setChallengingPlayer] = useState(null);

  return (
      <html lang="en">
      <body className={inter.className}>
        <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer, challengingPlayer, setChallengingPlayer }}>
          {children}
        </PlayerContext.Provider>
      </body>
    </html>
  )
}
