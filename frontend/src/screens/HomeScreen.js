import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import Comic from '../components/Comic'

const HomeScreen = () => {
  const [comics, setComics] = useState({})
  const [loading, setLoading] = useState([])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`/api/comics`)
      .then((response) => {
        setComics(response.data)
        console.log(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            {comics.map((comic) => (
              <Col key={comic._id} sm={12} md={6} lg={4} xl={3}>
                <Comic comic={comic} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
