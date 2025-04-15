## Exercise 4: custom providers

### value provider

- create an .env file
- declare PORT as 8088 or any port you wish and test from now on on that port
- run `npm run dev`
- notice the error
- navigate to tasks-options.module.ts
- uncomment the import
- uncomment the commented provider object. Fill in the missing values
- save and test it using postman / insomnia (check the controller which path)
- comment what you have done in step 2 and declare a provider using a factory provider.

### provider value

Often we want to provide something dynamically. The most obvious use case is when it concerns environment variables, where certain (sensitive) information depend on which environment you are running. The useFactory pattern is the right pattern for this. The factory provider allows injection of other (known!) providers.

- add TASK_OPTIONS='task1FromEnv,task2FromEnv'
- go to app.module.ts
- notice that configModule is called in the imports array. forRoot means it is for the highest module in the tree. The option "isGlobal" makes it available for all other modules in app.module.
- navigate to task-options.provider.ts and use ConfigService to get the value of TASK_OPTIONS
- go back to task-options.module and declare the provider using a factory provider
- save and notice an error in the console. A dependency is missing. Can you fix it?
- save once resolved and test the endpoint (see controller which path) and notice the difference
