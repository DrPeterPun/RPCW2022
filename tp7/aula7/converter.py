import re
import json

def main():

    f = open("casamentos.json")
    nf = open("casamentosFixed.json", "w+", encoding='utf-8')

    lines = f.readlines()

    for line in lines:

        newLine = re.sub(r"ref:", '"_id":', line)

        if(newLine[-2] == '"' and "href" not in newLine):
            newLine = newLine + ",\n"

        if("_id" in newLine):
            newLine = re.sub("/", '_', newLine)

        nf.write(newLine)
    
if __name__ == "__main__":
    main()