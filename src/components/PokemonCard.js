import React from "react";
import "../main_css/pokemonCard.css"

class PokemonCard extends React.Component {
    constructor(){
        super();
        this.state={
            pokemonName:"",
            image:"",
            height:0,
            weight:0,
            type:"",
            id:0,
            hp:0,
            atk:0,
            def:0

        }
    }
    
    componentDidUpdate=()=>{
        if(this.props.selectValue!=="" &&this.state.pokemonName!==this.props.selectValue){
            const pokeUrl="https://pokeapi.co/api/v2/pokemon";
            fetch(`${pokeUrl}/${this.props.selectValue}`)
                .then(response=>response.json())
                    .then(pokeData=> {
                        let hp,atk,def;
                        for(let stat of pokeData.stats){
                            if(stat.stat.name==="hp") hp=stat.base_stat;
                            if(stat.stat.name==="attack") atk=stat.base_stat;
                            if(stat.stat.name==="defense") def=stat.base_stat;
                        }

                        this.setState({
                        
                            pokemonName:pokeData.name,
                            id:pokeData.id,
                            image:pokeData.sprites.front_default,
                            height:pokeData.height,
                            weight:pokeData.weight,
                            type:pokeData.types[0].type.name,
                            id:pokeData.id,
                            hp:hp,
                            atk:atk,
                            def:def
                        },()=> this.props.getData({pokemonName:pokeData.name,image:pokeData.sprites.front_default,}));
                    })

                    

        }
        
    }
    render() { 
        return (
            <div className="card">
                <section className="card-header">
                    <h2>Details</h2>
                    <img src={this.state.image} alt={this.state.pokemonName}/>
                </section>
                <section className="card-details">
                    <div>Name: {this.state.pokemonName}</div>
                    <div>Height: {this.state.height}</div>
                    <div>Weight: {this.state.weight}</div>
                    <div>Type: {this.state.type}</div>
                </section>
                <section className="card-attributs">
                    <h2>Base Attributs</h2>
                    <div>Hits Points: {this.state.hp}</div>
                    <div>Attack: {this.state.atk}</div>
                    <div>Defense: {this.state.def}</div>
                </section>
            </div>
        );
    }
}
 
export default PokemonCard;

