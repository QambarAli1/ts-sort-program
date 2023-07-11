import fs from "fs";
import path from "path";
import readline from 'readline'

interface INumberList {
  sort: (order: 'ascending' | 'descending') => void;
  readFromFile: (filename: string, seperator: string) => void;
  writeInFile: (outputFile: string, numsArr: number[]) => void;
}


class NumberList implements INumberList {
  private numbers: number[] = [];
  constructor(filename: string, seperator: string) {
    this.readFromFile(filename, seperator);
  }

  getNumberArr() {
    return this.numbers
  }

  // sort numbers using bubblesort
  BubbleSort() {
    try {
      const n = this.numbers.length;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j <= n - 2 - i; j++) {
          if (this.numbers[j] > this.numbers[j + 1]) {
            let temp = this.numbers[j];
            this.numbers[j] = this.numbers[j + 1];
            this.numbers[j + 1] = temp;
          }
        }
      }
    } catch (error) {
      console.log("Error")
      throw error;
    }
  }

  // sort numbers usign JS method
  sort(order: 'ascending' | 'descending') {
    if (this.numbers.length) {
      if (order === 'ascending') {
        // sort in ascending order
        this.numbers = this.numbers.sort((a, b) => a - b);
      }
      else if (order === 'descending') {
        // sort in descending order
        this.numbers = this.numbers.sort((a, b) => b - a);
      }
    } else {
      console.log("Enter valid order ")
    }
  }

  readFromFile(filename: string, seperator: string) {
    try {
      // read file content
      const file = fs.readFileSync(path.join(__dirname, filename), "utf-8");
      // creates arr of by spliting file content with given separator statement
      const nums = file.split(seperator);
      // converts type of splitted array
      this.numbers = nums.map((num) => parseInt(num))
      // console.log('numbers_________qa ', this.numbers)
    } catch (error) {
      console.error(`Error Reading file: ${error}`);
      process.exit(1);
    }
  }

  writeInFile(outputFile: string, numsArr: number[]) {
    try {
      // converts numbers to string to write it in output file
      const numsString = numsArr.toString();
      // to write numbers as string in output file
      fs.writeFileSync(path.join(__dirname, outputFile), numsString);
    } catch (error) {
      // error handling
      console.error(`Error writing output file: ${error}`);
      process.exit(1);
    }
  }
}


function main() {
  const iostream = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // taking input filename along with extension from user and saving it in inputFileName
  iostream.question("Enter input file name with extension: ", inputFileName => {
    // taking input for seperator statement in file
    iostream.question("Enter seperator statement in file: ", seperatorStat => {
      const numbers = new NumberList(inputFileName, seperatorStat);
      // taking input for order of sorting 
      iostream.question("Enter Order: 1 for ascending 2 for descending ", order => {
        console.log('order ', order)
        numbers.sort(order === '1' ? 'ascending' : 'descending')
        // getter to get numbers which is a private variable of class 
        const numslist = numbers.getNumberArr();
        iostream.question("Enter input file name with extension ", outputFileName => {
          numbers.writeInFile(outputFileName, numslist)
          iostream.close();
        })
      })
    })
  })

  // const numbers = new NumberList("input.txt", ", ");
  // numbers.sort('ascending')
  // // numbers.BubbleSort();
  // const numslist = numbers.getNumberArr();
  // numbers.writeInFile('output.txt', numslist)
}

main();