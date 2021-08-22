import '@config/index'
import { useColor } from '@utils/console'

import app from '@/server'

const { ENV = 'development', PORT = 3333 } = process.env

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
