'use client'

import { Property, generateWhyTheySell, generateColdCallScript } from '@/lib/data'
import { saveOutcome } from '@/lib/api'
import { useState } from 'react'

interface PropertyPanelProps {
  property: Property | null
  onClose: () => void
  onUpdateProperty: (property: Property) => void
}

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="#21262d"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="#C9A84C"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-[#C9A84C]">{score}</span>
      </div>
    </div>
  )
}

function MiniScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 12
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-8 h-8">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="16" cy="16" r="12" stroke="#21262d" strokeWidth="3" fill="none" />
        <circle
          cx="16"
          cy="16"
          r="12"
          stroke="#C9A84C"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-[#C9A84C]">{score}</span>
      </div>
    </div>
  )
}

function StatusButton({ 
  status, 
  label, 
  color, 
  isSelected, 
  onClick 
}: { 
  status: string
  label: string
  color: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-xs font-medium transition-all ${
        isSelected 
          ? `bg-${color} text-white` 
          : `bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-${color}`
      }`}
      style={isSelected ? { backgroundColor: color } : {}}
    >
      {label}
    </button>
  )
}

export function PropertyPanel({ property, onClose, onUpdateProperty }: PropertyPanelProps) {
  const [notes, setNotes] = useState(property?.notes || '')
  const [followUpDate, setFollowUpDate] = useState(property?.followUpDate || '')
  const [status, setStatus] = useState(property?.status || 'NOT_CALLED')
  const [copied, setCopied]   = useState(false)
  const [saving, setSaving]   = useState(false)

  if (!property) return null

  const whyTheySell = generateWhyTheySell(property.signals)
  const coldCallScript = generateColdCallScript(property.ownerName, property.signals)

  const handleCopyScript = () => {
    navigator.clipboard.writeText(coldCallScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveOutcome(property.id, status, notes, followUpDate || null)
    } catch (e) {
      console.error('Failed to save outcome:', e)
    } finally {
      setSaving(false)
    }
    onUpdateProperty({
      ...property,
      notes,
      followUpDate,
      status: status as Property['status'],
    })
    onClose()
  }

  const statusOptions = [
    { status: 'HOT', label: 'HOT', color: '#22c55e' },
    { status: 'WARM', label: 'WARM', color: '#f97316' },
    { status: 'COLD', label: 'COLD', color: '#3b82f6' },
    { status: 'NOT_CALLED', label: 'NO ANSWER', color: '#6b7280' },
    { status: 'DNC', label: 'DNC', color: '#ef4444' },
  ]

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-[#0d1117] border-l border-[#30363d] shadow-2xl z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-[#0d1117] border-b border-[#30363d] p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-white">{property.address}</h2>
          <span className="inline-block mt-2 text-xs px-2 py-1 bg-[#161b22] text-[#8b949e] border border-[#30363d]">
            {property.suburb} {property.postcode}
          </span>
          <div className="flex items-center gap-2 mt-3 text-[#8b949e]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">{property.ownerName}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-[#8b949e] hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Gauge */}
        <div className="flex justify-center">
          <ScoreGauge score={property.score} />
        </div>

        {/* Signal Breakdown */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Signal Breakdown</h3>
          <div className="space-y-2">
            {property.signals.map((signal, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-[#161b22] border border-[#30363d]"
              >
                <span className="text-sm text-white">{signal.label}</span>
                <span className="text-sm font-semibold text-[#C9A84C]">+{signal.points}pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why They Might Sell */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Why They Might Sell</h3>
          <p className="text-sm text-[#8b949e] leading-relaxed">{whyTheySell}</p>
        </div>

        {/* Cold Call Script */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Suggested Cold Call Opener</h3>
          <div className="relative p-4 bg-[#161b22] border border-[#C9A84C]/30 shadow-[0_0_15px_rgba(201,168,76,0.1)]">
            <p className="text-sm text-white leading-relaxed pr-8">{coldCallScript}</p>
            <button
              onClick={handleCopyScript}
              className="absolute top-3 right-3 text-[#C9A84C] hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Call Outcome */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Call Outcome</h3>
          <div className="flex gap-2 flex-wrap">
            {statusOptions.map((opt) => (
              <button
                key={opt.status}
                onClick={() => setStatus(opt.status as Property['status'])}
                className={`px-3 py-2 text-xs font-medium transition-all ${
                  status === opt.status
                    ? 'text-white'
                    : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#C9A84C]'
                }`}
                style={status === opt.status ? { backgroundColor: opt.color } : {}}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes from this call..."
            className="w-full h-24 bg-[#161b22] border border-[#30363d] p-3 text-sm text-white placeholder:text-[#8b949e] focus:outline-none focus:border-[#C9A84C] resize-none"
          />
        </div>

        {/* Follow Up Date */}
        <div>
          <h3 className="text-sm font-semibold text-[#C9A84C] mb-3 uppercase tracking-wider">Follow Up Date</h3>
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full bg-[#161b22] border border-[#30363d] p-3 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#C9A84C] text-[#0d1117] font-semibold py-3 px-4 hover:bg-[#a08839] transition-colors disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export function StatusBadge({ status }: { status: Property['status'] }) {
  const styles = {
    HOT: 'bg-[#22c55e] text-white',
    WARM: 'bg-[#f97316] text-white',
    COLD: 'bg-[#3b82f6] text-white',
    NOT_CALLED: 'bg-[#6b7280] text-white',
    DNC: 'bg-[#ef4444] text-white',
  }

  const labels = {
    HOT: 'HOT',
    WARM: 'WARM',
    COLD: 'COLD',
    NOT_CALLED: 'NOT CALLED',
    DNC: 'DNC',
  }

  return (
    <span className={`inline-block text-[10px] font-semibold px-2 py-1 ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export function SignalTag({ label }: { label: string }) {
  return (
    <span className="inline-block text-[13px] font-semibold px-3 py-1 bg-[#161b22] text-[#C9A84C] border border-[#C9A84C]/40">
      {label}
    </span>
  )
}

export { MiniScoreGauge }
