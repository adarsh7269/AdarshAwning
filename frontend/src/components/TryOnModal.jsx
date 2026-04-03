import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './TryOnModal.css'

const COLORS = [
    { name: 'Navy Blue', hex: '#0B3B60' },
    { name: 'Forest Green', hex: '#2E5A27' },
    { name: 'Crimson Red', hex: '#8B0000' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Sand', hex: '#C2B280' },
    { name: 'Terracotta', hex: '#E2725B' },
    { name: 'Mustard', hex: '#FFDB58' },
    { name: 'White', hex: '#FFFFFF' }
]

export default function TryOnModal({ isOpen, onClose }) {
    const [environment, setEnvironment] = useState('shop') // 'home', 'shop', 'car'
    const [pattern, setPattern] = useState('solid') // 'solid', 'striped'
    const [color1, setColor1] = useState(COLORS[0].hex)
    const [color2, setColor2] = useState(COLORS[7].hex) // White makes good stripes

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    if (!isOpen) return null

    // Generate dynamic CSS background for the awning
    const getAwningStyle = () => {
        if (!color1) return { background: '#f0f0f0' } // Default blank state

        if (pattern === 'solid') {
            return { background: color1 }
        } else {
            // 11 total stripes (odd number so it starts and ends with the primary color)
            // 100 / 11 = 9.091% per stripe. A full repetition is 2 stripes (18.182%)
            return { 
                background: `repeating-linear-gradient(90deg, ${color1}, ${color1} 9.091%, ${color2} 9.091%, ${color2} 18.182%)`
            }
        }
    }

    return createPortal(
        <div className="tom-overlay" onClick={onClose}>
            <div className="tom-modal" onClick={e => e.stopPropagation()}>
                
                <div className="tom-header">
                    <div>
                        <span className="tom-eyebrow">Virtual Preview</span>
                        <h2 className="tom-title">Try On Your Awning</h2>
                    </div>
                    <button className="tom-close" onClick={onClose} aria-label="Close">✕</button>
                </div>

                <div className="tom-body">
                    {/* Visualizer Canvas */}
                    <div className="tom-canvas">
                        {environment === 'home' && (
                            <div className="scene scene-home">
                                <div className="house-roof"></div>
                                <div className="house-body">
                                    <div className="house-window container-relative">
                                        <div className="awning" style={getAwningStyle()}>
                                            <div className="awning-valance" style={getAwningStyle()}></div>
                                        </div>
                                        <div className="window-pane"></div>
                                        <div className="window-pane"></div>
                                    </div>
                                    <div className="house-door"></div>
                                </div>
                            </div>
                        )}

                        {environment === 'shop' && (
                            <div className="scene scene-shop">
                                <div className="shop-sign">BAKERY</div>
                                <div className="shop-front container-relative">
                                    <div className="awning awning-shop" style={getAwningStyle()}>
                                        <div className="awning-valance" style={getAwningStyle()}></div>
                                    </div>
                                    <div className="shop-window">
                                        <div className="shop-display"></div>
                                    </div>
                                    <div className="shop-door"></div>
                                </div>
                            </div>
                        )}

                        {environment === 'car' && (
                            <div className="scene scene-car">
                                <div className="carport-poles"></div>
                                <div className="carport-roof container-relative">
                                    <div className="awning awning-car" style={getAwningStyle()}></div>
                                </div>
                                <div className="car-shape">
                                    <div className="car-top"></div>
                                    <div className="car-bottom">
                                        <div className="wheel wheel-left"></div>
                                        <div className="wheel wheel-right"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Editor Panel */}
                    <div className="tom-editor">
                        <div className="tom-control-group">
                            <label>1. Select Environment</label>
                            <div className="tom-tabs">
                                <button className={`tom-tab ${environment === 'shop' ? 'active' : ''}`} onClick={() => setEnvironment('shop')}>🏪 Shop</button>
                                <button className={`tom-tab ${environment === 'home' ? 'active' : ''}`} onClick={() => setEnvironment('home')}>🏠 Home</button>
                                <button className={`tom-tab ${environment === 'car' ? 'active' : ''}`} onClick={() => setEnvironment('car')}>🚗 Parking</button>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-500)', marginTop: '8px', fontStyle: 'italic' }}>
                                ...and many more!
                            </div>
                        </div>

                        <div className="tom-control-group">
                            <label>2. Select Pattern</label>
                            <div className="tom-tabs">
                                <button className={`tom-tab ${pattern === 'solid' ? 'active' : ''}`} onClick={() => setPattern('solid')}>Solid</button>
                                <button className={`tom-tab ${pattern === 'striped' ? 'active' : ''}`} onClick={() => setPattern('striped')}>Striped</button>
                            </div>
                        </div>

                        <div className="tom-control-group">
                            <label>3. {pattern === 'solid' ? 'Choose Color' : 'Primary Color'}</label>
                            <div className="tom-colors">
                                {COLORS.map(c => (
                                    <button 
                                        key={c.name}
                                        className={`tom-color-btn ${color1 === c.hex ? 'active' : ''}`}
                                        style={{ backgroundColor: c.hex }}
                                        onClick={() => setColor1(c.hex)}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {pattern === 'striped' && (
                            <div className="tom-control-group">
                                <label>4. Secondary Color</label>
                                <div className="tom-colors">
                                    {COLORS.map(c => (
                                        <button 
                                            key={c.name}
                                            className={`tom-color-btn ${color2 === c.hex ? 'active' : ''}`}
                                            style={{ backgroundColor: c.hex }}
                                            onClick={() => setColor2(c.hex)}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="tom-actions">
                            <button className="btn-primary" onClick={onClose} style={{ width: '100%', justifyContent: 'center' }}>
                                Looks Good!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
