'use client';

import { Box, CssBaseline } from '@mui/material';
import HeaderWrapper from '../../../components/sidebarnav/menu';
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <HeaderWrapper>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ p: 3, width: '100%' }}>{children}</Box>
                </Box>
            </HeaderWrapper>
        </>
    )
}
