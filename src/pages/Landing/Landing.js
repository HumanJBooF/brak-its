import React from 'react';
import Navbar from '../../components/Navbar';
import RecentCard from '../../components/RecentCard';
import Container from '../../components/Container';
import Search from '../../components/Search';
import Create from '../../components/Create';
import API from '../../utils/API';

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <Navbar
                    update_user={this.props.update_user}
                    loggedIn={this.props.loggedIn}
                    username={this.props.username}
                />
                <Container>
                    <div className="row">
                        <Search
                            loggedIn={this.props.loggedIn}
                        />
                       
                    </div>
                    <RecentCard
                        recentarr={this.props.recentArr}
                    />
                </Container>
            </>
        )
    }
}

export default LandingPage;