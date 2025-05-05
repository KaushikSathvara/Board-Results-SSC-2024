<!-- Migrate and Run command with prisma NextJS -->

# Migrate and Run command with prisma NextJS

To run the Prisma migration and start the Next.js application, you can use the following command:

```bash
npx prisma migrate dev && npm run dev
```

This command does the following:

1. `npx prisma migrate dev`: This command runs the Prisma migration in development mode. It applies any pending migrations to your database and generates the Prisma client.

2. `&&`: This operator ensures that the second command (`npm run dev`) only runs if the first command (`npx prisma migrate dev`) is successful.

<!-- To create tables  -->

3. `npm run dev`: This command starts the Next.js development server, allowing you to view your application in the browser.

## Create Tables

To create tables in your database using Prisma, you need to define your data model in the `schema.prisma` file. After defining your models, you can run the migration command to create the tables in your database.

### Example of a Prisma schema

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
  posts Post[]
}
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

### Run the migration command

After defining your models, you can run the migration command to create the tables in your database:

```bash
npx prisma migrate dev --name init
```
