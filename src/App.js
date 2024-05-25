import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faHome,
  faCalendarDay,
  faComments,
  faClock,
  faMap,
  faCopy,
  faGift,
  faGifts
} from '@fortawesome/free-solid-svg-icons';
import Fireworks from 'react-canvas-confetti/dist/presets/pride'
import IG from './images/instagram.svg';
import mempelai from './images/mempelai.png';
// import countdown from './images/countdown.png';
// main
import Cincin1 from './images/cincin1.png';
import WelcomeModal from './Welcome.js';
import Petals from './Petal.js';
import Bismillah from './images/bismillah.png';
import DividerStyle from './images/divider.png';
import Bunga1 from './images/bg-mempelai1.png';
import Bunga2 from './images/bg-mempelai2.png';
import MempelaiPria from './images/mempelai-pria.png';
import MempelaiWanita from './images/mempelai-wanita.png';
import AdabWalimah from './images/adab-walimah.png';
import song from './audio/Cinderella-2015.mp3';
import { Badge, Button, Card, Form, Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactAudioPlayer from 'react-audio-player';

const baseUrl = "https://invitation-alnovi.000webhostapp.com/api";

function App() {
  const [ucapan, setUcapan] = useState(null);
  const [selectedAbsen, setSelectedAbsen] = useState(-1);

  useEffect(() => {
    AOS.init();
    fetchUcapan();
  }, []);

  const fetchUcapan = () => {
    axios.get(`${baseUrl}/v1/getUcapan`).then((response) => {
      setUcapan(response.data);
    });
  }

  const kirimUcapan = () => {
    const formData = new FormData();
    const nama = document.getElementById("txt-nama");
    const ucapan = document.getElementById("txt-ucapan");
    if(nama.value === '' || ucapan.value === '' || selectedAbsen === -1) {
      Swal.fire({
        title: "Peringatan",
        text: "Form ucapan tidak boleh kosong",
        icon: 'info',
      });
    } else {
      formData.append("nama_tamu", nama.value);
      formData.append("ucapan", ucapan.value);
      formData.append("absen", selectedAbsen);
      
      axios.post(`${baseUrl}/v1/addUcapan`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if(response.data["response_code"] === 201) {
          Swal.fire({
            title: "Terkirim",
            text: "Terima kasih untuk ucapan dan do'a nya ^^",
            icon: 'success',
          }).then((result) => {
            if(result.isConfirmed) {
              nama.value = "";
              ucapan.value = "";
              setSelectedAbsen(-1);
              document.getElementById("txt-absen").value = "";
              fetchUcapan();
            }
          });
        }
      }).catch((e) => console.error("e", e));
    }
  }

  const absenChangeHandler = (e) => {
    setSelectedAbsen(parseInt(e.target.value));
  }

  const until = "2024-06-23T09:00:00";
  const count = (new Date(until)).getTime();
  
  setInterval(() => {
    const distance = Math.abs(count - (new Date()).getTime());

    document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
  }, 1000);

  const decorateOptions = (defaultOption) => {
    return {
      ...defaultOption,
      angle: 90, origin: { y: 1 }, zIndex: 1000
    }
  }

  const [showT, setShowT] = useState(false);

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setShowT(true);
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    const interval = Math.floor(seconds / 31536000);
    if(interval > 1) {
      return interval + " years ago";
    }
    if(interval === 1) {
      return interval + " year ago";
    }

    const month = Math.floor(seconds / 2628000);
    if(month > 1) {
      return month + " months ago";
    }
    if(month === 1) {
      return month + " month ago";
    }

    const day = Math.floor(seconds / 86400);
    if(day > 1) {
      return day + " days ago";
    }
    if(day === 1) {
      return day + " day ago";
    }

    const hour = Math.floor(seconds / 3600);
    if(hour > 1) {
      return hour + " hours ago";
    }
    if(hour === 1) {
      return hour + " hour ago";
    }

    const minute = Math.floor(seconds / 60);
    if(minute > 1) {
      return minute + " minutes ago";
    }
    if(minute === 1) {
      return minute + " minute ago";
    }

    return "just now";
  }

  return (
    <div className='App' style={{position: "relative"}}>
      <Petals />
      <ReactAudioPlayer id="play-song" src={song} preload='metadata' loop />
      <nav className="navbar burgundy navbar-expand fixed-bottom rounded-top-4 p-0" id="navbar-menu" style={{dipslay: "fixed"}}>
        <ul className="navbar-nav nav-justified w-100 align-items-center">
          <li className="nav-item">
            <a className="nav-link" href="#home">
              <FontAwesomeIcon icon={faHome} color='#EEE' />
              <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Home</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#mempelai">
              <img width={24} src={mempelai} alt="mempelai" />
              <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Mempelai</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#countdown">
              {/* <img width={25} src={countdown} alt="countdown" /> */}
              <FontAwesomeIcon icon={faCalendarDay} color="#EEE" />
              <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Tanggal</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#gift">
              <FontAwesomeIcon icon={faGift} color="#EEE" />
              <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Gift</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#ucapan">
              <FontAwesomeIcon icon={faComments} color='#EEE' />
              <span className="d-block" style={{color: "#EEE", fontSize: 0.7 + "rem"}}>Ucapan</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <main className='container-main' data-bs-spy="scroll" data-bs-target="#navbar-menu" data-bs-smooth-scroll="true">
        <Fireworks decorateOptions={decorateOptions} autorun={{speed: 3, duration: 10000, delay: 4500}} />
        <section className='bg1' id='home'>
          <div className="w-100 text-center pt-4">
            <h1 className="judul1" style={{fontSize: "2.5rem", fontWeight: 500, marginTop: 200}}>The Wedding Of</h1>
            <div className="mb-4">
              <div className="img-crop mx-auto foto-home">
                <img className="couple-foto" src={Cincin1} alt="bg" />
              </div>
            </div>

            <h3 className="title-pengantin" style={{fontSize: "2rem"}}>Novi &amp; Dika</h3>
            <p className="mb-0" style={{fontSize: 1.5+"rem"}}>Minggu, 23 Juni 2024</p>

            <a className="btn btn-sm shadow btn-outline-burgundy rounded-pill px-3 my-2" target="_blank" rel='noreferrer' href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NW9mYmtiMjA0b2VmNGo4MnZtNTg4aG9ndTMgZjdiYjBmNmJlYzI5Y2NkNmM2ZDJjYThlOTg2MDhhYjM2NTgwZDRmMDExNmQ1YWVhMGY3ZDY3N2ZlNzQ0YjNmY0Bn&tmsrc=f7bb0f6bec29ccd6c6d2ca8e98608ab36580d4f0116d5aea0f7d677fe744b3fc%40group.calendar.google.com">
              <FontAwesomeIcon icon={faCalendar} />&nbsp;Save The Date
            </a>

            <div className="d-flex justify-content-center align-items-center mt-2 mb-2 mouse-scroll-home">
              <div className="mouse-animation border border-2 border-dark">
                <div className="scroll-animation"></div>
              </div>
            </div>

            <p className="m-0 pb-3 scroll-down">Scroll Down</p>
          </div>
        </section>
        <section className='bg2' id="mempelai">
          <div className='w-100 text-center pt-4' style={{marginBottom: 40}}>
            <img data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" width="70%" src={Bismillah} alt="bismillah"  />
            
            <h3 data-aos="fade-up" data-aos-delay="500" data-aos-duration="1000" style={{fontSize: "1.6rem", color: "#683448", marginTop: 20}}>Assalamu&apos;alaikum Wr. Wb.</h3>
            <p data-aos="fade-up" data-aos-delay="750" data-aos-duration="1000" className='mb-2' style={{padding: "4px 20px"}}>
              Tanpa mengurangi rasa hormat. Kami mengundang Bapak/Ibu/Saudara/i serta Kerabat sekalian untuk menghadiri acara Pernikahan kami:
            </p>
            <div className="position-relative">
              <div className="position-absolute" style={{top: "0%", left: "15%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <br />
            <div className="layer-sangmempelai mt-4">
              <div>
                <img data-aos="fade-right" data-aos-delay="500" data-aos-duration="2000" width={200} height={200} src={MempelaiWanita} alt="mempelai Pria" />
                <h2 className='mt-4' data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000">Siti Novi Nurkomala</h2>
                <div data-aos="fade-up" data-aos-delay="750" data-aos-duration="2000" style={{color: "#BF9B73", fontSize: "1.2rem"}}>
                  Putri kedua dari <br /><font className="nama-ortu">Bapak Taufik Hidayat &amp; Ibu Yoyoh</font>
                </div>
                <div  data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="2000"  id="social-media-novi">
                  <ul className="fh5co-social-icons">
                    <li><a target="_blank" rel='noreferrer' href="https://www.instagram.com/novinurkom"><img width={15} src={IG} alt="instagram" />&nbsp;&nbsp;novinurkom</a></li>
                  </ul>
                </div>
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "0%", right: "10%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
                <div data-aos="flip-up" data-aos-delay="1500" data-aos-duration="2000" style={{paddingLeft: 25, paddingRight: 25, marginTop: 25}}>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img width="100%" src={DividerStyle} alt="divider" />
                        </td>
                        <td><h1 className='my-2' style={{paddingLeft: 10, paddingRight: 10}}>&amp;</h1></td>
                        <td>
                          <img width="100%" src={DividerStyle} alt="divider" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <img data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000" width={200} height={200} src={MempelaiPria} alt="mempelai Pria" />
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "-30px", left: "10%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
                <h2 className='mt-4' data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000">Dika Alfarell Haidir Ramdani</h2>
                <div data-aos="fade-up" data-aos-delay="750" data-aos-duration="2000" style={{color: "#BF9B73", fontSize: "1.2rem"}}>
                  Putra pertama dari <br /><font className="nama-ortu">Bapak Yul Haidir &amp; Ibu Suparti</font>
                </div>
                <div data-aos="zoom-in" data-aos-delay="1200" data-aos-duration="2000"  id="social-media-dika">
                  <ul className="fh5co-social-icons">
                    <li><a target="_blank" rel='noreferrer' href="https://www.instagram.com/al.haidirr"><img width={15} src={IG} alt="instagram" />&nbsp;&nbsp;al.haidirr</a></li>
                  </ul>
                </div>
                <div className="position-relative">
                  <div className="position-absolute" style={{top: "0", right: "10%"}}>
                    <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <img width="100%" src={Bunga2} alt="bunga 2" />
            </div>
            <div className='layer-mempelai-bottom d-flex align-items-center justify-content-center'>
              <p data-aos="zoom-in" data-delay="1000" data-aos-duration="2000">
                <br />
                <span className="ayat-title">Allah SWT Berfirman</span><br /><br />
                Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari
                jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu
                rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
                (kebesaran Allah) bagi kaum yang berpikir.<br /> <br />
                <span className='ayat-endtitle'>QS. Ar-Rum Ayat 21</span>
              </p>
            </div>
            <div className="position-relative">
              <div className="position-absolute" style={{top: "-25px", left: "32%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="bg2" id="countdown">
          <div className='text-center'>
            <h1 className='font-esthetic' style={{fontSize: "4rem"}}>Our Wedding</h1>
            <h2 data-aos="zoom-in" data-aos-duration="2000">Waktu Menuju Acara</h2>
            <h5 data-aos="zoom-in" data-aos-delay="500" data-aos-duration="2000" className='text-secondary'>23/06/2024</h5>
            <div  data-aos="zoom-in" data-aos-delay="750" data-aos-duration="2000" style={{
              border: "2px solid #BF9B73",
              borderRadius: "75px",
              padding: "10px 0",
              margin: 0,
            }}>
              <table className='table table-borderless p-0 m-0' id="table-countdown">
                <tbody>
                  <tr>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="day"></span> Hari
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="hour"></span> <br />Jam
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="minute"></span> Menit
                      </div>
                    </td>
                    <td valign='middle' align='center'>
                      <div className="container-countdown">
                        <span id="second"></span> Detik
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p data-aos="fade-down"  data-aos-delay="1000" data-aos-duration="1000" className="my-4" style={{paddingLeft: 16, paddingRight: 16}}>
              Dengan memohon rahmat dan ridho Allah Subhanallahu Wa Ta&apos;ala, Insha Allah kami akan menyelenggarakan
              acara :
            </p>
            <div className="position-relative" style={{zIndex: 100}}>
              <div className="position-absolute" style={{top: "0%", left: "16%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fill="#683448" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <Card data-aos="zoom-in" data-aos-delay="1250" data-aos-duration="1000" id='acara-akad'>
              <h1 style={{fontSize: "1.4rem", fontWeight: 700}}>AKAD</h1>
              <hr />
              <table className='table table-borderless m-0 p-0 w-100' id='table-acara-akad'>
                <tbody>
                  <tr className='row'>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faClock} /><br />
                      09:00<br />
                      Selesai
                    </td>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faCalendar} /><br />
                      Minggu<br />
                      23 Juni 2024
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12'>
                      <h4>Kediaman Mempelai Wanita</h4>
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12 text-burgundy pt-0 px-4'>
                      Alamat : Jl. Cikopo Selatan, Kp. Munjul RT 002/005, Kec. Megamendung, Kab. Bogor 16770
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a target='__blank' rel='noreferrer' href='https://maps.app.goo.gl/ivTqz3mA6dzFMy7R7' className='rounded-pill btn-burgundy'>Lihat Lokasi&nbsp;<FontAwesomeIcon icon={faMap} /></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="position-relative" style={{zIndex: 100}}>
              <div className="position-absolute" style={{top: "-15px", right: "20%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                  <path fill="#683448" fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                </svg>
              </div>
            </div>
            <Card data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000" id='acara-resepsi'>
              <h1 style={{fontSize: "1.4rem", fontWeight: 700}}>RESEPSI PERNIKAHAN</h1>
              <hr />
              <table className='table table-borderless m-0 p-0 w-100' id='table-acara-resepsi'>
                <tbody>
                  <tr className='row'>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faClock} /><br />
                      10:00<br />
                      Selesai
                    </td>
                    <td align='center' valign='middle' className='col-6'>
                      <FontAwesomeIcon icon={faCalendar} /><br />
                      Minggu<br />
                      23 Juni 2024
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan={2} className='col-12'>
                      <h4>Kediaman Mempelai Wanita</h4>
                    </td>
                  </tr>
                  <tr className='row'>
                    <td colSpan="2" className='col-12 text-burgundy pt-0 px-4'>
                      Alamat : Jl. Cikopo Selatan, Kp. Munjul RT 002/005, Kec. Megamendung, Kab. Bogor 16770
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a target='__blank' rel='noreferrer' href='https://maps.app.goo.gl/Sh3DoiJeWfsk55eR9' className='rounded-pill btn-burgundy'>Lihat Lokasi&nbsp;<FontAwesomeIcon icon={faMap} /></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <div className="position-relative" style={{zIndex: 150}}>
              <div className="position-absolute" style={{top: "-40px", left: "16%"}}>
                <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                  <path fill="#683448" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                </svg>
              </div>
            </div>
            <div className='my-4'>
              <div style={{paddingLeft: 30, paddingRight: 30, marginTop: 60}}>
                <h1 data-aos="fade-up" data-aos-duration="2000" className='text-secondary' style={{fontWeight: 700}}>ADAB WALIMAH</h1>
                <p data-aos="fade-up" data-aos-delay="500" data-aos-duration="2000" className='text-secondary'>Tanpa mengurangi rasa hormat, ada hal-hal dalam adab seorang muslim ketika menghadiri walimah yang harus diperhatikan</p>
              </div>
              <img data-aos="flip-right" data-aos-delay="1000" data-aos-duration="2000" className='img-daftar-adab-walimah' width="100%" style={{padding: "8px 24px"}} src={AdabWalimah} alt="adab-walimah" />
              {/* <div data-aos="flip-right" data-aos-delay="1000" data-aos-duration="2000" id='adab-walimah'> */}
              {/* </div> */}
            </div>
          </div>
        </section>

        <section className='bg2' id='gift'>
          <div data-aos="flip-left" data-aos-delay="500" data-aos-duration="2000" className='text-center' style={{marginTop: 50, marginBottom: 40}}>
            <div className="position-relative">
              <div className="bunga-gift">
                <img style={{width: "100%"}} src={Bunga1} alt="bunga1" />
              </div>
            </div>
            <div className='container-gift'>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "-5px", left: "2%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                    <path fill="#EDECF1" fillRule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"></path>
                  </svg>
                </div>
              </div>
              <h3 className='text-secondary'>Wedding Gift</h3>
              <p>Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui fitur di bawah ini:</p>
              <div className='rekening1'>
                BSI<br />
                1181553212
                <Button className='btn btn-outline bg-transparent border-0' onClick={() => copyToClipboard("1181553212")}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button><br />
                Siti Novi Nurkomala
              </div>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "-10px", right: "10%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love" viewBox="0 0 16 16">
                    <path fill="#EDECF1" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                  </svg>
                </div>
              </div>
              <div className='rekening3 mt-4'>
                BCA<br />
                7360721269
                <Button className='btn btn-outline bg-transparent border-0' onClick={() => copyToClipboard("7360721269")}>
                  <FontAwesomeIcon icon={faCopy} />
                </Button><br />
                Dika Alfarell Haidir Ramdani
              </div>
              <div className='kotak-alamat mt-4 mb-0 pb-0'>
                <table>
                  <tbody>
                    <tr>
                      <td rowSpan={2}>
                        <div style={{
                          backgroundColor: "#BF9B73",
                          margin: "10px",
                          border: "1px solid #202020",
                          borderRadius: 50,
                          padding: "15px 10px"
                        }}>
                          <FontAwesomeIcon icon={faGifts} color="#EEE" style={{fontSize: 48}} />
                        </div>
                      </td>
                      <td>Novi</td>
                    </tr>
                    <tr>
                      <td>
                        <p style={{fontSize: 11}}>Jln. Cikopo Selatan, Kp. Munjul RT02/RW05, Kec. Megamendung, Kab. Bogor 16770</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="position-relative">
                <div className="position-absolute" style={{top: "20px", left: "14%"}}>
                  <svg xmlns="https://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="opacity-50 animate-love-reverse" viewBox="0 0 16 16">
                    <path fill="#EDECF1" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg2" id="ucapan" style={{paddingBottom: 150}}>
          <div data-aos="flip-right" data-aos-delay="500" data-aos-duration="2000" className='text-center'>
            <div className='container-ucapan'>
              <p>{ucapan != null ? ucapan.data.length + " Comment" : "0 Comment"}</p>
              <hr style={{color: "#EDECF1"}} />
              <h1 className='text-secondary'>Ucapan & do&apos;a</h1>
              <p>Kirimkan Do&apos;a & Ucapan Untuk Kedua Mempelai</p>
              <div className='row'>
                <div className='col-12'>
                  <Form.Control name='nama_tamu' placeholder='Nama' color='#BF9B73' id='txt-nama' className='text-form' required />
                </div>
                <div className='col-12 mt-4'>
                  <Form.Control name='ucapan' as="textarea" rows={3} id="txt-ucapan" placeholder='Berikan Ucapan dan Do&apos;a Restu' required />
                </div>
                <div className='col-12 mt-4'>
                  <Form.Select name='absen' id='txt-absen' onChange={absenChangeHandler} required>
                    <option value="">...</option>
                    <option value="1">Hadir</option>
                    <option value="0">Tidak Hadir</option>
                  </Form.Select>
                </div>
                <div className='col-12 mt-4'>
                  <Button id="btn-beri-ucapan" onClick={kirimUcapan} className='btn btn-burgundy-sec btn-rounded rounded-pill w-100'>Kirim</Button>
                </div>
              </div>
              <div id="container-kumpulan-ucapan" className='mt-4'>
                <table id='table-kumpulan-ucapan' className='w-100'>
                  <tbody>
                    {ucapan != null ? ucapan.data.map((u) => {
                      const badge = u.absen === 1 ? <Badge bg='success' className='pb-0' style={{fontSize: ".75rem"}}>Hadir</Badge> : <Badge bg='danger' className='pb-0' style={{fontSize: ".75rem"}}>Tidak Hadir</Badge>;
                      console.log("da", u.tanggal);
                      return (
                        <tr key={u.id}>
                          <td colSpan={2}>
                            <div className='kotak-ucapannya mb-2'>
                              <div className='d-flex justify-content-between align-items-center'>
                                <h5>{u.nama_tamu}&nbsp;&nbsp;&nbsp;{badge}</h5>
                                <span style={{fontSize: ".8rem"}}>{timeSince(new Date(u.tanggal))}</span>
                              </div>
                              <hr className='mb-2 m-0 p-0' />
                              <p style={{color: "#200220"}}>{u.ucapan}</p>
                            </div>
                          </td>
                        </tr>
                      );
                    }) :
                      <tr>
                        <td colSpan={2}></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p style={{marginTop: 30, paddingLeft: 20, paddingRight: 20}}>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila, Bapak/Ibu/Saudara/i berkenan hadir pada hari bahagia ini. terima kasih atas ucapan, do&apos;a dan perhatian yang diberikan</p>
          <p>See you on our big day!</p>
          <br />
          <h1 style={{fontFamily: '"Camellia Signature"', color: "#683448"}}>Novi &amp; Dika</h1>
          <br />
          <h1 style={{fontSize: "1.4rem", color: "#683448", padding: "16px 0px"}}>Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh</h1>
          <div className='position-relative'>
            <div className="bunga-ucapan">
              <img style={{width: "100%"}} src={Bunga2} alt="bunga2" />
            </div>
          </div>
        </section>
      </main>

      <WelcomeModal />
      <ToastContainer position={'top-end'} className='position-fixed'>
        <Toast show={showT} onClose={() => setShowT(false)} delay={3000} autohide className='bg-success m-4' style={{width: 150}}>
          <Toast.Header>
          <img
              src=""
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto"></strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className='text-light'>
            Copied!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;