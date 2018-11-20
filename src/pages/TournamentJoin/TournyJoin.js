import React from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
// import Card from '../../components/Card';
import Navbar from '../../components/Navbar'
import styles from './JoinStyles';
import API from '../../utils/API';

class TournyJoin extends React.Component {

    state = {
        btn: 'Join Tournament!',
        tournyName: '',
        tournyType: '',
        dateOf: '',
        timeOf: '',
        players: [],

    }

    handle_click = () => {

    }

    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="row"style={styles.cardCol} >
                        <div className="col s12 m9" >
                            <div className="card blue-grey darken-1" style={styles.card} >
                                <div className="card-content white-text">
                                    <span className="card-title center-align truncate">Tournament Info</span>
                                    {/* this is mock data, will be changed for the states of the data we grab */}
                                    <p>Name: name.name</p>
                                    <p>type: type.type</p>
                                    <p>date: date.date</p>
                                    <p>Time: time.time</p>
                                </div>
                            </div>
                        </div>

                        <div className="col s12 m3" >
                            <ul className="collection" style={styles.collect}>
                                <li className="center-align">Player List</li>
                                {/* map goes here --> again jsut testing w/ mock data, to see how it fits  */} 
                                <li className="collection-item">DragonSlayer69</li>
                                <li className="collection-item">RamenBasedGod</li>
                                <li className="collection-item">HesterDaMolester</li>
                                <li className="collection-item">HumanjBeouf</li>
                                <li className="collection-item">JakeFuxYerDad</li>
                            </ul>
                        </div>
                    </div>
                    <div className="center-align col s12 truncate">
                        <Button 
                            btn={this.state.btn}
                            style={styles.subBtn}
                            onClick={this.handle_click}    
                        />
                    </div>
                </Container>
            </>
        )
    }
}

export default TournyJoin