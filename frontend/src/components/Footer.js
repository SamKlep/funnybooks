import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <Link to='/'>
              <span className='footer-logo'>Funnie Books</span>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
