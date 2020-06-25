import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
            squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
        }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }   

        squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })

    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}



class Board extends React.Component {

    renderSquare(i) {
      return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  






function Square(props) {

    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}





function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);






// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

// const style = {
//   table: {
//     borderCollapse: 'collapse'
//   },
//   tableCell: {
//     border: '1px solid gray',
//     margin: 0,
//     padding: '5px 10px',
//     width: 'max-content',
//     minWidth: '150px'
//   },
//   form: {
//     container: {
//       padding: '20px',
//       border: '1px solid #F0F8FF',
//       borderRadius: '15px',
//       width: 'max-content',
//       marginBottom: '40px'
//     },
//     inputs: {
//       marginBottom: '5px'
//     },
//     submitBtn: {
//       marginTop: '10px',
//       padding: '10px 15px',
//       border:'none',
//       backgroundColor: 'lightseagreen',
//       fontSize: '14px',
//       borderRadius: '5px'
//     }
//   }
// }

// class PhoneBookForm extends Component {

//   state = {
//     userFirstName: '',
//     userLastName: '', 
//     userPhone: ''
//   }

//   handleChange = (e) => {
//     e.preventDefault()
//     this.setState({
//       [e.target.name]: [e.target.value]
//     })
//   }

//   handleSubmit = (e) => {
//     e.preventDefault()
//         // call function in Application component to add data to phoneBook
//     this.props.addEntry(this.state)   
//         this.setState({
//             userFirstname: '',
//             userLastname: '', 
//             userPhone: ''
//         })
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit.bind(this)} style={style.form.container}>
//         <label>First name:</label>
//         <br />
//         <input 
//           style={style.form.inputs}
//           className='userFirstname'
//           name='userFirstname' 
//           type='text'
//           placeholder='Coder'
//           value={this.state.userFirstname}
//           onChange={this.handleChange.bind(this)}
//         />
//         <br/>
//         <label>Last name:</label>
//         <br />
//         <input 
//           style={style.form.inputs}
//           className='userLastname'
//           name='userLastname' 
//           type='text' 
//           placeholder='Byte'
//           value={this.state.userLastname}
//           onChange={this.handleChange.bind(this)}

//         />
//         <br />
//         <label>Phone:</label>
//         <br />
//         <input
//           style={style.form.inputs}
//           className='userPhone' 
//           name='userPhone' 
//           type='text'
//           placeholder='8885559999'
//           value={this.state.userPhone}
//           onChange={this.handleChange.bind(this)}
//         />
//         <br/>
//         <input 
//           style={style.form.submitBtn} 
//           className='submitButton'
//           type='submit' 
//           value='Add User' 
//         />
//       </form>
//     )
//   }
// }

// function InformationTable(props) {
//   return (
//     <table style={style.table} className='informationTable'>
//       <thead> 
//         <tr>
//           <th style={style.tableCell}>First name</th>
//           <th style={style.tableCell}>Last name</th>
//           <th style={style.tableCell}>Phone</th>
//         </tr>
//       </thead> 



//       <tbody>
//         {props.phoneBook.map(entry => {
//             console.table(entry)
//           return (
//             <tr>
//               <td style={style.tableCell}>{entry.userFirstname}</td>
//               <td style={style.tableCell}>{entry.userLastname}</td>
//               <td style={style.tableCell}>{entry.userPhone}</td>
//             </tr>
//           )
//         })}
//       </tbody>
//     </table>
//   );

// }

// class Application extends Component {
//   state = {
//     phoneBook: []
//   }

//   addEntry = (data) => {
//     const added = this.state.phoneBook.concat(data)
//     this.setState({ 
//       phoneBook: added
//     })
//   }

//   render() {
//     return (
//       <section>
//         <PhoneBookForm addEntry={this.addEntry}/>
//         <InformationTable phoneBook={this.state.phoneBook}/>
//       </section>
//     );
//   }
// }

// ReactDOM.render(
//   <Application />,
//   document.getElementById('root')
// );



  