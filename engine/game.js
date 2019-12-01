//Collaborator: Angelica Quintero

export default class Game {
    constructor(size) {
        this.size = size;
        this.gridSize = size * size;

        // these will be important for when values are pushed 
        //to the array 
        this.array = [];
        
        // Event Listeners to update State of the game
        this.moveListener = [];
        this.loseListener = [];
        this.winListener = [];

        function makeGrid(gridSize, array) {

            for (let i = 0; i < gridSize; i++) {
                array[i] = 0;
            }

            let int_num1 = Math.floor((Math.random() * gridSize));
            let int_num2 = Math.floor((Math.random() * gridSize));

            while (int_num2 == int_num1) {

                int_num2 = Math.floor((Math.random() * gridSize));

            }

            let ranNum = Math.random() < 0.9 ? 2 : 4;
            array[int_num1] = ranNum;
            ranNum = Math.random() < 0.9 ? 2 : 4;
            array[int_num2] = ranNum;

            return array;

        }

        this.gameState = {
            board: makeGrid(this.gridSize, this.array),
            score: 0,
            won: false,
            over: false
        };

        this.cells = [];
    }

    // pasteNewCell() {
    //     let cells = [];
    //     let nrows = 4
    //     let canvas = document.getElementById('canvas');
    //     let width = canvas.width / nrows - 6;
    //     function cell(row, coll) {
    //         this.value = 0;
    //         this.x = coll * width + 5 * (coll + 1);
    //         this.y = row * width + 5 * (row + 1);
    //     }
    //     function create() {
    //         for (let i = 0; i < nrows; i++) {
    //             cells[i] = [];
    //             for (let j = 0; j < nrows; j++) {
    //                 cells[i][j] = new cell(i, j);
    //             }
    //         }
    //     }
    //     create();
    //     for(let i=0; i<this.gameState.board.length; i++){
    //         let cellx = parseInt((String(i/4)));
    //         let celly = i%4;
    //         cells[cellx][celly].value = this.gameState.board[i];
    //     }
    //     this.drawAllCells(cells);
    //   }


    // drawAllCells(cells) {
    //     let nrows = 4
    //     let canvas = document.getElementById('canvas');
    //     let ctx = canvas.getContext('2d');
    //     //let scoreLabel = document.getElementById('score');
    //     let width = canvas.width / nrows - 6;
    //     let fontSize;

    //     function drawCell(cell) {
    //         ctx.beginPath();
    //         ctx.rect(cell.x, cell.y, width, width);
    //         switch (cell.value) {
    //             case 0: ctx.fillStyle = '#A9A9A9'; break;
    //             case 2: ctx.fillStyle = '#D2691E'; break;
    //             case 4: ctx.fillStyle = '#FF7F50'; break;
    //             case 8: ctx.fillStyle = '#ffbf00'; break;
    //             case 16: ctx.fillStyle = '#bfff00'; break;
    //             case 32: ctx.fillStyle = '#40ff00'; break;
    //             case 64: ctx.fillStyle = '#00bfff'; break;
    //             case 128: ctx.fillStyle = '#FF7F50'; break;
    //             case 256: ctx.fillStyle = '#0040ff'; break;
    //             case 512: ctx.fillStyle = '#ff0080'; break;
    //             case 1024: ctx.fillStyle = '#D2691E'; break;
    //             case 2048: ctx.fillStyle = '#FF7F50'; break;
    //             case 4096: ctx.fillStyle = '#ffbf00'; break;
    //             default: ctx.fillStyle = '#ff0080';
    //         }
    //         ctx.fill();
    //         if (cell.value) {
    //             fontSize = width / 2;
    //             ctx.font = fontSize + 'px Arial';
    //             ctx.fillStyle = 'white';
    //             ctx.textAlign = 'center';
    //             ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width / 7);
    //         }
    //     }
    //     for(let i = 0; i < nrows; i++) {
    //         for(let j = 0; j < nrows; j++) {
    //           drawCell(cells[i][j]);
    //         }
    //     }
    // }
    reset() {
        this.setupNewGame();
    }

    toString() {
        let array1 = [this.gameState.board[0], this.array[1], this.array[2], this.array[3]];
        let array2 = [this.array[4], this.array[5], this.array[6], this.array[7]];
        let array3 = [this.array[8], this.array[9], this.array[10], this.array[11]];
        let array4 = [this.array[12], this.array[13], this.array[14], this.array[15]];

        console.log(array1);
        console.log(array2);
        console.log(array3);
        console.log(array4);
    }

