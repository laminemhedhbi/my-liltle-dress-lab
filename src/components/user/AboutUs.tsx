import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

class About extends React.Component {
    render() {
        return (
            <div className="About">
                <h1
                    style={{
                        fontFamily: 'old standart tt',
                        marginLeft: '57%',
                        marginTop: '1%',
                        color: 'white',
                    }}
                >
                    How we are ?
                </h1>
                <Container
                    style={{
                        textAlign: 'center',
                        fontFamily: 'old standart tt',
                        fontSize: '150%',
                        fontWeight: 'revert',
                        marginLeft: '55%',
                        marginRight: '7%',
                        color: '#616161',
                    }}
                >
                    <Row>
                        <Col
                            style={{ textAlign: 'justify', fontSize: '0.8em' }}
                            md={{ order: 1 }}
                        >
                            My Little Dress Lab, c’est d’abord et surtout une
                            marque créée par des femmes, pour les femmes. Notre
                            mot d’ordre: optimiser votre garde-robe et vous
                            donner une nouvelle façon de créer des tenues
                            différentes, sans avoir à accumuler d'avantages de
                            vêtements dans votre dressing! Notre promesse : vous
                            offrir une gamme des robes au style intemporel,
                            parfaitement adaptées à votre morphologie, à vos
                            evenements du quotidien et à votre humeur ! Ce qu’on
                            veut c’est aider les femmes actives d'aujourd'hui à
                            acheter moins, mais mieux, et ce grâce à une gamme
                            de petites robes modulables et customizables, faites
                            sur mesures selons vos mensurations uniques, pour
                            mettre tous vos atouts en valeur, tout en mettant
                            l’accent sur le confort et la durabilité.
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col
                            style={{ textAlign: 'justify', fontSize: '0.8em' }}
                        >
                            En effet, nous avons pour exigence de ne travailler
                            que les matières les plus agréables à porter, mais
                            aussi à entretenir, car prendre soin de
                            confectionner un produit durable, c’est donner
                            l’espoir de garder plus longtemps un vêtement cher à
                            notre coeur, qui nous accompagnera des années
                            durant. La mode est au vert, et nous voulons faire
                            de cette mode un état d’esprit qui se dessine tout
                            au long de notre chaîne de production. Pour ce
                            faire, nous optons pour une démarche zéro stock !
                            Votre vêtement n’est produit que lorsque vous passez
                            la commande, et il sera surtout unique.
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default About
