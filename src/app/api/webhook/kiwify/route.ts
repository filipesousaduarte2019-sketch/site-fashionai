import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface KiwifyWebhookData {
  email: string;
  plano?: string;
  status: string;
  order_id?: string;
  product_name?: string;
  customer_name?: string;
  amount?: number;
}

// 🧩 Configuração do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// 🔐 Token de validação da Kiwify
const KIWIFY_TOKEN = "z7j0npvx5uw";

export async function POST(request: NextRequest) {
  try {
    const tokenRecebido = request.headers.get("x-kiwify-signature");

    if (tokenRecebido !== KIWIFY_TOKEN) {
      console.log("❌ Token inválido:", tokenRecebido);
      return NextResponse.json(
        { success: false, message: "Token inválido" },
        { status: 401 }
      );
    }

    const webhookData: KiwifyWebhookData = await request.json();
    console.log("📧 Webhook recebido:", webhookData);

    if (webhookData.status === "approved" && webhookData.email) {
      // 🧠 Salva o usuário no Supabase
      const { data, error } = await supabase
        .from("usuarios_premium")
        .upsert({
          email: webhookData.email.toLowerCase(),
          nome: webhookData.customer_name || "",
          plano: webhookData.plano || webhookData.product_name || "",
          order_id: webhookData.order_id || "",
          valor: webhookData.amount || 0,
          status: webhookData.status,
          data_compra: new Date().toISOString(),
        });

      if (error) {
        console.error("❌ Erro ao salvar no Supabase:", error);
        return NextResponse.json(
          { success: false, message: "Erro ao salvar no banco" },
          { status: 500 }
        );
      }

      console.log(`✅ Usuário ${webhookData.email} marcado como premium`);
      return NextResponse.json({
        success: true,
        message: "Usuário registrado como premium",
      });
    }

    return NextResponse.json({
      success: false,
      message: "Status não aprovado ou email ausente",
    });
  } catch (error) {
    console.error("❌ Erro no webhook:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno" },
      { status: 500 }
    );
  }
}
