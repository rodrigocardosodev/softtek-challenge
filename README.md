# Desafio PISMO

Esta é uma aplicação que faz parte do processo admissional da **Softtek**, e nesta aplicação iremos criar um sistema de controle de caixa e o relatorio de fluxo diário, semanal e mensal.
Nela estaremos aplicando a arquitetura hexagonal proposta pelo Alistair Cockburn.
https://alistair.cockburn.us/hexagonal-architecture

# Como rodar o projeto?
**Antes de tudo, garanta que na sua máquina tenha o docker instalado.**

Segue as variaveis ambiente para rodar o projeto:
```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=
POSTGRES_HOST=
```

Para rodar o projeto basta executar o seguinte comando:
```bash
make run-dev
```
Caso deseje derrubar os conteineres levantandos pelo comando acima, basta executar o seguinte comando:
```bash
make stop-dev
```

# Endpoints

**GET** - /transactions -> Retorna todas as transações realizadas
Retorno da requisição:
```json
[
    {
        "id": 1,
        "amount": "-123.12",
        "operation_type": "debit",
        "event_date": "2023-05-21T13:20:20.813Z"
    },
    {
        "id": 2,
        "amount": "123.12",
        "operation_type": "credit",
        "event_date": "2023-05-21T13:20:37.550Z"
    }
]
```
**POST** - /transactions -> Cria uma nova transação
Corpo da requisição:
```json
{
    "amount": 123.12,
    "operationType": "credit"
}
```
Resposta da requisição:
```json
{
    "id": 2,
    "amount": "123.12",
    "operation_type": "credit",
    "event_date": "2023-05-21T13:20:37.550Z"
}
```
**GET** - /balance -> Retorna o total transacionado no dia, na semana e no mês
Resposta da requisição:
```json
{
    "dailyBalance": "0.00",
    "weeklyBalance": "0.00",
    "monthlyBalance": "0.00",
    "totalBalance": "0.00"
}
```

# Como rodar os testes?
Os comandos para execução de testes estão separados entre os testes unitários e os testes de integração.

Para rodar os testes unitários basta executar o seguinte comando:
```bash
make test
```
# Tecnologias utilizadas
 - Banco de dados postgres
 - NodeJS/TypeScript
 - Docker

# Dependencias da aplicação
- express v4.18.1
- express-async-errors v3.1.1
- pg v8.11.0
- zod v3.21.4

# Dependencias de desenvolvimento
@types/express v4.17.17
@types/jest v29.5.1
@types/node v20.2.1
@types/pg v8.6.6
jest v29.5.0
ts-jest v29.1.0
ts-node-dev v2.0.0
tsc v2.0.4
typescript v5.0.4

# Distribuição das pastas

```
.
├── Dockerfile
├── Makefile
├── README.md
├── docker-compose.yml
├── jest.config.js
├── migrations
│   ├── 000001_create_transaction_table.down.sql
│   └── 000001_create_transaction_table.up.sql
├── package.json
├── src
│   ├── adapters
│   │   ├── primary
│   │   │   └── http
│   │   │       ├── balance
│   │   │       │   └── index.ts
│   │   │       └── transaction
│   │   │           └── index.ts
│   │   └── secondary
│   │       └── postgres
│   │           ├── balance
│   │           │   └── index.ts
│   │           ├── config
│   │           │   └── index.ts
│   │           └── transaction
│   │               └── index.ts
│   ├── application
│   │   ├── dtos
│   │   │   ├── balance.dto.ts
│   │   │   └── transaction.dto.ts
│   │   ├── enums
│   │   │   └── operations.enum.ts
│   │   ├── errors
│   │   │   └── index.ts
│   │   ├── mocks
│   │   │   └── repository
│   │   │       ├── balance.repository.mock.ts
│   │   │       └── transaction.repository.mock.ts
│   │   ├── models
│   │   │   ├── balance.model.ts
│   │   │   └── transaction.model.ts
│   │   ├── ports
│   │   │   ├── balance.port.ts
│   │   │   └── transaction.port.ts
│   │   └── services
│   │       ├── balance.service.spec.ts
│   │       ├── balance.service.ts
│   │       ├── transaction.service.spec.ts
│   │       └── transaction.service.ts
│   ├── cmd
│   │   └── api
│   │       └── index.ts
│   ├── middlewares
│   │   └── error.handler.middleware.ts
│   └── validators
│       └── index.ts
├── tsconfig.json
└── yarn.lock
```
