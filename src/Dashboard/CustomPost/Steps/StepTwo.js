import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelectedQuote } from '../CustomPostSlice'
function StepTwo(props) {
    const { quotesSuccessFlag, quotes, quotesLoaderFlag } = useSelector(state => state.customPost);
    const [selectedQuote, setSelectedQuote] = React.useState('');
    const [selectedQuoteAuthor, setSelectedQuoteAuthor] = React.useState('');
    const [quoteCount, setQuoteCount] = React.useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (quotesSuccessFlag) {
            setSelectedQuote(quotes.quotes[quoteCount].quote)
            setSelectedQuoteAuthor(quotes.quotes[quoteCount].author)
            var selected = {
                quote: selectedQuote,
                author: selectedQuoteAuthor
            }
            dispatch(userSelectedQuote(selected))
            console.log(selectedQuote)
            console.log(selectedQuoteAuthor)
            /* console.log(props.stepCount) */
        }
    }, [quotes, quoteCount, selectedQuote, selectedQuoteAuthor, quotesSuccessFlag, dispatch])

    const regenerate = () => {
        setQuoteCount(quoteCount + 1);
        if (quoteCount === quotes.quotes.length - 1) {
            setQuoteCount(0);
        }
    }

    return (
        <div data-w-id="f2b31280-0b97-8741-e941-32cae7d49734" className="slide-2 w-slide" id='stepTwo'>
            <div className="slider-content-wrap">
                <div className="form-content-3" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                    <div className="form-section-title-2">Quote</div>
                    <p className="paragraph-3"><strong>{!quotesLoaderFlag ? 'Loading...' : selectedQuote}</strong></p>
                    <div>
                        <div className="text-block-12">{!quotesLoaderFlag ? 'Loading...' : selectedQuoteAuthor}</div>
                    </div>
                </div>
                <button onClick={regenerate} className="button-11 w-button">Regenerate Quote</button>
                <div className="details-right">
                    <img src="https://uploads-ssl.webflow.com/62e8ac4303b3e8c902ffdfc0/62e8ac4303b3e854afffdfda_2.svg"
                        alt="counterImage" className="counter-image" />
                    <div className="text-counter">2 / 5</div>
                </div>
            </div>
        </div>
    )
}

export default StepTwo;