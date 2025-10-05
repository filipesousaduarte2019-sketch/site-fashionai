"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown, CheckCircle, XCircle, Mail, Sparkles } from "lucide-react"

export default function AcessoVipPage() {
  const [email, setEmail] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [accessGranted, setAccessGranted] = useState(false)
  const [error, setError] = useState('')

  // Verificar acesso VIP
  const verifyAccess = async () => {
    if (!email) {
      setError('Por favor, digite seu e-mail')
      return
    }

    setIsVerifying(true)
    setError('')

    try {
      // Simular verificação (em produção, consulte seu banco de dados)
      // const response = await fetch('/api/check-premium', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      // Simulação: aceitar qualquer email que contenha "premium" ou "vip"
      const isPremium = email.toLowerCase().includes('premium') || 
                       email.toLowerCase().includes('vip') ||
                       email.toLowerCase().includes('test')
      
      setTimeout(() => {
        if (isPremium) {
          setAccessGranted(true)
        } else {
          setError('E-mail não encontrado na lista de usuários premium. Verifique se você completou a compra.')
        }
        setIsVerifying(false)
      }, 1500)
      
    } catch (error) {
      setError('Erro ao verificar acesso. Tente novamente.')
      setIsVerifying(false)
    }
  }

  // Conteúdo VIP liberado
  if (accessGranted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          
          {/* Header VIP */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
              <Crown className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🎉 Bem-vindo à Área VIP!
            </h1>
            <p className="text-white/80 text-lg">
              Acesso liberado para {email}
            </p>
          </div>

          {/* Conteúdo Premium */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Recursos Exclusivos */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                Recursos Exclusivos
              </h2>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Análise avançada de estilo pessoal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Consultoria de moda personalizada
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Paletas de cores exclusivas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Looks para ocasiões especiais
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Suporte prioritário da IA Maia
                </li>
              </ul>
            </div>

            {/* Acesso Imediato */}
            <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400/50">
              <h2 className="text-2xl font-bold text-white mb-4">
                🚀 Comece Agora
              </h2>
              <p className="text-white/90 mb-6">
                Sua assinatura está ativa! Aproveite todos os recursos premium da IA Maia.
              </p>
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-3 text-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Acessar IA Maia Premium
              </Button>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-3">
              📋 Informações da Sua Assinatura
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-white/80">
              <div>
                <strong>Status:</strong> Ativo ✅
              </div>
              <div>
                <strong>E-mail:</strong> {email}
              </div>
              <div>
                <strong>Acesso:</strong> Ilimitado
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de verificação de acesso
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
            <Crown className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Área VIP
          </h1>
          <p className="text-white/70">
            Digite seu e-mail para acessar o conteúdo premium
          </p>
        </div>

        {/* Formulário de Verificação */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="space-y-4">
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                E-mail cadastrado na compra
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  disabled={isVerifying}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-400 text-sm">
                <XCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            <Button
              onClick={verifyAccess}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-3"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                  Verificando...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verificar Acesso
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Informações */}
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>
            Não encontrou seu e-mail? Entre em contato conosco.
          </p>
          <p className="mt-2">
            <strong>Para teste:</strong> use um e-mail com "premium", "vip" ou "test"
          </p>
        </div>
      </div>
    </div>
  )
}