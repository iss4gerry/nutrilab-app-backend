const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Nutrilab App Backend",
        version: "1.0.0",
        description: "API for Nutrilab App, made using Express JS and documented by Swagger.",
        contact:{
            name: "Gerry Desrian",
            url: "https://github.com/iss4gerry"
        }
      },    
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
      
    },
    apis: ['./src/routes/*js'],
}

module.exports = swaggerOptions
  