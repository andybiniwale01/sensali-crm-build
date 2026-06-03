'use client'

import { useState } from 'react'
import { DashboardSidebar, SuburbSelector } from '@/components/dashboard-sidebar'
import { PropertyPanel, StatusBadge, SignalTag, MiniScoreGauge } from '@/components/property-panel'
import { 
  mockProperties, 
  currentAgent, 
  recentListing,
  getGreeting, 
  formatDate, 
  getWeekOf, 
  getLastUpdated,
  Property 
} from '@/lib/data'

function TrophyIcon() {
  return (
    <svg className="w-5 h-5 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 3h14v2h-1v1.07A7.997 7.997 0 0114 14.92V17h2a1 1 0 110 2H8a1 1 0 110-2h2v-2.08A7.997 7.997 0 016 6.07V5H5V3zm3 3.07V7a5 5 0 0010 0V6.07a6.001 6.001 0 01-10 0z"/>
    </svg>
  )
}

function StatCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode
}) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] p-5 shadow-[inset_0_0_0_1px_rgba(201,168,76,0.15),0_0_20px_rgba(201,168,76,0.05)] hover:shadow-[inset_0_0_0_1px_rgba(201,168,76,0.3),0_0_25px_rgba(201,168,76,0.1)] transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#C9A84C]">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-[#8b949e]">{title}</p>
    </div>
  )
}

export default function DashboardPage() {
  const [selectedSuburb, setSelectedSuburb] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [properties, setProperties] = useState(mockProperties)
  const [showListingBanner, setShowListingBanner] = useState(true)

  const filteredProperties = selectedSuburb === 'all' 
    ? properties 
    : properties.filter(p => p.suburb === selectedSuburb)

  const top20 = filteredProperties.slice(0, 20)

  const stats = {
    totalScored: filteredProperties.length,
    top20: 20,
    hotLeads: filteredProperties.filter(p => p.status === 'HOT').length,
    listingsWon: filteredProperties.filter(p => p.pipelineStage === 'LISTING_WON').length,
  }

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(props => 
      props.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    )
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <DashboardSidebar selectedSuburb={selectedSuburb} onSuburbChange={setSelectedSuburb} />
      
      <main className="ml-64 min-h-screen">
        {/* Listing Attribution Banner */}
        {showListingBanner && (
          <div className="bg-[#C9A84C]/10 border-b border-[#C9A84C]/30 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrophyIcon />
              <span className="text-sm text-white">
                <strong>{recentListing.address}</strong> just listed — you contacted this owner {recentListing.contactedWeeksAgo} weeks ago. 
                Estimated commission: <strong className="text-[#C9A84C]">${recentListing.estimatedCommission.toLocaleString()}</strong>
              </span>
            </div>
            <button 
              onClick={() => setShowListingBanner(false)}
              className="text-[#8b949e] hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {getGreeting()}, {currentAgent.name.split(' ')[0]}
              </h1>
              <p className="text-[#8b949e] mt-1">{formatDate(new Date())}</p>
            </div>
            <SuburbSelector value={selectedSuburb} onChange={setSelectedSuburb} />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Scored" 
              value={stats.totalScored}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
            <StatCard 
              title="This Week's Top 20" 
              value={stats.top20}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
            <StatCard 
              title="Hot Leads" 
              value={stats.hotLeads}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="square" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              }
            />
            <StatCard 
              title="Listings Won" 
              value={stats.listingsWon}
              icon={<TrophyIcon />}
            />
          </div>

          {/* Top 20 Table */}
          <div className="bg-[#161b22] border border-[#30363d]">
            <div className="px-6 py-4 border-b border-[#30363d] flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-white">TOP 20 RANKED PROPERTIES</h2>
                <p className="text-sm text-[#8b949e]">Week of {getWeekOf()}</p>
              </div>
              <span className="text-xs text-[#8b949e]">UPDATED {getLastUpdated()}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#30363d]">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider w-16">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Address</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Owner Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider w-20">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Top Signals</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider w-24">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider w-28">Last Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {top20.map((property) => (
                    <tr 
                      key={property.id}
                      onClick={() => setSelectedProperty(property)}
                      className="border-b border-[#21262d] cursor-pointer hover:bg-[rgba(201,168,76,0.05)] hover:border-l-[3px] hover:border-l-[#C9A84C] transition-all"
                    >
                      <td className="px-4 py-4">
                        <span className="text-2xl font-bold text-[#C9A84C]">{property.rank}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{property.address}</p>
                          <p className="text-xs text-[#8b949e]">{property.suburb} {property.postcode}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-white">{property.ownerName}</td>
                      <td className="px-4 py-4">
                        <MiniScoreGauge score={property.score} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {property.signals.slice(0, 2).map((signal, idx) => (
                            <SignalTag key={idx} label={signal.label} />
                          ))}
                          {property.signals.length > 2 && (
                            <span className="text-[10px] text-[#8b949e]">+{property.signals.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={property.status} />
                      </td>
                      <td className="px-4 py-4 text-sm text-[#8b949e]">
                        {property.lastContact || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Property Side Panel */}
      {selectedProperty && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSelectedProperty(null)}
          />
          <PropertyPanel 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)}
            onUpdateProperty={handleUpdateProperty}
          />
        </>
      )}
    </div>
  )
}
