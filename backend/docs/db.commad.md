That error means PostgreSQL **does not have a database role (user) named&#x20;**`medichannel_app`**&#x20;yet**. So, instead of changing its password, you need to create the role first.

You are likely connected to PostgreSQL through pgAdmin using another account, such as `postgres`.

## **Step 1 — Create the PostgreSQL user**

In pgAdmin, open **Query Tool** while connected to your PostgreSQL server, and execute:

```
CREATE ROLE medichannel_app WITH LOGIN PASSWORD 'medichannel_user';
```

This creates the user `medichannel_app` and sets the password.

## **Step 2 — Give the user access to the database**

If your database is named `medichannel`, run:

```
GRANT ALL PRIVILEGES ON DATABASE medichannel TO medichannel_app;
```

Then connect to the `medichannel` database itself and run:

```
GRANT ALL ON SCHEMA public TO medichannel_app;
```

If Hibernate needs to create tables, you can also set ownership (if appropriate for your development database):

```
ALTER DATABASE medichannel OWNER TO medichannel_app;
```

## **Step 3 — Verify your Spring Boot configuration**

Open:

`backend\src\main\resources\application.properties`

Ensure the database configuration matches:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/medichannel
spring.datasource.username=medichannel_app
spring.datasource.password=medichannel_user
```

If you use a different database password, make sure both PostgreSQL and this file contain exactly the same password.

## **Step 4 — Restart MediChannel**

In PowerShell, from your project directory:

```
mvn -f backend\pom.xml spring-boot:run
```

Expected result: PostgreSQL authentication should succeed, and Spring Boot should continue through Hibernate initialization to start Tomcat on port `8080`.

If another error appears, paste the next error here and we'll fix it step by step.