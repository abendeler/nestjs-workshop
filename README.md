# NestJs Workshop

## Controllers

Controllers are the components in a REST api that are responsible for handling incoming requests and outgoing responses of a running server. In the following exercise you will learn how to declare controllers in a NestJs application and will learn the basics of creating CRUD endpoints and how to pass data to the different methods / handlers of the controller (params, query params, body). Keep the internal terminal open in your editor so you can read the logs on starting the dev server as well as the effect of every code change.

Also be sure to have insomnia / postman installed so you can call the different endpoints

## Exercise 1:

- run npm install
- run the app using the command `npm run start:dev`
- notice the runtime error that originates at main.ts
- create an .env file and declare a variable PORT with value 8080
- solve the issue by importing the config module in app.ts [NestJs documentation - config](https://docs.nestjs.com/techniques/configuration)
- notice that the config module has loaded successfully => LOG [InstanceLoader] ConfigModule dependencies initialized

## Exercise 2:

- navigate to tasks.controller.ts
- declare that it is a controller using the controller decorator. Pass in the string '/tasks' so that Nestjs understands that this controller is handling requests on /tasks endpoint.
- notice on startup that no controller has been initialised yet according to the logs. What are you missing?
- declare in tasks.module.ts that there is a controller part of that module
- notice that the controller is now being logged on restarting the dev server => (LOG [RoutesResolver] TasksController {/tasks}:)
- remove the @Controller decorator and save. Read the error message in the logs. Nestjs logs are very often very descriptive (though some advanced ones are a bit misleading)

## Exercises 3:

- You will implement all the given endpoints by decorating the functions properly using specific Nestjs decorators. Follow the instructions from top to bottom and make sure you refer to the official documentation [NestJs Controllers](https://docs.nestjs.com/controllers)
