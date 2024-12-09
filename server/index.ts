import cors from 'cors'

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://your-production-domain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    exposedHeaders: ['Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
