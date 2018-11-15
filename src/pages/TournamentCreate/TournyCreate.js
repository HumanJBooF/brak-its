import React from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";
import API from "../../utils/API";


class TournCreate extends React.Component {

    state = {
       tournyName:     "",
       tournyType:     "",
       tournyDescript: "",
       tournySize:     "",
       tournyDate:     "",
        nameError:     "",
        typeError:     "",
        DescriptError: ""
       
    }

    //RegEx to remove all special charcters 
    //EXCEPT: spaces - dashes - underscores (allows upper, lower, and numeric)
    removeSpecials = RegExp(/^([a-zA-Z0-9_\s\-]*)$/)

    //handle click to grab the value of the drop-down clicked.
    handle_click = event => {
       // const chosenSize = event.currentTarget.dataset.id;
        this.setState({ tournySize: event.currentTarget.dataset.id });
        console.log(this.state.tournySize);
    }

    handle_validity = tournyInfo => {
        return ( tournyInfo.tournyName.length > 0)
            && (this.removeSpecials.test(tournyInfo.name))
            && (tournyInfo.tournyDescipt.length <= 250
                & tournyInfo.tournyDescipt.length > 0)
    }
    
    handle_submit = event => {
        event.preventDefault();
        this.handle_validity({
            tournyName:    this.state.tournyName,
            tournyDescrpt: this.state.tournyDescript,
            tournyType:    this.state.tournyType,
            tournySize:    this.state.tournySize
        })
    
 

        console.log(this.state)
        // ? API.create_tournament({
        //     tournyName: this.state.TournyName,
        //     tournyType: this.state.TournyType,
        //     tournyDescript: this.state.TournyDescript,
        //     tournyDate:     this.state.TournyDate
        // }).then(newTourny => {

        // })
    }

    handle_change = event => {
        event.preventDefault();
     
        const value = event.target.value;
        const name  = event.target.name;
        this.setState({ [name]: value });

        switch ( name ) {
            case 'TournyName':
             value.length > 3 
                && this.removeSpecials.test(value)
                    ? this.setState({ nameError: "proper Tournament name" })
                    : this.setState({ nameError: "Now that's not a proper name!" })
                break;
            case 'TournyType':
                value.length <= 35 & value.length > 3
                    ? this.setState({ typeError: "GAME ON!" })
                    : this.setState({ typeError: "You sure that's a real game?" })
                break;
            case 'TournyDescript':
                value.length <= 250 & value.length > 10
                    ? this.setState({ descriptError: "Very Descriptive" })
                    : this.setState({ descriptError: "Brevity is a virtue!" })
                break;
            default:
                //append something below the "form" to say invalid form"
                console.log('invalid form');
                break;
        }  
    }

    

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="row">
                        <form onSubmit={this.handle_submit} noValidate>
                            <input 
                                type="text" 
                                name="TournyName" 
                                id="tName" 
                                maxLength="50"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="tName">{this.state.nameError}</label>
                            
                            <input 
                                type="text" 
                                name="TournyType" 
                                id="tType" 
                                maxLength="35"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="tType">{this.state.typeError}</label>
                            
                            <textarea 
                                type="text"
                                name="TournyDescript"  
                                id="textarea"  
                                maxLength="250"
                                onChange={this.handle_change}
                            />
                            <label htmlFor="textarea">{this.state.descriptError}</label>

                            <input type="date" name="TournyDate" />
                            <label htmlFor="date">Select Tournament date</label>
                            <br /><br />

                            <a className='dropdown-trigger btn left' href='#' data-target='dropdown1'>Select Size</a>
                                <ul id='dropdown1' className='dropdown-content'>
                                    <li>
                                        <h4 
                                            className="center-align" 
                                            onClick={this.handle_click.bind(this)} 
                                            data-id="4"> 4
                                        </h4>
                                    </li>
                                    <li>
                                        <h4 
                                            className="center-align" 
                                            onClick={this.handle_click.bind(this)} 
                                            data-id="8"> 8
                                        </h4>
                                    </li>
                                    <li>
                                        <h4 
                                            className="center-align" 
                                            onClick={this.handle_click.bind(this)} 
                                            data-id="16"> 16
                                        </h4>
                                    </li>
                                    <li>
                                        <h4 className="center-align" 
                                            onClick={this.handle_click.bind(this)} 
                                            data-id="32"> 32
                                        </h4>
                                    </li>
                                </ul>
                            <button className="btn right" onClick={()=> console.log(`clicked`)} type="submit">Create Tournament!</button>
                        </form> 
                    </div>
                </Container>
            </>
        )
    }
}

export default TournCreate;