import { Settings } from 'react-slick'

export interface Dress {
    Urlimages: string
    nameDress: string
}
export const defaultSettings: Settings = {
    className: '',
    arrows: false,
    fade: false,
    accessibility: true,
    adaptiveHeight: false,

    centerMode: false,
    centerPadding: '50px',
    cssEase: 'ease',
    easing: 'linear',
    edgeFriction: 0.35,
    focusOnSelect: false,
    infinite: true,
    initialSlide: 0,
    lazyLoad: 'progressive',
    pauseOnHover: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 3,
                infinite: true,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
            },
        },
    ],
    rtl: false,
    slide: 'Col',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    swipe: false,
    swipeToSlide: false,
    touchMove: true,
    touchThreshold: 5,
    useCSS: true,
    variableWidth: false,
    vertical: false,
    verticalSwiping: false,
    waitForAnimate: true,
}
export interface Users {
    first: string
    last: string
    phone: string
    email: string
    password: string
}
export interface UserQuiz {
    soutiens_gorge: string
    robe_essayez_larges: string
    robe_essayez_serrée: string
    dites_nous: string
    poids: string
    taille_de_robe: string
    taille: string
}
