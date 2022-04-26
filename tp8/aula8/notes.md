# **CSS**

**Notas:** 
- Class em CSS significa classificador e não classe
- Podemos associar um id aos elementos do html e atribuir características a todos os elementos desse id
- span => inline | div => block
    - tanto o inline como o block apenas apresentam uma formatação distinta quando lhes associamos atributos

---

# **jQuery:**

$ = abreviatura para a função jQuery

Para fazer debugging:

- **1.ª opção:** No browser inspect > console
- **2.ª opção:** Utilizar o prevent no jQuery

---

# **TPC**

Inserir as opções editar e remover frases no exercício começado na aula
Para tal, podemos associar um botão de edição e remoção a cada linha.

Editar:
- carregar no botão editar
- colocar a frase a ser editada na caixa do formulário
- utilizador edita a frase conforme a sua preferência
- utilizador carrega no botão adicionar
- a frase é atualizada na lista de frases 

**Notas:** 
- é necessário associar um id a cada uma das frases
- é necessário fazer as atualizações na página, bem como no armazenamento persistente dos dados (em AJAX)
    - outra forma, sem recurso ao AJAX:
        ```
        $.put("acesspoint", {...})
        $.delete("acesspoint", {...})
        ```

myPara = API de dados

--- 
Start MongoDB:

```
brew services start mongodb/brew/mongodb-community     
```
