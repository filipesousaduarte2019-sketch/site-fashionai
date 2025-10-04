"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Heart, Camera, Users, Star, Check, Mail, Shield, Settings, ArrowLeft, Menu, Home, Search, Plus, User, Bell, Shirt, Palette, TrendingUp, Calendar, MessageCircle, ShoppingBag, BarChart3, Database, UserCheck, Cog, X, Upload, Eye, Trash2, Bug, Lightbulb, Send, Edit, Lock, HelpCircle, LogOut } from "lucide-react"

type Step = "login" | "register" | "home" | "admin"
type HomeTab = "dashboard" | "wardrobe" | "analyze" | "combinations" | "trends" | "planner" | "shopping" | "search" | "chat" | "profile"
type AdminTab = "dashboard" | "users" | "reports" | "ai" | "settings" | "feed" | "database"

// E-mail do administrador
const ADMIN_EMAIL = "filipesousaduarte2019@gmail.com"

// Contas liberadas (incluindo a nova conta solicitada)
const LIBERATED_ACCOUNTS = [
  "filipesousaduarte2@gmail.com",
  "filipesousaduarte2019@gmail.com"
]

// Mock data para demonstração
const mockWardrobe = [
  { id: 1, name: "Blusa Branca Básica", category: "Blusas", color: "Branco", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop" },
  { id: 2, name: "Calça Jeans Skinny", category: "Calças", color: "Azul", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop" },
  { id: 3, name: "Blazer Preto", category: "Blazers", color: "Preto", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&h=200&fit=crop" },
  { id: 4, name: "Vestido Floral", category: "Vestidos", color: "Estampado", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop" },
  { id: 5, name: "Saia Midi", category: "Saias", color: "Rosa", image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=200&h=200&fit=crop" },
  { id: 6, name: "Tênis Branco", category: "Calçados", color: "Branco", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop" }
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

export default function FashionAI() {
  const [currentStep, setCurrentStep] = useState<Step>("login")
  const [homeTab, setHomeTab] = useState<HomeTab>("dashboard")
  const [adminTab, setAdminTab] = useState<AdminTab>("dashboard")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [bugReport, setBugReport] = useState("")
  const [suggestion, setSuggestion] = useState("")

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      alert("Por favor, preencha todos os campos.")
      return
    }

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

    // Registro normal
    alert(`Conta criada com sucesso! Bem-vindo(a), ${name}!`)
    setCurrentStep("home")
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
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

  // Renderizar conteúdo das abas do usuário
  const renderHomeTabContent = () => {
    switch (homeTab) {
      case "wardrobe":
        return (
          <div className="px-6 pb-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Meu Guarda-roupa</h2>
              <Button 
                onClick={() => alert("Adicionar nova peça em desenvolvimento!")}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {mockWardrobe.map((item) => (
                <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-white text-sm mb-1">{item.name}</h3>
                    <p className="text-white/70 text-xs mb-2">{item.category}</p>
                    <Badge className="bg-white/20 text-white text-xs">{item.color}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "analyze":
        return (
          <div className="px-6 pb-24">
            <h2 className="text-2xl font-bold text-white mb-6">Analisar Peça</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="text-center">
                <Camera className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Capture uma Peça</h3>
                <p className="text-white/80 text-sm mb-6">
                  Tire uma foto da peça que deseja analisar e nossa IA identificará cor, estilo e sugestões
                </p>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => alert("Câmera ativada! Funcionalidade em desenvolvimento.")}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Abrir Câmera
                  </Button>
                  
                  <Button 
                    onClick={() => alert("Galeria aberta! Funcionalidade em desenvolvimento.")}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 py-4"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Escolher da Galeria
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Análises Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Blusa Azul</p>
                    <p className="text-sm text-gray-600">Analisada há 2 horas</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Vestido Floral</p>
                    <p className="text-sm text-gray-600">Analisada ontem</p>
                  </div>
                  <Button size="sm" variant="outline">
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
            <h2 className="text-2xl font-bold text-white mb-6">Combinações</h2>
            
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
                        className="bg-white/20 hover:bg-white/30 text-white flex-1"
                        onClick={() => alert(`Look "${combo.name}" salvo nos favoritos!`)}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Favoritar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10"
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
                      className="bg-white/20 hover:bg-white/30 text-white"
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
                      variant={index < 3 ? "outline" : "default"}
                      className={index < 3 ? "border-white/30 text-white hover:bg-white/10" : "bg-white/20 hover:bg-white/30 text-white"}
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
                        className="bg-white/20 hover:bg-white/30 text-white"
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
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-gray-800">Calça Preta</span>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-500" />
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
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 justify-start"
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
                      <Button size="sm" variant="ghost">
                        <X className="w-4 h-4 text-white/60" />
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
            <h2 className="text-2xl font-bold text-white mb-6">Chat com IA Maia</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6 h-96 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/20 rounded-2xl p-3 max-w-xs">
                    <p className="text-white text-sm">
                      Olá! Sou a Maia, sua assistente de moda. Como posso ajudar você hoje?
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-blue-500 rounded-2xl p-3 max-w-xs">
                    <p className="text-white text-sm">
                      Preciso de um look para uma reunião importante
                    </p>
                  </div>
                  <div className="bg-gray-400 rounded-full p-2">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500 rounded-full p-2">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/20 rounded-2xl p-3 max-w-xs">
                    <p className="text-white text-sm">
                      Perfeito! Para reuniões importantes, recomendo um blazer estruturado com uma blusa neutra e calça social. Que tal o seu blazer preto com a blusa branca?
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Input
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-white/50"
              />
              <Button 
                className="bg-purple-500 hover:bg-purple-600"
                onClick={() => alert("Mensagem enviada! Funcionalidade em desenvolvimento.")}
              >
                <MessageCircle className="w-4 h-4" />
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
                  <div className="text-2xl font-bold text-white">47</div>
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

            {/* Configurações de Conta */}
            <div className="space-y-4 mb-6">
              <Button 
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                onClick={() => alert("Editar perfil em desenvolvimento!")}
              >
                <Edit className="w-4 h-4 mr-3" />
                Editar Perfil
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                onClick={() => alert("Configurações em desenvolvimento!")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurações
              </Button>

              <Button 
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                onClick={() => alert("Alterar senha em desenvolvimento!")}
              >
                <Lock className="w-4 h-4 mr-3" />
                Alterar Senha
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
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
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
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
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
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
                  <p className="text-sm font-medium text-gray-800">50 Peças</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Palette className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Fashionista</p>
                </div>
              </div>
            </div>

            {/* Botão de Logout */}
            <Button 
              onClick={() => {
                resetForm()
                setCurrentStep("login")
              }}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30"
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
                Explore todas as funcionalidades da sua assistente pessoal de moda!
              </p>
            </div>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                onClick={() => setHomeTab("wardrobe")}
                className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Shirt className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Ver Guarda-roupa</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("analyze")}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Camera className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Analisar Peça</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("combinations")}
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Palette className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Combinações</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("trends")}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Tendências</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("planner")}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Planejar Looks</span>
              </Button>

              <Button 
                onClick={() => setHomeTab("shopping")}
                className="bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <ShoppingBag className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Shopping List</span>
              </Button>
            </div>

            {/* Statistics Card */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Shirt className="w-5 h-5 text-purple-600 mr-2" />
                Seu Guarda-roupa
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">47</div>
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

            {/* Tip of the Day */}
            <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Dica do Dia
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Experimente combinar uma peça statement com básicos neutros. Isso cria um look equilibrado e sofisticado!
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
            <h2 className="text-2xl font-bold text-white mb-6">IA Maia</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-white mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Status da IA</h3>
                  <p className="text-white/70">Sistema funcionando normalmente</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300">Online</Badge>
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

            <div className="space-y-4">
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white justify-start"
                onClick={() => alert("Treinamento da IA em desenvolvimento!")}
              >
                <Sparkles className="w-4 h-4 mr-3" />
                Treinar Modelo
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10 justify-start"
                onClick={() => alert("Configurações da IA em desenvolvimento!")}
              >
                <Settings className="w-4 h-4 mr-3" />
                Configurar IA
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
                    Gerencie a plataforma FashionAI
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
                className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Usuários</span>
              </Button>

              <Button 
                onClick={() => setAdminTab("reports")}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <BarChart3 className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Relatórios</span>
              </Button>

              <Button 
                onClick={() => setAdminTab("ai")}
                className="bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Sparkles className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">IA Maia</span>
              </Button>

              <Button 
                onClick={() => alert("Configurações em desenvolvimento!")}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Cog className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Configurações</span>
              </Button>

              <Button 
                onClick={() => alert("Fashion Feed em desenvolvimento!")}
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
              >
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Fashion Feed</span>
              </Button>

              <Button 
                onClick={() => alert("Banco de dados em desenvolvimento!")}
                className="bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center h-24 shadow-lg"
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
                  <Badge className="bg-green-100 text-green-800">Ativa</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Banco de Dados</span>
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
            Sua assistente pessoal de moda
          </p>
          
          {/* Description */}
          <p className="text-white/80 text-center mb-12 max-w-sm leading-relaxed">
            Descubra seu estilo único com inteligência artificial e tenha looks perfeitos todos os dias
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
              variant="ghost"
              onClick={() => alert("Funcionalidade de recuperação de senha em desenvolvimento!")}
              className="w-full text-white/80 hover:text-white hover:bg-white/10 py-3 text-sm"
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
            Crie sua conta e comece a descobrir seu estilo único hoje mesmo
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
              variant="outline"
              className="w-full border-white/30 text-white hover:bg-white/10 py-6 text-lg font-semibold rounded-2xl"
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
              onClick={() => alert("Notificações: Você tem 3 novas sugestões de looks!")}
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
              className={`flex flex-col items-center p-2 ${homeTab === "search" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("search")}
            >
              <Search className="w-5 h-5" />
              <span className="text-xs mt-1">Buscar</span>
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-3"
              onClick={() => setHomeTab("analyze")}
            >
              <Plus className="w-6 h-6 text-white" />
            </Button>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${homeTab === "chat" ? "text-purple-600" : "text-gray-400"}`}
              onClick={() => setHomeTab("chat")}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs mt-1">Chat</span>
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