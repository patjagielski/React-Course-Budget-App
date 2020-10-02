//Object Destructuring

// const person = {
//     age: 22,
//     location: {
//         city: "Poland",
//         temp: "18"
//     }
// };

// const {name, age} = person;
//same as: const age = person.age & const name = person.name


// console.log(`${name} is an old ass motherfucker aka hes ${age}`);

// const {city, temp} = person.location;
// console.log(`It's ${temp} af here in ${city}`);

//rename
// const {city, temp: temperature} = person.location;
// console.log(`It's ${temperature} af here in ${city}`);

//default
// const {name = 'Anonymous', age} = person;
// console.log(`${name} is an old ass motherfucker aka hes ${age}`);

//rename and default
// const {name: firstName = 'Anonymous', age} = person;
// console.log(`${firstName} is an old ass motherfucker aka hes ${age}`);



// const book= {
//     title: 'Atlas Shrugged',
//     author: 'Ayn Rand',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'self publish'} = book.publisher;

// console.log(`${publisherName}`);



//Array Destructuring

// const address = ['1', '2', 'not'];

// const [one, two = '2222222', stringNot] = address;

// console.log(`This is a number ${one} and ${two}, but this is ${stringNot} one`);

// const item = ['Coffee (hot)', '$2.00', '$2.50','$2.75'];

// const [coffee, , price,] = item;

// console.log(`${coffee} costs ${price}`);