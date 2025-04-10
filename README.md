# NestJs Workshop

## Exercise 2:

- run the app using the command `npm run start:dev`
- Go to app.module.ts
- Notice that AppModule has TasksModule as imported module.
- Go to TasksModule and notice that the module decorator is empty
- Declare TasksController as a controller on the TasksModule
- Save and notice the error in the terminal. Can you fix this? (hint: go to tasks.controller.ts)
- Save the solution and notice in the terminal that TasksController is initialised
- Go to TasksController and notice 2 methods. They are not hooked to a path yet.
- Use the appropriate decorator for "getTasksBycreator"
- Do not save yet; first inspect the terminal.
- Then save, notice that "LOG [RouterExplorer] Mapped {/tasks, GET} route" has been added to the console logs
- Try out the endpoint using Postman / Insomnia / your browser
- For getTaskById, see if you can declare a route that takes in a param as argument. How do you extract the param from the route? (hint: @Param)
