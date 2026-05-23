import React, { useState } from 'react'

export default function StepDraw({candidates, onPick, pickedIds, orientations}){
  const [fanOffset, setFanOffset] = useState(0)
  const selectedCount = pickedIds.length
  const selectedCards = pickedIds
    .map(id=>candidates.find(c=>c.id === id))
    .filter(Boolean)

  const spread = Math.min(180, Math.max(120, candidates.length * 6))
  const step = candidates.length > 1 ? spread / (candidates.length - 1) : 0
  const base = -spread / 2

  function handlePick(card){
    if(selectedCount >= 3) return
    onPick(card)
  }

  function handleFanOffset(value){
    setFanOffset(value)
  }

  return (
    <div>
      <h2 className="title">抽牌 — 请选择三张牌</h2>
      <p>鼠标悬停可抬高牌面，移动到左右边缘可旋转整列；点击选择，选满三张自动解读。</p>
      <div className="pick-status">已选 {selectedCount}/3</div>
      <div className="fan-wrap" onMouseLeave={()=>handleFanOffset(0)}>
        <div className="fan-zone left" onMouseEnter={()=>handleFanOffset(-22)} />
        <div className="fan-zone right" onMouseEnter={()=>handleFanOffset(22)} />
        <div className="fan">
          {candidates.map((c, idx)=>{
            const isPicked = pickedIds.includes(c.id)
            const orient = orientations[c.id]
            const disabled = !isPicked && selectedCount >= 3
            const angle = base + step * idx + fanOffset
            return (
              <button
                key={c.id}
                type="button"
                className={"fan-card" + (isPicked ? ' selected' : '')}
                style={{'--angle': `${angle}deg`, zIndex: isPicked ? 30 + idx : idx}}
                onClick={()=>!disabled && handlePick(c)}
                disabled={disabled}
              >
                <div className={"card" + (isPicked ? ' flipped' : '')}>
                  <div className="card-face card-back" />
                  <div className="card-face card-front">
                    <div className="card-name">{c.name}</div>
                    {isPicked && <div className="card-orient">{orient}</div>}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="slots">
        {Array.from({length:3}).map((_, idx)=>{
          const card = selectedCards[idx]
          return (
            <div key={idx} className={"slot" + (card ? ' filled' : '')}>
              {card ? `${card.name}（${orientations[card.id]}）` : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}
