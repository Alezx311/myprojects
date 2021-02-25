// ! Формально КА определяется как пятёрка:

// A=(S,X,Y,\delta ,\lambda ),A=(S,X,Y,\delta ,\lambda ),
// где SS — конечное множество состояний автомата;
// X,YX,Y — конечные входной и выходной алфавиты соответственно, из которых формируются строки, считываемые и выдаваемые автоматом;
// \delta :S\times X\rightarrow S\delta :S\times X\rightarrow S — функция переходов;
// \lambda :S\times X\rightarrow Y\lambda :S\times X\rightarrow Y — функция выходов.
// Абстрактный автомат с некоторым выделенным состоянием s_{0),s_{0),, это состояние называют начальным состоянием, называется инициальным автоматом. Так как каждый КА имеет конечное число состояний, и любое из его состояний может быть назначено начальным состоянием, одному и тому же автомату соответствует NN инициальных автоматов, NN — число внутренних состояний КА. Таким образом, абстрактный КА определяет семейство инициальных автоматов. Если не указано начальное состояние, то поведение автомата всегда недетерминировано, выходное слово автомата зависит от начального состояния, поэтому полное детерминированное описание автомата будет[1]:

// A=(S,X,Y,\delta ,\lambda ,s_{0).A=(S,X,Y,\delta ,\lambda ,s_{0).
// Различают два класса КА: автоматы Мура — КА, у которых выходной сигнал зависит только от внутреннего состояния, по рисунку у автомата Мура нет связи от входа x(t)x(t) к функции выхода \lambda \lambda  и автоматы Мили — выходной сигнал зависит как от внутреннего состояния, так и от состояния входа.

//! M=(V,Q,q_{0},F,\delta ),}

// где V}V — входной алфавит (конечное множество входных символов), из которого формируются входные слова, воспринимаемые конечным автоматом;
// Q}Q — множество внутренних состояний;
// q_{0}}q_{0} — начальное состояние (q_{0}\in Q)}(q_{0}\in Q);
// F}F — множество заключительных, или конечных состояний (F\subset Q)}(F\subset Q);
// \delta }\delta  — функция переходов, определённая как отображение \delta \colon Q\times (V\cup \{\varepsilon \})\rightarrow Q}\delta \colon Q\times (V\cup \{\varepsilon \})\rightarrow Q}, такое, что \delta (q,a)=\{r\colon q\,\,{\underset {a}{\to }}\,\,r\}}\delta (q,a)=\{r\colon q\,\,{\underset {a}{\to }}\,\,r\}}, то есть значение функции переходов на упорядоченной паре (состояние, входной символ или пустая цепочка символов) есть множество всех состояний, в которые из данного состояния возможен переход по данному входному символу или пустой цепочке символов, обычно обозначаемой буквой \varepsilon .}\varepsilon .
// При анализе КА принято полагать, что конечный автомат начинает работу в некотором начальном состоянии q_{0}}q_{0}, последовательно получает по одному символу из входного слова (цепочки входных символов). Считанный символ может перевести автомат в новое состояние или не перевести в новое состояние в соответствии с функцией переходов.

// Получая входную цепочку символов x}x и делая переходы из состояния в состояние, автомат после получения последнего символа[прояснить]. входного слова окажется в некотором состоянии q'}q'}.

// Если это состояние является заключительным, то говорят, что автомат допустил слово x}x[прояснить]
import * as Teoria from 'teoria'
import * as Tone from 'tone'

export class Random {
  static range = (size = 2) => Math.random().toFixed(size)
  static number = (min = 1, max = 100) => this.range() * (max - min) + min
  static element = arr => arr.length && arr[this.number(0, arr.length)]
  static char = (from = 'abcdefg') => this.element([...from])
  static array = (size = 10) =>
    Array(size)
      .fill(1)
      .map(v => this.range())
  static values = (from, size = 10) => {
    const arr = this.array(size)
    if (!from) {
      return arr
    }
    return arr.map(v => this.element(from))
  }
}

export class Note {
  constructor(char, octave) {
    this.char = char
    this.octave = octave || 4
    this.note = `${this.char}${this.octave}`
  }
  get duration() {
    return this?.duration ?? '8n'
  }
  get velocity() {
    return this?.velocity ?? Math.random()
  }
  get time() {
    return this?.time ?? Tone.now()
  }
  get data() {
    return Teoria.note(this.note)
  }
  get arpeggio() {
    return this.data.chord().notes()
  }
  get midi() {
    return this.data.midi()
  }
  step(steps = 1) {
    if (typeof steps !== 'number') {
      throw new Error(`Invalid steps value ${steps}`)
    }

    return Teoria.note.fromMidi(this.midi + steps)
  }
}
export class Melody {
  constructor(notes, options) {
    if (!notes.length) {
      throw new Error(`Invalid notes array ${notes}`)
    }

    this.notes = notes
    this.size = notes.length
    this.key = options?.key ?? notes[0].char
    this.scale = options?.scale ?? 'minorpentatonic'
  }
  get like() {
    const scaleNotes = Teoria.note(this.key).scale(this.scale).simple()
    const notesToChange = Random.number(1, this.size)
    return Array
  }
  set scale(scaleName) {
    this.scale = scaleName
  }
}
export class Music {}

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
