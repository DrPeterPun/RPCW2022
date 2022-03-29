import re
f = open('arqspn.json','r')
lines = f.readlines()
w = open('dataset.json','w')
w.write("{\"musicas\" :[ ")
i=0
for l in lines:
    print(l)
    newl = re.sub("{\"prov",f"{{\"id\": {i},\"prov",l)
    w.write(newl+",")
    i+=1

w.write("]}")

