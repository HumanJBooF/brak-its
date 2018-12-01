import React from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
// import Card from '../../components/Card';
import Navbar from '../../components/Navbar'
import styles from './JoinStyles';
import API from '../../utils/API';
// import Moment from 'react-moment';

class TourneyJoin extends React.Component {

    state = {
        btn: 'Join Tournament!',
        tournament: {},
        players: [],
        date: '',
        time: null,
        times: null
    }

    componentDidMount = () => {
        this.get_tourney();
    }

    //TEST FOR GETTING ALL USERS OF TOURNAMENT
    // get_users = () => {
    //     const tourneyId = this.state.tournament.id;

    //     API.get_users_tournament({ id: tourneyId }).then(result => {
    //         let users = result.data.users.map(user => user.username)
    //         console.log(users)
    //     })
    // }

    handle_click = () => {
        const userTourney = {
            username: this.props.username,
            tourneyId: this.state.tournament.id,
        }
        let checkUser = this.state.players.map(obj => obj.username.toLowerCase());
        this.join_tourney(checkUser, userTourney)
    }

    join_tourney = (checkUser, userTourney) => {

        if (checkUser.includes(userTourney.username.toLowerCase())) {
            console.log(`${userTourney.username} has already joined!`); // SWEET ALERT
        } else {
            API.join_tournament(userTourney).then(result => {
                const userObj = {
                    username: result.data.user.username,
                    id: result.data.user.uuid
                };
                this.setState({ players: [...this.state.players, userObj] });
            })
        }
    }

    get_tourney = () => {
        // deconstructed this.props.match.params.owner // .id
        const { match: { params: { owner, id } } } = this.props

        API.show_one(owner, id).then(recent => {
            const tournament = recent.data.tournament
            const users = recent.data.users
            const userArr = [];

            if (!tournament) {
                //sweet alert
            } else {
                const tourney = {
                    name: tournament.tourneyName,
                    id: tournament.uuid,
                    description: tournament.description,
                    sizeLimit: tournament.sizeLimit,
                    date: tournament.date,
                    time: tournament.date.slice(12, -8),
                    format: tournament.format,
                    gameType: tournament.gameType,
                    owner: tournament.owner,
                    isActive: tournament.isActive
                }
                users.forEach(user => {
                    const userObj = {
                        username: user.username,
                        id: user.uuid
                    }
                    userArr.push(userObj);
                })
                this.setState({
                    tournament: tourney,
                    players: [...this.state.players, ...userArr],
                    date: tournament.date.slice(0, tournament.date.indexOf("T"))
                })
            }
           
        })
    }


    render () {
        return (   
            <>
                <Navbar
                    update_user={this.props.update_user}
                    username={this.props.username}
                    loggedIn={this.props.loggedIn} 
                />
                <Container>
                    <div className="row" style={styles.cardCol} >
                        <div className="col s12 m9" >
                            <div className="card blue-grey darken-1" style={styles.card} >
                                <div className="card-content white-text">
                                    <span className="card-title center-align truncate">Tournament Info</span>
                                    <p>Name: {this.state.tournament.name} </p>
                                    <p>Type: {this.state.tournament.gameType} </p>
                                    <p>Date: {this.state.date} </p>
                                    <p>Time: {this.state.tournament.time} </p>
                                </div>
                            </div>
                        </div>

                        <div className="col s12 m3" >
                            <ul className="collection with-header" style={styles.collect}>
                                <li className="center-align collection-header">
                                    Player List {this.state.players.length}/{this.state.tournament.sizeLimit}
                                </li>
                                { this.state.players.map((user, i) => {
                                    return <li key={i} 
                                            className="collection-item center-align">{user.username}
                                        </li>
                                    })
                                }

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

export default TourneyJoin