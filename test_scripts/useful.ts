// export type NoteCharModifier = '#' | 'b' | ''
// export type NoteChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
// export type NoteString = NoteChar & NoteCharModifier
// export type NoteOctave = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
// export type NoteIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

// export class Check {
//   array(arr: any[]): boolean {
//     return arr?.reduce(v => true)
//   }
//   number(v: number | number[]): boolean {
//     if (this.array(v)) {
//       return Array.from(new Set(...[v.map(this.number)])) === [true]
//     } else {
//       return typeof v === 'number'
//     }
//   }
//   numberValue(num: number, min = 0, max = 1000000): boolean {
//     this.number([num, min, max]) && num >= min && num <= max
//   }
// }

// export class Constants {
//   noteChars = []
// }

// export class Note {
//   constructor() {}

//   public fromIndex(index: NoteIndex): NoteChar {
//     return Constants.noteChars.[index]
//   }
// }

// import { Note } from './jsuseful'

//* WorkFlow ->
//* Track sliced to two parts ->
//* Playing first part
//* Get chroma values from second part ->
//* generate samples music from chroma values ->
//* when second part is coming, play track part and generated sounds ->
//* change volume with curve
//* track lower, sounds higher
//* at 3/4 of track length, only sound will be played

//? Dependencies
import fs, { promises as fsPromise } from 'fs'
import path from 'path'
// import sys from 'sys'
import { exec } from 'child_process'
import { NOTES } from './constants'

//? Types and Interfaces
export type NoteChroma = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
]
export type TrackChroma = NoteChroma[]
export type TrackValues = {
  chroma: NoteChroma[]
  rza?: number[]
}

//? Working with Files
export class FileSystem {
  public static extName(file): string {
    return path.extname(file)
  }

  public static resolvedPath(p: string, rootDir = __dirname): string {
    return path.resolve(rootDir, p)
  }

  public static async read(file: string): Promise<string> {
    const resolvedPath = FileSystem.resolvedPath(file)

    return await fsPromise.readFile(resolvedPath, { encoding: 'utf8' })
  }

  public static async check(file: string): Promise<boolean> {
    const resolvedPath = FileSystem.resolvedPath(file)
    const parentDir = path.dirname(resolvedPath)
    const content = await fsPromise.readdir(parentDir)

    return content.includes(file)
  }

  public static async write(file: string, data: string): Promise<void> {
    const resolvedPath = FileSystem.resolvedPath(file)

    return await fsPromise.writeFile(resolvedPath, data, 'utf8')
  }

  public static async append(file: string, data: string): Promise<void> {
    const resolvedPath = FileSystem.resolvedPath(file)

    return await fsPromise.appendFile(resolvedPath, data, 'utf8')
  }

  public static async create(file: string, data = `Created at ${new Date()}`): Promise<void> {
    return await this.write(file, data)
  }

  public static async readJson(file: string): Promise<any> {
    const data = await this.read(file)

    const json = JSON.parse(data)

    return json
  }

  public static async writeJson(file: string, data: any, opt?: any): Promise<void> {
    try {
      const { mode = 'overwrite', divider = '\t' } = opt

      const json = JSON.stringify(data, null, divider)

      if (mode === 'overwrite' || mode === 'create') {
        return await this.write(file, json)
      }

      if (mode === 'append') {
        return await this.append(file, json)
      }
    } catch (err) {
      return console.error(`Error ->> ${err?.message}`)
    }
  }
}

//? Working with bash script files
export class BashShell {
  public static toBashCommand(commandString: string): string {
    // return `bash ${commandString}`
    return `sh ${commandString}`
  }

  public static runBash(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const bashCommand = this.toBashCommand(command)

      console.debug(`${command} ->> ${bashCommand}`)

      exec(bashCommand, (err: Error, stdout, stderr) => {
        console.debug(`stdout ->> ${stdout}`)
        console.debug(`stderr ->> ${stderr}`)

        if (err) {
          const result = `Error: ${err?.message ?? err}`

          console.error(result)

          reject(result)
        }

        resolve(stdout)
      })
    })
  }

  public static async removeFile(file: string): Promise<string> {
    return this.runBash(`rm ${file}`)
  }
  public static async removeDir(dir: string): Promise<string> {
    return this.runBash(`rm -rf ${dir}`)
  }

  public static async convertToWav(track: string): Promise<string> {
    if (track.endsWith('.wav')) {
      return Promise.resolve(track)
    }

    await this.runBash(`ffmpeg -i ${track} ${track}.wav`)

    return `${track}.wav`
  }

  public static async trackValues(track: string): Promise<TrackValues> {
    const trackWav = await this.convertToWav(track)

    await this.runBash(`meyda ${track} --format="json" --o="${track}.json" chroma`)

    const data = await FileSystem.readJson(`${track}.json`)

    await this.removeFile(track)
    await this.removeFile(`${track}.json`)

    return data
  }
}

