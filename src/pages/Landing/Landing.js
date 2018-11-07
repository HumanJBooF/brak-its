import React from "react";
import Navbar from "../../components/Navbar";
import RecentCard from "../../components/RecentCard";
import Container from "../../components/Container";
import Search from "../../components/Search"
import Create from "../../components/Create"


class LandingPage extends React.Component {
    state = {

    }
    
    render() {
        return (
            <>
                <Navbar />
                <Container>
                <Search />
                <Create />
                <RecentCard />
                </Container>
            </>
        )
    }
}

export default LandingPage;