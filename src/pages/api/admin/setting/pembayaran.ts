import type { APIRoute } from "astro"
import { getSettings, updateSettings, createSetting } from "../../../../db/queries/settings"

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  let body: any = {}

  try {
    body = await request.json()
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON body" }),
      { status: 400 }
    )
  }

  const dataToSave: Record<string, any> = {
    biaya: body.biaya,
    biayaBankName: body.biayaBankName,
    biayaAccountNumber: body.biayaAccountNumber,
    biayaAccountName: body.biayaAccountName,
    biayaInstruction: body.biayaInstruction,
    updatedAt: new Date(),
  }

  try {
    const existingSettings = await getSettings()

    if (existingSettings && existingSettings.length > 0) {
      await updateSettings(existingSettings[0].id, dataToSave)
    } else {
      await createSetting({
        id: "default",
        ...dataToSave,
        createdAt: new Date(),
      })
    }

    return new Response(JSON.stringify({ ok: true }))
  } catch (error) {
    console.error("Error saving payment settings:", error)
    return new Response(
      JSON.stringify({ error: "Gagal menyimpan pengaturan pembayaran" }),
      { status: 500 }
    )
  }
}
