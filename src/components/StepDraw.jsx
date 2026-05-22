import React, { useState } from 'react'

export default function StepDraw({candidates, onPick, pickedId, orientations}){
  return (
    <div>
      <h2 className="title">抽牌 — 请选择一张牌</h2>
      <p>点击任意一张牌翻开，查看牌面与正/逆位。</p>
      <div className="cards">
        {candidates.map((c, idx)=>{
          const flipped = pickedId === c.id
          const orient = orientations[c.id]
          return (
            <div key={c.id} className="card-wrap" onClick={()=>onPick(c, idx)}>
              <div className={"card" + (flipped? ' flipped':'')}>
                <div className="card-face card-back">背面</div>
                <div className="card-face card-front">
                  <div className="card-name">{c.name}</div>
                  {flipped && <div className="card-orient">{orient}</div>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
