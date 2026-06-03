'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { mockProperties, Property } from '@/lib/data'

type PipelineStage = 'NEW_LEAD' | 'CONTACTED' | 'APPRAISAL_BOOKED' | 'LISTING_WON'

const stages: { id: PipelineStage; label: string }[] = [
  { id: 'NEW_LEAD', label: 'New Lead' },
  { id: 'CONTACTED', label: 'Contacted' },
  { id: 'APPRAISAL_BOOKED', label: 'Appraisal Booked' },
  { id: 'LISTING_WON', label: 'Listing Won' },
]

function PropertyCard({ 
  property, 
  onDragStart 
}: { 
  property: Property
  onDragStart: (e: React.DragEvent, property: Property) => void
}) {
  const topSignal = property.signals[0]
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, property)}
      className="bg-[#0d1117] border border-[#30363d] p-4 cursor-grab active:cursor-grabbing hover:border-[#C9A84C]/50 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-sm font-medium text-white">{property.address}</p>
          <p className="text-xs text-[#8b949e]">{property.suburb}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 bg-[#161b22] border border-[#C9A84C]/30">
          <span className="text-xs font-bold text-[#C9A84C]">{property.score}</span>
        </div>
      </div>
      <p className="text-xs text-[#8b949e] mb-2">{property.ownerName}</p>
      {topSignal && (
        <span className="inline-block text-[10px] px-2 py-1 bg-[#161b22] text-[#C9A84C] border border-[#C9A84C]/40">
          {topSignal.label}
        </span>
      )}
    </div>
  )
}

function PipelineColumn({ 
  stage, 
  properties, 
  onDrop,
  onDragOver,
  isDragOver
}: { 
  stage: { id: PipelineStage; label: string }
  properties: Property[]
  onDrop: (e: React.DragEvent, stage: PipelineStage) => void
  onDragOver: (e: React.DragEvent) => void
  isDragOver: boolean
}) {
  return (
    <div 
      className="flex-1 min-w-[280px]"
      onDrop={(e) => onDrop(e, stage.id)}
      onDragOver={onDragOver}
    >
      {/* Column Header */}
      <div className="bg-[#161b22] border border-[#30363d] border-b-0 px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-wider">{stage.label}</h3>
        <span className="text-xs px-2 py-1 bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30">
          {properties.length}
        </span>
      </div>

      {/* Column Body */}
      <div 
        className={`bg-[#161b22] border border-[#30363d] p-3 min-h-[500px] space-y-3 transition-colors ${
          isDragOver ? 'border-[#C9A84C] border-dashed bg-[#C9A84C]/5' : ''
        }`}
      >
        {properties.length === 0 ? (
          <div className={`h-full min-h-[200px] flex items-center justify-center border border-dashed ${
            isDragOver ? 'border-[#C9A84C]' : 'border-[#30363d]'
          }`}>
            <p className="text-sm text-[#8b949e]">Drop leads here</p>
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              onDragStart={(e, p) => {
                e.dataTransfer.setData('propertyId', p.id)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default function PipelinePage() {
  const [selectedSuburb, setSelectedSuburb] = useState('all')
  const [properties, setProperties] = useState(mockProperties)
  const [dragOverStage, setDragOverStage] = useState<PipelineStage | null>(null)

  const getPropertiesByStage = (stage: PipelineStage) => {
    return properties.filter(p => p.pipelineStage === stage)
  }

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault()
    const propertyId = e.dataTransfer.getData('propertyId')
    
    setProperties(props => 
      props.map(p => 
        p.id === propertyId 
          ? { ...p, pipelineStage: targetStage }
          : p
      )
    )
    setDragOverStage(null)
  }

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault()
    setDragOverStage(stage)
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <DashboardSidebar selectedSuburb={selectedSuburb} onSuburbChange={setSelectedSuburb} />
      
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Pipeline</h1>
            <p className="text-[#8b949e] mt-1">Track your leads through the sales process</p>
          </div>

          {/* Kanban Board */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => (
              <PipelineColumn
                key={stage.id}
                stage={stage}
                properties={getPropertiesByStage(stage.id)}
                onDrop={handleDrop}
                onDragOver={(e) => handleDragOver(e, stage.id)}
                isDragOver={dragOverStage === stage.id}
              />
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {stages.map((stage) => {
              const count = getPropertiesByStage(stage.id).length
              const totalScore = getPropertiesByStage(stage.id).reduce((sum, p) => sum + p.score, 0)
              const avgScore = count > 0 ? Math.round(totalScore / count) : 0
              
              return (
                <div key={stage.id} className="bg-[#161b22] border border-[#30363d] p-4">
                  <p className="text-sm text-[#8b949e] mb-1">{stage.label}</p>
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-xs text-[#8b949e] mt-1">
                    Avg Score: <span className="text-[#C9A84C]">{avgScore}</span>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
