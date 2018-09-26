import React, { Component } from 'react';
import firebase from 'firebase'
import './App.css';

function cleanUrl(url){
  if(!url) return 'none'
  return url.replace('.', '').replace(':', '').replace('//', '')
}

const config = {
    apiKey: "AIzaSyAHaiGYmn1bEE_CJGNRxCzEppxZY4_3cEQ",
    authDomain: "grupo-de-pesquisa.firebaseapp.com",
    databaseURL: "https://grupo-de-pesquisa.firebaseio.com",
}

class App extends Component {

  state = {
    urls: ['string'],
    current: 0
  }

  coolors = {
    0: '#FBC164',
    1: '#F1CECD',
    2: '#ECE7E9',
    3: '#D0E3E8',
  }

  currentItem = null

  style(index = 3){
    return {
      background: this.coolors[index]
    }
  }

  async componentDidMount(){

    firebase.initializeApp(config)

    const database = firebase.database()

    const rootURLS = database.ref('urls')
    this.currentItem = database.ref('current')
    this.counted = database.ref('count')

    const currentItemResult = await this.currentItem.once("value", snap => snap.val())
    const urlsResults = await rootURLS.once("value", snap => snap.val())

    const current = currentItemResult.val()
    const urls = urlsResults.val().filter(e => e)
    const newCurrent = current < 2 ? current + 1 : 0

    const countedChild = cleanUrl(urls[newCurrent])
    const countedChildExist = await this.counted.child(countedChild).once("value")
    .then( snapshot => snapshot.exists() )

    const countedChildValue = await this.counted.child(countedChild).once("value", snapshot => snapshot.val() )
    const addCountValue = countedChildExist ? countedChildValue.val() + 1 : 1

    this.setState({
      current: newCurrent,
      urls
    })

    this.currentItem.set(newCurrent)
    this.counted.child(countedChild).set(addCountValue)

  }

  render() {

    const {current, urls} = this.state


    if(urls[current] !== 'string'){
      window.location = urls[current]
    }


    return (
      <div className="App" style={this.style(current)}>
        <header className="App-header">
          <h1 className="App-title">Hello </h1>
        </header>
      </div>
    );
  }
}

export default App;
