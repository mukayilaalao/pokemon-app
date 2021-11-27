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
      this.setState(preState=>  {
        return {teamPokemons:[...preState.teamPokemons,preState.pokeInfo]}
        
      })
    }

  }

  handleRemoveFromTeam=()=>{
    this.setState({
      teamPokemons:[],
      // selectedPokemon:"",
      // pokeInfo:{}
    })

  }
  format=(str)=>{
    if(str!=="") return str[0].toUpperCase()+str.slice(1);
}

  componentDidMount=()=>{
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
          .then(response=>response.json()).then(data=> this.setState({pokemons:data.results}));
    
  }


  render() { 
    let hp=this.state.teamPokemons.map(poke=>poke.hp).reduce((a,b)=>a+b,0);
    let atk=this.state.teamPokemons.map(poke=>poke.atk).reduce((a,b)=>a+b,0);
    let def=this.state.teamPokemons.map(poke=>poke.def).reduce((a,b)=>a+b,0);
    return (
      <div className="container">
        <section className="top">
          <h1>Pokemons Teams</h1>
          <form onSubmit={this.handleSubmit}>
            <select value={this.state.selectedPokemon} onChange={this.handleChange}>
              {this.state.pokemons.map((pokemon,i)=>(<option key={"key"+i} value={pokemon.name}>{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</option>))}       
            </select>
          </form>
          <PokemonCard selectValue={this.state.selectedPokemon} format={this.format} getData={this.getData}/>
          <button onClick={this.handleAddToTeam} id="add">Add</button>
          <button onClick={this.handleRemoveFromTeam} id="clear">Clear</button>
        </section>
        <section className="team">
          <h1>Team</h1>
          {this.state.teamPokemons.map(pokeInfo=> <Team key={pokeInfo.id} pokeInfo={pokeInfo} format={this.format}/>)}
          <div className="team-attributs">
                    <h2>Team Attributs</h2>
                    <div>Hits Points: {hp}</div>
                    <div>Attack: {atk}</div>
                    <div>Defense: {def}</div>
          </div>
        </section>
        <section className="evolution">
          <h3>Evolutions</h3>
        </section>
        <section className="recent">
          <h3>Recent</h3>
          {this.state.recentPokemons.map((pokeInfo,i)=> <Team key={"key"+i} pokeInfo={pokeInfo} format={this.format}/>)}
        </section>
      </div>
    );
  }
}
 
export default App;
