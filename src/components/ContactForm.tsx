import { motion, AnimatePresence } from 'framer-motion'
import { X, Video, Mail, Send, ChevronLeft, ChevronRight, Clock, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

type ViewMode = 'form' | 'calendar'

const ALL_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
]

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const TEAM_EMAIL = 'fhservicesofc@gmail.com'

// Security: Sanitize user input to prevent XSS and injection
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 500) // Limit length
}

// Security: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('form')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(ALL_TIME_SLOTS)

  const interests = [
    'Parceria Comercial',
    'Investimento',
    'Conhecer o Projeto',
    'Demonstração Técnica',
    'Outro',
  ]

  // Update available time slots when selected date changes
  useEffect(() => {
    if (!selectedDate) {
      setAvailableTimeSlots(ALL_TIME_SLOTS)
      return
    }

    const now = new Date()
    const isToday = selectedDate.toDateString() === now.toDateString()

    if (isToday) {
      const currentHour = now.getHours()
      const currentMinutes = now.getMinutes()

      // Filter slots that are at least 30 minutes in the future
      const filtered = ALL_TIME_SLOTS.filter(slot => {
        const [slotHour, slotMinutes] = slot.split(':').map(Number)
        const slotTotalMinutes = slotHour * 60 + slotMinutes
        const currentTotalMinutes = currentHour * 60 + currentMinutes + 30 // 30 min buffer
        return slotTotalMinutes > currentTotalMinutes
      })

      setAvailableTimeSlots(filtered)

      // Reset selected time if it's no longer available
      if (selectedTime && !filtered.includes(selectedTime)) {
        setSelectedTime('')
      }
    } else {
      setAvailableTimeSlots(ALL_TIME_SLOTS)
    }
  }, [selectedDate, selectedTime])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Security: Get sanitized form data
  const getSanitizedData = () => ({
    name: sanitizeInput(formData.name),
    email: sanitizeInput(formData.email).toLowerCase(),
    company: sanitizeInput(formData.company),
    interest: sanitizeInput(formData.interest),
    message: sanitizeInput(formData.message),
  })

  const generateEmailContent = () => {
    const safe = getSanitizedData()
    return {
      subject: `[PluView] ${safe.interest} - ${safe.name}`,
      body: `Nome: ${safe.name}
Email: ${safe.email}
Empresa: ${safe.company || 'Não informada'}
Interesse: ${safe.interest}

Mensagem:
${safe.message}`
    }
  }

  const handleGmail = () => {
    const safe = getSanitizedData()
    if (!isValidEmail(safe.email)) {
      alert('Por favor, insira um email válido.')
      return
    }
    const { subject, body } = generateEmailContent()
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${TEAM_EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailLink, '_blank')
    resetAndClose()
  }

  const handleScheduleMeet = () => {
    if (!selectedDate || !selectedTime) return

    const safe = getSanitizedData()
    if (!isValidEmail(safe.email)) {
      alert('Por favor, insira um email válido.')
      return
    }

    const [hours, minutes] = selectedTime.split(':').map(Number)
    const startDate = new Date(selectedDate)
    startDate.setHours(hours, minutes, 0, 0)

    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + 30)

    // Format dates for Google Calendar (YYYYMMDDTHHmmss in local time)
    const formatGoogleDate = (date: Date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hour = String(date.getHours()).padStart(2, '0')
      const minute = String(date.getMinutes()).padStart(2, '0')
      return `${year}${month}${day}T${hour}${minute}00`
    }

    // Use sanitized data for calendar event
    const title = `PluView - ${safe.interest} com ${safe.name}`
    const details = `Reunião agendada via PluView

Participante: ${safe.name}
Email: ${safe.email}
Empresa: ${safe.company || 'Não informada'}
Interesse: ${safe.interest}

Mensagem:
${safe.message}`

    // Google Calendar URL with Google Meet
    // Security: Only essential data is passed, all inputs are sanitized
    const calendarUrl = new URL('https://calendar.google.com/calendar/render')
    calendarUrl.searchParams.set('action', 'TEMPLATE')
    calendarUrl.searchParams.set('text', title)
    calendarUrl.searchParams.set('dates', `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`)
    calendarUrl.searchParams.set('details', details)
    // Add both emails as attendees - they will receive calendar invites
    calendarUrl.searchParams.set('add', `${TEAM_EMAIL},${safe.email}`)
    // Enable Google Meet video conferencing
    calendarUrl.searchParams.set('crm', 'AVAILABLE')
    // Send notifications to guests
    calendarUrl.searchParams.set('trp', 'true')
    // Set location as Google Meet
    calendarUrl.searchParams.set('location', 'Google Meet')

    window.open(calendarUrl.toString(), '_blank')
    resetAndClose()
  }

  const resetAndClose = () => {
    onClose()
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', interest: '', message: '' })
      setSelectedDate(null)
      setSelectedTime('')
      setViewMode('form')
      setCurrentMonth(new Date().getMonth())
      setCurrentYear(new Date().getFullYear())
      setAvailableTimeSlots(ALL_TIME_SLOTS)
    }, 200)
  }

  const prevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1)
    const today = new Date()
    // Don't go to past months
    if (newDate.getFullYear() > today.getFullYear() ||
        (newDate.getFullYear() === today.getFullYear() && newDate.getMonth() >= today.getMonth())) {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const canGoPrevMonth = () => {
    const today = new Date()
    return currentYear > today.getFullYear() ||
           (currentYear === today.getFullYear() && currentMonth > today.getMonth())
  }

  const isDateSelectable = (date: Date) => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const day = date.getDay()

    // Check if it's today and all time slots have passed
    if (date.toDateString() === now.toDateString()) {
      const currentHour = new Date().getHours()
      const currentMinutes = new Date().getMinutes()
      const lastSlot = ALL_TIME_SLOTS[ALL_TIME_SLOTS.length - 1]
      const [lastHour, lastMinutes] = lastSlot.split(':').map(Number)
      const lastSlotTotalMinutes = lastHour * 60 + lastMinutes
      const currentTotalMinutes = currentHour * 60 + currentMinutes + 30

      if (currentTotalMinutes >= lastSlotTotalMinutes) {
        return false // All slots have passed for today
      }
    }

    return date >= now && day !== 0 && day !== 6 // No weekends, no past dates
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    if (isDateSelectable(date)) {
      setSelectedDate(date)
      setSelectedTime('') // Reset time when changing date
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []
    const todayDate = new Date()
    todayDate.setHours(0, 0, 0, 0)

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const isSelectable = isDateSelectable(date)
      const isSelected = selectedDate?.toDateString() === date.toDateString()
      const isToday = date.toDateString() === todayDate.toDateString()

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          disabled={!isSelectable}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all mx-auto flex items-center justify-center
            ${isSelected
              ? 'bg-[var(--accent)] text-white'
              : isToday && isSelectable
                ? 'border-2 border-[var(--accent)] text-[var(--accent)]'
                : isSelectable
                  ? 'hover:bg-[var(--accent-soft)] text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] cursor-not-allowed opacity-40'
            }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const isFormValid = formData.name && formData.email && formData.interest && formData.message
  const isScheduleValid = isFormValid && selectedDate && selectedTime

  const formatSelectedDate = () => {
    if (!selectedDate) return ''
    return `${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}, ${selectedDate.getFullYear()}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={resetAndClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ background: 'var(--overlay)' }} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {viewMode === 'form' ? 'Entre em Contato' : 'Agende sua Reunião'}
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {viewMode === 'form'
                    ? 'Preencha seus dados para continuar'
                    : 'Escolha a data e horário da videochamada'}
                </p>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Form */}
                  <div className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                          Nome *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    {/* Company & Interest Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-[var(--accent)]"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                          }}
                          placeholder="Opcional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                          Interesse *
                        </label>
                        <select
                          required
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none cursor-pointer focus:ring-2 focus:ring-[var(--accent)]"
                          style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border-color)',
                            color: formData.interest ? 'var(--text-primary)' : 'var(--text-muted)',
                          }}
                        >
                          <option value="">Selecione</option>
                          {interests.map((interest) => (
                            <option key={interest} value={interest}>
                              {interest}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>
                        Mensagem *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors outline-none resize-none focus:ring-2 focus:ring-[var(--accent)]"
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        placeholder="Descreva brevemente seu interesse..."
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setViewMode('calendar')}
                        disabled={!isFormValid}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
                          color: 'white',
                          boxShadow: '0 4px 14px rgba(26, 115, 232, 0.4)',
                        }}
                      >
                        <Video className="w-5 h-5" />
                        Agendar Reunião
                      </button>
                      <button
                        type="button"
                        onClick={handleGmail}
                        disabled={!isFormValid}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: 'var(--bg-tertiary)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-strong)',
                        }}
                      >
                        <Mail className="w-5 h-5" />
                        Enviar Email
                        <Send className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Privacy Notice */}
                    <div
                      className="flex items-start gap-2 mt-4 p-3 rounded-lg"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                    >
                      <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} />
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Seus dados são protegidos e usados apenas para contato. Ao agendar, você será redirecionado ao Google Calendar para confirmar o evento de forma segura.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Back Button */}
                  <button
                    onClick={() => setViewMode('form')}
                    className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar ao formulário
                  </button>

                  {/* Calendar */}
                  <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevMonth}
                        disabled={!canGoPrevMonth()}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-elevated)] disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h3 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg transition-colors hover:bg-[var(--bg-elevated)]"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {dayNames.map((day) => (
                        <div
                          key={day}
                          className="h-8 flex items-center justify-center text-xs font-semibold"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                          Horários disponíveis - {formatSelectedDate()}
                        </span>
                      </div>

                      {availableTimeSlots.length > 0 ? (
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {availableTimeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all
                                ${selectedTime === time
                                  ? 'bg-[var(--accent)] text-white'
                                  : 'bg-[var(--bg-tertiary)] hover:bg-[var(--accent-soft)]'
                                }`}
                              style={selectedTime !== time ? {
                                color: 'var(--text-primary)',
                                border: '1px solid var(--border-color)'
                              } : {}}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="text-center py-4 rounded-xl"
                          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)' }}
                        >
                          <p className="text-sm">Nenhum horário disponível para esta data.</p>
                          <p className="text-xs mt-1">Selecione outro dia.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Selected Summary */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-xl p-4 mb-4"
                      style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent)' }}
                    >
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        Reunião agendada para:
                      </p>
                      <p className="font-display font-bold text-lg" style={{ color: 'var(--accent)' }}>
                        {formatSelectedDate()} às {selectedTime}
                      </p>
                      <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                        Duração: 30 minutos via Google Meet
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Users className="w-3 h-3" />
                        <span>Convite será enviado para {TEAM_EMAIL}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Confirm Button */}
                  <button
                    type="button"
                    onClick={handleScheduleMeet}
                    disabled={!isScheduleValid}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: isScheduleValid
                        ? 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)'
                        : 'var(--bg-tertiary)',
                      color: isScheduleValid ? 'white' : 'var(--text-muted)',
                      boxShadow: isScheduleValid ? '0 4px 14px rgba(26, 115, 232, 0.4)' : 'none',
                    }}
                  >
                    <Video className="w-5 h-5" />
                    Criar Evento no Google Calendar
                  </button>

                  <p className="text-xs text-center mt-3" style={{ color: 'var(--text-muted)' }}>
                    O Google Calendar enviará convites automaticamente para todos os participantes
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
