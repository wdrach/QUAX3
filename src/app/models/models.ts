export class Candle {
  time:   number;
  low:    number;
  high:   number;
  open:   number;
  close:  number;
  volume: number;

  constructor(input: Array<number>) {
    if (input.length === 6) {
      this.time   = input[0];
      this.low    = input[1];
      this.high   = input[2];
      this.open   = input[3];
      this.close  = input[4];
      this.volume = input[5];
    }
  }
};
