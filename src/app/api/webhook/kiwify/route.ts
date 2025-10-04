import { NextRequest, NextResponse } from 'next/server'

// 🔗 WEBHOOK KIWIFY - RECEBE NOTIFICAÇÕES DE COMPRA
// Token da Kiwify: z7j0npvx5uw

interface KiwifyWebhookData {
  email: string
  plano?: string
  status: string
  order_id?: string
  product_name?: string
  customer_name?: string
  amount?: number
}

// Simulação de banco de dados (em produção, use um banco real)
const premiumUsers = new Set<string>()

// Use o token da Kiwify para validar que a requisição é legítima
const KIWIFY_TOKEN = "z7j0npvx5uw"

export async function POST(request: NextRequest) {
  try {
    // Pegar o token enviado no header do webhook
    const tokenRecebido = request.headers.get("x-kiwify-signature")

    // Verificar se bate com o token da Kiwify
    if (tokenRecebido !== KIWIFY_TOKEN) {
      console.log("❌ Token inválido:", tokenRecebido)
      return NextResponse.json({ success: false, message: "Token inválido" }, { status: 401 })
    }

    // Receber dados do webhook da Kiwify
    const webhookData: KiwifyWebhookData = await request.json()
    
    console.log('📧 Webhook Kiwify recebido:', webhookData)
    
    // Verificar se é uma compra aprovada
    if (webhookData.status === 'approved' && webhookData.email) {
      // Salvar e-mail como usuário premium
      premiumUsers.add(webhookData.email.toLowerCase())
      console.log(`✅ Usuário ${webhookData.email} marcado como premium`)

      // Em produção, salve no seu banco de dados:
      // await database.users.upsert({
      //   email: webhookData.email,
      //   isPremium: true,
      //   plan: webhookData.plano || webhookData.product_name,
      //   purchaseDate: new Date(),
      //   orderId: webhookData.order_id
      // })

      return NextResponse.json({ success: true, message: 'Usuário registrado como premium' })
    }

    return NextResponse.json({ success: false, message: 'Status não aprovado ou email ausente' })

  } catch (error) {
    console.error('❌ Erro no webhook Kiwify:', error)
    return NextResponse.json({ success: false, message: 'Erro interno do servidor' }, { status: 500 })
  }
}

// Função para verificar se usuário é premium (usada na página VIP)
export function isPremiumUser(email: string): boolean {
  return premiumUsers.has(email.toLowerCase())
}

// Função para listar usuários premium (para debug)
export function getPremiumUsers(): string[] {
  return Array.from(premiumUsers)
}
