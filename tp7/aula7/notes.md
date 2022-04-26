[Arquivo Fichas Práticas](www4.di.uminho.pt/~jcr/AULAS/didac/RepFichas/site/fichas/pri-2021-normal.html)

--- 

# Docker

Verificar as imagens existentes:

    docker images

Colocar o docker a correr:
- **-p:** porta na qual o docker responde 
    - <porta da máquina nativa>:<porta no docker>
- **-v:** mapear volumes

```
docker run -d -p 27017:27017 --name mymongo -v ./data/db <id da imagem>
```

--- 

# Ficha Prática:

Para importar o dataset para o Mongo:

    mongoimport -d CurralDeFreiras -c casamentos --file casamentosFixed.json --jsonArray

Colocar o Mongo a correr na consola:

    mongo

Utilizar a base de dados:

    use <db name>

Ver as coleções da base de dados:

    show collections

Procurar os casamentos realizados em 1882:

    db.casamentos.find({date:/1882/})

**Nota:** o mongo aceita expressões regulares. Estas têm de ser escritas entre //, tal como em JavaScript.

Número de casamentos realizados em 1882:

    db.casamentos.find({date:/1882/}).count()

Número de casamentos de Franciscos:

    db.casamentos.find({title:/Francisco/}).count()

Títulos dos casamentos:

    db.casamentos.find({},{title:1, _id:0})


Nome dos noivos:


Sair do mongo:

    quit()

--- 

## Criar uma API de dados:

Criar projeto:

    express casamentos

Dependências base:

    npm i 

Instalar o mongoose:

    npm i mongoose --save 

Criar a pasta models e controllers dentro da diretoria da aplicação.

---

# Trabalho de Casa

Exercício 2 da ficha

---

# **Projeto:** Sistema de submissão de trabalhos práticos

Pensar num sistema com 3 atores:
- **produtor de informação:** envia informação para o sistema (processo de ingestão de informação)
- **consumidor:** pedidos de informação/consome informação (processo de disseminação ou publicação de conteúdos)
- **admin:** administração do sistema 

Pacotes de informação:
- SIP (submission information package) > formato BagIt
    - do produtor para o sistema 
- AIP (arquival information package)
    - armazenado no sistema
- DIP (dissimination information package)
    - do sistema para o consumidor

Grupos de 3 elementos (máximo)