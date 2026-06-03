'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { mockSuburbs, currentAgent } from '@/lib/data'

function SettingsSection({ 
  title, 
  children 
}: { 
  title: string
  children: React.ReactNode 
}) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] mb-6">
      <div className="px-6 py-4 border-b border-[#30363d]">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

function Toggle({ 
  checked, 
  onChange, 
  label 
}: { 
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-white">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 transition-colors ${
          checked ? 'bg-[#C9A84C]' : 'bg-[#30363d]'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white transition-transform ${
            checked ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </label>
  )
}

export default function SettingsPage() {
  const [selectedSuburb, setSelectedSuburb] = useState('all')
  const [weeklyDigest, setWeeklyDigest] = useState(currentAgent.weeklyDigest)
  const [signalAlerts, setSignalAlerts] = useState(currentAgent.signalAlerts)
  const [id4meConnected, setId4meConnected] = useState(currentAgent.id4meConnected)

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <DashboardSidebar selectedSuburb={selectedSuburb} onSuburbChange={setSelectedSuburb} />
      
      <main className="ml-64 min-h-screen">
        <div className="p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-[#8b949e] mt-1">Manage your account and preferences</p>
          </div>

          {/* My Suburbs */}
          <SettingsSection title="My Suburbs">
            <p className="text-sm text-[#8b949e] mb-4">
              Your competitors cannot access these suburbs.
            </p>
            <div className="space-y-3">
              {mockSuburbs.map((suburb) => (
                <div 
                  key={suburb.name}
                  className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d]"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">
                        {suburb.name}
                        <span className="text-[#8b949e] ml-2">{suburb.postcode}</span>
                      </p>
                      <p className="text-xs text-[#8b949e]">{suburb.propertyCount} properties</p>
                    </div>
                  </div>
                  {suburb.isExclusive && (
                    <span className="text-[10px] font-semibold px-2 py-1 bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30">
                      EXCLUSIVE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </SettingsSection>

          {/* RP Data Connection */}
          <SettingsSection title="RP Data Connection">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-pulse" />
                <div>
                  <p className="text-sm font-medium text-white">Connected</p>
                  <p className="text-xs text-[#8b949e]">{currentAgent.rpDataEmail}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-[#8b949e] border border-[#30363d] hover:border-[#ef4444] hover:text-[#ef4444] transition-colors">
                Disconnect
              </button>
            </div>
          </SettingsSection>

          {/* ID4ME Connection */}
          <SettingsSection title="ID4ME Connection">
            {id4meConnected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-white">Connected</p>
                    <p className="text-xs text-[#8b949e]">Phone numbers appear automatically on property records</p>
                  </div>
                </div>
                <button 
                  onClick={() => setId4meConnected(false)}
                  className="px-4 py-2 text-sm text-[#8b949e] border border-[#30363d] hover:border-[#ef4444] hover:text-[#ef4444] transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#8b949e] mb-4">
                  Connect your ID4ME account to automatically see phone numbers on property records.
                </p>
                <button 
                  onClick={() => setId4meConnected(true)}
                  className="px-4 py-2 text-sm bg-[#C9A84C] text-[#0d1117] font-medium hover:bg-[#a08839] transition-colors"
                >
                  Connect ID4ME
                </button>
              </div>
            )}
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection title="Notifications">
            <div className="space-y-4">
              <Toggle
                checked={weeklyDigest}
                onChange={setWeeklyDigest}
                label="Weekly Monday email digest"
              />
              <Toggle
                checked={signalAlerts}
                onChange={setSignalAlerts}
                label="New signal alerts"
              />
            </div>
          </SettingsSection>

          {/* Account */}
          <SettingsSection title="Account">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-[#30363d]">
                <span className="text-sm text-[#8b949e]">Name</span>
                <span className="text-sm text-white">{currentAgent.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#30363d]">
                <span className="text-sm text-[#8b949e]">Email</span>
                <span className="text-sm text-white">{currentAgent.email}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-[#8b949e]">Plan</span>
                <span className="text-sm px-2 py-1 bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30">
                  {currentAgent.plan}
                </span>
              </div>
            </div>
          </SettingsSection>
        </div>
      </main>
    </div>
  )
}
