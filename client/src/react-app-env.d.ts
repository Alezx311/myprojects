/// <reference types="react-scripts" />

declare module 'jsuseful' {
  const jsuseful = require('jsuseful');

  export const Random = jsuseful.Random;
  export const Constants = jsuseful.Constants;
  export const Values = jsuseful.Values;
  export const Check = jsuseful.Check;

  export default jsuseful;
}
declare module 'teoria' {
  const teoria = require('teoria');

  export default teoria;
}
