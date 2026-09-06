
const env = process.env.NEXT_PUBLIC_SOL_NET;
const rpcEndpoint = env === "mainnet" ? true : false;
const token = localStorage.getItem('openComputeToken');
const finalCommand = `./neb-verifier --token ${token}`
let docker 
let formalmacOS
let formalwin
let formalLinux
if (rpcEndpoint) {
    formalmacOS = "source <(curl -sSL https://github.com/NebulaiNetwork/OpenCompute/releases/download/v1.0.0/neb_verifier_mac.sh) --stay"
    formalLinux = "source <(curl -sSL https://github.com/NebulaiNetwork/OpenCompute/releases/download/v1.0.0/neb_verifier_linux.sh) --stay"
    formalwin = String.raw`$bat = "$env:TEMP\neb_verifier_win_debug.bat"
        Invoke-WebRequest -Uri "https://github.com/NebulaiNetwork/OpenCompute/releases/download/v1.0.0/neb_verifier_win.bat" -OutFile $bat
        if ($?) {
            cmd /c $bat
            if ($?) {
                Set-Location verifier
            }
        }`
     docker = `docker rm -f verifier;docker run -e  TOKEN="${token}" --name verifier nebulaicli/verifier:1.0`
} else {
    formalmacOS = "source <(curl -sSL https://github.com/NebulaiNetwork/OpenCompute_Devnet/releases/download/v1.0.0/neb_verifier_mac_debug.sh) --stay"
    formalLinux = "source <(curl -sSL https://github.com/NebulaiNetwork/OpenCompute_Devnet/releases/download/v1.0.0/neb_verifier_linux_debug.sh) --stay"
    formalwin = String.raw`$bat = "$env:TEMP\neb_verifier_win_debug.bat"
        Invoke-WebRequest -Uri "https://github.com/NebulaiNetwork/OpenCompute_Devnet/releases/download/v1.0.0/neb_verifier_win_debug.bat" -OutFile $bat
        if ($?) {
            cmd /c $bat
            if ($?) {
                Set-Location verifier
            }
        }`
     docker = `docker run -e TOKEN="${token}" --name verifier yvhang7/verifier:3.8`
}



const systemList = [{
    name: 'macOS',
    value: formalmacOS,
    startupCli: finalCommand,
    command: "https://docs.docker.com/engine/install/",
    startupDocker: docker,

}, {
    name: 'Linux',
    value: formalLinux,
    startup: finalCommand,
    command: "https://docs.docker.com/engine/install/",
    startupDocker: docker,
}, {
    name: 'Windows',
    value: formalwin,
    startup: finalCommand,
    command: "https://docs.docker.com/engine/install/",
    startupDocker: docker,
}
];
const getSystemList = () => {
    return {
        finalCommand,
        docker,
        systemList
    }
}
export default getSystemList