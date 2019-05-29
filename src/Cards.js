import React, {Component} from 'react'
import axios from 'axios';
import Card from './Card';
import './Cards.css';

class Cards extends Component{
    constructor(props){
        super(props);
        this.state = {deck: null, drawn: []};
        this.getCard = this.getCard.bind(this);
    }
    
    async componentDidMount(){
      let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
      console.log(res)
        this.setState({deck: res.data})
    }
    async getCard(){
       let id = this.state.deck.deck_id;
       try {
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/`)
        if(!res.data.success){
            throw new Error('No cards remaining :(')
         }
        let card = res.data.cards[0]
         this.setState(st =>({
           drawn: [...st.drawn, {id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}]
       }))

    } catch(err){
        alert(err)
    }

    }
    render(){
        const cards = this.state.drawn.map(c =>(
            <Card key={c.id} name={c.name} image={c.image}/>
        ))
        return (
            <div className='Deck'>
                <h1 className='Deck-title'>💎Card Dealer💎</h1>
                <h2 className='Deck-title subtitle'>💎A little demo made with React💎</h2>
                <button className='Deck-btn' onClick={this.getCard}>Get Card!</button>
                <div className='Deck-cardarea'>{cards}</div>
            </div>
        )
    }
}

export default Cards;