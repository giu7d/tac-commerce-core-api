import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { errors as handleCelebrateError } from 'celebrate'

import { handleApplicationError } from '@middlewares/handleError'

import { routes } from '@/routes'
import { handleApplicationRequests } from '@middlewares/logRequests'

const app = express()

app.use(cors())
app.use(express.json())
app.use(handleApplicationRequests())
app.use(routes)
app.use(handleCelebrateError())
app.use(handleApplicationError())

export default app
