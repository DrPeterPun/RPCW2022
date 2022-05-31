from flask import Flask
import requests
import os

f = open("chave-api-clav.txt")
apiKey = f.read()

app = Flask(__name__)

@app.route("/")
def index():
    html = """
    <html>
      <head>
        <title>My first Python Web App</title>
        <meta charset="utf8"/>
      </head>
      <body>
        <h3>Operações disponíveis:</h3>
        <ul>
            <li><a href="/entidades">Lista de Entidades</a></li>
            <li><a href="/classesN3">Lista de Processos de Negócio</a></li>
        </ul>
      </body>
    </html>
    """
    return html


@app.route("/entidades")
def entidades():
    apikey = apiKey
    r = requests.get('http://clav-api.di.uminho.pt/v2/entidades?apikey=' + apikey)
    entidades = r.json()

    html = """
    <html>
      <head>
        <title>My first Python Web App</title>
        <meta charset="utf8"/>
      </head>
      <body>
        <h3>Lista de Entidades</h3>
        <table>
          <tr>
            <th>Sigla</th><th>Designação</th><th>Id</id>
          </tr>
    """
    for e in entidades:
        html += f"""
        <tr><td>{e['sigla']}</td><td>{e['designacao']}</td><td>{e['id']}</td></tr>
        """

    html +="""
        </table>
      </body>
    </html>
    """
    return html

@app.route("/classesN3")
def classesN3():
    return "<h3>Esta é para tu fazeres...</h3>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3026)

      
