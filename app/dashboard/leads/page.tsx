'use client'

import { useState, useMemo } from 'react'
import { DashboardSidebar, SuburbSelector } from '@/components/dashboard-sidebar'
import { PropertyPanel, StatusBadge, SignalTag, MiniScoreGauge } from '@/components/property-panel'
import { mockProperties, Property } from '@/lib/data'

type FilterStatus = 'ALL' | 'HOT' | 'WARM' | 'COLD' | 'NOT_CALLED'

export default function LeadsPage() {
  const [selectedSuburb, setSelectedSuburb] = useState('all')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [properties, setProperties] = useState(mockProperties)
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProperties = useMemo(() => {
    let result = properties

    // Filter by suburb
    if (selectedSuburb !== 'all') {
      result = result.filter(p => p.suburb === selectedSuburb)
    }

    // Filter by status
    if (filterStatus !== 'ALL') {
      result = result.filter(p => p.status === filterStatus)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.address.toLowerCase().includes(query) ||
        p.ownerName.toLowerCase().includes(query)
      )
    }

    return result
  }, [properties, selectedSuburb, filterStatus, searchQuery])

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(props => 
      props.map(p => p.id === updatedProperty.id ? updatedProperty : p)
    )
  }

  const filterButtons: { status: FilterStatus; label: string }[] = [
    { status: 'ALL', label: 'All' },
    { status: 'HOT', label: 'Hot' },
    { status: 'WARM', label: 'Warm' },
    { status: 'COLD', label: 'Cold' },
    { status: 'NOT_CALLED', label: 'Not Called' },
  ]

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <DashboardSidebar selectedSuburb={selectedSuburb} onSuburbChange={setSelectedSuburb} />
      
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">My Leads</h1>
              <p className="text-[#8b949e] mt-1">All scored properties in your territory</p>
            </div>
            <SuburbSelector value={selectedSuburb} onChange={setSelectedSuburb} />
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            {/* Status Filters */}
            <div className="flex gap-1">
              {filterButtons.map((btn) => (
                <button
                  key={btn.status}
                  onClick={() => setFilterStatus(btn.status)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    filterStatus === btn.status
                      ? 'bg-[#C9A84C] text-[#0d1117]'
                      : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#C9A84C] hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md ml-auto">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by address or owner..."
                  className="w-full bg-[#161b22] border border-[#30363d] pl-10 pr-4 py-2 text-sm text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-[#8b949e] mb-4">
            Showing {filteredProperties.length} properties
          </p>

          {/* Table */}
          <div className="bg-[#161b22] border border-[#30363d]">
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
                  {filteredProperties.map((property) => (
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

            {filteredProperties.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-[#8b949e]">No properties found matching your criteria.</p>
              </div>
            )}
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
