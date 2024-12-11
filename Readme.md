Aprenda Como Implementar Teste Unitário JEST na sua Aplicação NODE
------------------------------------------------------------------
npm init -y
yarn add typescript tsx prisma -D
npx tsc --init

npx prisma init --datasource-provider sqlite

yarn add jest -D
yarn add ts-node -D

npx jest --init