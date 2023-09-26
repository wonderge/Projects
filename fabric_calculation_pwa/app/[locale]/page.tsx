"use client"

import { Row, Col } from 'react-bootstrap'
import ButtonLink from '@components/ButtonLink'
import CardContainer from '@components/CardContainer'
import { useTranslations } from 'next-intl'

const Home = () => {
  const t = useTranslations()
  return (
    <CardContainer>
      <Row className='mb-3'>
        <Col className='flex'><ButtonLink className='w-100' href='/napkin'>{t("Napkin")}</ButtonLink></Col>
        <Col className='flex'><ButtonLink className='w-100' href='/tablecloth'>{t("Tablecloth")}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='flex'><ButtonLink className='w-100' href='/roundcloth'>{t("Roundcloth")}</ButtonLink></Col>
        <Col className='flex'><ButtonLink className='w-100' href='/sash'>{t("Sash")}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='flex'><ButtonLink className='w-100' href='/clip'>{t("Clip")}</ButtonLink></Col>
        <Col className='flex'><ButtonLink className='w-100' href='/chaircover'>{t("Chaircover")}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='flex'><ButtonLink className='w-100' href='/curtain'>{t("Curtain")}</ButtonLink></Col>
        <Col className='flex'><ButtonLink className='w-100' href='/gauze'>{t("Gauze")}</ButtonLink></Col>
      </Row>
      <Row className='mb-3'>
        <Col className='flex'><ButtonLink className='w-100' href='/flower'>{t("Flower")}</ButtonLink></Col>
        <Col className='flex'><ButtonLink className='w-100' href='/buttoncurtain'>{t("Button_Curtain")}</ButtonLink></Col>
      </Row>
      <Row>
        <Col className='text-center'><ButtonLink href='/weightandamount'>{t("Weight_And_Amount")}</ButtonLink></Col>
      </Row>
    </CardContainer>
  )
}

export default Home