import { useState } from 'react'
import { Button } from '../ui/button'
import { useAuth } from '../../context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  hasError?: boolean;
  onForgotPassword?: () => void;
}

export function LoginForm({ onSuccess, onError, hasError, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn(email, password)
      onSuccess()
    } catch (err: any) {
      onError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input 
        type="email" 
        placeholder="College Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className={`w-full p-2 rounded text-white transition-colors ${
          hasError 
            ? 'bg-red-500/10 border-red-500/50 focus:border-red-400' 
            : 'bg-white/10 border-white/20 focus:border-blue-400'
        }`}
        disabled={isLoading}
      />
      <div className="relative">
        <input 
          type={showPassword ? "text" : "password"}
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          className={`w-full p-2 pr-10 rounded text-white transition-colors ${
            hasError 
              ? 'bg-red-500/10 border-red-500/50 focus:border-red-400' 
              : 'bg-white/10 border-white/20 focus:border-blue-400'
          }`}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
      
      {onForgotPassword && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-white hover:text-blue-300 underline text-sm transition-colors"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>
      )}
    </form>
  )
}
