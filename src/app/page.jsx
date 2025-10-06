"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Heart, Camera, Users, Star, Check, Mail, Shield, Settings, ArrowLeft, Menu, Home, Search, Plus, User, Bell, Shirt, Palette, TrendingUp, Calendar, MessageCircle, ShoppingBag, BarChart3, Database, UserCheck, Cog, X, Upload, Eye, Trash2, Bug, Lightbulb, Send, Edit, Lock, HelpCircle, LogOut, ChevronLeft, ChevronRight, CreditCard, Crown, Loader2, Image, Wand2, Scissors, Zap, Target, Layers, Brush } from "lucide-react"
import PurchaseButtons from "@/components/PurchaseButtons"

// Importar o sistema de IA centralizado
import aiSystem from "@/lib/ai-system"

// E-mail do administrador
const ADMIN_EMAIL = "filipesousaduarte2019@gmail.com"

// Contas liberadas (incluindo a nova conta solicitada)
const LIBERATED_ACCOUNTS = [
  "filipesousaduarte2@gmail.com",
  "filipesousaduarte2019@gmail.com"
]

// Mock data para demonstração - agora com estado gerenciável
const initialWardrobe = [
  { id: 1, name: "Blusa Branca Básica", category: "Blusas", color: "Branco", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop", dateAdded: new Date() },
  { id: 2, name: "Calça Jeans Skinny", category: "Calças", color: "Azul", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop", dateAdded: new Date() },
  { id: 3, name: "Blazer Preto", category: "Blazers", color: "Preto", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop", dateAdded: new Date() },
  { id: 4, name: "Vestido Floral", category: "Vestidos", color: "Estampado", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop", dateAdded: new Date() },
  { id: 5, name: "Saia Midi", category: "Saias", color: "Rosa", image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=200&h=200&fit=crop", dateAdded: new Date() },
  { id: 6, name: "Tênis Branco", category: "Calçados", color: "Branco", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop", dateAdded: new Date() }
]

const mockCombinations = [
  { id: 1, name: "Look Casual Chic", items: ["Blusa Branca Básica", "Calça Jeans Skinny", "Tênis Branco"], occasion: "Casual" },
  { id: 2, name: "Look Executivo", items: ["Blazer Preto", "Blusa Branca Básica", "Saia Midi"], occasion: "Trabalho" },
  { id: 3, name: "Look Romântico", items: ["Vestido Floral", "Tênis Branco"], occasion: "Encontro" }
]

const mockTrends = [
  { id: 1, name: "Cores Terrosas", description: "Tons de marrom, bege e caramelo estão em alta", popularity: 95 },
  { id: 2, name: "Oversized Blazers", description: "Blazers largos para um look moderno", popularity: 88 },
  { id: 3, name: "Estampas Florais", description: "Flores delicadas para a primavera", popularity: 82 },
  { id: 4, name: "Denim Total", description: "Looks all jeans voltaram com tudo", popularity: 76 }
]

// Perguntas do quiz de estilo
const quizQuestions = [
  {
    id: 1,
    question: "Como você se sente mais confortável ao se vestir?",
    options: ["Casual e descontraída", "Elegante e sofisticada", "Moderna e ousada", "Clássica e atemporal"]
  },
  {
    id: 2,
    question: "Quais cores você mais usa no dia a dia?",
    options: ["Neutros (preto, branco, cinza)", "Cores vibrantes (vermelho, azul, verde)", "Tons pastéis (rosa, lilás, azul claro)", "Cores terrosas (marrom, bege, caramelo)"]
  },
  {
    id: 3,
    question: "Você prefere roupas casuais ou formais?",
    options: ["Sempre casual", "Mais formal", "Depende da ocasião", "Gosto de misturar os dois estilos"]
  },
  {
    id: 4,
    question: "Qual peça não pode faltar no seu vestuário?",
    options: ["Jeans confortável", "Blazer estruturado", "Vestido versátil", "Blusa básica"]
  },
  {
    id: 5,
    question: "Como você escolhe suas roupas pela manhã?",
    options: ["Planejo na noite anterior", "Escolho na hora baseado no humor", "Tenho looks favoritos que repito", "Sigo as tendências da moda"]
  },
  {
    id: 6,
    question: "Qual ocasião você mais se veste?",
    options: ["Trabalho/estudos", "Eventos sociais", "Atividades casuais", "Encontros românticos"]
  },
  {
    id: 7,
    question: "Que tipo de estampa você prefere?",
    options: ["Lisas/sem estampa", "Florais delicadas", "Geométricas modernas", "Listras clássicas"]
  },
  {
    id: 8,
    question: "Qual seu tipo de calçado favorito?",
    options: ["Tênis confortável", "Salto alto elegante", "Sapatilha versátil", "Bota estilosa"]
  },
  {
    id: 9,
    question: "Como você se sente em relação a acessórios?",
    options: ["Menos é mais", "Adoro usar vários", "Apenas os essenciais", "Gosto de peças statement"]
  },
  {
    id: 10,
    question: "Qual seu estilo de cabelo preferido?",
    options: ["Natural e solto", "Penteados elaborados", "Prático e funcional", "Sempre diferente"]
  },
  {
    id: 11,
    question: "Você gosta de experimentar tendências novas?",
    options: ["Sempre sigo as últimas", "Adapto ao meu estilo", "Prefiro clássicos", "Só se combinar comigo"]
  },
  {
    id: 12,
    question: "Qual palavra define melhor seu estilo?",
    options: ["Confortável", "Elegante", "Criativa", "Autêntica"]
  }
]

export default function FashionAI() {
  const [currentStep, setCurrentStep] = useState("login")
  const [homeTab, setHomeTab] = useState("dashboard")
  const [adminTab, setAdminTab] = useState("dashboard")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [bugReport, setBugReport] = useState("")
  const [suggestion, setSuggestion] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  
  // Estados do vestuário
  const [wardrobe, setWardrobe] = useState(initialWardrobe)
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemCategory, setNewItemCategory] = useState("")
  const [newItemColor, setNewItemColor] = useState("")
  const [newItemImage, setNewItemImage] = useState("")
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null)
  
  // Estados do quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState("")
  
  // Estados do chat - Agora integrado com sistema de IA
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Olá! Sou a Maia, sua consultora de moda pessoal especializada! 👗✨ Agora estou integrada com inteligência artificial avançada para oferecer sugestões ainda mais personalizadas. Como posso ajudar você a criar looks incríveis hoje?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [aiStatus, setAiStatus] = useState({ online: true, name: "Maia" })

  // Estados da análise de peças
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    const savedEmail = localStorage.getItem("fashionai_email")
    const savedPassword = localStorage.getItem("fashionai_password")
    const savedName = localStorage.getItem("fashionai_name")
    const savedRememberMe = localStorage.getItem("fashionai_remember") === "true"
    const savedWardrobe = localStorage.getItem("fashionai_wardrobe")
    
    if (savedEmail && savedPassword && savedRememberMe) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setName(savedName || "")
      setRememberMe(true)
    }
    
    if (savedWardrobe) {
      try {
        setWardrobe(JSON.parse(savedWardrobe))
      } catch (error) {
        console.error("Erro ao carregar vestuário:", error)
      }
    }

    // Verificar status da IA de forma segura
    try {
      const status = aiSystem.getStatus()
      setAiStatus({ 
        online: status.configured, 
        name: status.assistant,
        expertise: status.features,
        conversationLength: 0
      })
    } catch (error) {
      console.error("Erro ao verificar status da IA:", error)
      setAiStatus({ 
        online: false, 
        name: "Maia",
        expertise: [],
        conversationLength: 0
      })
    }
  }, [])

  // Salvar vestuário no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("fashionai_wardrobe", JSON.stringify(wardrobe))
  }, [wardrobe])

  // Função para salvar dados no localStorage
  const saveCredentials = (emailToSave, passwordToSave, nameToSave) => {
    if (rememberMe) {
      localStorage.setItem("fashionai_email", emailToSave)
      localStorage.setItem("fashionai_password", passwordToSave)
      localStorage.setItem("fashionai_name", nameToSave)
      localStorage.setItem("fashionai_remember", "true")
    } else {
      // Limpar dados salvos se não quiser lembrar
      localStorage.removeItem("fashionai_email")
      localStorage.removeItem("fashionai_password")
      localStorage.removeItem("fashionai_name")
      localStorage.removeItem("fashionai_remember")
    }
  }

  // Função para lidar com upload de imagem para o vestuário
  const handleWardrobeImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert("Por favor, selecione apenas arquivos de imagem.")
        return
      }

      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setUploadedImagePreview(result)
        setNewItemImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Funções do vestuário
  const addItemToWardrobe = () => {
    if (!newItemName.trim() || !newItemCategory.trim() || !newItemColor.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      return
    }

    const newItem = {
      id: Date.now(), // ID único baseado no timestamp
      name: newItemName.trim(),
      category: newItemCategory.trim(),
      color: newItemColor.trim(),
      image: newItemImage.trim() || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop", // Imagem padrão se não fornecida
      dateAdded: new Date()
    }

    setWardrobe(prev => [...prev, newItem])
    
    // Limpar formulário
    setNewItemName("")
    setNewItemCategory("")
    setNewItemColor("")
    setNewItemImage("")
    setUploadedImagePreview(null)
    setShowAddItemForm(false)
    
    alert(`"${newItem.name}" foi adicionada ao seu vestuário!`)
  }

  const removeItemFromWardrobe = (itemId) => {
    const itemToRemove = wardrobe.find(item => item.id === itemId)
    if (itemToRemove && confirm(`Tem certeza que deseja remover "${itemToRemove.name}" do seu vestuário?`)) {
      setWardrobe(prev => prev.filter(item => item.id !== itemId))
      alert(`"${itemToRemove.name}" foi removida do seu vestuário.`)
    }
  }

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    // Salvar credenciais se solicitado
    saveCredentials(email, password, name)

    // Verificar se é administrador
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true)
      setCurrentStep("admin")
      alert(`Bem-vindo, Administrador! Acesso liberado para ${email}`)
      return
    }

    // Verificar se a conta está liberada
    if (LIBERATED_ACCOUNTS.some(account => account.toLowerCase() === email.toLowerCase())) {
      alert(`🎉 Conta liberada! Bem-vindo(a), ${email}! Seu acesso foi aprovado.`)
      setCurrentStep("home")
      return
    }

    // Login normal
    alert(`Login realizado com sucesso! Bem-vindo(a), ${email}`)
    setCurrentStep("home")
  }

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, verifique.")
      return
    }

    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    // Salvar credenciais se solicitado
    saveCredentials(email, password, name)

    // Verificar se é administrador
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true)
      setCurrentStep("admin")
      alert(`Bem-vindo, Administrador! Conta criada para ${email}`)
      return
    }

    // Verificar se a conta está liberada
    if (LIBERATED_ACCOUNTS.some(account => account.toLowerCase() === email.toLowerCase())) {
      alert(`🎉 Conta liberada criada! Bem-vindo(a), ${name}! Seu acesso foi aprovado.`)
      setCurrentStep("home")
      return
    }

    // Registro normal - vai para o quiz
    alert(`Conta criada com sucesso! Bem-vindo(a), ${name}!`)
    setCurrentStep("quiz")
  }

  const handleQuizAnswer = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      alert("Por favor, selecione uma resposta.")
      return
    }

    // Salvar resposta
    const newAnswer = {
      questionId: quizQuestions[currentQuestionIndex].id,
      answer: selectedAnswer
    }
    setQuizAnswers([...quizAnswers, newAnswer])
    setSelectedAnswer("")

    // Próxima pergunta ou finalizar
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz finalizado - redirecionar para página de pagamento
      setCurrentStep("subscription")
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // Recuperar resposta anterior
      const previousAnswer = quizAnswers.find(a => a.questionId === quizQuestions[currentQuestionIndex - 1].id)
      setSelectedAnswer(previousAnswer?.answer || "")
      // Remover a resposta atual da lista
      setQuizAnswers(quizAnswers.filter(a => a.questionId !== quizQuestions[currentQuestionIndex].id))
    }
  }

  const handleSubscription = (plan) => {
    // Salvar dados do usuário após "pagamento"
    saveCredentials(email, password, name)
    alert(`Parabéns! Você escolheu o ${plan}. Redirecionando para pagamento...`)
    // Em produção, aqui seria redirecionado para a Kiwify
    // window.open(linkDoPagamento, '_blank')
    
    // Para demonstração, simular sucesso após 2 segundos
    setTimeout(() => {
      alert("Pagamento processado com sucesso! Bem-vindo à área VIP!")
      setCurrentStep("home")
    }, 2000)
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setRememberMe(false)
    setCurrentQuestionIndex(0)
    setQuizAnswers([])
    setSelectedAnswer("")
    // Limpar dados salvos ao fazer logout
    localStorage.removeItem("fashionai_email")
    localStorage.removeItem("fashionai_password")
    localStorage.removeItem("fashionai_name")
    localStorage.removeItem("fashionai_remember")
  }

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  const handleBugReport = () => {
    if (!bugReport.trim()) {
      alert("Por favor, descreva o bug encontrado.")
      return
    }
    alert("Bug reportado com sucesso! Nossa equipe irá analisar e corrigir o problema.")
    setBugReport("")
  }

  const handleSuggestion = () => {
    if (!suggestion.trim()) {
      alert("Por favor, descreva sua sugestão.")
      return
    }
    alert("Sugestão enviada com sucesso! Obrigado pelo feedback, vamos analisar sua ideia.")
    setSuggestion("")
  }

  // Função para enviar mensagem no chat - Agora integrada com IA avançada
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    // Adicionar mensagem do usuário
    const userMessage = {
      id: chatMessages.length + 1,
      text: currentMessage.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    const messageToProcess = currentMessage.trim()
    setCurrentMessage("")
    setIsTyping(true)

    try {
      // Usar o sistema de IA integrado
      const context = {
        wardrobe: wardrobe,
        userProfile: { name, email }
      }

      try {
  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: messageToProcess,
      context: {
        wardrobe,
        userProfile: { name, email }
      }
    })
  });

  const data = await res.json();

  const aiMessage = {
    id: chatMessages.length + 2,
    text: data.message || "Desculpe, algo deu errado.",
    isUser: false,
    timestamp: new Date()
  };

  setChatMessages(prev => [...prev, aiMessage]);
} catch (error) {
  console.error("Erro ao chamar a API OpenAI:", error);

  const fallbackMessage = {
    id: chatMessages.length + 2,
    text: "Desculpe, tive um problema técnico momentâneo. Pode repetir sua pergunta?",
    isUser: false,
    timestamp: new Date()
  };

  setChatMessages(prev => [...prev, fallbackMessage]);
} finally {
  setIsTyping(false);
      }

      setChatMessages(prev => [...prev, aiMessage])

      // Atualizar status da IA de forma segura
      try {
        const status = aiSystem.getStatus()
        setAiStatus({ 
          online: status.configured, 
          name: status.assistant,
          expertise: status.features,
          conversationLength: chatMessages.length + 2
        })
      } catch (error) {
        console.error("Erro ao atualizar status da IA:", error)
        setAiStatus(prev => ({ 
          ...prev,
          conversationLength: chatMessages.length + 2
        }))
      }

    } catch (error) {
      console.error('Erro no chat:', error)
      
      // Fallback em caso de erro
      const fallbackMessage = {
        id: chatMessages.length + 2,
        text: "Desculpe, tive um problema técnico momentâneo. Como consultora de moda, posso ajudar com sugestões de looks, análise de cores, tendências atuais e muito mais! Pode repetir sua pergunta?",
        isUser: false,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Função para lidar com upload de imagem
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        setSelectedImage(result)
        analyzeImageWithAI(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Função para analisar imagem com IA integrada
  const analyzeImageWithAI = async (imageData) => {
    setIsAnalyzing(true)
    setShowResult(false)
    setAnalysisResult(null)

    try {
      // Usar o sistema de IA para análise de imagem
      const analysis = await aiSystem.analyzeClothingImage(imageData)
      
      if (analysis.success) {
        // Processar resposta da IA para formato estruturado
        const mockResult = {
          category: "Peça Analisada",
          color: "Identificado pela IA",
          style: "Analisado",
          occasion: "Sugerido pela IA",
          suggestions: [
            "Análise completa realizada pela IA Maia",
            "Sugestões personalizadas baseadas na imagem",
            "Combinações inteligentes sugeridas"
          ],
          confidence: 95,
          aiAnalysis: analysis.analysis
        }
        
        setAnalysisResult(mockResult)
      } else {
        // Fallback para análise simulada
        const mockResult = {
          category: ["Blusa", "Vestido", "Calça", "Saia", "Blazer"][Math.floor(Math.random() * 5)],
          color: ["Azul", "Branco", "Preto", "Rosa", "Verde", "Vermelho"][Math.floor(Math.random() * 6)],
          style: ["Casual", "Formal", "Elegante", "Moderno", "Clássico"][Math.floor(Math.random() * 5)],
          occasion: ["Trabalho", "Casual", "Festa", "Encontro", "Esporte"][Math.floor(Math.random() * 5)],
          suggestions: [
            "Combine com uma calça jeans para um look casual",
            "Adicione acessórios dourados para elevar o visual",
            "Use com sapatos neutros para versatilidade",
            "Perfeito para ocasiões do dia a dia"
          ],
          confidence: Math.floor(Math.random() * 20) + 80,
          aiAnalysis: analysis.analysis
        }
        
        setAnalysisResult(mockResult)
      }

    } catch (error) {
      console.error('Erro na análise:', error)
      
      // Fallback em caso de erro
      const fallbackResult = {
        category: "Análise Indisponível",
        color: "Não identificado",
        style: "Não analisado",
        occasion: "Não determinado",
        suggestions: [
          "Sistema de análise temporariamente indisponível",
          "Tente novamente em alguns instantes",
          "Ou descreva a peça no chat para ajuda manual"
        ],
        confidence: 0,
        aiAnalysis: "Sistema temporariamente indisponível para análise de imagens."
      }
      
      setAnalysisResult(fallbackResult)
    } finally {
      setIsAnalyzing(false)
      
      // Mostrar resultado com animação
      setTimeout(() => {
        setShowResult(true)
      }, 300)
    }
  }

  // Função para resetar análise
  const resetAnalysis = () => {
    setSelectedImage(null)
    setAnalysisResult(null)
    setShowResult(false)
    setIsAnalyzing(false)
  }

  // Função para salvar peça analisada no vestuário
  const saveAnalyzedItemToWardrobe = () => {
    if (!analysisResult || !selectedImage) return

    const newItem = {
      id: Date.now(),
      name: `${analysisResult.category} ${analysisResult.color}`,
      category: analysisResult.category,
      color: analysisResult.color,
      image: selectedImage,
      dateAdded: new Date()
    }

    setWardrobe(prev => [...prev, newItem])
    alert(`"${newItem.name}" foi adicionada ao seu vestuário!`)
    resetAnalysis()
  }

  // Renderizar conteúdo das abas do usuário
  const renderHomeTabContent = () => {
    switch (homeTab) {
      case "wardrobe":
        return (
          <div className="px-6 pb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Meu Vestuário</h2>
              <Button 
                onClick={() => setShowAddItemForm(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            
            {/* Formulário para adicionar nova peça */}
            {showAddItemForm && (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Adicionar Nova Peça</h3>
                <div className="space-y-4">
                  {/* Upload de Imagem */}
                  <div>
                    <Label className="text-white/90 text-sm font-medium mb-3 block">
                      Foto da Peça
                    </Label>
                    
                    {uploadedImagePreview ? (
                      <div className="relative">
                        <img 
                          src={uploadedImagePreview} 
                          alt="Preview da peça" 
                          className="w-full h-48 object-cover rounded-2xl mb-3"
                        />
                        <Button
                          onClick={() => {
                            setUploadedImagePreview(null)
                            setNewItemImage("")
                          }}
                          size="sm"
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 h-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button 
                          onClick={() => document.getElementById('wardrobe-camera-input')?.click()}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 font-medium"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Tirar Foto
                        </Button>
                        
                        <Button 
                          onClick={() => document.getElementById('wardrobe-gallery-input')?.click()}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 font-medium"
                        >
                          <Image className="w-5 h-5 mr-2" />
                          Escolher da Galeria
                        </Button>
                        
                        <input
                          id="wardrobe-camera-input"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleWardrobeImageUpload}
                          className="hidden"
                        />
                        
                        <input
                          id="wardrobe-gallery-input"
                          type="file"
                          accept="image/*"
                          onChange={handleWardrobeImageUpload}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="itemName" className="text-white/90 text-sm font-medium">
                      Nome da Peça *
                    </Label>
                    <Input
                      id="itemName"
                      placeholder="Ex: Blusa Azul Listrada"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemCategory" className="text-white/90 text-sm font-medium">
                      Categoria *
                    </Label>
                    <Input
                      id="itemCategory"
                      placeholder="Ex: Blusas, Calças, Vestidos"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="itemColor" className="text-white/90 text-sm font-medium">
                      Cor *
                    </Label>
                    <Input
                      id="itemColor"
                      placeholder="Ex: Azul, Branco, Estampado"
                      value={newItemColor}
                      onChange={(e) => setNewItemColor(e.target.value)}
                      className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={addItemToWardrobe}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Peça
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowAddItemForm(false)
                        setNewItemName("")
                        setNewItemCategory("")
                        setNewItemColor("")
                        setNewItemImage("")
                        setUploadedImagePreview(null)
                      }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Lista de peças */}
            <div className="grid grid-cols-2 gap-4">
              {wardrobe.map((item) => (
                <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20 relative group">
                  <CardContent className="p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-white text-sm mb-1">{item.name}</h3>
                    <p className="text-white/70 text-xs mb-2">{item.category}</p>
                    <Badge className="bg-white/20 text-white text-xs">{item.color}</Badge>
                    
                    {/* Botão de remover (aparece no hover) */}
                    <Button
                      onClick={() => removeItemFromWardrobe(item.id)}
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-1 h-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {wardrobe.length === 0 && (
              <div className="text-center py-12">
                <Shirt className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Vestuário vazio</h3>
                <p className="text-white/70 text-sm mb-4">
                  Adicione suas primeiras peças para começar a organizar seu estilo!
                </p>
                <Button 
                  onClick={() => setShowAddItemForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeira Peça
                </Button>
              </div>
            )}
          </div>
        )

      case "analyze":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Analisar Peça com IA</h2>
            
            {!selectedImage && !isAnalyzing && !analysisResult && (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Análise Inteligente com IA</h3>
                  <p className="text-white/80 text-sm mb-6">
                    Tire uma foto da peça e nossa IA Maia fará uma análise completa: cores, estilo, ocasiões e sugestões personalizadas
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={() => document.getElementById('camera-input')?.click()}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 font-medium"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Abrir Câmera
                    </Button>
                    
                    <Button 
                      onClick={() => document.getElementById('gallery-input')?.click()}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 font-medium"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Escolher da Galeria
                    </Button>
                    
                    <input
                      id="camera-input"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    
                    <input
                      id="gallery-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedImage && (
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
                <div className="text-center">
                  <img 
                    src={selectedImage} 
                    alt="Peça selecionada" 
                    className="w-full max-w-sm mx-auto rounded-2xl mb-4 shadow-lg"
                  />
                  
                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
                        <span className="text-white font-medium">IA Maia analisando sua peça...</span>
                      </div>
                      
                      <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full animate-pulse"></div>
                      </div>
                      
                      <p className="text-white/80 text-sm">
                        Identificando cores, estilo, ocasiões e gerando sugestões personalizadas
                      </p>
                    </div>
                  )}
                  
                  {!isAnalyzing && !showResult && (
                    <Button 
                      onClick={resetAnalysis}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-medium"
                    >
                      Tentar Novamente
                    </Button>
                  )}
                </div>
              </div>
            )}

            {analysisResult && showResult && (
              <div className={`bg-white rounded-3xl p-6 mb-6 transform transition-all duration-500 ${
                showResult ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
                    Análise da IA Maia
                  </h3>
                  <Badge className="bg-green-100 text-green-800">
                    {analysisResult.confidence}% de precisão
                  </Badge>
                </div>
                
                {/* Análise detalhada da IA */}
                {analysisResult.aiAnalysis && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Análise Detalhada:</h4>
                    <p className="text-purple-700 text-sm leading-relaxed">{analysisResult.aiAnalysis}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Categoria</p>
                    <p className="font-semibold text-gray-800">{analysisResult.category}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Cor Principal</p>
                    <p className="font-semibold text-gray-800">{analysisResult.color}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Estilo</p>
                    <p className="font-semibold text-gray-800">{analysisResult.style}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 mb-1">Ocasião</p>
                    <p className="font-semibold text-gray-800">{analysisResult.occasion}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Sugestões da IA:</h4>
                  <div className="space-y-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium"
                    onClick={saveAnalyzedItemToWardrobe}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Salvar no Vestuário
                  </Button>
                  <Button 
                    onClick={resetAnalysis}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Nova Análise
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Análises Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Blusa Azul</p>
                    <p className="text-sm text-gray-600">Analisada há 2 horas</p>
                  </div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Vestido Floral</p>
                    <p className="text-sm text-gray-600">Analisada ontem</p>
                  </div>
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "combinations":
        return (
          <div className="px-6 pb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Combinações</h2>
              <Button 
                onClick={async () => {
                  const suggestions = await aiSystem.generateOutfitSuggestions(wardrobe, 'casual')
                  if (suggestions.success) {
                    alert(`Sugestões da IA:\n\n${suggestions.suggestions}`)
                  } else {
                    alert("IA temporariamente indisponível. Tente novamente!")
                  }
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                IA Sugerir
              </Button>
            </div>
            
            <div className="space-y-4">
              {mockCombinations.map((combo) => (
                <Card key={combo.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{combo.name}</h3>
                      <Badge className="bg-white/20 text-white">{combo.occasion}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {combo.items.map((item, index) => (
                        <div key={index} className="flex items-center text-white/80 text-sm">
                          <div className="w-2 h-2 bg-white/60 rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="bg-pink-500 hover:bg-pink-600 text-white flex-1 font-medium"
                        onClick={() => alert(`Look "${combo.name}" salvo nos favoritos!`)}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Favoritar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        onClick={() => alert(`Usando look "${combo.name}" hoje!`)}
                      >
                        Usar Hoje
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "trends":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Tendências</h2>
            
            <div className="space-y-4">
              {mockTrends.map((trend) => (
                <Card key={trend.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{trend.name}</h3>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400 font-medium">{trend.popularity}%</span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 text-sm mb-4">{trend.description}</p>
                    
                    <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${trend.popularity}%` }}
                      ></div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600 text-white font-medium"
                      onClick={() => alert(`Explorando tendência: ${trend.name}`)}
                    >
                      Explorar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "planner":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Planejador de Looks</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Esta Semana</h3>
              
              <div className="space-y-3">
                {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                  <div key={day} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <div>
                      <p className="font-medium text-white">{day}</p>
                      <p className="text-white/70 text-sm">
                        {index < 3 ? "Look planejado" : "Sem look definido"}
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      className={index < 3 ? "bg-orange-500 hover:bg-orange-600 text-white font-medium" : "bg-blue-500 hover:bg-blue-600 text-white font-medium"}
                      onClick={() => alert(`Planejando look para ${day}`)}
                    >
                      {index < 3 ? "Editar" : "Planejar"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "shopping":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Lista de Compras</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recomendações para Você</h3>
              
              <div className="space-y-4">
                {[
                  { name: "Blusa de Seda", reason: "Combina com suas calças", priority: "Alta" },
                  { name: "Sapato Social", reason: "Para looks executivos", priority: "Média" },
                  { name: "Bolsa Pequena", reason: "Tendência atual", priority: "Baixa" },
                  { name: "Cinto Marrom", reason: "Complementa seu estilo", priority: "Média" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-white/70 text-sm">{item.reason}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        className={`${
                          item.priority === "Alta" ? "bg-red-500/20 text-red-300" :
                          item.priority === "Média" ? "bg-yellow-500/20 text-yellow-300" :
                          "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {item.priority}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
                        onClick={() => alert(`${item.name} adicionado à lista!`)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Minha Lista</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-800">Blusa Branca</span>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-800">Calça Preta</span>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      case "search":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Buscar</h2>
            
            <div className="mb-6">
              <Input
                placeholder="Buscar peças, looks, tendências..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Categorias Populares</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Blusas", "Calças", "Vestidos", "Sapatos", "Acessórios", "Blazers"].map((category) => (
                    <Button
                      key={category}
                      className="bg-gray-600 hover:bg-gray-700 text-white justify-start font-medium"
                      onClick={() => alert(`Buscando em: ${category}`)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Buscas Recentes</h3>
                <div className="space-y-2">
                  {["vestido floral", "blazer preto", "tênis branco"].map((search) => (
                    <div key={search} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                      <span className="text-white/80">{search}</span>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "chat":
        return (
          <div className="px-6 pb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Chat com IA Maia</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${aiStatus.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-white/80 text-sm">
                  {aiStatus.online ? 'IA Online' : 'IA Offline'}
                </span>
              </div>
            </div>
            
            {/* Indicadores de especialização */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-1">
                  <Wand2 className="w-4 h-4" />
                  <span className="text-xs">Styling</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Palette className="w-4 h-4" />
                  <span className="text-xs">Cores</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Tendências</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs">IA Avançada</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 h-96 overflow-y-auto">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}>
                    {!message.isUser && (
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`rounded-2xl p-3 max-w-xs ${
                      message.isUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/20 text-white'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.type && !message.isUser && (
                          <Badge className="bg-white/20 text-white text-xs ml-2">
                            {message.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {message.isUser && (
                      <div className="bg-gray-400 rounded-full p-2 flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/20 rounded-2xl p-3 max-w-xs">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-white text-sm ml-2">IA Maia processando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sugestões rápidas */}
            <div className="mb-4">
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[
                  "Como combinar cores?",
                  "Tendências 2024",
                  "Look para trabalho",
                  "Análise do meu vestuário"
                ].map((suggestion, index) => (
                  <Button
                    key={index}
                    size="sm"
                    onClick={() => setCurrentMessage(suggestion)}
                    className="bg-white/20 hover:bg-white/30 text-white text-xs whitespace-nowrap font-medium"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Pergunte sobre moda, cores, tendências..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, handleSendMessage)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )

      case "profile":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Meu Perfil</h2>
            
            {/* Informações Pessoais */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 rounded-full p-4 mr-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{name || "Usuário"}</h3>
                  <p className="text-white/70">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="text-2xl font-bold text-white">{wardrobe.length}</div>
                  <div className="text-sm text-white/70">Peças</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-sm text-white/70">Looks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-white/70">Favoritos</div>
                </div>
              </div>
            </div>

            {/* Status da IA */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Status da IA Maia
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Sistema de IA</span>
                  <Badge className={aiStatus.online ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                    {aiStatus.online ? "Online" : "Offline"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Conversas ativas</span>
                  <span className="text-white">{aiStatus.conversationLength || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Especialidades</span>
                  <span className="text-white">{aiStatus.expertise?.length || 0}</span>
                </div>
              </div>
            </div>

            {/* Configurações de Conta */}
            <div className="space-y-4 mb-6">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start font-medium"
                onClick={() => alert("Editar perfil em desenvolvimento!")}
              >
                <Edit className="w-4 h-4 mr-3" />
                Editar Perfil
              </Button>
              
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white justify-start font-medium"
                onClick={() => alert("Configurações em desenvolvimento!")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </Button>

              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start font-medium"
                onClick={() => alert("Alterar senha em desenvolvimento!")}
              >
                <Lock className="w-4 h-4 mr-3" />
                Alterar Senha
              </Button>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white justify-start font-medium"
                onClick={() => alert("Ajuda em desenvolvimento!")}
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Ajuda e Suporte
              </Button>
            </div>

            {/* Seção de Bugs e Sugestões */}
            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Bug className="w-5 h-5 text-red-500 mr-2" />
                Reportar Bug
              </h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Descreva o bug que você encontrou..."
                  value={bugReport}
                  onChange={(e) => setBugReport(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <Button 
                  onClick={handleBugReport}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
                >
                  <Bug className="w-4 h-4 mr-2" />
                  Enviar Bug Report
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                Sugestões de Melhoria
              </h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Compartilhe suas ideias para melhorar o app..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <Button 
                  onClick={handleSuggestion}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Enviar Sugestão
                </Button>
              </div>
            </div>

            {/* Histórico de Atividades */}
            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Camera className="w-4 h-4 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Análise de peça</p>
                      <p className="text-sm text-gray-600">Há 2 horas</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 text-pink-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Look favoritado</p>
                      <p className="text-sm text-gray-600">Ontem</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-800">Nova peça adicionada</p>
                      <p className="text-sm text-gray-600">2 dias atrás</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conquistas */}
            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Conquistas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Primeira Análise</p>
                </div>
                <div className="text-center p-3 bg-pink-50 rounded-lg">
                  <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">10 Favoritos</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Shirt className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">{wardrobe.length} Peças</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">IA Expert</p>
                </div>
              </div>
            </div>

            {/* Botão de Logout */}
            <Button 
              onClick={() => {
                resetForm()
                setCurrentStep("login")
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair da Conta
            </Button>
          </div>
        )

      default:
        return (
          <div className="px-6 pb-24">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Olá, bem-vinda! 👋
              </h2>
              <p className="text-white/90 mb-4">
                Pronta para descobrir looks incríveis hoje?
              </p>
              <p className="text-white/80 text-sm">
                Explore todas as funcionalidades da sua assistente pessoal de moda com IA avançada!
              </p>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                onClick={() => setHomeTab("wardrobe")}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Shirt className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Ver Vestuário</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("analyze")}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Sparkles className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Análise IA</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("combinations")}
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Palette className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Combinações</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("trends")}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Tendências</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("planner")}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Planejar Looks</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("shopping")}
                className="bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <ShoppingBag className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Shopping List</span>
              </Button>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Shirt className="w-5 h-5 text-purple-600 mr-2" />
                Seu Vestuário
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{wardrobe.length}</div>
                  <div className="text-sm text-gray-600">Peças</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">12</div>
                  <div className="text-sm text-gray-600">Looks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">8</div>
                  <div className="text-sm text-gray-600">Favoritos</div>
                </div>
              </div>
            </div>

            {/* AI Status Card */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                IA Maia - Sistema Avançado
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 text-sm">Consultora de moda com IA</p>
                  <p className="text-gray-500 text-xs">Análises personalizadas e sugestões inteligentes</p>
                </div>
                <Badge className={aiStatus.online ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {aiStatus.online ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>

            {/* Tip of the Day */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Dica do Dia
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Experimente usar o chat com IA para obter sugestões personalizadas baseadas no seu vestuário atual. A Maia pode criar combinações únicas só para você!
              </p>
            </div>
          </div>
        )
    }
  }

  // Renderizar conteúdo das abas do admin
  const renderAdminTabContent = () => {
    switch (adminTab) {
      case "users":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Usuários</h2>
            
            <div className="bg-white rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Usuários Ativos</h3>
                <Badge className="bg-green-100 text-green-800">247 Online</Badge>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Maria Silva", email: "maria@email.com", status: "Online", joined: "2 dias atrás" },
                  { name: "João Santos", email: "joao@email.com", status: "Offline", joined: "1 semana atrás" },
                  { name: "Ana Costa", email: "ana@email.com", status: "Online", joined: "3 dias atrás" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-full p-2 mr-3">
                        <User className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={user.status === "Online" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {user.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "reports":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Relatórios</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-white">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">1,247</div>
                  <div className="text-sm text-gray-600">Total Usuários</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4 text-center">
                  <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">3,891</div>
                  <div className="text-sm text-gray-600">Análises Feitas</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">567</div>
                  <div className="text-sm text-gray-600">Looks Criados</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">89%</div>
                  <div className="text-sm text-gray-600">Satisfação</div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Novos usuários hoje</span>
                  <Badge className="bg-blue-100 text-blue-800">+23</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Análises realizadas</span>
                  <Badge className="bg-green-100 text-green-800">+156</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Looks compartilhados</span>
                  <Badge className="bg-purple-100 text-purple-800">+89</Badge>
                </div>
              </div>
            </div>
          </div>
        )

      case "ai":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Sistema de IA Maia</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-white mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Status da IA Avançada</h3>
                  <p className="text-white/70">Sistema integrado com OpenAI funcionando</p>
                </div>
              </div>
              <Badge className={aiStatus.online ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}>
                {aiStatus.online ? "Online" : "Offline"}
              </Badge>
            </div>

            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Estatísticas da IA</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3,891</div>
                  <div className="text-sm text-gray-600">Análises Processadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">567</div>
                  <div className="text-sm text-gray-600">Sugestões Geradas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-gray-600">Precisão</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1.2s</div>
                  <div className="text-sm text-gray-600">Tempo Médio</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Configurações da IA</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">OpenAI Integration</span>
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Análise de Imagens</span>
                  <Badge className="bg-green-100 text-green-800">Disponível</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Chat Inteligente</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white justify-start font-medium"
                onClick={() => alert("Configurações avançadas da IA em desenvolvimento!")}
              >
                <Sparkles className="w-4 h-4 mr-3" />
                Configurar IA
              </Button>
              
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700 text-white justify-start font-medium"
                onClick={() => {
                  const status = aiSystem.getStatus()
                  alert(`Status da IA:\n\nNome: ${status.assistant}\nOnline: ${status.configured}\nEspecialidades: ${status.features?.length || 0}\nConversas: ${aiStatus.conversationLength}`)
                }}
              >
                <Settings className="w-4 h-4 mr-3" />
                Verificar Status
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="px-6 pb-24">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-white/20 p-3 rounded-2xl mr-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Olá, Administrador! 👋
                  </h2>
                  <p className="text-white/90">
                    Gerencie a plataforma FashionAI com IA
                  </p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Acesso Total
              </Badge>
            </div>

            {/* Admin Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                onClick={() => setAdminTab("users")}
                className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Usuários</span>
              </Button>

              <Button 
                onClick={() => setAdminTab("reports")}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <BarChart3 className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Relatórios</span>
              </Button>

              <Button 
                onClick={() => setAdminTab("ai")}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Sparkles className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">IA Maia</span>
              </Button>

              <Button 
                onClick={() => alert("Configurações em desenvolvimento!")}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Cog className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Configurações</span>
              </Button>

              <Button 
                onClick={() => alert("Fashion Feed em desenvolvimento!")}
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Fashion Feed</span>
              </Button>

              <Button 
                onClick={() => alert("Banco de dados em desenvolvimento!")}
                className="bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg font-medium"
              >
                <Database className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Banco de Dados</span>
              </Button>
            </div>

            {/* Admin Statistics Card */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                Estatísticas da Plataforma
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-emerald-600">1,247</div>
                  <div className="text-sm text-gray-600">Usuários</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">3,891</div>
                  <div className="text-sm text-gray-600">Análises</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">567</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                Status do Sistema
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Servidor Principal</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">IA Maia</span>
                  <Badge className={aiStatus.online ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {aiStatus.online ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">OpenAI Integration</span>
                  <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  if (currentStep === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            FashionAI
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/90 text-center mb-2 max-w-md">
            Sua assistente pessoal de moda com IA
          </p>
          
          {/* Description */}
          <p className="text-white/80 text-center mb-12 max-w-sm leading-relaxed">
            Descubra seu estilo único com inteligência artificial avançada e tenha looks perfeitos todos os dias
          </p>

          {/* Login Form */}
          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div>
                <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleLogin)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              
              {/* Checkbox para lembrar credenciais */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 bg-white/20 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="remember" className="text-white/90 text-sm">
                  Lembrar email e senha
                </Label>
              </div>
              
              {email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
                <div className="flex items-center p-2 bg-emerald-500/20 rounded-lg">
                  <Shield className="w-4 h-4 text-emerald-300 mr-2" />
                  <span className="text-sm text-emerald-200 font-medium">
                    Acesso de Administrador Detectado
                  </span>
                </div>
              )}
              
              {LIBERATED_ACCOUNTS.some(account => account.toLowerCase() === email.toLowerCase()) && email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() && (
                <div className="flex items-center p-2 bg-green-500/20 rounded-lg">
                  <Check className="w-4 h-4 text-green-300 mr-2" />
                  <span className="text-sm text-green-200 font-medium">
                    🎉 Conta Liberada! Acesso Premium Gratuito
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <Button 
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {!email.trim() || !password.trim() ? "Preencha os campos" : "Entrar"}
            </Button>
            
            <Button 
              onClick={() => {
                resetForm()
                setCurrentStep("register")
              }}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Criar Conta
            </Button>

            {/* Forgot Password Button */}
            <Button 
              onClick={() => alert("Funcionalidade de recuperação de senha em desenvolvimento!")}
              className="w-full bg-transparent hover:bg-white/10 text-white/80 hover:text-white py-3 text-sm font-medium"
            >
              Esqueci minha senha
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm mb-2">
              🔒 Seus dados estão protegidos
            </p>
            <p className="text-white/60 text-xs max-w-xs">
              Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                resetForm()
                setCurrentStep("login")
              }}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl">
              <User className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Criar Conta
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/90 text-center mb-2 max-w-md">
            Junte-se ao FashionAI
          </p>
          
          {/* Description */}
          <p className="text-white/80 text-center mb-12 max-w-sm leading-relaxed">
            Crie sua conta e comece a descobrir seu estilo único com IA avançada hoje mesmo
          </p>

          {/* Register Form */}
          <div className="w-full max-w-sm space-y-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/90 text-sm font-medium">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/90 text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-white/90 text-sm font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-white/90 text-sm font-medium">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, handleRegister)}
                  className="mt-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
                />
              </div>
              
              {/* Checkbox para lembrar credenciais */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberRegister"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/30 bg-white/20 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="rememberRegister" className="text-white/90 text-sm">
                  Lembrar email e senha
                </Label>
              </div>
              
              {email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
                <div className="flex items-center p-2 bg-emerald-500/20 rounded-lg">
                  <Shield className="w-4 h-4 text-emerald-300 mr-2" />
                  <span className="text-sm text-emerald-200 font-medium">
                    Acesso de Administrador Detectado
                  </span>
                </div>
              )}
              
              {LIBERATED_ACCOUNTS.some(account => account.toLowerCase() === email.toLowerCase()) && email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() && (
                <div className="flex items-center p-2 bg-green-500/20 rounded-lg">
                  <Check className="w-4 h-4 text-green-300 mr-2" />
                  <span className="text-sm text-green-200 font-medium">
                    🎉 Conta Liberada! Acesso Premium Gratuito
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <Button 
              onClick={handleRegister}
              disabled={!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() ? "Preencha todos os campos" : "Criar Conta"}
            </Button>
            
            <Button 
              onClick={() => {
                resetForm()
                setCurrentStep("login")
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-6 text-lg font-semibold rounded-2xl font-medium"
            >
              Já tenho conta
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-white/70 text-sm mb-2">
              🔒 Seus dados estão protegidos
            </p>
            <p className="text-white/60 text-xs max-w-xs">
              Ao criar conta, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "quiz") {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="text-white hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="text-center">
            <p className="text-white/90 text-sm font-medium">
              {currentQuestionIndex + 1} de {quizQuestions.length}
            </p>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 mb-8">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          {/* Question Card */}
          <div className="w-full max-w-md mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl inline-block mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {currentQuestion.question}
                </h2>
                <p className="text-white/80 text-sm">
                  Escolha a opção que mais combina com você
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleQuizAnswer(option)}
                    className={`w-full p-4 text-left justify-start transition-all duration-200 font-medium ${
                      selectedAnswer === option 
                        ? "bg-white text-purple-600 hover:bg-white/90" 
                        : "bg-gray-600 hover:bg-gray-700 text-white"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                      selectedAnswer === option 
                        ? "bg-purple-600 border-purple-600" 
                        : "border-white/50"
                    }`}>
                      {selectedAnswer === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-sm">{option}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-md space-y-4">
            <Button 
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {currentQuestionIndex === quizQuestions.length - 1 ? (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Ver Resultado
                </>
              ) : (
                <>
                  Próxima
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              ✨ Personalizando sua experiência de moda com IA
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "subscription") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentStep("quiz")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl inline-block mb-4">
              <Crown className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Escolha seu Plano
            </h1>
            <p className="text-white/80 text-sm max-w-sm">
              Desbloqueie todo o potencial da sua assistente de moda pessoal com IA avançada
            </p>
          </div>

          {/* Subscription Plans */}
          <PurchaseButtons onPurchase={handleSubscription} />

          {/* Footer Info */}
          <div className="text-center">
            <p className="text-white/70 text-xs mb-2">
              🔒 Pagamento seguro • Cancele quando quiser
            </p>
            <p className="text-white/60 text-xs max-w-xs">
              Todos os planos incluem acesso completo às funcionalidades premium com IA
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setAdminTab("dashboard")}
            >
              <Bell className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderAdminTabContent()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="flex items-center justify-around py-3">
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${adminTab === "dashboard" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setAdminTab("dashboard")}
            >
              <Shield className="w-5 h-5" />
              <span className="text-xs mt-1">Admin</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${adminTab === "reports" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setAdminTab("reports")}
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs mt-1">Stats</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3"
              onClick={() => alert("Adicionar novo recurso em desenvolvimento!")}
            >
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${adminTab === "users" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setAdminTab("users")}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs mt-1">Users</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex flex-col items-center p-2 text-gray-400"
              onClick={() => {
                setIsAdmin(false)
                resetForm()
                setCurrentStep("login")
              }}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs mt-1">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => setHomeTab("dashboard")}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          <h1 className="text-xl font-bold text-white">FashionAI</h1>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={() => alert("Notificações: Você tem 3 novas sugestões de looks da IA!")}
            >
              <Bell className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderHomeTabContent()}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <div className="flex items-center justify-around py-3">
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${homeTab === "dashboard" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("dashboard")}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${homeTab === "wardrobe" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("wardrobe")}
            >
              <Shirt className="w-5 h-5" />
              <span className="text-xs mt-1">Roupas</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3"
              onClick={() => setHomeTab("analyze")}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${homeTab === "chat" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("chat")}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs mt-1">IA Chat</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${homeTab === "profile" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("profile")}
            >
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Perfil</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
