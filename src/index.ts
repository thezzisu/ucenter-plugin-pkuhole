import { DbConn, Plugin, Initable, rootChain } from '@ucenter/server'
import http from 'http-errors'
import { Type } from '@sinclair/typebox'
import {
  getCommentList,
  getHole,
  getHoleList,
  IComment,
  IHole
} from './pkuhole.js'
import { IncomingHttpHeaders } from 'http'

export interface IHoleDoc {
  _id: number
  data: IHole
  comments: IComment[]
}

class HoleManager extends Initable {
  collection
  constructor(public dbconn: DbConn) {
    super(dbconn.logger)
    this.collection = dbconn.db.collection<IHoleDoc>('hole')
  }
}

function getToken(access: boolean, token?: string) {
  if (access) token ??= process.env.HOLE_TOKEN
  if (!token) throw new Error('Token is required')
  return token
}

function transformHeaders(headers: IncomingHttpHeaders): HeadersInit {
  return {
    accept: '*/*',
    'accept-language':
      headers['accept-language'] ??
      'en,zh-CN;q=0.9,zh-Hans;q=0.8,zh;q=0.7,ja;q=0.6',
    'sec-ch-ua': '"Chromium";v="106", "Not;A=Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    Referer: 'https://pkuhelper.pku.edu.cn/hole/',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'user-agent':
      headers['user-agent'] ??
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
  }
}

let archiveCursor = 0

function safeParse(str: string) {
  const num = parseInt(str)
  if (Number.isSafeInteger(num)) return num
  return 0
}

const holeRouter = rootChain
  .transform(async (ctx, req) => {
    let holeAccess = false
    try {
      const value = req.headers['x-auth-token']
      if (typeof value !== 'string') throw http.Unauthorized()
      const token = await ctx.dbconn.token.get({ value })
      if (!token) throw http.Unauthorized()
      const user = await ctx.dbconn.user.loadUserInfo(token, ['center:hole'])
      holeAccess = user.group.policies['center:hole']
    } catch (err) {
      // No hole access
    }
    return { ...ctx, holeAccess }
  })
  .router()
  .handle('GET', '/list', (C) =>
    C.handler()
      .query(
        Type.Object({
          token: Type.Optional(Type.String()),
          page: Type.Optional(Type.Integer({ minimum: 1 }))
        })
      )
      .handle(async ({ dbconn: { hole }, holeAccess, app }, req) => {
        const { page = 1 } = req.query
        const resp = await getHoleList(
          getToken(holeAccess, req.query.token),
          page,
          { headers: transformHeaders(req.headers) }
        )
        try {
          const newHoles = resp.data
            .map((hole) => ({
              _id: safeParse(hole.pid),
              data: hole
            }))
            .filter((hole) => hole._id > archiveCursor)
          if (newHoles instanceof Array) {
            const result = await hole.collection.bulkWrite(
              newHoles.map(({ _id, data }) => ({
                updateOne: {
                  filter: { _id },
                  update: {
                    $set: { data }
                  },
                  upsert: true
                }
              })),
              { ordered: false }
            )
            if (result.isOk()) {
              archiveCursor = newHoles.reduce(
                (acc, hole) => Math.max(acc, hole._id),
                archiveCursor
              )
              app.logger.info(
                `ArchiveCursor=${archiveCursor} (+${result.modifiedCount})`
              )
            }
          }
        } catch (err) {
          app.logger.error(err)
        }
        return resp
      })
  )
  .handle('GET', '/getone', (C) =>
    C.handler()
      .query(
        Type.Object({
          token: Type.Optional(Type.String()),
          pid: Type.Integer()
        })
      )
      .handle(async ({ dbconn: { hole }, holeAccess, app }, req) => {
        const { pid } = req.query
        const resp = await getHole(getToken(holeAccess, req.query.token), pid, {
          headers: transformHeaders(req.headers)
        })
        try {
          const data = resp.data
          const _id = safeParse(data.pid)
          if (_id !== pid) throw new Error('pid mismatch')
          await hole.collection.updateOne(
            { _id },
            { $set: { data } },
            { upsert: true }
          )
        } catch (err) {
          app.logger.error(err)
        }
        return resp
      })
  )
  .handle('GET', '/getcomment', (C) =>
    C.handler()
      .query(
        Type.Object({
          token: Type.Optional(Type.String()),
          pid: Type.Integer()
        })
      )
      .handle(async ({ dbconn: { hole }, holeAccess, app }, req) => {
        const { pid } = req.query
        const resp = await getCommentList(
          getToken(holeAccess, req.query.token),
          pid,
          {
            headers: transformHeaders(req.headers)
          }
        )
        try {
          const comments = resp.data
          const _id = pid
          await hole.collection.updateOne(
            { _id },
            { $set: { comments } },
            { upsert: true }
          )
        } catch (err) {
          app.logger.error(err)
        }
        return resp
      })
  )

declare module '@ucenter/server' {
  interface IGroupPolicies {
    'center:hole': boolean
  }

  interface DbConn {
    hole: HoleManager
  }
}

const plugin: Plugin = (hooks) => {
  hooks.hook('post-plugin-setup', ({ contributions }) => {
    contributions.groupPolicies.set('center:hole', {
      description: 'Hole Access',
      schema: Type.Boolean()
    })
  })
  hooks.hook('post-dbconn-setup', async ({ dbconn }) => {
    dbconn.hole = new HoleManager(dbconn)
    await dbconn.hole.init()
  })
  hooks.hook('post-server-setup', (app) => {
    app.server.register(holeRouter.toPlugin(), { prefix: '/hole' })
  })
}

export default plugin
