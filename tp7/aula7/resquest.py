import requests

resp = requests.get('http://localhost:3005/api/casamentos?byAno=true')
print(resp.json())