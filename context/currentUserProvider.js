'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export function CurrentUserProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user')
        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }
        const data = await res.json()
        setUser(data) // Inclure toutes les données utilisateur, y compris le rôle
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