    setupNewGame() {
        function makeGrid(gridSize, array) {

            array.fill(0);

            let num1 = Math.floor((Math.random() * gridSize));
            // let cellx = parseInt((String(num1/4)));
            // let celly = num1%4;
            let num2 = Math.floor((Math.random() * gridSize));
            while (num1 == num2) {
                num2 = Math.floor((Math.random() * gridSize));
            }

            let ranNum = Math.random() < 0.9 ? 2 : 4;
            array[num1] = ranNum;
            // cells[cellx][celly].value = ranNum;
            //console.log(cells[cellx][celly].value);
            //     this.drawAllCells(cells);
            //   }
            // cellx = parseInt((String(num2/4)));
            // celly = num2%4;
            ranNum = Math.random() < 0.9 ? 2 : 4;
            array[num2] = ranNum;
            // cells[cellx][celly].value = ranNum;

            return array;

        }

        this.gameState = {
            board: makeGrid(this.gridSize, this.array),
            score: 0,
            won: false,
            over: false
        };
        //this.drawAllCells(cells);
        //this.toString();
    }

    loadGame(gameState) {
        this.gameState.board = gameState.board;
        this.gameState.score = gameState.score;
        this.gameState.won = gameState.won;
        this.gameState.over = gameState.over;
    }

    onMove(callback) {
        this.moveListener.push(callback);
    }

    onWin(callback) {
        this.winListener.push(callback);
    }

    onLose(callback) {
        this.loseListener.push(callback);
    }

    getGameState() {
        return this.gameState;
    }



