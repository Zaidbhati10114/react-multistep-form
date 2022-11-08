import react,{FormEvent,useState} from 'react'
import { AccountForm } from './AccountForm';
import { AddressForm } from './AddressForm';
import { useMultistepForm } from './useMultistepForm'
import { UserForm } from './UserForm';

type FormData = {
  firstName:String,
  lastName: String,
  age: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  password: String,
  


}


const INITIAL_DATA : FormData =  {

  firstName:'',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: '',
}



function App() {
  const [data,setData] = useState(INITIAL_DATA)

  function updatefields(fields:Partial<FormData>) {
    setData(prev => {
      return {...prev,...fields}
    })
  }

  const {steps,currentStepIndex,step,isFirstStep,back,next,isLastStep} = useMultistepForm([<UserForm {...data}  updateFields={updatefields} />,<AddressForm {...data} updateFields={updatefields} />,<AccountForm {...data} updateFields={updatefields} />]);
  
  function onSubmit(e:FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert('Successfully Acount Created')
  }

  return (
    <div style={{position:'relative',
    background:"white",
    border:'1px solid black',
    padding:'2rem',margin:"1rem",
    borderRadius:".5rem",
    fontFamily:"Arial",maxWidth:"max-content"}}>
     <form onSubmit={onSubmit}>
      <div style={{position:"absolute",top:".5rem",right:'.5rem'}}>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div style={{marginTop:"1rem",display:"flex",gap:".5rem",
      justifyContent:"flex-end"}}>
        { !isFirstStep &&  <button type="button" onClick={back}>Back</button>}
        <button  type="submit">{isLastStep ? "Finish" : "Next"}</button>
         
      </div>

     </form>
    </div>
  )
}

export default App
