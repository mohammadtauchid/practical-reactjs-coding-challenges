import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Checkbox from '../Checkbox'

import passwordGif from '../../assets/gif/password.gif'
import copyIcon from '../../assets/icons/copy.svg'
import refreshIcon from '../../assets/icons/refresh.svg'

import './index.css'

const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>("")

  const [passwordLength, setPasswordLength] = useState<number>(10)
  const [isUpperCase, setIsUpperCase] = useState<boolean>(true)
  const [isLowerCase, setIsLowerCase] = useState<boolean>(false)
  const [isNumbers, setIsNumbers] = useState<boolean>(true)
  const [isSpecialChars, setIsSpecialChars] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [strength, setStrength] = useState<{ text: string, class: string }>({text: "Weak", class: "danger"})

  if (!isUpperCase && !isLowerCase && !isNumbers && !isSpecialChars) {
    setIsLowerCase(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  })

  const generatePassword = () => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const specialChars = "!@#$%^&*()"

    let pass = ""
    let chars = ""
    if (isUpperCase) {
      chars += upperCaseChars
      pass += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)]
    }
    if (isLowerCase) {
      chars += lowerCaseChars
      pass += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)]
    }
    if (isNumbers) {
      chars += numbers
      pass += numbers[Math.floor(Math.random() * numbers.length)]
    }
    if (isSpecialChars) {
      chars += specialChars
      pass += specialChars[Math.floor(Math.random() * specialChars.length)]
    }

    const bound = passwordLength - pass.length
    for (let i = 0; i < bound; i++) {
      const index = Math.floor(Math.random() * chars.length)
      pass += chars[index]
    }
    
    setPassword(pass)
    passwordStrength(pass)
  }

  const passwordStrength = (pass: string) => {
    if (pass.length < 8) {
      setStrength({text: "Too short", class: "danger"})
      return
    }

    let power = 0
    if (isUpperCase) power++
    if (isLowerCase) power++
    if (isNumbers) power++
    if (isSpecialChars) power++

    if (power == 4) {
      setStrength({text: "Strong", class: "success"})
      return
    }
    if (power == 3) {
      setStrength({text: "Medium", class: "warning"})
      return
    }
    setStrength({text: "Weak", class: "danger"})
  }

  useEffect(() => {
    generatePassword()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordLength, isUpperCase, isLowerCase, isNumbers, isSpecialChars])

  return (
    <div className="password-wrapper" onLoad={generatePassword}>
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Ensure online account safety by creating strong and secure passwords
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={password} readOnly />
          <img src={refreshIcon} alt="refresh the password" onClick={generatePassword} />
        </div>
        <CopyToClipboard text={password} onCopy={() => setIsCopied(true)}>
          <button className="copy-btn">
            <img src={copyIcon} alt="copy password" />
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </CopyToClipboard>
      </div>
      <span className={`fw-500 ${strength.class}`}>{strength.text}</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={
            (value) => {
              setPasswordLength(value as number)
            }
          }
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox 
          id="uppercase" 
          label="Uppercase" 
          checked={isUpperCase} 
          name="upper" 
          onChange={
            () => {
              setIsUpperCase(!isUpperCase)
            }
          }
        />
        <Checkbox 
          id="lowercase" 
          label="Lowercase" 
          checked={isLowerCase} 
          name="lower" 
          onChange={
            () => {
              setIsLowerCase(!isLowerCase)
            }
          }
        />
        <Checkbox 
          id="numbers" 
          label="Numbers" 
          checked={isNumbers} 
          name="numbers" 
          onChange={
            () => {
              setIsNumbers(!isNumbers)
            }
          }
        />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={isSpecialChars}
          name="specialChars"
          onChange={
            () => {
              setIsSpecialChars(!isSpecialChars)
            }
          }
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
