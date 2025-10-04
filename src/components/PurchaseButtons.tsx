"use client"

import { Button } from "@/components/ui/button"
import { CreditCard, Crown, ExternalLink } from "lucide-react"

// 🔧 CONFIGURAÇÃO DOS BOTÕES DE COMPRA
// ⚠️ EDITE APENAS OS LINKS ABAIXO PARA CONFIGURAR OS PAGAMENTOS

const PURCHASE_LINKS = {
  weekly: "https://seu-link-de-pagamento-semanal.com",
  monthly: "https://seu-link-de-pagamento-mensal.com", 
  yearly: "https://seu-link-de-pagamento-anual.com"
}

// 📝 TEXTOS DOS BOTÕES (opcional personalizar)
const BUTTON_TEXTS = {
  weekly: "Escolher Semanal",
  monthly: "Liberar meu acesso agora",
  yearly: "Escolher Anual"
}

interface PurchaseButtonsProps {
  onPurchase?: (plan: string) => void
}

export default function PurchaseButtons({ onPurchase }: PurchaseButtonsProps) {
  
  const handlePurchase = (plan: string, link: string) => {
    // Abrir link de pagamento em nova aba
    window.open(link, '_blank')
    
    // Callback opcional para o componente pai
    if (onPurchase) {
      onPurchase(plan)
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* Plano Semanal */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Plano Semanal</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">R$ 19,90</span>
            <span className="text-white/70 text-sm"> / semana</span>
          </div>
          <ul className="text-white/80 text-sm space-y-2 mb-6">
            <li>• Acesso total durante o período</li>
            <li>• Renovação automática semanal</li>
            <li>• Suporte completo</li>
          </ul>
          <Button 
            onClick={() => handlePurchase("Plano Semanal", PURCHASE_LINKS.weekly)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {BUTTON_TEXTS.weekly}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Plano Mensal - Recomendado */}
      <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400/50 relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold px-4 py-1 rounded-full text-sm">
            🌟 Recomendado
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">Plano Mensal</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold text-white">R$ 49,90</span>
            <span className="text-white/70 text-sm"> / mês</span>
          </div>
          <ul className="text-white/80 text-sm space-y-2 mb-4">
            <li>• Mais popular: melhor custo-benefício</li>
            <li>• Renovação automática mensal</li>
            <li>• Suporte prioritário</li>
            <li>• Recursos exclusivos</li>
          </ul>
          <p className="text-yellow-200 text-xs mb-6 italic">
            A maioria dos usuários escolhe o plano mensal por ser mais econômico.
          </p>
          <Button 
            onClick={() => handlePurchase("Plano Mensal", PURCHASE_LINKS.monthly)}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Crown className="w-5 h-5 mr-2" />
            {BUTTON_TEXTS.monthly}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Plano Anual */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Plano Anual</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold text-white">R$ 399,90</span>
            <span className="text-white/70 text-sm"> / ano</span>
          </div>
          <ul className="text-white/80 text-sm space-y-2 mb-6">
            <li>• 12 meses de acesso com desconto</li>
            <li>• Renovação automática anual</li>
            <li>• Máximo desconto disponível</li>
          </ul>
          <Button 
            onClick={() => handlePurchase("Plano Anual", PURCHASE_LINKS.yearly)}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 font-medium"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {BUTTON_TEXTS.yearly}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}