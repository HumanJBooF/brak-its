import React from 'react';
import Navbar from '../../components/Navbar';
import RecentCard from '../../components/RecentCard';
import Container from '../../components/Container';
import Search from '../../components/Search';


class LandingPage extends React.Component {


    render () {
        return (
            <>
                <Navbar update_user={this.props.update_user} loggedIn={this.props.loggedIn} username={this.props.username} />
                <Container>
                    <Search />
                    <RecentCard 
                        recentarr={this.props.recentArr}
                    />
                </Container>
            </>
        )
    }
}

export default LandingPage;