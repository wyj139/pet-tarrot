import React from 'react'

export default function StepQuestion({question,setQuestion,onShuffle}){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <h2 className="title">你想问什么？</h2>
      <p>在下面输入你的问题，然后点击"洗牌"。</p>
      <textarea className="input" rows={4} placeholder="例如：它最近不爱吃东西，意味着什么？" value={question} onChange={e=>setQuestion(e.target.value)} />
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button className="btn" onClick={onShuffle}>洗牌</button>
      </div>
    </div>
  )
}
