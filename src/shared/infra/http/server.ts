import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { useColor } from '@shared/utils/console'
import { errorHandler } from './middlewares/errorHandler'

const { ENV = 'development', PORT = 3333 } = process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
	console.log(
		`       
    ${useColor('purple')(
			`
 ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   ▄▄   ▄▄ ▄▄▄▄▄▄▄ ▄▄▄▄▄▄   
█       █       █   ▄  █ █  █ █  █       █   ▄  █  
█  ▄▄▄▄▄█    ▄▄▄█  █ █ █ █  █▄█  █    ▄▄▄█  █ █ █  
█ █▄▄▄▄▄█   █▄▄▄█   █▄▄█▄█       █   █▄▄▄█   █▄▄█▄ 
█▄▄▄▄▄  █    ▄▄▄█    ▄▄  █       █    ▄▄▄█    ▄▄  █
 ▄▄▄▄▄█ █   █▄▄▄█   █  █ ██     ██   █▄▄▄█   █  █ █
█▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄▄█  █▄█ █▄▄▄█ █▄▄▄▄▄▄▄█▄▄▄█  █▄█ v1.0.0
      `
		)}
      ------------------------------
    \tRunning in:
    \t${useColor('green')(ENV.toUpperCase())}
    \tListening at:
    \t${useColor('blue')(`http://localhost:${PORT}`)}
      ------------------------------
  `
	)
})

export default app
