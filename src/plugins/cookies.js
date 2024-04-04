import { parseJwt } from '@/plugins/helper'

const setCookies = (name, value,) => {
  document.cookie = `${name}=${value}`
}

const getCookies = (name) => {
  const cookies = `; ${document.cookie}`
  const byValue = cookies.split(`; ${name}=`)
  if (byValue.length === 2) return byValue.pop().split(';').shift()
}

const delCookies = (name) => {
  setCookies(name, '', -1)
}

const certCookies = () => {
  const token = getCookies('CERT')
  if (token) {
    const { username } = parseJwt(token)
    if (!username) return delCookies('CERT')
    return {
      username,
    }
  }
  return {
    username: undefined
  }
}

export { setCookies, getCookies, delCookies, certCookies }
