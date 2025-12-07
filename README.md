# NestJs Workshop

## Providers

Providers are the building blocks of your application logic. They could be encapsulating services (that could call other services), repositories, domain logic etc. They are the working units inside modules. For now we will just explore the simple way of declaring and loading providers. Later we will look at how to declare and implement custom providers

## Exercise 1:

- run the dev server. Read the log
- It complains about a missing provider. We need to let NestJs know which class will be the provider
- Open tasks.module.ts
- Notice that the providers array is empty
- Open tasks.service.ts
- Declare TasksService to be a provider
- On save, notice that the error isnt going away
- Go to tasks.module.ts
- Add TasksService as provider and save
- The error disappears

We actually want to save what we are passing to the server and also retrieve it. We need another provider

- Open tasks.repository.ts
- Declare this class as a provider
- Go back to tasks.service.ts
- inject the TasksRepository in the class (hint: constructor) and save
- Check the logs: TasksRepository cannot be solved.
- Fix the problem (hint, declare it in tasks.module.ts)
- populate the function bodies of the server with the proper repository methods
- test the implementation
