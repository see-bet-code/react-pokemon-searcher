import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  state = {
    "name": "",
    "hp": -1,
    "sprites": {
      "front": "",
      "back": ""
    }
  }

  handleChange = (e) => {
    if (Object.keys(this.state).includes(e.target.name)) {
      this.setState({[e.target.name]: e.target.value});
    } else {
      this.setState( {sprites: {...this.state.sprites, [e.target.name]: e.target.value}})
    }

  }
  
  handleSubmit = (e) => {
    console.log("submitting form...")
    e.preventDefault()
    this.props.addToCollection(this.state)
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal" onChange={this.handleChange}>
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
