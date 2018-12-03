import React from 'react';
import Navbar from '../../components/Navbar';
import SearchCard from '../../components/SearchCard';
import API from '../../utils/API';
import Container from '../../components/Container';
import Footer from '../../components/Footer'

class SearchResults extends React.Component {
    state = {
        queryResults: [],
        title: 'Results for: '
    }
    componentDidMount () {
        console.log(this.props.match.params.search)
        this.get_query_results();
    }


    get_query_results = () => {
        const { match: { params: { search } } } = this.props;
        console.log('@ query', search)
        API.find_search(search)
            .then(getValue => {
                const grabbedList = [];
                console.log(getValue.data.tourneys)
                getValue.data.tourneys.forEach(allTourneys => {
                    const tournyList = {
                        name: allTourneys.tourneyName,
                        id: allTourneys.uuid,
                        description: allTourneys.description,
                        actualSize: allTourneys.actualSize,
                        sizeLimit: allTourneys.sizeLimit,
                        date: allTourneys.date,
                        format: allTourneys.format,
                        gameType: allTourneys.gameType,
                        owner: allTourneys.owner,
                        isActive: allTourneys.isActive
                    }
                    grabbedList.push(tournyList)
                })

                console.log('list', grabbedList);
                this.setState({
                    queryResults: [...this.state.queryResults, ...grabbedList],
                })
            })
    }

    render () {
        return (
            <>
                <Navbar />
                <Container>
                    <SearchCard
                        queryResults={this.state.queryResults}
                        title={this.state.title + this.props.match.params.search}
                    />
                </Container>
                <Footer />
            </>
        )
    }
}

export default SearchResults;