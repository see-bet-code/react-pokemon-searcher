import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const POKEMON_URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {
  state = {
    collection: [],
    totalCollection: []
  }

  fetchAllPokemon = () => {
    fetch(POKEMON_URL)
    .then(response => response.json())
    .then(pokes => this.setState({ collection: pokes, totalCollection: pokes }))
  }

  componentDidMount()  {
    this.fetchAllPokemon()
  }

  searchCollection = value => {
    let curr = [...this.state.totalCollection]
    if (value !== "") {
      curr = curr.filter( p => p.name.startsWith(value))
    }
    this.setState({ collection: curr})
  }

  addToCollection = pokemon => {
    fetch(POKEMON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
    .then(newPokemon => this.setState({ collection: [...this.state.collection, newPokemon],
      totalCollection: [...this.state.collection, newPokemon]}))
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addToCollection={this.addToCollection}/>
        <br />
        <Search search={this.searchCollection}/>
        <br />
        <PokemonCollection collection={this.state.collection}/>
      </Container>
    )
  }
}

export default PokemonPage
