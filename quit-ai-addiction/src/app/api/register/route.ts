import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, phone, class_type } = body

  if (!name || !email || !phone || !class_type) {
    return NextResponse.json({ error: '請填寫所有必填欄位' }, { status: 400 })
  }

  const { error } = await supabase.from('registrations').insert([
    { name, email, phone, class_type },
  ])

  if (error) {
    return NextResponse.json({ error: '報名失敗，請稍後再試' }, { status: 500 })
  }

  return NextResponse.json({ message: '報名成功！' }, { status: 200 })
}
