import './App.css';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Card, CardContent, Container, Grid, FormControlLabel,
    FormGroup, Paper, Radio, RadioGroup, Switch, TextField, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        padding: '60px 40px',
        margin: '40px',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    inputText: {
        margin: '8px 0',
    },
    exampleText: {
        margin: '0px 0 8px',
    },
    firstGrid: {
        [theme.breakpoints.up('sm')]: {
            marginRight: 5,
        },
    },
    svgPicture: {
        width: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
//             <Alert severity="warning">Waktu untuk beribadah, tidak tepat untuk menghubungi Dosen</Alert>


const TimeReminder = () => {
    const classes = useStyles();

    const date = new Date();

    const [currentDate, setCurrentDate] = useState(new Date().toLocaleTimeString());

    const [nomorDosen, setNomorDosen] = useState('');

    const [nama, setNama] = useState('');

    const [kelas, setKelas] = useState('');

    const [tujuan, setTujuan] = useState('');

    const [pertanyaan, setPertanyaan] = useState('');

    const [ucapanPenutup, setUcapanPenutup] = useState('');

    const [adalahPria, setAdalahPria] = React.useState({
        status: true,
        value: 'pak'
    });

    const [adalahMuslim, setAdalahMuslim] = React.useState({
        status: true,
        value: 'Assalamualaikum'
    });

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        window.open(`http://wa.me/${nomorDosen}?text=${message}`, '_blank')
    };

    const getCurrentHour = () => {
        let currentHour = date.getHours();
        if (currentHour > 5 && currentHour < 21) {
            return (
                <>
                    <Alert style={{ marginBottom: '24px' }} severity="success">Waktu yang tepat untuk menghubungi Dosen</Alert>
                </>
            );
        } else {
            return (
                <>
                    <Alert style={{ marginBottom: '24px' }} severity="error">Waktu yang tidak tepat untuk menghubungi Dosen</Alert>
                </>
            );
        }

    };

    const handleChange = (event) => {
        if (event.target.name === "nomor dosen") {
            let context = event.target.value;
            setNomorDosen(context);
        } else if (event.target.name === "nama") {
            let context = event.target.value;
            setNama(context);
        } else if (event.target.name === "kelas") {
            let context = event.target.value;
            setKelas(context);
        } else if (event.target.name === "tujuan") {
            let context = event.target.value;
            setTujuan(context);
        } else if (event.target.name === "pertanyaan") {
            let context = event.target.value;
            setPertanyaan(context);
        } else if (event.target.name === "ucapan penutup") {
            let context = event.target.value;
            setUcapanPenutup(context);
        } else if (event.target.name === "adalah muslim") {
            setAdalahMuslim(prevState => ({
                ...prevState,
                status: !adalahMuslim.status,
                value: (adalahMuslim.status) ? 'Selamat pagi' : 'Assalamualaikum'
            }));
        } else if (event.target.name === "jenis kelamin") {
            let context = event.target.value;
            setAdalahPria(prevstate => ({
                ...prevstate,
                status: !adalahPria.status,
                value: (adalahPria.status) ? 'buk' : 'pak'
            }));

            return context;
        }
    };

    useEffect(() => {
        let secTimer = setInterval(() => {
            setCurrentDate(new Date().toLocaleTimeString())
        }, 1000);

        let perkenalan = `${adalahMuslim.value} ${adalahPria.value}. Nama saya ${nama}, dari kelas ${kelas}.`.replace(/ /g, '%20');
        let urusan = `${tujuan} ${pertanyaan}`.replace(/ /g, '%20');
        let penutup = `${ucapanPenutup}`.replace(/ /g, '%20');

        setMessage(`${perkenalan}%0D%0A%0A${urusan}%0D%0A%0A${penutup}`);

        return () => {
            clearInterval(secTimer);
        };
    }, [nomorDosen, nama, kelas, tujuan, pertanyaan, ucapanPenutup, adalahPria, adalahMuslim, message]);

    return (
        <React.Fragment>
            <Paper elevation={3} className={classes.root}>
                <form noValidate autoComplete="off">

                    <Grid container direction="row" justify="space-around" alignItems="flex-start" spacing={6}>
                        <Grid item sm={12} md={6}>

                            {getCurrentHour()}

                            <Card className={classes.inputText}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" >
                                        Sekarang jam
                                    </Typography>
                                    <Typography variant="h2" component="h2">
                                        {currentDate}
                                    </Typography>
                                </CardContent>
                            </Card>

                            <FormGroup>
                                <TextField className={classes.inputText} id="outlined-basic" name="nomor dosen" value={nomorDosen} label="Masukkan Nomor HP Dosen" variant="outlined" onChange={handleChange} />
                                <RadioGroup className={classes.inputText} aria-label="gender" name="jenis kelamin" value={adalahPria.status} onChange={handleChange}>
                                    <FormControlLabel value={true} control={<Radio />} label="Dosen Pria" />
                                    <FormControlLabel value={false} control={<Radio />} label="Dosen Wanita" />
                                </RadioGroup>
                            </FormGroup>
                            <div className={classes.svgPicture}>
                                <svg style={{ width: '100%', height: '100%' }} id="bc2ceed9-6279-4fc4-8d2c-808d9baa6e6c" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="920" height="728.78666" viewBox="0 0 920 728.78666"><path d="M878.6656,258.55392h-3.99878V149.0086A63.40185,63.40185,0,0,0,811.265,85.60667H579.1783a63.40186,63.40186,0,0,0-63.402,63.4017v600.9744a63.40188,63.40188,0,0,0,63.40179,63.40191H811.26472a63.40186,63.40186,0,0,0,63.402-63.40167V336.53016h3.99878Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M861.172,149.451v600.09a47.35072,47.35072,0,0,1-47.35,47.35h-233.2a47.35085,47.35085,0,0,1-47.35-47.35V149.451a47.35089,47.35089,0,0,1,47.35-47.35h28.29a22.50661,22.50661,0,0,0,20.83,30.99h132.96a22.50672,22.50672,0,0,0,20.83-30.99h30.29A47.35088,47.35088,0,0,1,861.172,149.451Z" transform="translate(-140 -85.60667)" fill="#fff" /><path d="M593.05276,157.75781a32,32,0,0,0-.00025,64h.00025a32,32,0,0,0,0-64Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M825.39127,216.758h-168a8,8,0,1,1,0-16h168a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M710.39127,182.758h-53a8,8,0,1,1,0-16h53a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M593.05276,291.75781a32,32,0,0,0-.00025,64h.00025a32,32,0,0,0,0-64Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M825.39127,350.758h-168a8,8,0,1,1,0-16h168a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M710.39127,316.758h-53a8,8,0,1,1,0-16h53a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M593.05276,559.75781a32,32,0,0,0-.00025,64h.00025a32,32,0,0,0,0-64Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M825.39127,618.758h-168a8,8,0,1,1,0-16h168a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M710.39127,584.758h-53a8,8,0,1,1,0-16h53a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M593.05276,693.75781a32,32,0,0,0-.00025,64h.00025a32,32,0,0,0,0-64Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M825.39127,752.758h-168a8,8,0,1,1,0-16h168a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M710.39127,718.758h-53a8,8,0,1,1,0-16h53a8,8,0,0,1,0,16Z" transform="translate(-140 -85.60667)" fill="#e6e6e6" /><path d="M890.222,534.758h-386a16.51867,16.51867,0,0,1-16.5-16.5v-124a16.51868,16.51868,0,0,1,16.5-16.5h386a16.51867,16.51867,0,0,1,16.5,16.5v124A16.51866,16.51866,0,0,1,890.222,534.758Z" transform="translate(-140 -85.60667)" fill="#fff" /><path d="M551.62541,501.98415a45.72608,45.72608,0,1,1,45.72608-45.72607A45.778,45.778,0,0,1,551.62541,501.98415Zm0-89.45215a43.72608,43.72608,0,1,0,43.72608,43.72608A43.77555,43.77555,0,0,0,551.62541,412.532Z" transform="translate(-140 -85.60667)" fill="#3f3d56" /><path d="M876.3633,493.996H641.55085a11.18155,11.18155,0,1,1,0-22.36309H876.3633a11.18155,11.18155,0,1,1,0,22.36309Z" transform="translate(-140 -85.60667)" fill="#536dfe" /><path d="M715.62859,446.4744H641.55085a11.18155,11.18155,0,1,1,0-22.36309h74.07774a11.18155,11.18155,0,1,1,0,22.36309Z" transform="translate(-140 -85.60667)" fill="#536dfe" /><path d="M890.222,534.758h-386a16.51867,16.51867,0,0,1-16.5-16.5v-124a16.51868,16.51868,0,0,1,16.5-16.5h386a16.51867,16.51867,0,0,1,16.5,16.5v124A16.51866,16.51866,0,0,1,890.222,534.758Zm-386-156a15.51753,15.51753,0,0,0-15.5,15.5v124a15.51752,15.51752,0,0,0,15.5,15.5h386a15.51752,15.51752,0,0,0,15.5-15.5v-124a15.51753,15.51753,0,0,0-15.5-15.5Z" transform="translate(-140 -85.60667)" fill="#3f3d56" /><circle cx="410.81732" cy="374.24958" r="18.65423" fill="#2f2e41" /><ellipse cx="532.16309" cy="445.70476" rx="7.71899" ry="5.78924" transform="translate(-299.29389 421.23336) rotate(-45)" fill="#2f2e41" /><ellipse cx="563.16151" cy="440.84226" rx="5.78924" ry="7.71899" transform="translate(-203.46709 699.95197) rotate(-66.86956)" fill="#2f2e41" /><circle cx="411.40895" cy="378.70277" r="15.83165" fill="#ffb8b8" /><path d="M534.77357,454.35137a21.53222,21.53222,0,0,0,12.30556,3.803,13.19519,13.19519,0,0,1-5.22991,2.15163,43.41838,43.41838,0,0,0,17.73506.09965,11.47828,11.47828,0,0,0,3.71267-1.27514,4.69854,4.69854,0,0,0,2.29163-3.06481c.3891-2.22286-1.343-4.24238-3.143-5.60342a23.184,23.184,0,0,0-19.48221-3.89308,10.66881,10.66881,0,0,0-5.77,3.26073c-1.41356,1.74772-1.83228,4.44215-.48551,6.24185Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M317.73505,596.77195a10.74269,10.74269,0,0,1,8.95-13.82913l51.333-59.98324,11.97263,12.57092L338.8599,593.044a10.80091,10.80091,0,0,1-21.12485,3.728Z" transform="translate(-140 -85.60667)" fill="#a0616a" /><path d="M361.318,532.32573a4.49515,4.49515,0,0,1,1.28035-3.52153l15.85887-16.081a12.49742,12.49742,0,0,1,20.223,14.68908l-10.54464,20.05559a4.5,4.5,0,0,1-6.63811,1.53875l-18.34937-13.4105A4.49493,4.49493,0,0,1,361.318,532.32573Z" transform="translate(-140 -85.60667)" fill="#536dfe" /><circle cx="258.55591" cy="385.35364" r="24.56103" fill="#a0616a" /><path d="M385.20116,580.86814a4.4482,4.4482,0,0,1-1.76586-3.06445,392.99971,392.99971,0,0,0-7.40235-42.21A26.493,26.493,0,0,1,425.22948,517.208c9.65918,18.12793,10.397,43.0166,10.26587,52.876a4.49152,4.49152,0,0,1-3.75293,4.36719l-43.095,7.25391a4.56,4.56,0,0,1-.76025.06347A4.46155,4.46155,0,0,1,385.20116,580.86814Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M478.24063,500.8973a10.52617,10.52617,0,0,0-.23929,1.64013l-42.95745,24.782-10.44142-6.01094-11.13116,14.57228,17.45034,12.43754a8,8,0,0,0,9.59819-.23383l44.29652-34.94584a10.4971,10.4971,0,1,0-6.57573-12.24133Z" transform="translate(-140 -85.60667)" fill="#a0616a" /><path d="M433.60777,528.49317l-13.88373,17.994a4.5,4.5,0,0,1-6.80393.37267L397.20279,530.5386a12.49742,12.49742,0,0,1,15.32664-19.74414l19.713,11.02279a4.5,4.5,0,0,1,1.36538,6.67592Z" transform="translate(-140 -85.60667)" fill="#536dfe" /><polygon points="315.252 716.442 327.512 716.441 330.398 669.306 315.25 669.154 315.252 716.442" fill="#a0616a" /><path d="M452.12493,798.04574l24.1438-.001h.001A15.38605,15.38605,0,0,1,491.65618,813.431v.5l-39.53052.00146Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><polygon points="198.252 716.442 210.512 716.441 216.344 669.153 198.25 669.154 198.252 716.442" fill="#a0616a" /><path d="M335.12493,798.04574l24.1438-.001h.001A15.38605,15.38605,0,0,1,374.65618,813.431v.5l-39.53052.00146Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M351.61376,777.48924l-15.21484-1.98438a4.49962,4.49962,0,0,1-3.76319-5.6289l22.19385-109.06153a253.54539,253.54539,0,0,0,4.57031-32.08886c.64795-8.77344,3.21631-21.17969,11.77222-30.45606a128.63454,128.63454,0,0,0,9.72461-12.01562l6.718-9.30176,44.7522-7.12012.03076.55371a259.33813,259.33813,0,0,0,27.13476,102.17774A115.39928,115.39928,0,0,1,471.636,718.53514l2.53613,49.45214a4.50586,4.50586,0,0,1-1.303,3.40235,4.448,4.448,0,0,1-3.3955,1.32226l-14.54493-.66113a4.50814,4.50814,0,0,1-4.18652-3.51074l-12.1438-54.17969a3.53494,3.53494,0,0,0-.61523-1.335l-38.1106-50.81348a2.50019,2.50019,0,0,0-4.35986.67383l-39.06958,111.627a4.5229,4.5229,0,0,1-4.25293,3.01367A4.41847,4.41847,0,0,1,351.61376,777.48924Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M371.39843,453.91307a108.93148,108.93148,0,0,0,4.30468-18.14538c.28712-3.58653-.63165-7.44558-3.24355-9.92017-4.88806-4.63111-13.19292-2.42536-18.30474,1.95752-7.38773,6.33426-11.07226,16.06872-12.46474,25.7s-.77981,19.42538-1.115,29.15107-1.72618,19.72594-6.68451,28.09949-14.15945,14.801-23.86479,14.08837a16.79538,16.79538,0,0,1-10.51372-4.45559,12.19082,12.19082,0,0,1-3.66135-10.586c-4.96049,8.88241-2.44591,20.92093,4.9531,27.90364s18.78011,8.95664,28.50716,5.97535,17.73274-10.45674,22.51462-19.43656,6.53421-19.35318,6.28027-29.52368c-.195-7.81015-1.52263-15.68424-.20282-23.38454s6.139-15.51891,13.73829-17.33222Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M405.52482,464.03689c1.29565,4.32812,6.25148,6.997,10.70967,6.265s8.1242-4.40348,9.47888-8.71348a17.93825,17.93825,0,0,0-1.40188-13.15052A20.47854,20.47854,0,0,0,412.5941,438.001a16.8141,16.8141,0,0,0-15.28884,2.443,5.62277,5.62277,0,0,0-3.92929-4.10922,10.74474,10.74474,0,0,0-5.8966.087,24.29569,24.29569,0,0,0-13.52231,9.83737,39.53558,39.53558,0,0,0-6.12865,15.79793c-1.50872,8.46858-.95223,17.7224,3.804,24.88978s14.48685,11.39952,22.38094,7.98246c.49224-2.51643-.67385-5.05028-2.02294-7.2308s-2.948-4.3047-3.46622-6.81589.47529-5.58289,2.90434-6.40412c2.07227-.70061,4.28168.43447,6.46487.57154a7.08405,7.08405,0,0,0,6.79537-10.20742Z" transform="translate(-140 -85.60667)" fill="#2f2e41" /><path d="M1059,814.39333H141a1,1,0,0,1,0-2h918a1,1,0,0,1,0,2Z" transform="translate(-140 -85.60667)" fill="#ccc" /></svg>
                            </div>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <FormGroup>
                                <Typography style={{ margin: '24px 0 8px' }} variant="h5" color="initial">Masukkan isi pesan yang mau dikirim</Typography>
                                <FormControlLabel
                                    className={classes.inputText}
                                    // value="start"
                                    label="Gunakan salam untuk Muslim"
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            color="primary"
                                            checked={adalahMuslim.status}
                                            onChange={handleChange}
                                            name="adalah muslim"
                                            value={adalahMuslim.value}
                                        />
                                    }
                                />
                                <TextField className={classes.inputText} id="outlined-basic" name="nama" label="Masukkan nama anda" variant="outlined" onChange={handleChange} value={nama} />
                                <TextField className={classes.inputText} id="outlined-basic" name="kelas" label="Dari kelas apa" variant="outlined" onChange={handleChange} value={kelas} />
                                <TextField className={classes.inputText} id="outlined-basic" name="tujuan" label="Tujuan menghubungi Dosen" variant="outlined" onChange={handleChange} value={tujuan} />
                                <Typography className={classes.exampleText} variant="body2" color="textSecondary">
                                    Contoh: "Saya ingin bertanya...", "Saya ingin assasement ...", "Saya ingin jumpa untuk..."
                                </Typography>
                                <TextField className={classes.inputText} id="outlined-basic" name="pertanyaan" value={pertanyaan} label="Masukkan pertanyaan anda" variant="outlined" onChange={handleChange} />
                                <Typography className={classes.exampleText} variant="body2" color="textSecondary">
                                    Contoh: "Apakah bapak ada waktu minggu ini?"
                                </Typography>
                                <TextField className={classes.inputText} id="outlined-basic" name="ucapan penutup" value={ucapanPenutup} label="Masukkan ucapan maaf dan terima kasih" variant="outlined" onChange={handleChange} />
                                <Typography className={classes.exampleText} variant="body2" color="textSecondary">
                                    Contoh: "Mohon maaf telah mengganggu waktunya, Terima kasih sebelumnya."
                                </Typography>
                                <Button style={{ margin: '20px 0 0' }} variant="contained" color="primary" type="button"
                                    onClick={sendMessage}
                                >
                                    Kirim Pesan
                                </Button>
                            </FormGroup>
                        </Grid>
                    </Grid>


                </form>
            </Paper>
        </React.Fragment >
    );
}

function App() {
    return (
        <>
            <Container maxWidth="lg" style={{ minWidth: 540 }}>
                <TimeReminder />
            </Container>
        </>
    );
}

export default App;
