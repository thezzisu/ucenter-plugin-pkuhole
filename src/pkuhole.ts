import http from 'http-errors'
import fetch, { AbortError, FetchError, type RequestInit } from 'node-fetch'

export interface IHole {
  pid: string
  hidden: string
  text: string
  type: 'text' | 'image'
  timestamp: string
  reply: string
  likenum: string
  extra: string
  url: string
  hot: string
  tag: unknown
}

export interface IHoleListResp {
  code: number
  data: IHole[]
  timestamp: number
  count: number
}

export interface ISearchResp {
  code: number
  data: IHole[]
}

export interface IHoleResp {
  code: number
  data: IHole
  timestamp: number
}

export interface IComment {
  cid: string
  pid: string
  text: string
  timestamp: string
  anonymous: string
  tag: unknown
  islz: number
  name: string
}

export interface ICommentListResp {
  code: number
  data: IComment[]
  attention: number
  captcha: boolean
}

export function resolveHoleUrl(action: string, token: string, q = '') {
  return `https://pkuhelper.pku.edu.cn/services/pkuhole/api.php?action=${action}${q}&PKUHelperAPI=3.0&jsapiver=201027113050-463690&user_token=${token}`
}

const timeout = parseInt(process.env.HOLE_API_TIMEOUT ?? '10000')

async function fetchApi<T>(url: string, init: RequestInit) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), timeout)
  try {
    const resp = await fetch(url, { signal: controller.signal, ...init })
    if (!resp.ok) {
      throw http.BadGateway(`Upstream ${resp.status} error: ${resp.statusText}`)
    }
    const data = <T>await resp.json()
    clearTimeout(t)
    return data
  } catch (err) {
    clearTimeout(t)
    if (http.isHttpError(err)) throw err
    if (err instanceof AbortError) {
      throw http.BadGateway(`Upstream timeout`)
    }
    if (err instanceof FetchError) {
      throw http.BadGateway(`Upstream error: ${err.errno ?? 'fetch failed'}`)
    }
    throw http.BadGateway(`Upstream error: ${err}`)
  }
}

export async function getHoleList(
  token: string,
  page: number,
  init: RequestInit
) {
  return fetchApi<IHoleListResp>(
    resolveHoleUrl('getlist', token, `&p=${page}`),
    init
  )
}

export async function searchHole(
  token: string,
  page: number,
  pagesize: number,
  keywords: string,
  init: RequestInit
) {
  return fetchApi<ISearchResp>(
    resolveHoleUrl(
      'search',
      token,
      `&pagesize=${pagesize}&page=${page}&keywords=${encodeURIComponent(
        keywords
      )}`
    ),
    init
  )
}

export async function getHole(token: string, pid: number, init: RequestInit) {
  return fetchApi<IHoleResp>(
    resolveHoleUrl('getone', token, `&pid=${pid}`),
    init
  )
}

export async function getCommentList(
  token: string,
  pid: number,
  init: RequestInit
) {
  return fetchApi<ICommentListResp>(
    resolveHoleUrl('getcomment', token, `&pid=${pid}`),
    init
  )
}

export interface IDoCommentResp {
  code: number
  data: number
}

export async function doComment(
  token: string,
  pid: number,
  text: string,
  init: RequestInit
) {
  return fetchApi<IDoCommentResp>(resolveHoleUrl('docomment', token, ''), {
    method: 'POST',
    body: `pid=${pid}&text=${encodeURIComponent(text)}&user_token=${token}`,
    ...init,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...init.headers
    }
  })
}

export interface IDoPostResp {
  code: number
  data: string
}

export async function doPost(token: string, text: string, init: RequestInit) {
  return fetchApi<IDoPostResp>(resolveHoleUrl('dopost', token, ''), {
    method: 'POST',
    body: `text=${encodeURIComponent(text)}&type=text&user_token=${token}`,
    ...init,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...init.headers
    }
  })
}
