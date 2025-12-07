# NestJs Workshop

## Modules

Modules are stand alone NestJs components that (generally speaking) have no knowledge of the outside. This means that you need to declare explicitly what its dependencies are as well as what it will expose to the outside.

To tell NestJs that a class is a module, you need to annotate it with the @Module decorator. This decorator takes in an object with the following optional parameters:

- imports: this is an array of all stand alone modules that the current module is dependent on
- providers: this is an array of all providers part of the current module.
- exports: this is an array of all providers declared on this module that may be used in another module that imports this module.

## Exercise 1:

- run the app using the command `npm run start:dev`
- Go to app.module.ts
- Notice that AppModule has no dependencies.
- Go to tasks.module.ts and add the relevant decorator.
- Go to app.module.ts and add TaskModule to AppModule
- Import TasksModule and declare that it is a dependency of AppModule
- Create another module with the name of your choosing
- Import this module in TasksModule
- Check in the logs if your module is being loaded
