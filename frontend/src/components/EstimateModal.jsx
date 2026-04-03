import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './EstimateModal.css'

const API_BASE = 'http://localhost:8080/api/estimate'

export default function EstimateModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1) // 1: material, 2: dimensions, 3: result
    const [materials, setMaterials] = useState([])
    const [selectedMaterial, setSelectedMaterial] = useState(null)
    const [length, setLength] = useState('')
    const [breadth, setBreadth] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen) {
            fetch(`${API_BASE}/materials`)
                .then(r => r.json())
                .then(setMaterials)
                .catch(() => setError('Failed to load materials. Please check backend.'))
        }
    }, [isOpen])

    const resetModal = useCallback(() => {
        setStep(1)
        setSelectedMaterial(null)
        setLength('')
        setBreadth('')
        setResult(null)
        setError('')
    }, [])

    useEffect(() => {
        if (!isOpen) resetModal()
    }, [isOpen, resetModal])

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    const handleCalculate = async () => {
        if (!length || !breadth || isNaN(length) || isNaN(breadth) || +length <= 0 || +breadth <= 0) {
            setError('Please enter valid positive dimensions.')
            return
        }
        setError('')
        setLoading(true)
        try {
            const res = await fetch(`${API_BASE}/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    materialId: selectedMaterial.id,
                    lengthFt: parseFloat(length),
                    breadthFt: parseFloat(breadth)
                })
            })
            if (!res.ok) throw new Error()
            const data = await res.json()
            setResult(data)
            setStep(3)
        } catch {
            setError('Calculation failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`

    return createPortal(
        <div className="em-overlay" onClick={onClose}>
            <div className="em-modal" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="em-header">
                    <div className="em-header-left">
                        <span className="em-eyebrow">Awning Cost Calculator</span>
                        <h2 className="em-title">Get Your Estimate</h2>
                    </div>
                    <button className="em-close" onClick={onClose} aria-label="Close">✕</button>
                </div>

                {/* Step indicator */}
                <div className="em-steps">
                    {['Material', 'Dimensions', 'Result'].map((label, i) => (
                        <div key={i} className={`em-step ${step > i + 1 ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                            <div className="em-step-dot">{step > i + 1 ? '✓' : i + 1}</div>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="em-body">
                    {error && <div className="em-error">{error}</div>}

                    {/* Step 1: Material selection */}
                    {step === 1 && (
                        <div className="em-section">
                            <p className="em-desc">Choose the material quality for your awning:</p>
                            <div className="em-materials">
                                {materials.length === 0 && !error && <div className="em-loading">Loading materials…</div>}
                                {materials.map(mat => (
                                    <button
                                        key={mat.id}
                                        className={`em-material-card ${selectedMaterial?.id === mat.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedMaterial(mat); setError('') }}
                                    >
                                        <div className="em-mat-top">
                                            <span className="em-mat-stars">{mat.stars}</span>
                                            <span className="em-mat-price">{fmt(mat.pricePerSqFt)}<small>/sq.ft</small></span>
                                        </div>
                                        <div className="em-mat-name">{mat.name}</div>
                                        <div className="em-mat-desc">{mat.description}</div>
                                        {selectedMaterial?.id === mat.id && <div className="em-selected-badge">✓ Selected</div>}
                                    </button>
                                ))}
                            </div>
                            <div className="em-footer">
                                <button
                                    className="btn-primary em-btn"
                                    disabled={!selectedMaterial}
                                    onClick={() => { if (selectedMaterial) { setError(''); setStep(2) } }}
                                >
                                    Next: Enter Dimensions →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Dimensions */}
                    {step === 2 && (
                        <div className="em-section">
                            <div className="em-selected-summary">
                                <span>Selected:</span>
                                <strong>{selectedMaterial?.name}</strong>
                                <span className="em-price-tag">{fmt(selectedMaterial?.pricePerSqFt)}/sq.ft</span>
                            </div>
                            <p className="em-desc">Enter the awning dimensions in feet:</p>
                            <div className="em-dims-grid">
                                <div className="em-field">
                                    <label>Length (ft)</label>
                                    <div className="em-input-wrap">
                                        <input
                                            id="estimate-length"
                                            type="number"
                                            min="0.1"
                                            step="0.1"
                                            placeholder="e.g. 12"
                                            value={length}
                                            onChange={e => { setLength(e.target.value); setError('') }}
                                        />
                                        <span className="em-unit">ft</span>
                                    </div>
                                </div>
                                <div className="em-field">
                                    <label>Breadth (ft)</label>
                                    <div className="em-input-wrap">
                                        <input
                                            id="estimate-breadth"
                                            type="number"
                                            min="0.1"
                                            step="0.1"
                                            placeholder="e.g. 8"
                                            value={breadth}
                                            onChange={e => { setBreadth(e.target.value); setError('') }}
                                        />
                                        <span className="em-unit">ft</span>
                                    </div>
                                </div>
                            </div>
                            {length && breadth && +length > 0 && +breadth > 0 && (
                                <div className="em-preview">
                                    Area: <strong>{(+length * +breadth).toFixed(2)} sq.ft</strong>
                                </div>
                            )}
                            <div className="em-footer">
                                <button className="em-btn-ghost" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn-primary em-btn" onClick={handleCalculate} disabled={loading}>
                                    {loading ? <span className="em-spinner" /> : 'Calculate Estimate →'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Result */}
                    {step === 3 && result && (
                        <div className="em-section em-result-section">
                            <div className="em-result-header">
                                <span className="em-result-icon">🎉</span>
                                <p>Your estimated cost for a <strong>{result.areaSqFt} sq.ft</strong> awning</p>
                            </div>
                            <div className="em-breakdown">
                                <div className="em-row">
                                    <span>Fabric ({result.materialName})</span>
                                    <span>{fmt(result.baseCost)}</span>
                                </div>
                                <div className="em-row">
                                    <span>Installation (18%)</span>
                                    <span>{fmt(result.installationCost)}</span>
                                </div>
                                <div className="em-row">
                                    <span>Hardware & Frame (12%)</span>
                                    <span>{fmt(result.hardwareCost)}</span>
                                </div>
                                <div className="em-row em-total">
                                    <span>Total Estimate</span>
                                    <span className="em-total-price">{fmt(result.totalCost)}</span>
                                </div>
                            </div>
                            <div className="em-note">* This is an indicative estimate. Final pricing may vary based on site conditions.</div>
                            <div className="em-footer">
                                <button className="em-btn-ghost" onClick={() => setStep(2)}>← Recalculate</button>
                                <a href="/contact" className="btn-primary em-btn" onClick={onClose}>Book a Free Visit →</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}
