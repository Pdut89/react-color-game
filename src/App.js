import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import ColorBox from './ColorBox';
import NewButton from './NewButton';
import './App.css';


let getColorArray = () => {
  let prevColor
  let colorBoxes = Array(16).fill().map((item, index) => {
    let color = prevColor
    if (index % 2 === 0) {
      color = '#' + Math.floor(100000 + Math.random() * 900000).toString()
      prevColor = color
    }
    return {
      id: index,
      status: 'locked',
      color: color
    }
  })
  colorBoxes = shuffle(colorBoxes)
  return colorBoxes
}


class App extends Component {

  /// Constructor
  constructor(props) {
    super(props);

    let colorBoxes = getColorArray()

    this.state = {
      colorBoxes
    }
    this.updateBoxState = this.updateBoxState.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
  };

  startNewGame(e) {
    let colorBoxes = getColorArray()
    console.log(colorBoxes)
    console.log({colorBoxes})

    this.setState({colorBoxes})
  }

  /// Click handler
  updateBoxState = (e) => {

    let currentSelection
    let prevArr = this.state.colorBoxes.map(item => {
      if(item.id.toString() === e.target.id){
        currentSelection = item
      }
      return item
    })

    let previousSelection = prevArr.filter(item => {
      return item.status === "temp"
    })
    let colorBoxes

    if(previousSelection.length > 0){
      colorBoxes = prevArr
      if(previousSelection[0].color === currentSelection.color) {
        colorBoxes.forEach((item) => {
          item.color === currentSelection.color ? item.status = 'solved': {}
        })
      } else {
        colorBoxes.forEach((item) => {
          if (item.status === 'temp' || item.id.toString() === e.target.id) {
            item.status = 'visible'
          } else if(item.status !== 'solved') {
            item.status = 'locked'
          }
        })
      }
    } else {
      colorBoxes = prevArr.map(item => {
        if(item.id.toString() === e.target.id){
          item.status = "temp"
        } else if(item.status !== 'solved'){
          item.status = "locked"
        }
        return item
      })
    }

    //  Set state
    this.setState({colorBoxes})
  }

  /// Render
  render() {
    const colorBoxes = this.state.colorBoxes.map(box => (
       <ColorBox
         key={box.id}
         id = {box.id}
         color={box.color}
         status={box.status}
         onBoxClick={(e) => this.updateBoxState(e)}
      />
    ))

    return (
      <div className="App">
        <div className='card-container'>
          {colorBoxes}
        </div>
        <NewButton startNewGame={this.startNewGame}/>
      </div>
    );
  }
}

export default App;
