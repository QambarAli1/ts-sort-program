import fs from "fs";
import path from "path";


interface INumberList {
  sort: () => void;
  readFromFile: (filename: string, seperator: string) => void;
  writeInFile: (outputFile: string, contents: string) => void;
}


class NumberList implements INumberList {
  numbers: number[] = [];
  constructor(filename: string, seperator: string) {
    this.readFromFile(filename, seperator);
  }
  sort() {
    const sortedNums = this.numbers.sort((a, b) => a - b);
    console.log('sortedNums ', sortedNums);
  }

  readFromFile(filename: string, seperator: string) {
    try {
      const file = fs.readFileSync(path.join(__dirname, filename), "utf-8");
      const nums = file.split(seperator);
      this.numbers = nums.map((num) => Number(num))
      console.log('numbers_________qa ', this.numbers)
    } catch (error) {
      console.error(`Error Reading file: ${error}`);
      process.exit(1);
    }
  }

  writeInFile(outputFile: string) {
    try {
      const numsString = this.numbers.toString();
      fs.writeFileSync(path.join(__dirname, outputFile), numsString);
    } catch (error) {
      console.error(`Error writing output file: ${error}`);
      process.exit(1);
    }
  }
}


function main() {
  const numbers = new NumberList("input.txt", ", ");
  numbers.sort()
  numbers.writeInFile('output.txt')
}

main();