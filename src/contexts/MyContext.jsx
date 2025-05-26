// contexts/MyContext.js
'use client'

import { createContext, useState, useContext } from 'react'

const MyContext = createContext()

export function MyProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [navigatingTo, setNavigatingTo] = useState('')
  const [homePageItemsLoaded, setHomePageItemsLoaded] = useState(0)
  return (
    <MyContext.Provider value={{ loading, setLoading, navigatingTo, setNavigatingTo, homePageItemsLoaded, setHomePageItemsLoaded }}>
      {children}
    </MyContext.Provider>
  )
}

export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useLoading must be used within a MyProvider')
  }
  return context
}
