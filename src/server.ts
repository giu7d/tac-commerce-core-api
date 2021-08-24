import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import { errors as withCelebrateError } from 'celebrate'

import '@modules/shared/registry'
import { routes } from '@/routes'
import { withResponseLogger } from '@modules/shared/middlewares/withResponseLogger'
import { withApplicationError } from '@modules/shared/middlewares/withApplicationError'

const app = express()

app.use(cors())
app.use(express.json())
app.use(withResponseLogger)
app.use(routes)
app.use(withCelebrateError())
app.use(withApplicationError)

export default app
