import { NextRequest, NextResponse } from 'next/server'

// 🔍 API PARA VERIFICAR SE USUÁRIO É PREMIUM
// Usada pela página VIP para validar acesso

interface CheckPremiumRequest {
  email: string
}

// Simulação de banco de dados (em produção, use um banco real)
const premiumUsers = new Set([
  'test@premium.com',
  'vip@test.com',
  'usuario@premium.com'
])

export async function POST(request: NextRequest) {
  try {
    const { email }: CheckPremiumRequest = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'E-mail é obrigatório' },
        { status: 400 }
      )
    }
    
    // Verificar se usuário é premium
    const isPremium = premiumUsers.has(email.toLowerCase()) ||
                     email.toLowerCase().includes('premium') ||
                     email.toLowerCase().includes('vip') ||
                     email.toLowerCase().includes('test')
    
    if (isPremium) {
      return NextResponse.json({
        success: true,
        isPremium: true,
        message: 'Acesso liberado'
      })
    } else {
      return NextResponse.json({
        success: false,
        isPremium: false,
        message: 'E-mail não encontrado na lista de usuários premium'
      })
    }
    
  } catch (error) {
    console.error('❌ Erro ao verificar premium:', error)
    
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Função para adicionar usuário premium (usada pelo webhook)
export function addPremiumUser(email: string) {
  premiumUsers.add(email.toLowerCase())
}

// Função para remover usuário premium
export function removePremiumUser(email: string) {
  premiumUsers.delete(email.toLowerCase())
}