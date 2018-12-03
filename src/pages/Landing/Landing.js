import React from 'react';
import Navbar from '../../components/Navbar';
import RecentCard from '../../components/RecentCard';
import Container from '../../components/Container';
import Search from '../../components/Search';
import API from './../../utils/API';
import { Redirect } from 'react-router-dom';
import Footer from '../../components/Footer';
import Create from '../../components/Create';

class LandingPage extends React.Component {

    state = {
        recentArr: [],
        queryResults: '',
        redirectTo: null,
        title: 'Recent Tournaments'
    }

    componentDidMount = () => {
        this.get_recent();
    }

    handle_change = event => {
        event.preventDefault();
        const value = event.target.value;
        const queryResults = value;
        this.setState({ queryResults: event.target.value })
        console.log(queryResults)
    }

    handle_click = (event, queryResults) => {
        event.preventDefault();
        const queryResult = this.state.queryResults
        console.log(queryResult)

        this.setState({ redirectTo: `/search/${queryResult}` })
    }

    get_recent = () => {
        API.show_recent()
            .then(recent => {
                const getTourneys = [];
                recent.data.tournament.forEach(tourneyElems => {
                    const tourneyObj = {
                        name: tourneyElems.tourneyName,
                        id: tourneyElems.uuid,
                        description: tourneyElems.description,
                        actualSize: tourneyElems.actualSize,
                        sizeLimit: tourneyElems.sizeLimit,
                        date: tourneyElems.date,
                        format: tourneyElems.format,
                        gameType: tourneyElems.gameType,
                        owner: tourneyElems.owner,
                        isActive: tourneyElems.isActive
                    }
                    getTourneys.push(tourneyObj);

                    console.log('in loop', getTourneys);
                });
                this.setState({
                    recentArr: [...this.state.recentArr, ...getTourneys]
                });
            });
    }

    render () {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <>
                    <Navbar
                        update_user={this.props.update_user}
                        loggedIn={this.props.loggedIn}
                        username={this.props.username}
                    />
                    <Container>
                        {this.props.loggedIn
                            ? <Create />
                            : null}
                        <Search
                            loggedIn={this.props.loggedIn}
                            on_change={event => { this.handle_change(event) }}
                            onClick={this.handle_click}
                        />
                        {/* <h4 className="white-text center-align">Face your Challongers </h4> */}
                        <RecentCard
                            recentarr={this.state.recentArr}
                            title={this.state.title}
                        />
                    </Container>
                    <Footer />
                </>
            )
        }
    }
}

export default LandingPage;