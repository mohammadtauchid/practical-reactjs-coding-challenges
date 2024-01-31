import './index.scss'

const TextArea = (
  { handleChange }: { handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }
  ) => {
  return <textarea 
    className="text-area" 
    placeholder="Paste your text here..." 
    onChange={handleChange}
    autoFocus
  />
}

export default TextArea
