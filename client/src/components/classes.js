// Constructor Pattern //
// Используйте для создания новых объектов в их собственной области видимости.
// var Person = function(name, age, favFood) {
//   this.name = name;
//   this.age = age;
//   this.favFood = favFood;
// };
// // Прототип позволяет всем экземплярам Person ссылаться на него без повторения функции.
// Person.prototype.greet = function() {
//   console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old, and my favorite food is ${this.favFood}`);
// // new создает объект {} и передает "this" в конструктор
// // Конструктор устанавливает значение для этого объекта и возвращает его.
// var bob = new Person('Bob', 22, 'Chicken');
// bob.greet();
// // Hello, my name is Bob, I'm 22 years old, and my favorite food is Chicken
// // ES6 / ES2015 Классы
// class Vehicle {
//   constructor(type, color) {
//     this.type = type;
//     this.color = color;
//   }
//   getSpecs() {
//     console.log(`Type: ${this.type}, Color: ${this.color}`);
//   }
// };
// var someTruck = new Vehicle('Truck', 'red');
// someTruck.getSpecs();

export class Note {
  constructor(char, octave = 2) {
    this.char = char
    this.octave = octave
  }

  get;
}
