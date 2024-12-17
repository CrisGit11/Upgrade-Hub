/*
let age = 18;

if(age >= 18) {
    console.log('eres adulto');
} else {
    console.log('eres niño');
}

// > >= < <=
// == === != !==
// == Es que sea igual
// === Es que sea igual y del mismo tipo
let teacherName = 'Héctor';
if(teacherName == 'Héctor') {
    console.log('Que nombre más bonito');
} else {
    console.log('Cambiate el nombre a Héctor');
}

*/

// && and
// || or

// true && true = true
// true && false = false
// false && false = false
// true || true = true
// true || false = true
// false || false = false
let age = 15;
let teacherName = 'Héctor';
if(age >= 18 || teacherName === 'Héctor') {
    console.log('genial!');
} else {
    console.log('fatal!');
}