
f = open("avaliacao.csv").readlines()
# lista com tudo por triplos, agr é preciso jsonificar e meter no mongo acho eu
list = []


for line in f:
    a = line.split(",")
    b = {a[0],a[1],a[2]}
    list.append(b)
    print(b)

print(list)
