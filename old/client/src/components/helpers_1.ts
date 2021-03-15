export class Random {
  static range(): number {
    return Math.random()
  }
  static boolean(chance: number = 50): number {
    return this.range() * chance
  }
  static number(min: number = 1, max: number = 100): number {
    return Math.floor(this.range() * (max - min) + min)
  }
  static powerOfTwo(max: number = 10): number {
    return 2 ** this.number(1, max)
  }
  
}