//? Working with values, small helpers for pretty code
export class Values {
  public static replaceByDict(str: string, dict: any): Promise<string> {
    const replaceWord = word => dict?.[word] ?? word
    const replaceRegExp = new RegExp(Object.keys(dict).join('|'), 'gim')

    return Promise.all(str.replace(replaceRegExp, replaceWord))
      .then(result => {
        return `${result}`
      })
      .catch(err => {
        console.error(`Error on replacing words: =>> ${err.message}`)
        return 'Error'
      })
  }

  public static replaceByIndexes(source: number[], indexes: string[]): string {
    return source.map(v => indexes?.[v] ?? v).join(' ')
  }

  public static isOdd(num: number): boolean {
    return num % 2 === 0
  }

  public static powerOfTwoCounter(num: number): number {
    if (num <= 1) {
      return num
    } else if (!Number.isFinite(num)) {
      console.error('Invalid number')
      return 0
    }

    for (let i = 1; i < num; i++) {
      if (2 ** i > num) {
        return i
      }
    }
  }

  public static sliceToHalf(arr: any[]): any[] {
    if (!arr?.length) {
      return null
    }

    if (this.isOdd(arr.length)) {
      return arr.slice(0, arr.length / 2)
    } else {
      return arr.slice(0, arr.length / 2 + 1)
    }
  }

  public static sliceToParts(arr: any[]): any[] {
    const partSize = Math.floor(arr.length / this.powerOfTwoCounter(arr.length))

    return Array(partSize)
      .fill(partSize)
      .map((v, i) => {
        const startPoint = v + i
        const endPoint = startPoint + v

        return arr.slice(startPoint, endPoint)
      })
  }

  public static unicals(arr: any[]): any[] {
    return Array.from(new Set(...[arr]))
  }
}

//? Working with track chroma values
export default class Chroma {
  // constructor() {}

  public static parse(values: TrackValues): string[] {
    const { chroma = [] } = values

    if (!chroma?.length) {
      return null
    }

    const data = chroma
      .map((values, index) => ({ values, index }))
      .filter(a => Math.max(...a.values) > 0.7)
      .map(({ values, index }) => ({ values, index, chars: Values.replaceByIndexes(values, NOTES) }))
    const chars = data.map(({ chars }) => chars)
    const unicals = Values.unicals(chars).filter(v => typeof v === `number` || typeof v === `string`)
    const frequency = unicals.map(v => chroma.filter(a => a.includes(v))?.length ?? 0).sort((a, b) => a - b)
    const truthy = chroma.filter(a => Math.max(...a) > 0.8)
    const truthySize = truthy?.length ?? 0
    const parts = Values.sliceToParts(chroma)

    console.debug(`
data: ${data}
unicals: ${unicals}
chars: ${chars}
frequency: ${frequency}
truthy: ${truthy}
truthySize: ${truthySize}
parts: ${parts}
    `)

    return chars
  }
}

// ! Example Data
// {
//   "chroma": [
//       [
//           0.7674672133705354,
//           0.5958642367616908,
//           1,
//           0.7718304416167032,
//           0.533833976916087,
//           0.6859000779713385,
//           0.9277194790233902,
//           0.8601702558807908,
//           0.676727308493639,
//           0.8286570986888128,
//           0.806019368470473,
//           0.6577072465398248
//       ],
//       [
//           0.840745129900883,
//           0.6450645770767606,
//           0.8420870291964058,
//           0.7198968862405984,
//           0.5661815167405446,
//           0.6305513759392029,
//           1,
//           0.7901425706888674,
//           0.7046052598512326,
//           0.8783038913300013,
//           0.6096329549974764,
//           0.599724296675961
//       ],
//       [
//           0.8326798228804824,
//           0.6184639244494069,
//           0.811273815884611,
//           0.8121480481680082,
//           0.5925324591839783,
