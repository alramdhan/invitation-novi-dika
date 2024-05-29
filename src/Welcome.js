import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import CincinImg from './images/img-cincin.png';
import './App.css';
import confetti from 'canvas-confetti';

function WelcomeModal() {
    const [queryParam] = useSearchParams();
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    var [modalClose, setModalClose] = useState("");

    const animation = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#FFC0CB", "#FF1493", "#C71585"];
    
        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };
    
        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });
    
        (function frame() {
            const timeLeft = animationEnd - Date.now();
        
            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });
        
            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const onClick = () => {
        setModalClose("tutup-welcome");
        const audio = document.getElementById("play-song");
        audio.load();
        document.querySelector(".judul1").classList.add("animate__animated", "animate__fadeInDown", "animate__delay-2s");
        document.querySelector(".judul1").style.setProperty("--animate-duration", '2s');
        document.querySelector(".couple-foto").classList.add("animate__animated", "animate__zoomInDown", "animate__delay-2s");
        document.querySelector(".couple-foto").style.setProperty("--animate-duration", '3s');
        document.querySelector("#p-wanita").classList.add("animate__animated", "animate__backInLeft", "animate__delay-2s");
        document.querySelector("#p-wanita").style.setProperty("--animate-duration", '3s');
        document.querySelector("#p-pria").classList.add("animate__animated", "animate__backInRight", "animate__delay-2s");
        document.querySelector("#p-pria").style.setProperty("--animate-duration", '3s');
        document.querySelector(".home-tanggal").classList.add("animate__animated", "animate__fadeInUp", "animate__delay-4s");
        document.querySelector(".home-tanggal").style.setProperty("--animate-duration", '2s');
        document.querySelector("#btn-save-the-date").classList.add("animate__animated", "animate__fadeInUp", "animate__delay-4s");
        document.querySelector("#btn-save-the-date").style.setProperty("--animate-duration", '3s');
        document.querySelector(".mouse-scroll-home").classList.add("animate__animated", "animate__fadeInUp", "animate__delay-4s");
        document.querySelector(".mouse-scroll-home").style.setProperty("--animate-duration", '2s');
        document.querySelector(".scroll-down").classList.add("animate__animated", "animate__fadeInUp", "animate__delay-4s");
        document.querySelector(".scroll-down").style.setProperty("--animate-duration", '2s');
        setTimeout(() => {
            setShow(false);
            confetti({
                origin: { y: 1 },
                zIndex: 1057
            });
            animation();
            audio.play();
        }, 3000);
    };

    return(
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop={"static"}
                fullscreen={true}
                keyboard={false}
                centered={true}
                scrollable={false}
                className={modalClose}
            >
                <Modal.Body id="overlay" className={"p-0 m-0"}>
                    <div className="content">
                        <div className="container d-flex-column align-items-center justify-content-center" style={{width: "100%", height: "100%", overflow: "hidden"}}>
                            <div className="row mt-4">
                                <h1 data-aos="fade-down" data-aos-delay="500" data-aos-duration="2000" className="welcome-title text-secondary fs5">The Wedding Of</h1>
                                <div data-aos="zoom-in" data-aos-delay="750" data-aos-duration="2000" className="col-md-12 col-md-offset-2 text-center fh5co-heading my-4">
                                    <img src={CincinImg} alt="" className="couple-main" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-md-offset-2 text-center fh5co-heading">
                                    <h1 data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1500" className='welcome-pengantin text-secondary my-2' style={{fontSize: "2rem"}}>Novi & Dika</h1>
                                    <p data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="1500" style={{color: "#EEE", marginBottom: 0}}>Kepada yth. Bapak/Ibu/Saudara/i</p>
                                    <h3 data-aos="zoom-in" data-aos-delay="1400" data-aos-duration="1500" style={{color: "#EEE", marginBottom: 0, fontWeight: "bold"}}>{queryParam.get("to")}</h3>
                                    <p data-aos="zoom-in" data-aos-delay="1600" data-aos-duration="1500" style={{color: "#EEE", fontSize: 12, marginTop: 7}}>Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.</p>
                                    <div style={{height: 12}}></div>
                                    {/* <button className="btn btn-primary" onClick={onClick}>Buka Undangan</button> */}
                                    <div data-aos="fade-up" data-aos-delay="1800" data-aos-duration="1500">
                                        <Button onClick={onClick} className="rounded-pill btn-burgundy">
                                            <FontAwesomeIcon icon={faEnvelope} />&nbsp;Buka Undangan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WelcomeModal;