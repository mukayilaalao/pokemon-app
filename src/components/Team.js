import React from "react";
class Team extends React.Component {

    render() { 
        const {image,pokemonName}=this.props.pokeInfo;
        return (
            <div className="team-member">
                <img src={image} alt={pokemonName}/>
                <span>{this.props.format(pokemonName)}</span>
            </div>
        );
    }
}
 
export default Team;