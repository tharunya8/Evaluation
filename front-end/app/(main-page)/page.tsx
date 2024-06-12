import '../../app/(main-page)/global.css';
import type { AppProps } from 'next/app';
import Homepage from '../../components/login/login';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Homepage />
        </>
    );
}

export default MyApp;