    move(direction) {

        if (this.gameState.won = false) {
            for (let i = 0; i < this.loseListener.length; i++) {
                this.loseListener[i](this.gameState);
            }
        }

        if (this.gameState.won) {
            for (let i = 0; i < this.winListener.length; i++) {
                this.winListener[i](this.gameState);
            }
        }


        let check = false; //used to check if merge of numbers is needed

        switch (direction) {

            case 'up':
                for (let x = 0; x < this.size; x++) {
                    for (let i = 0; i <= (this.size - 1); i++) {
                        for (let j = i; j < i + (this.size * (this.size - 1)); j = j + this.size) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j + this.size] != 0) {
                                    check = true;
                                }

                                (this.gameState.board)[j] = (this.gameState.board)[j + this.size];
                                (this.gameState.board)[j + this.size] = 0;
                            }
                        }
                    }
                }
                for (let j = 0; j < this.size; j++) {
                    let i = j;

                    while (i < j + (this.size * (this.size - 1))) {
                        if ((this.gameState.board)[i] == (this.gameState.board)[i + this.size]) {
                            if (this.gameState.board[i] != 0) {
                                check = true;
                            }

                            (this.gameState.board)[i] = (this.gameState.board)[i] * 2;
                            this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                            (this.gameState.board)[i + this.size] = 0;
                            i = i + (this.size * 2);
                        }
                        else {
                            i = i + this.size;
                        }
                    }
                }

                for (let x = 0; x < this.size; x++) {
                    for (let i = 0; i <= (this.size - 1); i++) {
                        for (let j = i; j < i + (this.size * (this.size - 1)); j = j + this.size) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j + this.size] != 0) {
                                    check = true;
                                }

                                (this.gameState.board)[j] = (this.gameState.board)[j + this.size];
                                (this.gameState.board)[j + this.size] = 0;
                            }
                        }
                    }
                }
                break;

            case 'down':
                for (let x = 0; x < this.size; x++) {
                    for (let i = this.gridSize - 1; i >= this.size * (this.size - 1); i--) {
                        for (let j = i; j > i - (this.size * (this.size - 1)); j = j - this.size) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j - this.size] != 0) {
                                    check = true;
                                }
                                (this.gameState.board)[j] = (this.gameState.board)[j - this.size];
                                (this.gameState.board)[j - this.size] = 0;
                            }
                        }
                    }
                }

                for (let j = this.gridSize - 1; j >= this.gridSize - this.size; j--) {
                    let i = j;

                    while (i > j - (this.size * (this.size - 1))) {
                        if ((this.gameState.board)[i] == (this.gameState.board)[i - this.size]) {
                            if ((this.gameState.board)[i] != 0) {
                                check = true;
                            }

                            (this.gameState.board)[i] = (this.gameState.board)[i] * 2;
                            this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                            (this.gameState.board)[i - this.size] = 0;
                            i = i - (this.size * 2);
                        }
                        else {
                            i = i - this.size;
                        }
                    }
                }

                for (let x = 0; x < this.size; x++) {
                    for (let i = this.gridSize - 1; i >= this.size * (this.size - 1); i--) {
                        for (let j = i; j > i - (this.size * (this.size - 1)); j = j - this.size) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j - this.size] != 0) {
                                    check = true;
                                }
                                (this.gameState.board)[j] = (this.gameState.board)[j - this.size];
                                (this.gameState.board)[j - this.size] = 0;
                            }
                        }
                    }
                }
                break;

            case 'left':
                for (let x = 0; x < this.size; x++) {
                    for (let i = 0; i <= this.size * (this.size - 1); i = i + this.size) {
                        for (let j = i; j < i + this.size - 1; j++) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j + 1] != 0) {
                                    check = true;
                                }
                                (this.gameState.board)[j] = (this.gameState.board)[j + 1];
                                (this.gameState.board)[j + 1] = 0;
                            }
                        }
                    }
                }

                for (let j = 0; j <= this.gridSize - this.size; j = j + this.size) {
                    let i = j;
                    while (i < j + this.size - 1) {
                        if ((this.gameState.board)[i] == (this.gameState.board)[i + 1]) {
                            if ((this.gameState.board)[i] != 0) {
                                check = true;
                            }
                            (this.gameState.board)[i] = (this.gameState.board)[i] * 2;
                            this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                            (this.gameState.board)[i + 1] = 0;
                            i = i + 2;
                        }
                        else {
                            i = i + 1;
                        }
                    }
                }

                for (let x = 0; x < this.size; x++) {
                    for (let i = 0; i <= this.size * (this.size - 1); i = i + this.size) {
                        for (let j = i; j < i + this.size - 1; j++) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j + 1] != 0) {
                                    check = true;
                                }
                                (this.gameState.board)[j] = (this.gameState.board)[j + 1];
                                (this.gameState.board)[j + 1] = 0;
                            }
                        }
                    }
                }
                break;

            case 'right':
                for (let x = 0; x < this.size; x++) {
                    for (let i = this.gridSize - 1; i >= this.size - 1; i = i - this.size) {
                        for (let j = i; j > i - this.size + 1; j--) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j - 1] != 0) {
                                    check = true;
                                }

                                (this.gameState.board)[j] = (this.gameState.board)[j - 1];
                                (this.gameState.board)[j - 1] = 0;
                            }
                        }
                    }
                }

                for (let j = this.gridSize - 1; j >= this.size - 1; j = j - this.size) {
                    let i = j;
                    while (i > j - this.size + 1) {
                        if ((this.gameState.board)[i] == (this.gameState.board)[i - 1]) {
                            if ((this.gameState.board)[i] != 0) {
                                check = true;
                            }
                            (this.gameState.board)[i] = (this.gameState.board)[i] * 2;
                            this.gameState.score = (this.gameState.score) + (this.gameState.board)[i];
                            (this.gameState.board)[i - 1] = 0;
                            i = i - 2;
                        }
                        else {
                            i = i - 1;
                        }
                    }
                }

                for (let x = 0; x < this.size; x++) {
                    for (let i = this.gridSize - 1; i >= this.size - 1; i = i - this.size) {
                        for (let j = i; j > i - this.size + 1; j--) {
                            if ((this.gameState.board)[j] == 0) {
                                if ((this.gameState.board)[j - 1] != 0) {
                                    check = true;
                                }
                                (this.gameState.board)[j] = (this.gameState.board)[j - 1];
                                (this.gameState.board)[j - 1] = 0;
                            }
                        }
                    }
                }
                break;
        }
        for (let i = 0; i < this.gridSize; i++) {
            if (this.gameState.board[i] == 2048) {
                this.gameState.won = true;
            }
        }

        if (check == true) {
            let mergeI = Math.floor((Math.random() * this.gridSize));

            while (this.gameState.board[mergeI] != 0) {
                mergeI = Math.floor((Math.random() * this.gridSize));
            }

            let ranNum = Math.random() < 0.9 ? 2 : 4;
            this.gameState.board[mergeI] = ranNum;
            //this.pasteNewCell();
            //this.toString();
        }

        let boolean = true;

        for (let i = 0; i < this.gridSize; i++) {
            if (this.gameState.board[i] == 0) {
                boolean = false;
            }
            if (boolean) {
                for (let i = 0; i <= this.gridSize - this.size; i = i + this.size) {
                    for (let j = 0; j < this.size - 1; j++) {

                        if (this.gameState.board[i + j] == this.gameState.board[i + j + 1]) {
                            boolean = false;

                        };
                    }
                }
                for (let i = 0; i < this.size; i++) {
                    for (let j = 0; j < i + (this.gridSize - this.size); j = j + this.size) {
                        if (this.gameState.board[i + j] == this.gameState.board[i + j + this.size]) {
                            boolean = false;
                        };
                    }
                }
            }
        }

        if (boolean) {
            this.gameState.over = true;
        }

        for (let i = 0; i < this.moveListener.length; i++) {
            this.moveListener[i](this.gameState);
        }

        if (this.gameState.over) {
            for (let i = 0; i < this.loseListener.length; i++) {
                this.loseListener[i](this.gameState);
            }
        }

        if (this.gameState.won) {
            for (let i = 0; i < this.winListener.length; i++) {
                this.winListener[i](this.gameState);
            }
        }
    }
    
};

// this.document.onkeydown = function (event) {
//         if (event.keyCode === 38 || event.keyCode === 87) {
//             move("up"); 
//         } else if (event.keyCode === 39 || event.keyCode === 68) {
//             move("right");
//         } else if (event.keyCode === 40 || event.keyCode === 83) {
//             move("down"); 
//         } else if (event.keyCode === 37 || event.keyCode === 65) {
//             move("left"); 
//         }
//     //scoreLabel.innerHTML = 'Score : ' + score;
// };

