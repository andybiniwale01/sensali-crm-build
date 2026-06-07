'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SensaliLogoSmall } from '@/components/sensali-logo'
import { currentAgent } from '@/lib/data'
import type { Suburb } from '@/lib/data'
import { fetchSuburbs } from '@/lib/api'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'My Leads', href: '/dashboard/leads', icon: LeadsIcon },
  { label: 'Pipeline', href: '/dashboard/pipeline', icon: PipelineIcon },
  { label: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
]

function DashboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  )
}

function LeadsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PipelineIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="square" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="square" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  )
}

interface DashboardSidebarProps {
  selectedSuburb: string
  onSuburbChange: (suburb: string) => void
}

export function DashboardSidebar({ selectedSuburb, onSuburbChange }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#090d12] border-r border-[#21262d] flex flex-col min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#21262d]">
        <SensaliLogoSmall />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#161b22] text-[#C9A84C] border-l-2 border-[#C9A84C]'
                      : 'text-[#8b949e] hover:text-white hover:bg-[#161b22]'
                  }`}
                >
                  <item.icon />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-[#21262d]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#C9A84C] font-semibold">
            {currentAgent.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{currentAgent.name}</p>
            <span className="inline-block text-[10px] px-2 py-0.5 bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30">
              {currentAgent.plan}
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-white transition-colors"
        >
          <SignOutIcon />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}

export function SuburbSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [suburbs, setSuburbs] = useState<Suburb[]>([])

  useEffect(() => {
    fetchSuburbs().then(setSuburbs).catch(console.error)
  }, [])

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#161b22] border border-[#30363d] text-white px-4 py-2 text-sm focus:outline-none focus:border-[#C9A84C] cursor-pointer"
    >
      <option value="all">All Suburbs</option>
      {suburbs.map((suburb) => (
        <option key={suburb.name} value={suburb.name}>
          {suburb.name} ({suburb.postcode})
        </option>
      ))}
    </select>
  )
}
