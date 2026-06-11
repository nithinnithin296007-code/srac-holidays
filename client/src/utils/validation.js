export const validateName = (value) =>
  !value.trim() ? 'Name is required' : ''

export const validatePhone = (value) => {
  if (!value.trim()) return 'Phone number is required'
  const cleanVal = value.trim()
  const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/
  if (!phoneRegex.test(cleanVal)) return 'Enter a valid phone number (7-15 digits)'
  return ''
}

export const validateEmail = (value) => {
  if (!value) return ''
  if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) return 'Enter a valid email address'
  return ''
}

export const validateMessage = (value) =>
  !value.trim() ? 'Message is required' : ''

export const validateCompany = (value) =>
  !value.trim() ? 'Company name is required' : ''
