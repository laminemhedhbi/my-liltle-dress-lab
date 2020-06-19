import * as React from 'react'
import {
    Col,
    Row,
    Modal,
    Button,
    FormControl,
    FormGroup,
    FormLabel,
} from 'react-bootstrap'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'

interface Props {
    phone: string
    showInfo: boolean
    quiz: any
    handleInfo(): void
    submitInfo(values: any, { setSubmitting }: any): void
    onChange(event: any): void
}

interface FormValues {
    phone: string
    soutiens_gorge: string
    robe_essayez_larges: string
    robe_essayez_serrée: string
    dites_nous: string
    poids: string
    taille_de_robe: string
    taille: string
}

class Quiz extends React.Component<Props, {}> {
    render() {
        const initialValues: FormValues = {
            phone: this.props.phone,
            soutiens_gorge: '',
            robe_essayez_larges: '',
            robe_essayez_serrée: '',
            dites_nous: '',
            poids: '',
            taille_de_robe: '',
            taille: '',
        }

        const validationSchema = Yup.object().shape({
            phone: Yup.string()
                .min(8, 'Too Short!')
                .required('Required'),
            soutiens_gorge: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            robe_essayez_larges: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            robe_essayez_serrée: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            dites_nous: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            poids: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            taille_de_robe: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
            taille: Yup.string()
                .min(2, 'Too Short!')
                .required('Required'),
        })
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={this.props.submitInfo}
            >
                {(formik: any) => (
                    <Form>
                        <Modal className="modal" show={this.props.showInfo}>
                            <Modal.Header>
                                <Modal.Title>Quiz</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom01">
                                            <FormLabel>
                                                Numero de telephone
                                            </FormLabel>
                                            <FormControl
                                                name="phone"
                                                type="number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            <ErrorMessage name="phone" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom01">
                                            <FormLabel>
                                                Quelle taille mesurez vous?
                                            </FormLabel>
                                            <FormControl
                                                name="taille"
                                                type="number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.taille}
                                            />
                                            <ErrorMessage name="taille" />
                                        </FormGroup>
                                    </Col>

                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom02">
                                            <FormLabel>
                                                Veuillez nous indiquer votre
                                                poids
                                            </FormLabel>
                                            <FormControl
                                                name="poids"
                                                type="number"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.poids}
                                            />
                                            <ErrorMessage name="poids" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="exampleForm.ControlSelect1">
                                            <FormLabel>
                                                Quelle(s) taille(s) de robe(s)
                                                portez-vous en général?
                                            </FormLabel>
                                            <FormControl
                                                as="select"
                                                name="taille_de_robe"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.taille_de_robe
                                                }
                                            >
                                                <option color="rgba(248, 248, 248, 0.49)">
                                                    --Taille--
                                                </option>
                                                <option>32</option>
                                                <option>34</option>
                                                <option>36</option>
                                                <option>38</option>
                                                <option>40</option>
                                                <option>42</option>
                                                <option>44</option>
                                                <option>46</option>
                                                <option>48</option>
                                                <option>50</option>
                                            </FormControl>
                                            <ErrorMessage name="taille_de_robe" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom03">
                                            <FormLabel>
                                                Quelle taille de soutiens-gorge
                                                portez vous au quotidien?
                                            </FormLabel>
                                            <FormControl
                                                as="select"
                                                name="soutiens_gorge"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values.soutiens_gorge
                                                }
                                            >
                                                <option color="rgba(248, 248, 248, 0.49)">
                                                    --Taille--
                                                </option>
                                                <option>
                                                    Tour de poitrine
                                                </option>
                                                <option>Bonnet</option>
                                            </FormControl>
                                            <ErrorMessage name="soutiens_gorge" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom04">
                                            <FormLabel>
                                                Quand vous essayez une robe et
                                                qu’elle vous semble serrée, à
                                                quel niveau ressentez vous cet
                                                inconfort?
                                            </FormLabel>
                                            <FormControl
                                                as="select"
                                                name="robe_essayez_serrée"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .robe_essayez_serrée
                                                }
                                            >
                                                <option color="rgba(248, 248, 248, 0.49)">
                                                    --select--
                                                </option>
                                                <option>Épaules</option>
                                                <option>Poitrine</option>
                                                <option>Taille</option>
                                                <option>Hanches</option>
                                                <option>Fesses</option>
                                            </FormControl>
                                            <ErrorMessage name="robe_essayez_serrée" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom05">
                                            <FormLabel>
                                                A quel niveau les robes que vous
                                                essayez peuvent être un peu
                                                larges?
                                            </FormLabel>
                                            <FormControl
                                                as="select"
                                                name="robe_essayez_larges"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={
                                                    formik.values
                                                        .robe_essayez_larges
                                                }
                                            >
                                                <option color="rgba(248, 248, 248, 0.49)">
                                                    --select--
                                                </option>
                                                <option>Épaules</option>
                                                <option>Poitrine</option>
                                                <option>Taille</option>
                                                <option>Hanches</option>
                                                <option>Fesses</option>
                                            </FormControl>
                                            <ErrorMessage name="robe_essayez_larges" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom06">
                                            <FormLabel>
                                                Dites nous tout sur la coupe de
                                                robe qui vous va le mieux et que
                                                vous adorez! Plus vous nous en
                                                dites, mieux on travaillera.
                                            </FormLabel>
                                            <FormControl
                                                as="textarea"
                                                rows="3"
                                                name="dites_nous"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.dites_nous}
                                            />
                                            <ErrorMessage name="dites_nous" />
                                        </FormGroup>
                                    </Col>
                                    <Col sm={12} md={12}>
                                        <FormGroup controlId="validationCustom07">
                                            <FormLabel>
                                                C’est terminé ! Nous allons
                                                pouvoir réaliser la robe qui
                                                vous va le mieux. Si elle ne
                                                convenait pas, nous
                                                l’échangerons !
                                            </FormLabel>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty)}
                                >
                                    Submit
                                </Button>
                                <Button onClick={this.props.handleInfo}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                )}
            </Formik>
        )
    }
}
export default Quiz
