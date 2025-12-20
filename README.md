## How to Start the Project

### Option 1: Run with Docker
1. Make sure **Docker** is running on your machine.
2. Run the following command at the project root:

```bash
docker compose up --build
```
3. You can now visit http://localhost:3000 to check the result.

### Option 2: Local Run
1. Run the following command at the project root:
- service
   ```bash
     cd service
   ```
   ```bash
     npm i
   ```
   ```bash
     npm run dev
   ```
- clientSide
   ```bash
    cd clientSide
   ```
   ```bash
    npm i
   ```
   ```bash
    npm run dev
   ```
2. You can now visit http://localhost:3000 to check the result.


## How to Run Test
Run the following command at the project root:

- service
   ```bash
     cd service
   ```
   ```bash
     npm i (Only if not already installed locally during the 'Start the Project' step)
   ```
   ```bash
     npm run test
   ```
- clientSide
   ```bash
    cd clientSide
   ```
   ```bash
    npm i (Only if not already installed locally during the 'Start the Project' step)
   ```
   ```bash
    npm run test
   ```
