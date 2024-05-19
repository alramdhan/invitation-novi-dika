import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import CincinImg from './images/img-cincin.png';
import './App.css';

function WelcomeModal() {
    const [queryParam] = useSearchParams();
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    // const queryParam = new URLSearchParams(window.location.search);
    // const name = queryParam.get("to");
    var [modalClose, setModalClose] = useState("");

    const onClick = () => {
        setModalClose("tutup-welcome");
        setInterval(() => {
            setShow(false);
            const audio = document.getElementById("play-song");
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
                                    <h1 data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000" className='welcome-pengantin text-secondary my-4' style={{fontSize: "2rem"}}>Novi & Dika</h1>
                                    <p data-aos="zoom-in" data-aos-delay="1250" data-aos-duration="2000" style={{color: "#EEE", marginBottom: 0}}>Kepada yth.Bapak/Ibu/Saudara/i</p>
                                    <h3 data-aos="zoom-in" data-aos-delay="1500" data-aos-duration="2000" style={{color: "#EEE", marginBottom: 0, fontWeight: "bold"}}>{queryParam.get("to")}</h3>
                                    <p data-aos="zoom-in" data-aos-delay="1750" data-aos-duration="2000" style={{color: "#EEE", fontSize: 12, marginTop: 7}}>Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.</p>
                                    <div style={{height: 12}}></div>
                                    {/* <button className="btn btn-primary" onClick={onClick}>Buka Undangan</button> */}
                                    <div data-aos="fade-up" data-aos-delay="2000" data-aos-duration="2000">
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