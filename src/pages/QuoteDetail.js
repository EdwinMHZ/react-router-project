import React,{ useEffect} from 'react'
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';



const QuoteDetail = () => {
    const params = useParams();
    const quoteId = params.id;
    const match = useRouteMatch();

    const {
        sendRequest,
        status,
        data: loadedQuote,
        error
    } = useHttp(getSingleQuote);

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest,quoteId]);

    if (status === 'pending') {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return(
            <p className="centered focused">{error}</p>
        );
    }

    if (!loadedQuote) {
        return <p>No qoute found</p>
    }
    return (
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link
                        to={`${match.url}/comments`}
                        className={'btn--flat'}
                    >Load Comments</Link>
                </div>
            </Route>

            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </>
    )
}

export default QuoteDetail
