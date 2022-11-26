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

export async function getHoleList(
  token: string,
  page: number,
  init: RequestInit
) {
  const resp = await fetch(resolveHoleUrl('getlist', token, `&p=${page}`), init)
  return resp.json() as Promise<IHoleListResp>
}

export async function searchHole(
  token: string,
  page: number,
  pagesize: number,
  keywords: string,
  init: RequestInit
) {
  const resp = await fetch(
    resolveHoleUrl(
      'search',
      token,
      `&pagesize=${pagesize}&page=${page}&keywords=${encodeURIComponent(
        keywords
      )}`
    ),
    init
  )
  return resp.json() as Promise<ISearchResp>
}

export async function getHole(token: string, pid: number, init: RequestInit) {
  const resp = await fetch(resolveHoleUrl('getone', token, `&pid=${pid}`), init)
  return resp.json() as Promise<IHoleResp>
}

export async function getCommentList(
  token: string,
  pid: number,
  init: RequestInit
) {
  const resp = await fetch(
    resolveHoleUrl('getcomment', token, `&pid=${pid}`),
    init
  )
  return resp.json() as Promise<ICommentListResp>
}
