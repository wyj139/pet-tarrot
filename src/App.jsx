import React, { useState } from 'react'
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
  const [candidates,setCandidates] = useState([]) // 五张候选
  const [pickedId,setPickedId] = useState(null)
  const [orientations,setOrientations] = useState({})
  const [drawnCard,setDrawnCard] = useState(null)
  const [reading,setReading] = useState('')

  function handleStart(){
    setStep(2)
  }

  function handleShuffle(){
    const five = sampleShuffle(tarotCards,5)
    const orients = {}
    five.forEach(c=>{ orients[c.id] = Math.random() < 0.5 ? '正位' : '逆位' })
    setCandidates(five)
    setOrientations(orients)
    setPickedId(null)
    setDrawnCard(null)
    setStep(3)
  }

  function handlePick(card){
    setPickedId(card.id)
    setDrawnCard(card)
  }

  function handleToReading(){
    if(!drawnCard) return
    setReading('')
    setStep(4)
  }

  function handleRestart(){
    setStep(1)
    setPetName('')
    setPetType('猫')
    setQuestion('')
    setCandidates([])
    setPickedId(null)
    setOrientations({})
    setDrawnCard(null)
    setReading('')
  }

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
            <StepDraw candidates={candidates} onPick={(c)=>handlePick(c)} pickedId={pickedId} orientations={orientations} />
            <div style={{display:'flex',justifyContent:'space-between',marginTop:12}}>
              <button className="btn ghost" onClick={()=>setStep(2)}>上一步</button>
              <div>
                <button className="btn ghost" onClick={handleShuffle} style={{marginRight:8}}>重新洗牌</button>
                <button className="btn" onClick={handleToReading} disabled={!drawnCard}>解读</button>
              </div>
            </div>
          </div>

          <div className={"step " + (step===4? 'visible':'hidden')}>
            <StepReading candidates={candidates} drawnCard={drawnCard} orientations={orientations} reading={reading} setReading={setReading} onRestart={handleRestart} petName={petName} petType={petType} question={question} />
          </div>
        </div>

      </div>
    </div>
  )
}
