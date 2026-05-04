'use client'

import { useState } from 'react'

const CLASS_OPTIONS = [
  '入門班：AI 認知覺醒（每週一）',
  '進階班：數位排毒實踐（每週三）',
  '密集班：7 天斷網重生（每月第一週）',
  '親子班：與孩子一起脫離 AI 依賴（每週六）',
]

type FormData = {
  name: string
  email: string
  phone: string
  class_type: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    class_type: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', class_type: '' })
    } else {
      setStatus('error')
      setErrorMsg(data.error || '發生未知錯誤')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧘</div>
          <h1 className="text-3xl font-bold text-white mb-2">戒 AI 成癮班</h1>
          <p className="text-slate-400 text-sm">找回專注，重拾生活主導權</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">報名成功！</h2>
              <p className="text-slate-500 text-sm mb-6">我們將在 24 小時內以 email 聯繫你。</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-indigo-600 text-sm font-medium hover:underline"
              >
                繼續報名其他班別
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="請輸入真實姓名"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  電話 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0912-345-678"
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  報名班別 <span className="text-red-500">*</span>
                </label>
                <select
                  name="class_type"
                  value={form.class_type}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
                >
                  <option value="">請選擇班別</option>
                  {CLASS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
              >
                {status === 'loading' ? '送出中...' : '立即報名'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          報名即代表同意我們的隱私政策
        </p>
      </div>
    </main>
  )
}
