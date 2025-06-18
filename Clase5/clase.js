const condicion = true

if (condicion) {
    console.log('condicion verdadera')
} else {
    console.log('condicion falsa')
}


// Operador Ternario

condicion ? console.log('condicion verdadera') : console.log('condicion falsa')

const texto = condicion ? 'condicion es verdadera' : 'condicion es falsa'
console.log(texto)

let texto2 = 'condicion es falsa'
texto2 = condicion || "condicion es verdadera"
console.log(texto2)