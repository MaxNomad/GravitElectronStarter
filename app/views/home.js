import React, { useEffect, useState } from 'react';
import Api from '../helpers/api';
import ProgressBar from "@ramonak/react-progress-bar";
import preloader from "../assets/Rhombus.gif"
import { Animated } from "react-animated-css";
import "../styles/main.css"

const Home = () => {

    const [java, setJava] = useState("");
    const [system, setSystem] = useState("");
    const [systemLoad, setSystemLoad] = useState(false);
    const [javaLoad, setJavaLoad] = useState(false);
    const [systemCPU_OK, setSystemCPU_OK] = useState(false);
    const [systemMEM_OK, setSystemMEM_OK] = useState(false);
    const [java_OK, setJavaOK] = useState(false);
    const [pers, setPers] = useState(null);
    const [download_javaComp, setDownload_javaComp] = useState(false);
    const [InstallJavaBtn, setInstallJavaBtn] = useState(false);

    useEffect(() => {
        if (!systemLoad) {
            Api.getSystem().then(data => {
                setSystem(data)
            });
            if (system.status == 200) {
                setSystemLoad(true)
                if (system.data.cpu.physicalCores > 2) {
                    setSystemCPU_OK(true)
                }
                if ((Math.round(system.data.mem.total / 1000000000)) > 2) {
                    setSystemMEM_OK(true)
                }
            }
        }

    }, [system.status]);
    useEffect(() => {
        if (systemLoad) {
            Api.getJava().then(data => {
                setJava(data)
            });
            if (java.status === 200 && java.data) {
                setJavaLoad(true)
                if (systemCPU_OK && systemMEM_OK) {
                    if (java.data.version.includes('1.8.0')) {
                        setJavaOK(true)
                    }
                }
            }
        }
    }, [systemMEM_OK, systemCPU_OK, system]);



    


    const barge_suc = () => (<span className="badge badge-success"><i className="fa-solid fa-check"></i></span>)
    const barge_error = () => (<span className="badge badge-danger"><i className="fa-solid fa-xmark"></i></span>)

    const systemRender = () => {
        if (system.data) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationOutDuration={1200} animationInDuration={1800}>
                <div className='system'>
                    {systemCPU_OK ? barge_suc() : barge_error()}
                    <br />
                    Cpu: {`${system.data.cpu.manufacturer} ${system.data.cpu.brand}`}
                    <br />
                    {systemMEM_OK ? barge_suc() : barge_error()}
                    <br />
                    Memory: {`${Math.round(system.data.mem.total / 1000000000)} GB`}
                    <br />
                </div>
            </Animated>)
        }
    }

    const javaRender = () => {
        if (java.data && systemCPU_OK && systemMEM_OK) {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationOutDuration={1200} animationInDuration={1800}>
                <div className='java'>
                    <hr />
                    Java
                    <br />
                    {java_OK ? barge_suc() : barge_error()}
                    <br />
                    {`${java.data.version}`}
                    <br />
                    <hr />
                </div>
            </Animated>)
        }


    }
    const launcherRender = () => {
        if (java.data && java_OK) {
            if (systemCPU_OK && systemMEM_OK) {
                return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationOutDuration={1200} animationInDuration={1800}>
                    <div className='launcher'>
                        Launcher status
                        <br />
                        {java_OK ? barge_suc() : barge_error()}
                        <br />
                    </div>
                </Animated>)
            }
        }
        else {

        }


    }
    const notificationRender = () => {
        if (system.data) {
            if (!systemMEM_OK || !systemCPU_OK)
                return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationOutDuration={1200} animationInDuration={1800}>
                    <div className='card notification'>
                        This computer does not meet the minimum requirements
                        <br />
                        <h1>;(</h1>
                    </div>
                </Animated>)
        }
    }
    const mainRender = () => {
        if (javaLoad && systemLoad) {
            return (<>
                {systemRender()}
                {javaRender()}
                {launcherRender()}
                {notificationRender()}
            </>

            )

        } else {
            return (<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationOutDuration={1200} animationInDuration={600}><div class="text-center m-4">
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <img src={preloader} alt="loading..." className="" /></div></Animated>)
        }

    }
    return (
        <div className='main'>
            <div className="container text-center card">
                {mainRender()}
                <div className="bg-test" />
            </div>

        </div>

    );
}


export default Home;
