import React from 'react'

export default function StepWelcome({petName, setPetName, petType, setPetType, onNext}){
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      <h2 className="title">欢迎来到宠物塔罗占卜</h2>
      <p>请输入宠物名字并选择种类，点击"开始占卜"继续。</p>
      <div className="form-row">
        <input className="input" placeholder="宠物名字" value={petName} onChange={e=>setPetName(e.target.value)} />
        <select className="input" value={petType} onChange={e=>setPetType(e.target.value)}>
          <option value="猫">猫</option>
          <option value="狗">狗</option>
          <option value="其他">其他</option>
        </select>
        <button className="btn" onClick={onNext}>开始占卜</button>
      </div>
    </div>
  )
}
