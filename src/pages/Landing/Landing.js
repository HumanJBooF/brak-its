import React from 'react';
import Navbar from '../../components/Navbar';
import RecentCard from '../../components/RecentCard';
import Container from '../../components/Container';
import Search from '../../components/Search';
import API from './../../utils/API';

class LandingPage extends React.Component {
    state  = {
		recentArr: []
    }
    
    componentDidMount = () => {
        this.get_recent();
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
						sizeLimit: tourneyElems.sizeLimit,
						date: tourneyElems.date,
						time: tourneyElems.time,
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
        return (
            <>
                <Navbar 
                    update_user={this.props.update_user} 
                    loggedIn={this.props.loggedIn} 
                    username={this.props.username} 
                />
                <Container>
                    <Search />
                    <RecentCard 
                        recentarr={this.state.recentArr}
                    />
                </Container>
            </>
        )
    }
}

export default LandingPage;