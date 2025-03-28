"use client"

import { useState, useEffect } from 'react'
import { LoadingOverlay } from '@/components/loading-overlay'

export default function ActivityPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Activity</h1>
        <p className="text-gray-600 mb-6">Track your recent actions and updates</p>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div>
                  <h3 className="font-medium">Project Created</h3>
                  <p className="text-gray-600">New project "Website Redesign" was created</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div>
                  <h3 className="font-medium">Template Updated</h3>
                  <p className="text-gray-600">Mobile App template was updated</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div>
                  <h3 className="font-medium">Settings Changed</h3>
                  <p className="text-gray-600">Profile settings were updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 