import { useEffect, useRef } from "react"
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap"
import ReviewForm from "../reviewForm/reviewForm"
import api from '../../api/axiosConfig'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();

    let params = useParams();

    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);


    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        const response = await api.post('/api/v1/movies/reviews', { reviewBody: rev.value, imdbId: movieId }).catch((err) => { console.log(err) });

        const updateReviews = [...reviews, { body: rev.value }];

        rev.value = "";

        setReviews(updateReviews)

    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <img src={movie?.poster}></img>
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} lableText={'write a review'}></ReviewForm>
                                </Col>
                            </Row>
                        </>
                    }{
                        reviews?.map((review) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{review.body}</Col>

                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>

        </Container>
    )
}


export default Reviews;