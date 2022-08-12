export default class Chess {
    #chessElement
    
    #noRow
    #noCol
    #initialMap

    #isPlaying
    #turn

    #cells

    constructor(ElementId) {
        this.#importCss()

        this.#chessElement = document.querySelector(ElementId)

        this.#noRow = 8
        this.#noCol = 8
        this.#initialMap = [
            { color: 'black', type: 'rook', x: 0, y: 7 },
            { color: 'black', type: 'knight', x: 1, y: 7 },
            { color: 'black', type: 'bishop', x: 2, y: 7 },
            { color: 'black', type: 'queen', x: 3, y: 7 },
            { color: 'black', type: 'king', x: 4, y: 7 },
            { color: 'black', type: 'bishop', x: 5, y: 7 },
            { color: 'black', type: 'knight', x: 6, y: 7 },
            { color: 'black', type: 'rook', x: 7, y: 7 },
            { color: 'black', type: 'pawn', x: 0, y: 6 },
            { color: 'black', type: 'pawn', x: 1, y: 6 },
            { color: 'black', type: 'pawn', x: 2, y: 6 },
            { color: 'black', type: 'pawn', x: 3, y: 6 },
            { color: 'black', type: 'pawn', x: 4, y: 6 },
            { color: 'black', type: 'pawn', x: 5, y: 6 },
            { color: 'black', type: 'pawn', x: 6, y: 6 },
            { color: 'black', type: 'pawn', x: 7, y: 6 },
            { color: 'white', type: 'pawn', x: 0, y: 1 },
            { color: 'white', type: 'pawn', x: 1, y: 1 },
            { color: 'white', type: 'pawn', x: 2, y: 1 },
            { color: 'white', type: 'pawn', x: 3, y: 1 },
            { color: 'white', type: 'pawn', x: 4, y: 1 },
            { color: 'white', type: 'pawn', x: 5, y: 1 },
            { color: 'white', type: 'pawn', x: 6, y: 1 },
            { color: 'white', type: 'pawn', x: 7, y: 1 },
            { color: 'white', type: 'rook', x: 0, y: 0 },
            { color: 'white', type: 'knight', x: 1, y: 0 },
            { color: 'white', type: 'bishop', x: 2, y: 0 },
            { color: 'white', type: 'queen', x: 3, y: 0 },
            { color: 'white', type: 'king', x: 4, y: 0 },
            { color: 'white', type: 'bishop', x: 5, y: 0 },
            { color: 'white', type: 'knight', x: 6, y: 0 },
            { color: 'white', type: 'rook', x: 7, y: 0 },
            { color: 'white', type: 'king', x: 5, y: 5 },
        ]

        this.#isPlaying = false
        this.#turn = null

        this.#createCells()
        this.#createGame()
    }

    #importCss() {
        var link = document.createElement( "link" );
        // cant make dynamic link
        link.href = './chess/main.css';
        link.type = "text/css";
        link.rel = "stylesheet";

        document.getElementsByTagName( "head" )[0].appendChild( link );
    }

    #createGame() {
        this.#createFigures()
        this.#isPlaying = true
        this.#turn = 'white'
    }

    #createCells() {
        this.#cells = []
        for (var i = 0; i < this.#noRow; i++) {
            this.#cells[i] = []
            const row = document.createElement('div')
            row.classList = 'row'
            for (var j = 0; j < this.#noCol; j++) {
                const cell = document.createElement('div')
                cell.classList = 'cell'
                cell.dataset.x = i
                cell.dataset.y = j
                cell.onclick = (e) => this.onCellChoose(e.target)
                this.#cells[i][j] = cell
                row.append(cell)
            }
            this.#chessElement.append(row)
        }
    }

    #createFigures() {
        this.#initialMap.forEach((each) => {
            const cell = this.#cells[each.y][each.x]
            cell.dataset.color = each.color
            cell.dataset.type = each.type
            cell.dataset.hasFigure = true
        } )
    }

    #showAvailableMove(cell) {
        if(!(cell.dataset.hasFigure == 'true')) return
        switch(cell.dataset.type) {
            case 'king':
                this.#showKingAvailableMove(cell)
                break;
        }
    }

    #showKingAvailableMove(cell) {
        const cellX = parseInt(cell.dataset.x)
        const cellY = parseInt(cell.dataset.y)
        console.log('showKingAvailableMove', cellX, cellY)
        for(var x = cellX-1; x <= cellX+1; x++) {
            for(var y = cellY-1; y <= cellY+1; y++) {
                 console.log(x, y)
                if(x < 0 || x >= this.#noCol ||
                    y < 0 || y >= this.#noRow ||
                    (x == cellX && y == cellY)) continue
                if(!(this.#cells[x][y].dataset.hasFigure == 'true')) {
                    this.#cells[x][y].dataset.available = true
                }
            }
        }
    }
    
    onCellChoose(cell) {
        // console.log(cell)
        this.#showAvailableMove(cell)
    }

}