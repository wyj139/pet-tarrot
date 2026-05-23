import React, { useEffect, useRef } from 'react'
export default function StepReading({selectedCards, orientations, reading, setReading, onRestart, petName, petType, question}){
  const startedRef = useRef(false)
  const selectionKey = (selectedCards || []).map(card=>card.id).join(',')

  useEffect(()=>{
    startedRef.current = false
  },[selectionKey])

  useEffect(()=>{
    if(!selectedCards || selectedCards.length !== 3) return
    if(startedRef.current) return

    startedRef.current = true

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if(!apiKey || apiKey === 'your_gemini_api_key_here'){
      setReading('缺少 Gemini API Key，请在 .env 中设置 VITE_GEMINI_API_KEY。')
      return
    }

    const cardLines = selectedCards.map((card, idx)=>{
      const orient = orientations[card.id]
      return `第${idx + 1}张：${card.name}（${orient}）`
    }).join('\n')
    const prompt = `你是一个精通塔罗牌预测原理的女巫，正在用塔罗牌帮助客户了解他们的宠物。\n用女巫的口吻说话，语气温柔、神秘、带点俏皮！记得你的预测要尽可能清晰具体，贴合动物的习性，并且能解读出塔罗牌的深意。\n主人的宠物叫「${petName}」，是一只${petType}。\n主人的问题是：「${question}」\n抽到的三张牌是：\n${cardLines}\n请整体解读三张牌对这个问题的启示，结合牌义给出具体建议，150字以内。`

    setReading('')

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        contents:[{
          parts:[{text:prompt}]
        }]
      })
    }).then(res=>{
      if(!res.body) throw new Error('No stream in response')
      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buffer = ''
      function read(){
        return reader.read().then(({done,value})=>{
          if(done) return
          buffer += dec.decode(value)
          const lines = buffer.split('\n')
          buffer = lines[lines.length - 1]
          for(let i = 0; i < lines.length - 1; i++){
            const line = lines[i].trim()
            if(!line) continue
            try{
              const payload = line.startsWith('data: ') ? line.slice(6) : line
              const json = JSON.parse(payload)
              if(json.candidates && json.candidates[0] && json.candidates[0].content && json.candidates[0].content.parts && json.candidates[0].content.parts[0]){
                const text = json.candidates[0].content.parts[0].text
                setReading(prev=>prev + text)
              }
            }catch(e){
              console.error('Parse error:', e, 'Line:', line)
            }
          }
          return read()
        })
      }
      return read()
    }).catch(err=>{
      setReading('调用 Gemini API 出错：' + (err.message||err))
    })

  },[selectionKey])

  return (
    <div>
      <h2 className="title">牌面解读</h2>
      <div className="reading">
        <div className="left">
          <h3>抽到的牌</h3>
          <div className="cards">
            {selectedCards.map(c=>{
              return (
                <div key={c.id} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                  <div style={{width:96,height:140,background:'#151224',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div style={{textAlign:'center'}}>
                      <div style={{fontSize:13,color:'var(--accent)'}}>{c.name}</div>
                      <div style={{fontSize:12,color:'var(--accent)'}}>{orientations[c.id]}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="right">
          <h3>AI 解读</h3>
          <div className="reading-text">{reading || '正在生成解读…'}</div>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:12}}>
            <button className="btn" onClick={onRestart}>再占一次</button>
          </div>
        </div>
      </div>
    </div>
  )
}
