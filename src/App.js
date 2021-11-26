import React from "react";
import PokemonCard from "./components/PokemonCard";
import Team from "./components/Team";
import "./App.css"

class App extends React.Component {
  constructor(){
    super();
    this.state={
      pokemons:[],
      recentPokemons:[],
      teamPokemons:[],
      selectedPokemon:"",
      pokeInfo:{}
      
    }
  }
  handleSubmit=(e)=>{
    e.preventDefault();
  }
  getData=(pokeInfo)=>{
    if(this.state.recentPokemons.every(poke=>poke.pokemonName!==pokeInfo.pokemonName)){
      this.setState({pokeInfo, recentPokemons:[...this.state.recentPokemons,pokeInfo]});
    }
  }
  handleChange=(e)=>{
    this.setState({
      selectedPokemon:e.target.value
    })
  }
  handleAddToTeam=()=>{
    if(this.state.teamPokemons.every(poke=>poke.pokemonName!==this.state.pokeInfo.pokemonName)){
      this.setState({
        teamPokemons:[...this.state.teamPokemons,this.state.pokeInfo]
      })
    }

  }

  handleRemoveFromTeam=()=>{
    this.setState({
      teamPokemons:[],
      selectedPokemon:"",
      pokeInfo:{}
    })

  }

  componentDidMount=()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
          .then(response=>response.json()).then(data=> this.setState({pokemons:data.results}));
    
  }


  render() { 
    return (
      <div className="container">
        <section className="top">
          <h1>Pokemons Teams</h1>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.selectedPokemon} onChange={this.handleChange}>
              {this.state.pokemons.map((pokemon,i)=>(<option key={"key"+i} value={pokemon.name}>{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</option>))}       
            </select>
          </form>
          <PokemonCard selectValue={this.state.selectedPokemon} getData={this.getData}/>
          <button onClick={this.handleAddToTeam} id="add">Add</button>
          <button onClick={this.handleRemoveFromTeam} id="clear">Clear</button>
        </section>
        <section className="team">
          <h1>Team</h1>
          {this.state.teamPokemons.map(pokeInfo=> <Team key={pokeInfo.id} pokeInfo={pokeInfo}/>)}
        </section>
        <section className="evolution">
          <h3>Evolutions</h3>
        </section>
        <section className="recent">
          <h3>Recent</h3>
          {this.state.recentPokemons.map(pokeInfo=> <Team key={pokeInfo.id} pokeInfo={pokeInfo}/>)}
        </section>
      </div>
    );
  }
}
 
export default App;
