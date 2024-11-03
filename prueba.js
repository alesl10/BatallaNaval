let tablero = 6;
let abecedario = ["a", "b", "c", "d", "e", "f", "g", "h"]

for (let i = 1; i <= tablero; i++) {
    for (let j = 0; j < tablero; j++) {
        let coordenadas = {
            fila: i,
            columna: abecedario[j]
        }
        console.log(coordenadas)
    }
}
