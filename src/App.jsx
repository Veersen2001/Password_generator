import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  // password length
  const [length, setLength] = useState(8);
  // Numeber checkBox
  const [numberAllowed, setNumberAllowed] = useState(false);
  //  char Checkbox
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef for copy button

   const passwordRef=useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    //  if numbercheckBox is checked
    if (numberAllowed) {
      str += "0123456789"
    }
    // if Char checkbox is checked 
    if (charAllowed) {
      str += "@#$%&*(){}[]!-_";
    }

    //  length
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(()=>{
    // highlight password 
    passwordRef.current?.select();
    //  password copy
     window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
        passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='text-orange-500 w-full mx-auto rounded-lg px-4 my-8 bg-gray-800 max-w-md'>
        <h1 className="text-white text-center my-3">Passsword Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button  onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value)
              }}
              id='range'
            />
            <label htmlFor="range">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev => !prev));
                // prev change if 
              }}

            />
            <label className="cursor-pointer" htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" id="charInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev => !prev));

              }}

            />
            <label className="cursor-pointer" htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
