import "./style.scss"

interface InputProps {
  label: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  value: string
  autoFocus?: boolean
}

const Input = ({ 
  label, placeholder, onChange, name, value, autoFocus 
}: InputProps) => {
  return (
    <div className="input">
      <label htmlFor={label}>{label}</label>
      <input 
        id={label} 
        type="text" 
        placeholder={placeholder} 
        onChange={onChange} 
        name={name} 
        value={value} 
        autoFocus={autoFocus} 
      />
    </div>
  )
}

export default Input
