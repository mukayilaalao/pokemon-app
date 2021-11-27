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
                            hp:hp,
                            atk:atk,
                            def:def
                        },()=> this.props.getData({pokemonName:pokeData.name,image:pokeData.sprites.front_default,id:pokeData.id,hp,atk,def}));
                    })

                    

        }
        
    }
    render() { 
        const {image,pokemonName,type,weight,height,hp,atk,def}=this.state;
        return (
            <div className="card">
                <section className="card-header">
                    <h2>Details</h2>
                    <img src={image} alt={pokemonName}/>
                </section>
                <section className="card-details">
                    <div>Name: {this.props.format(pokemonName)}</div>
                    <div>Height: {height}</div>
                    <div>Weight: {weight}</div>
                    <div>Type: {type}</div>
                </section>
                <section className="card-attributs">
                    <h2>Base Attributs</h2>
                    <div>Hits Points: {hp}</div>
                    <div>Attack: {atk}</div>
                    <div>Defense: {def}</div>
                </section>
            </div>
        );
    }
}
 
export default PokemonCard;

