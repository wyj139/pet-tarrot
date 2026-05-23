import React, { useEffect, useMemo, useState } from 'react'
import StepWelcome from './components/StepWelcome'
import StepQuestion from './components/StepQuestion'
import StepDraw from './components/StepDraw'
import StepReading from './components/StepReading'
import tarotCards from './data/tarotCards'

function sampleShuffle(arr, count){
  const copy = [...arr]
  for(let i=copy.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1))
    ;[copy[i],copy[j]]=[copy[j],copy[i]]
  }
  return copy.slice(0,count)
}

export default function App(){
  const [step,setStep] = useState(1)
  const [petName,setPetName] = useState('')
  const [petType,setPetType] = useState('猫')
  const [question,setQuestion] = useState('')
  const [candidates,setCandidates] = useState([])
  const [pickedIds,setPickedIds] = useState([])
  const [orientations,setOrientations] = useState({})
  const [reading,setReading] = useState('')

  function handleStart(){
    setStep(2)
  }

  function handleShuffle(){
    const shuffled = sampleShuffle(tarotCards, tarotCards.length)
    const orients = {}
    shuffled.forEach(c=>{ orients[c.id] = Math.random() < 0.5 ? '正位' : '逆位' })
    setCandidates(shuffled)
    setOrientations(orients)
    setPickedIds([])
    setStep(3)
  }

  function handlePick(card){
    setPickedIds(prev=>{
      if(prev.includes(card.id) || prev.length >= 3) return prev
      return [...prev, card.id]
    })
  }

  useEffect(()=>{
    if(pickedIds.length !== 3) return
    const timer = setTimeout(()=>{
      setReading('')
      setStep(4)
    }, 300)
    return ()=>clearTimeout(timer)
  },[pickedIds])

  function handleRestart(){
    setStep(1)
    setPetName('')
    setPetType('猫')
    setQuestion('')
    setCandidates([])
    setPickedIds([])
    setOrientations({})
    setReading('')
  }

  const selectedCards = useMemo(() => {
    return pickedIds
      .map(id=>candidates.find(c=>c.id === id))
      .filter(Boolean)
  }, [pickedIds, candidates])

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="title">宠物塔罗占卜</div>
          <div style={{fontSize:12, color:'#9a8f6a'}}>夜空下的温柔指引</div>
        </div>

        <div className="step-area">
          <div className={"step " + (step===1? 'visible':'hidden')}>
            <StepWelcome petName={petName} setPetName={setPetName} petType={petType} setPetType={setPetType} onNext={handleStart} />
          </div>

          <div className={"step " + (step===2? 'visible':'hidden')}>
            <StepQuestion question={question} setQuestion={setQuestion} onShuffle={handleShuffle} />
          </div>

          <div className={"step " + (step===3? 'visible':'hidden')}>
            <StepDraw candidates={candidates} onPick={(c)=>handlePick(c)} pickedIds={pickedIds} orientations={orientations} />
            <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
              <button className="btn ghost" onClick={()=>setStep(2)}>上一步</button>
              <div>
                <button className="btn ghost" onClick={handleShuffle} style={{marginRight:8}}>重新洗牌</button>
              </div>
            </div>
          </div>

          <div className={"step " + (step===4? 'visible':'hidden')}>
            <StepReading selectedCards={selectedCards} orientations={orientations} reading={reading} setReading={setReading} onRestart={handleRestart} petName={petName} petType={petType} question={question} />
          </div>
        </div>

      </div>
    </div>
  )
}
