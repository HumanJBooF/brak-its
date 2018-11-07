import React from "react";
import Navbar from "../../components/Navbar";
import RecentCard from "../../components/RecentCard";
import Container from "../../components/Container";
import Search from "../../components/Search";


class LandingPage extends React.Component {
    
    render() {
        return (
            <>
                <Navbar />
                <Container>
                <Search />
                <RecentCard />
                </Container>
            </>
        )
    }
}

export default LandingPage;