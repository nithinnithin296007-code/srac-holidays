export const validateName = (value) =>
  !value.trim() ? 'Name is required' : ''

export const validatePhone = (value) => {
  if (!value.trim()) return 'Phone number is required'
  const digits = value.replace(/\s+/g, '').replace('+91', '')
  if (!/^[6-9]\d{9}$/.test(digits)) return 'Enter a valid 10-digit Indian mobile number'
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
